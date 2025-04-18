import { createSignal } from "solid-js";
import type { Component } from "solid-js";
import mermaid from "mermaid";

interface EventData {
	title: string;
	description: string;
	eventStartDate: string;
	eventEndDate: string;
	startDate: string;
	endDate: string;
	participants: number;
	staff: number;
}

mermaid.initialize({
	startOnLoad: true,
	theme: "default",
	gantt: {
		titleTopMargin: 25,
		barHeight: 20,
		barGap: 4,
		topPadding: 50,
		leftPadding: 75,
		gridLineStartPadding: 35,
		fontSize: 11,
		numberSectionStyles: 4,
		axisFormat: "%Y-%m-%d",
	},
});

const EventForm: Component = () => {
	const [eventData, setEventData] = createSignal<EventData>({
		title: "",
		description: "",
		eventStartDate: "",
		eventEndDate: "",
		startDate: "",
		endDate: "",
		participants: 1,
		staff: 1,
	});

	const [isLoading, setIsLoading] = createSignal(false);
	const [errorMessage, setErrorMessage] = createSignal<string | null>(null);

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		setIsLoading(true);
		setErrorMessage(null);

		try {
			const response = await fetch("/api/generate-schedule", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(eventData()),
			});

			if (!response.ok) {
				throw new Error(
					`サーバーエラー: ${response.status} ${response.statusText}`,
				);
			}

			const contentType = response.headers.get("content-type");
			if (!contentType || !contentType.includes("application/json")) {
				throw new Error("サーバーからの応答がJSON形式ではありません");
			}

			const text = await response.text();
			if (!text || text.trim() === "") {
				throw new Error("サーバーからの応答が空です");
			}

			const data = JSON.parse(text);

			let schedule = data.result;
			if (!schedule) {
				throw new Error("スケジュールデータが見つかりません");
			}

			schedule = schedule.replace(/```mermaid/g, "");
			schedule = schedule.replace(/```/g, "");

			const scheduleContent = document.getElementById("schedule-content");
			if (scheduleContent) {
				mermaid.render("gantt-chart", schedule).then((result) => {
					scheduleContent.innerHTML = `
          <div class="mermaid bg-gray-50 p-4 rounded-lg overflow-x-auto">
            ${result.svg}
          </div>
        `;
				});
			}
		} catch (error) {
			console.error("Error:", error);
			setErrorMessage(
				error instanceof Error
					? error.message
					: "スケジュール生成中にエラーが発生しました",
			);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} class="space-y-6">
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">
					イベントタイトル
				</label>
				<input
					type="text"
					required
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
					value={eventData().title}
					onChange={(e) =>
						setEventData({ ...eventData(), title: e.currentTarget.value })
					}
				/>
			</div>

			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1">説明</label>
				<textarea
					required
					rows={4}
					class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
					value={eventData().description}
					onChange={(e) =>
						setEventData({ ...eventData(), description: e.currentTarget.value })
					}
				/>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						イベント開催開始日
					</label>
					<input
						type="date"
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
						value={eventData().eventStartDate}
						onChange={(e) =>
							setEventData({
								...eventData(),
								eventStartDate: e.currentTarget.value,
							})
						}
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						イベント開催終了日
					</label>
					<input
						type="date"
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
						value={eventData().eventEndDate}
						onChange={(e) =>
							setEventData({
								...eventData(),
								eventEndDate: e.currentTarget.value,
							})
						}
					/>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						準備開始日
					</label>
					<input
						type="date"
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
						value={eventData().startDate}
						onChange={(e) =>
							setEventData({ ...eventData(), startDate: e.currentTarget.value })
						}
					/>
				</div>

				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						全体終了日
					</label>
					<input
						type="date"
						required
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
						value={eventData().endDate}
						onChange={(e) =>
							setEventData({ ...eventData(), endDate: e.currentTarget.value })
						}
					/>
				</div>
			</div>

			<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						参加者数
					</label>
					<input
						type="number"
						required
						min="1"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
						value={eventData().participants}
						onChange={(e) =>
							setEventData({
								...eventData(),
								participants: parseInt(e.currentTarget.value),
							})
						}
					/>
				</div>
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-1">
						スタッフ数
					</label>
					<input
						type="number"
						required
						min="1"
						class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
						value={eventData().staff}
						onChange={(e) =>
							setEventData({
								...eventData(),
								staff: parseInt(e.currentTarget.value),
							})
						}
					/>
				</div>
			</div>

			{errorMessage() && (
				<div
					class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<strong class="font-bold">エラー: </strong>
					<span class="block sm:inline">{errorMessage()}</span>
				</div>
			)}

			<button
				type="submit"
				disabled={isLoading()}
				class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
			>
				{isLoading() ? "スケジュール生成中..." : "スケジュール生成"}
			</button>
		</form>
	);
};

export default EventForm;
