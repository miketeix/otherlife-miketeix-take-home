import { ImagePromptRequest, ImagePromptResponse } from '@/utils/service';
import { NextRequest } from 'next/server';
import { put } from '@vercel/blob';
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

export const runtime = 'edge'; 
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

  const imageId = nanoid();
  const buffer = Buffer.from(b64_json || '', 'base64');
  const { url: imgUrl } = await put(`${imageId}.png`, buffer, { access: 'public' });
  
  const response: ImagePromptResponse = {
    imgUrl
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
