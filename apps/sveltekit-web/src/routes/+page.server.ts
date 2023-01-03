import type { RequestEvent } from "@sveltejs/kit";
import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const facts = [`Cozemble is an open source low code platform to make it easy, cheap and fast to build bespoke software for business management.`]
const text = facts.join(' ')
export const actions = {
  chat: async (event:RequestEvent) => {
    if(process.env.OPEN_AI_API_KEY) {
      console.log("OpenAI API key is set");
    } else {
      console.log("OpenAI API key is NOT set");
    }
    const data = await event.request.formData()
    const question = data.get('question')
    const prompt = `${text} ${question}?`
    console.log({prompt})
    const response = await openai.createCompletion({prompt, model:"davinci", max_tokens:100})
    const openAiData = await response.data
    console.log({openAiData:JSON.stringify(openAiData, null, 2)})
    return {message: openAiData.choices[0].text, timestamp: Date.now()}
  }
};