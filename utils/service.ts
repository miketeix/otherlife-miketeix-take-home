export interface HashRequest {
  hashInput: string;
}

export interface HashResponse {
  hash: string;
}

export interface ImagePromptRequest {
  prompt: string;
}

export interface ImagePromptResponse {
  imgUrl: string;
}
