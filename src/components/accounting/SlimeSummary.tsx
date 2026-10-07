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
    <div className="flex h-115 flex-col rounded-[20px] bg-panel p-5 shadow-out">
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

      <div className="min-h-0 flex-1 overflow-y-auto">
        {currentTab === 'records' && (
          <PeriodSpendingList records={slimeSummary.records} />
        )}

        {currentTab === 'stats' && <SlimeStatsStatistics {...slimeSummary} />}
      </div>
    </div>
  ) : (
    <div className="flex h-115 flex-col items-center justify-center rounded-[20px] bg-panel p-5 text-center shadow-out">
      <div className="mb-2 text-2xl">🥚</div>
      <div className="mb-1 text-[13px] font-bold text-ink">
        還沒有培育中的史萊姆
      </div>
      <div className="text-xs text-ink-soft">點擊左邊的史萊姆開始培育</div>
    </div>
  );
}
