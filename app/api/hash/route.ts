import { replicateClient } from '@/utils/ReplicateClient';
import { HashRequest, HashResponse } from '@/utils/service';
var shajs = require('sha.js')
import { NextRequest } from 'next/server';
// import { Ratelimit } from '@upstash/ratelimit';
import { kv } from '@vercel/kv';
import { put } from '@vercel/blob';
import { nanoid } from '@/utils/utils';
import { Hash } from 'crypto';

/**
 * Validates a request object.
 *
 * @param {QrGenerateRequest} request - The request object to be validated.
 * @throws {Error} Error message if URL or prompt is missing.
 */

const validateRequest = (request: HashRequest) => {
  if (!request.hashInput) {
    throw new Error('Hash input is required');
  }
};


export async function POST(request: NextRequest) {
  const reqBody = (await request.json()) as HashRequest;
  try {
    validateRequest(reqBody);
  } catch (e) {
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 });
    }
  }

  const { hashInput } = reqBody;
  const hashedOutput = shajs('sha256').update(hashInput).digest('utf8');
  
  const response: HashResponse = {
    hash: hashedOutput
  };

  return new Response(JSON.stringify(response), {
    status: 200,
  });
}
