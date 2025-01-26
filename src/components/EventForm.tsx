import { createSignal } from 'solid-js';
import type { Component } from 'solid-js';
import mermaid from 'mermaid';

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
  theme: 'default',
  gantt: {
    titleTopMargin: 25,
    barHeight: 20,
    barGap: 4,
    topPadding: 50,
    leftPadding: 75,
    gridLineStartPadding: 35,
    fontSize: 11,
    numberSectionStyles: 4,
    axisFormat: '%Y-%m-%d',
  },
});

const EventForm: Component = () => {
  const [eventData, setEventData] = createSignal<EventData>({
    title: '',
    description: '',
    eventStartDate: '',
    eventEndDate: '',
    startDate: '',
    endDate: '',
    participants: 1,
    staff: 1,
  });

  const [isLoading, setIsLoading] = createSignal(false);
  const [useBeta, setUseBeta] = createSignal(true);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(useBeta() ? '/api/generate-schedule-beta' : '/api/generate-schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData())
      });
      const data = await response.json();

      let schedule = data.schedule;
      schedule = schedule.replace("```mermaid", "")
      schedule = schedule.replace("```", "");

      const scheduleContent = document.getElementById('schedule-content');
      if (scheduleContent) {
        mermaid.render('gantt-chart', schedule).then((result) => {
          scheduleContent.innerHTML = `
          <div class="mermaid bg-gray-50 p-4 rounded-lg overflow-x-auto">
            ${result.svg}
          </div>
        `;
        });
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} class="space-y-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">イベントタイトル</label>
        <input
          type="text"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={eventData().title}
          onChange={(e) => setEventData({ ...eventData(), title: e.currentTarget.value })}
        />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">説明</label>
        <textarea
          required
          rows={4}
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          value={eventData().description}
          onChange={(e) => setEventData({ ...eventData(), description: e.currentTarget.value })}
        />
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">イベント開催開始日</label>
          <input
            type="date"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={eventData().eventStartDate}
            onChange={(e) => setEventData({ ...eventData(), eventStartDate: e.currentTarget.value })}
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">イベント開催終了日</label>
          <input
            type="date"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={eventData().eventEndDate}
            onChange={(e) => setEventData({ ...eventData(), eventEndDate: e.currentTarget.value })}
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">準備開始日</label>
          <input
            type="date"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={eventData().startDate}
            onChange={(e) => setEventData({ ...eventData(), startDate: e.currentTarget.value })}
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">全体終了日</label>
          <input
            type="date"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={eventData().endDate}
            onChange={(e) => setEventData({ ...eventData(), endDate: e.currentTarget.value })}
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">参加者数</label>
          <input
            type="number"
            required
            min="1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={eventData().participants}
            onChange={(e) => setEventData({ ...eventData(), participants: parseInt(e.currentTarget.value) })}
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">スタッフ数</label>
          <input
            type="number"
            required
            min="1"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={eventData().staff}
            onChange={(e) => setEventData({ ...eventData(), staff: parseInt(e.currentTarget.value) })}
          />
        </div>
      </div>

      <div class="flex items-center">
        <input
          type="checkbox"
          id="useBeta"
          class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          onChange={(e) => setUseBeta(e.target.checked)}
        />
        <label for="useBeta" class="ml-2 block text-sm text-gray-900">
          ベータ版の生成エンジンを使用する
        </label>
      </div>

      <button
        type="submit"
        disabled={isLoading()}
        class="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading() ? 'スケジュール生成中...' : 'スケジュール生成'}
      </button>
    </form>
  );
};

export default EventForm;