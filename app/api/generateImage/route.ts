import { ImagePromptRequest, ImagePromptResponse } from '@/utils/service';
import { NextRequest } from 'next/server';
import { put } from '@vercel/blob';
import { base64ToFile } from 'file64';
import { nanoid } from '@/utils/utils';

import OpenAI from 'openai';
const openai = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY']
});


const validateRequest = (request: ImagePromptRequest) => {
  if (!request.prompt) {
    throw new Error('Prompt input is required');
  }
};


export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as ImagePromptRequest;
  try {
    validateRequest(reqBody);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
  }

  const { prompt } = reqBody;

  const openAIresponse = await openai.images.generate({ model: "dall-e-3", prompt, response_format: "b64_json" });
  const [{ b64_json }] = openAIresponse.data; 

  // Todo: Extract blob from json (after decoding)

  const file = await base64ToFile(b64_json || '', 'file.txt');
  const imageId = nanoid();
  const { url: imgUrl } = await put(`${imageId}.png`, file, { access: 'public' });



  // store on blob
  
  const response: ImagePromptResponse = {
    imgUrl
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
