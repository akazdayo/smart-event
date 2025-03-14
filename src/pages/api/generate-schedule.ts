export const prerender = false;

import type { APIRoute } from "astro";
import { ChatAnthropic } from "@langchain/anthropic";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { config } from "dotenv";

config();

// Initialize Claude
const model = new ChatAnthropic({
	model: "claude-3-7-sonnet-latest",
	maxTokens: 15000,
	apiKey: import.meta.env.ANTHROPIC_API_KEY,
});

// Generate schedule prompt
const prompt = ChatPromptTemplate.fromTemplate(`
以下のイベントのスケジュールを準備期間のタスクから、終了後の片付けまでとても細かくタスクを作成してください。
また、タスク量に制限はありません。書けるだけ書いてください。ですが、タスクを作成する際は以下の条件を守ること：
- タスクは全て時系列順に並べてください。
- 普通に考えたらわかる内容など、絶対にいらない内容は記述しないでください。
- タスクの名前は短く、わかりやすい名前にしてください。
出力はMermaidコードのみにしてください。
タスクには全て名前をつけてください。
出力は全て日本語で行うこと：
タイトル: {title}
説明: {description}
準備開始日: {startDate}
イベント開催開始日: {eventStartDate}
イベント開催終了日: {eventEndDate}
全体終了日: {endDate}
イベント参加者数: {participants}人

以下の形式でMermaid Ganttチャートのコードを生成してください 例：
gantt
    dateFormat  YYYY-MM-DD
    title       Adding GANTT diagram functionality to mermaid
    excludes    weekends
    %% (\`excludes\` accepts specific dates in YYYY-MM-DD format, days of the week ("sunday") or "weekends", but not the word "weekdays".)

    section A section
    Completed task            :done,    des1, 2014-01-06,2014-01-08
    Active task               :active,  des2, 2014-01-09, 3d
    Future task               :         des3, after des2, 5d
    Future task2              :         des4, after des3, 5d

    section Critical tasks
    Completed task in the critical line :crit, done, 2014-01-06,24h
    Implement parser and jison          :crit, done, after des1, 2d
    Create tests for parser             :crit, active, 3d
    Future task in critical line        :crit, 5d
    Create tests for renderer           :2d
    Add to mermaid                      :until isadded
    Functionality added                 :milestone, isadded, 2014-01-25, 0d

    section Documentation
    Describe gantt syntax               :active, a1, after des1, 3d
    Add gantt diagram to demo page      :after a1  , 20h
    Add another diagram to demo page    :doc1, after a1  , 48h

    section Last section
    Describe gantt syntax               :after doc1, 3d
    Add gantt diagram to demo page      :20h
    Add another diagram to demo page    :48h
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
