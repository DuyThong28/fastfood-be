// src/modules/gemini/gemini.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenerativeAI } from '@google/generative-ai';

@Injectable()
export class GeminiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: any;

  constructor(private readonly configService: ConfigService) {
    const gemini_api_key = this.configService.get<string>('gemini_api_key_3');

    if (!gemini_api_key) {
      throw new Error('Gemini API key is not configured');
    }

    this.genAI = new GoogleGenerativeAI(gemini_api_key);
    this.model = this.genAI.getGenerativeModel({
      model: 'gemini-1.5-pro-latest',
      systemInstruction: 'You are a professional writer. Write a book summary.',
    });
  }

  async analyseComment(comment: string): Promise<string> {
    try {
      if (!comment) {
        throw new Error('Comment is required');
      }
      const prompt = `Analyze the following comment: "${comment}" and classify it as exactly one of the following categories: POSITIVE, NEGATIVE, or TOXIC.  
Respond with only the category name, without any additional explanation:`;
      const result = await this.model.generateContent([prompt]);
      const response = await result.response.text();
      return response;
    } catch (error) {
      console.error('Error analysing comment:', error);
      throw new Error(`Failed to analyse comment: ${error.message}`);
    }
  }
}
