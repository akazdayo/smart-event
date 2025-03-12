export const prerender = false;

import type { APIRoute } from "astro";
import { ChatAnthropic } from "@langchain/anthropic";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";

// Initialize Claude
const model = new ChatAnthropic({
	model: "claude-3-7-sonnet-latest",
	maxTokens: 15000,
	apiKey: import.meta.env.ANTHROPIC_API_KEY,
});

// Generate schedule prompt
const prompt = ChatPromptTemplate.fromTemplate(`
以下のイベントのスケジュールを準備期間のタスクから、終了後の片付けまでとても細かくタスクを作成してください。また、タスク量に制限はありません。書けるだけ書いてください。出力はMermaidコードのみにしてください。タスクには全て名前をつけてください。出力は全て日本語で行うこと：
タイトル: {title}
説明: {description}
準備開始日: {startDate}
イベント開催開始日: {eventStartDate}
イベント開催終了日: {eventEndDate}
全体終了日: {endDate}
イベント参加者数: {participants}人

以下の形式でMermaid Ganttチャートのコードを生成してください：
gantt
  title イベントスケジュール
  dateFormat YYYY-MM-DD
  section セクション名
    予定 : 開始日, 終了日
  ...
`);
const chain = prompt.pipe(model).pipe(new StringOutputParser());

export const POST: APIRoute = async ({ request }) => {
	try {
		const eventData = await request.json();

		const result = await chain.invoke(eventData);

		return new Response(JSON.stringify({ result }), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error:", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};
