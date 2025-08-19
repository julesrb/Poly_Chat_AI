import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const { messages } = await req.json();
  console.log("Request:", messages);

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
  });

  return NextResponse.json({
    reply: response.choices[0].message,
  });
}
