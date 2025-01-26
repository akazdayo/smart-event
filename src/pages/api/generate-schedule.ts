export const prerender = false;

import type { APIRoute } from 'astro';
import { GoogleGenerativeAI } from '@google/generative-ai';

export const POST: APIRoute = async ({ request }) => {
  try {
    const eventData = await request.json();
    
    // Initialize Gemini
    const genAI = new GoogleGenerativeAI(import.meta.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Generate schedule prompt
    const prompt = `
      以下のイベントのスケジュールを準備期間のタスクから、終了後の片付けまでとても細かくタスクを作成してください。また、タスク量に制限はありません。書けるだけ書いてください。出力はMermaidコードのみにしてください。タスクには全て名前をつけてください。：
      タイトル: ${eventData.title}
      説明: ${eventData.description}
      準備開始日: ${eventData.startDate}
      イベント開催開始日: ${eventData.eventStartDate}
      イベント開催終了日: ${eventData.eventEndDate}
      全体終了日: ${eventData.endDate}
      参加者数: ${eventData.participants}人

      以下の形式でMermaid Ganttチャートのコードを生成してください：
      gantt
        title イベントスケジュール
        dateFormat YYYY-MM-DD
        section セクション名
          予定 : 開始日, 終了日
        ...
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const schedule = response.text();

    return new Response(JSON.stringify({ schedule }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};