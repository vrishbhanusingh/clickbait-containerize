// import { ChatLanguageModel } from '@ai-sdk/provider';
// import { CustomChatModelId, CustomChatSettings } from './custom-chat-settings';

// interface CustomProviderOptions {
//   provider: string;
//   baseURL: string;
//   headers: () => Record<string, string>;
//   generateId: () => string;
// }

// export class CustomChatLanguageModel extends ChatLanguageModel {
//   modelId: CustomChatModelId;
//   settings: CustomChatSettings;
//   options: CustomProviderOptions;

//   constructor(modelId: CustomChatModelId, settings: CustomChatSettings, options: CustomProviderOptions) {
//     super();
//     this.modelId = modelId;
//     this.settings = settings;
//     this.options = options;
//   }

//   get metadata() {
//     return {
//       specificationVersion: 'v1',
//       provider: this.options.provider,
//       modelId: this.modelId,
//       defaultObjectGenerationMode: 'json',
//     };
//   }

//   async doGenerate(prompt: string, options: any) {
//     const { baseURL, headers } = this.options;
//     const url = `${baseURL}/generate`;

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: headers(),
//       body: JSON.stringify({ context: prompt, abstract: options }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const result = await response.json();
//     return { text: result.text };
//   }

//   async doStream(prompt: string, options: any, onUpdate: (text: string) => void) {
//     const { baseURL, headers } = this.options;
//     const url = `${baseURL}/stream`;

//     const response = await fetch(url, {
//       method: 'POST',
//       headers: headers(),
//       body: JSON.stringify({ context: prompt, abstract: options }),
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();
//     let done = false;

//     while (!done) {
//       const { value, done: readerDone } = await reader.read();
//       done = readerDone;
//       if (value) {
//         onUpdate(decoder.decode(value));
//       }
//     }
//   }
// }
import { LanguageModelV1, LanguageModelV1CallWarning, LanguageModelV1FinishReason, LanguageModelV1StreamPart } from '@ai-sdk/provider';
import { combineHeaders, createJsonResponseHandler, createEventSourceResponseHandler, postJsonToApi, ParseResult } from '@ai-sdk/provider-utils';
import { z } from 'zod';
import { CustomChatModelId, CustomChatSettings } from './custom-chat-settings';

type CustomChatConfig = {
  provider: string;
  baseURL: string;
  headers: () => Record<string, string | undefined>;
  fetch?: typeof fetch;
};

const textSchema = z.object({ text: z.string() });
type TextSchema = z.infer<typeof textSchema>;
type ParseResultType = ParseResult<TextSchema>;

export class CustomChatLanguageModel implements LanguageModelV1 {
  readonly specificationVersion = 'v1';
  readonly defaultObjectGenerationMode = 'json';

  readonly modelId: CustomChatModelId;
  readonly settings: CustomChatSettings;
  private readonly config: CustomChatConfig;

  constructor(
    modelId: CustomChatModelId,
    settings: CustomChatSettings,
    config: CustomChatConfig,
  ) {
    this.modelId = modelId;
    this.settings = settings;
    this.config = config;
  }

  get provider(): string {
    return this.config.provider;
  }

  private getArgs({
    mode,
    prompt,
    maxTokens,
    temperature,
    topP,
    frequencyPenalty,
    presencePenalty,
  }: Parameters<LanguageModelV1['doGenerate']>[0]) {
    const warnings: LanguageModelV1CallWarning[] = [];

    return prompt;
  }

  async doGenerate(
    options: Parameters<LanguageModelV1['doGenerate']>[0],
  ): Promise<Awaited<ReturnType<LanguageModelV1['doGenerate']>>> {
    const prompt = this.getArgs(options);

    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}`,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: prompt,
      failedResponseHandler: (response) => {
        console.error('API call failed:', response);
        throw new Error(response.statusText);
      },
      successfulResponseHandler: createJsonResponseHandler(textSchema),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch,
    });

    const choice = response;

    return {
      text: choice.text,
      toolCalls: [],
      finishReason: 'stop' as LanguageModelV1FinishReason,
      usage: {
        promptTokens: NaN,
        completionTokens: NaN,
      },
      rawCall: prompt,
      rawResponse: { headers: responseHeaders },
      warnings,
    };
  }

  async doStream(
    options: Parameters<LanguageModelV1['doStream']>[0],
  ): Promise<Awaited<ReturnType<LanguageModelV1['doStream']>>> {
    const prompt = this.getArgs(options);

    const { responseHeaders, value: response } = await postJsonToApi({
      url: `${this.config.baseURL}`,
      headers: {
        'Content-Type': 'text/plain',
      },
      body: prompt,
      failedResponseHandler: (response) => {
        console.error('API call failed:', response);
        throw new Error(response.statusText);
      },
      successfulResponseHandler: createEventSourceResponseHandler(textSchema),
      abortSignal: options.abortSignal,
      fetch: this.config.fetch,
    });

    let finishReason: LanguageModelV1FinishReason = 'stop';
    let usage: { promptTokens: number; completionTokens: number } = {
      promptTokens: NaN,
      completionTokens: NaN,
    };

    const transformStream = new TransformStream({
      transform(chunk: ParseResultType, controller) {
        if (!chunk.success) {
          controller.enqueue({ type: 'error', error: chunk.error });
          return;
        }

        const value = chunk.value;

        controller.enqueue({
          type: 'text-delta',
          textDelta: value.text,
        });
      },

      flush(controller) {
        controller.enqueue({ type: 'finish', finishReason, usage });
      },
    });

    return {
      stream: response.pipeThrough(transformStream),
      rawCall: prompt,
      rawResponse: { headers: responseHeaders },
      warnings,
    };
  }
}