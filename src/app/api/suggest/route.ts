import { NextRequest, NextResponse } from "next/server";
import type { Suggestion } from "@/lib/types";

export async function POST(req: NextRequest) {
  const { value, minutes, energy } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "No API key" }, { status: 500 });
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are a values-based action coach. The user wants to live the value of "${value}". They have ${minutes} minutes available and ${energy} energy.

Suggest exactly 3 concrete, warm, immediately doable actions. Return ONLY a valid JSON array, no explanation or markdown:
[{"text":"...","minutes":N,"energy":"low|medium|high"},...]

Rules:
- Each action takes at most ${minutes} minutes (use realistic durations)
- Energy level is "${energy}" or lower
- Text is specific and encouraging, under 65 characters`,
        },
      ],
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: `API ${response.status}` }, { status: response.status });
  }

  const data = await response.json();
  const raw: string = data.content?.[0]?.text ?? "";
  const match = raw.match(/\[[\s\S]*\]/);
  if (!match) {
    return NextResponse.json({ error: "Invalid response" }, { status: 500 });
  }

  const suggestions: Suggestion[] = JSON.parse(match[0]);
  return NextResponse.json({ suggestions: suggestions.slice(0, 3) });
}
