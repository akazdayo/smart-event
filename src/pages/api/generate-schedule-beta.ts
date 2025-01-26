export const prerender = false;

import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const eventData = await request.json();
    try {
        const prompt = `
            以下のイベントのスケジュールを準備期間のタスクから、終了後の片付けまでとても細かくタスクを作成してください。また、タスク量に制限はありません。書けるだけ書いてください。出力はMermaidコードのみにしてください。タスクには全て名前をつけてください。出力は全て日本語で行うこと：
            タイトル: ${eventData.title}
            説明: ${eventData.description}
            準備開始日: ${eventData.startDate}
            イベント開催開始日: ${eventData.eventStartDate}
            イベント開催終了日: ${eventData.eventEndDate}
            全体終了日: ${eventData.endDate}
            イベント参加者数: ${eventData.participants}人

            以下の形式でMermaid Ganttチャートのコードを生成してください：
            gantt
                title イベントスケジュール
                dateFormat YYYY-MM-DD
                section セクション名
                予定 : 開始日, 終了日
            ...
        `;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${import.meta.env.GEMINI_API_KEY}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "contents": [
                        {
                            "role": "user",
                            "parts": [
                                {
                                    "text": prompt,
                                },
                            ],
                        },
                    ],
                    "generationConfig": {
                        "temperature": 0.7,
                        "topK": 64,
                        "topP": 0.95,
                        "maxOutputTokens": 65536,
                        "responseMimeType": "text/plain",
                    },
                }),
            },
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const schedule = data.candidates[0].content.parts[0].text;

        return new Response(JSON.stringify({ schedule }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
};
