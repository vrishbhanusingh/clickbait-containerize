import {OpenAIApi,Configuration} from 'openai-edge'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_SECRET_KEY,
  })
  const openai = new OpenAIApi(configuration)
  

export async function getEmbeddings(text:string){
    try {
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: text.replace(/\n/g, ' ')
        })
        const result = await response.json();
        return result.data[0].embedding as number[]
    } catch (error) {
        console.log('error calling open AI embeddings api', error)
        throw error
    }
}
export async function getEmbeddingsAds(text:string){
    try {
        const response = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input: text.replace(/\n/g, ' ')
        })
        const result = await response.json();
        return result.data[0].embedding as number[]
    } catch (error) {
        console.log('error calling open AI embeddings api', error)
        throw error
    }
}


