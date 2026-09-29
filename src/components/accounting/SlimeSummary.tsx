import type { PeriodItem } from '@/type';
import { useState } from 'react';
import PeriodSpendingList from './PeriodSpendingList';
import SlimeStatsStatistics from './SlimeStatsStatistics';

interface SlimeSummaryProps {
  slimeSummary: PeriodItem | null | undefined;
}

type Tab = 'stats' | 'records';

const titleMapping = {
  stats: '能力值分配',
  records: '花費紀錄',
};

export default function SlimeSummary({ slimeSummary }: SlimeSummaryProps) {
  const [currentTab, setCurrentTab] = useState<Tab>('stats');

  return slimeSummary ? (
    <div className="flex flex-col gap-5">
      <div className="rounded-[20px] bg-panel p-5 shadow-out">
        <div className="mb-3.5 flex items-center justify-between">
          <span className="text-[13px] font-extrabold text-ink-soft">
            {titleMapping[currentTab]}
          </span>
          <div className="flex gap-1">
            <button
              onClick={() => {
                setCurrentTab('stats');
              }}
              type="button"
              className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold ${currentTab === 'stats' ? 'bg-accent-body text-white' : 'bg-bg text-ink-soft'}`}
            >
              能力值
            </button>
            <button
              onClick={() => {
                setCurrentTab('records');
              }}
              type="button"
              className={`rounded-full px-2.5 py-1.5 text-[11px] font-bold ${currentTab === 'records' ? 'bg-accent-body text-white' : 'bg-bg text-ink-soft'}`}
            >
              花費紀錄
            </button>
          </div>
        </div>

        <div className="h-70 overflow-y-auto">
          {currentTab === 'records' && (
            <PeriodSpendingList records={slimeSummary.records} />
          )}

          {currentTab === 'stats' && (
            <SlimeStatsStatistics {...slimeSummary} />
          )}
        </div>
      </div>

      <div className="rounded-[20px] bg-panel p-5 shadow-out">
        <div className="mb-2.5 flex items-baseline justify-between">
          <span className="text-[13px] font-bold text-ink-soft">
            本月總支出
          </span>
          <b className="text-lg">$18,420</b>
        </div>
        <div className="h-2.25 overflow-hidden rounded-lg shadow-in">
          <div
            className="h-full rounded-lg bg-linear-to-r from-accent-money to-[#e0aa6f]"
            style={{ width: '62%' }}
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="rounded-[20px] bg-panel p-5 py-10 text-center shadow-out">
      <div className="mb-2 text-2xl">🥚</div>
      <div className="mb-1 text-[13px] font-bold text-ink">
        還沒有培育中的史萊姆
      </div>
      <div className="text-xs text-ink-soft">點擊左邊的史萊姆開始培育</div>
    </div>
  );
}
