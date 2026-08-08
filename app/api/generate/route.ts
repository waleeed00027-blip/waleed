import OpenAI from 'openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) return NextResponse.json({ error: 'Prompt is required.' }, { status: 400 });
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const response = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are an expert performance advertising creative director. Create practical UGC ad concepts. Give 3 concepts, each with a hook, 20-30 second script, shot list, CTA, and platform suggestion. Keep claims honest and compliant.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.8
    });
    return NextResponse.json({ text: response.choices[0]?.message?.content || '' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'AI generation failed. Check OPENAI_API_KEY and server logs.' }, { status: 500 });
  }
}
