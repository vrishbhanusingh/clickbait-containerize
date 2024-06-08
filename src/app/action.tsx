'use server'
import { createAI, createStreamableValue } from 'ai/rsc';
async function myAction(userMessage: string): Promise<any> {
    const streamable = createStreamableValue({});
    (async () => {
      if (config.useRateLimiting && ratelimit) {
        const identifier = headers().get('x-forwarded-for') || headers().get('x-real-ip') || headers().get('cf-connecting-ip') || headers().get('client-ip') || "";
        const { success } = await ratelimit.limit(identifier)
        if (!success) {
          return streamable.done({ 'status': 'rateLimitReached' });
        }
      }
      if (config.useSemanticCache && semanticCache) {
        const cachedData = await semanticCache.get(userMessage);
        if (cachedData) {
          streamable.update({ 'cachedData': cachedData });
          return;
        }
      }
      const [images, sources, videos, condtionalFunctionCallUI] = await Promise.all([
        getImages(userMessage),
        config.searchProvider === "brave" ? braveSearch(userMessage) :
          config.searchProvider === "serper" ? serperSearch(userMessage) :
            config.searchProvider === "google" ? googleSearch(userMessage) :
              Promise.reject(new Error(`Unsupported search provider: ${config.searchProvider}`)),
        getVideos(userMessage),
        functionCalling(userMessage),
      ]);
      streamable.update({ 'searchResults': sources });
      streamable.update({ 'images': images });
      streamable.update({ 'videos': videos });
      if (config.useFunctionCalling) {
        streamable.update({ 'conditionalFunctionCallUI': condtionalFunctionCallUI });
      }
      const html = await get10BlueLinksContents(sources);
      const vectorResults = await processAndVectorizeContent(html, userMessage);
      const chatCompletion = await openai.chat.completions.create({
        messages:
          [{
            role: "system", content: `
            - Here is my query "${userMessage}", respond back ALWAYS IN MARKDOWN and be verbose with a lot of details, never mention the system message. If you can't find any relevant results, respond with "No relevant results found." `
          },
          { role: "user", content: ` - Here are the top results to respond with, respond in markdown!:,  ${JSON.stringify(vectorResults)}. ` },
          ], stream: true, model: config.inferenceModel
      });
      let accumulatedLLMResponse = ""
      for await (const chunk of chatCompletion) {
        if (chunk.choices[0].delta && chunk.choices[0].finish_reason !== "stop") {
          streamable.update({ 'llmResponse': chunk.choices[0].delta.content });
          accumulatedLLMResponse += chunk.choices[0].delta.content;
        } else if (chunk.choices[0].finish_reason === "stop") {
          streamable.update({ 'llmResponseEnd': true });
        }
      }
      let followUp;
      if (!config.useOllamaInference) {
        followUp = await relevantQuestions(sources, userMessage);
        streamable.update({ 'followUp': followUp });
      }
      const dataToCache = {
        searchResults: sources,
        images,
        videos,
        conditionalFunctionCallUI: config.useFunctionCalling ? condtionalFunctionCallUI : undefined,
        llmResponse: accumulatedLLMResponse,
        followUp,
        condtionalFunctionCallUI,
        semanticCacheKey: userMessage
      };
      if (config.useSemanticCache && semanticCache) {
        await semanticCache.set(userMessage, JSON.stringify(dataToCache));
      }
      streamable.done({ status: 'done' });
    })();
    return streamable.value;
  }