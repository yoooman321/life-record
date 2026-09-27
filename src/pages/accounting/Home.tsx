// TODO：目前是靜態畫面。實際使用時要接：
// - 次導覽（史萊姆/戰鬥/商店/統計/設定）目前是純 UI，沒有用 NavLink 導頁，因為你 `/accounting` 底下
//   的巢狀路由結構還沒規劃好，等你決定好路由結構後再換成跟 RootLayout 一樣的 NavLink 寫法
// - 能力值／花費紀錄的頁籤切換 state
// - 領取寶藏按鈕目前是常駐顯示，實際上要接「自動戰鬥結束後才出現」的條件邏輯
// - 所有數值（金幣、預算、能力值、花費）目前都是假資料
// - 「新增記帳」按鈕目前沒有 onClick，實際上要接開關 state 去顯示 <AddEntryModal />

import BriefSummary from '@/components/accounting/BriefSummary';
import { useCategories, useIcons } from '@/hooks';
import { useState } from 'react';

const ABILITIES = [
  { name: '力量', value: 12, percent: 60, color: 'bg-accent-food' },
  { name: '敏捷', value: 8, percent: 40, color: 'bg-accent-exercise' },
  { name: '運氣', value: 5, percent: 25, color: 'bg-accent-diary' },
  { name: '智力', value: 15, percent: 75, color: 'bg-accent-money' },
  { name: '體力', value: 7, percent: 35, color: 'bg-accent-body' },
];

export default function AccountingHomePage() {
  return (
    <div className="flex-1">
      <BriefSummary />

      <div className="grid grid-cols-[1fr_340px] gap-6">
        {/* 史萊姆本體：先留空 */}
        <div className="flex min-h-115 flex-col items-center justify-center rounded-[24px] bg-panel p-8 shadow-out">
          <div className="flex h-60 w-60 flex-col items-center justify-center rounded-full border-[3px] border-dashed border-line text-center text-[13px] leading-relaxed text-ink-soft">
            史萊姆畫面
            <br />
            （開發中，先留空）
          </div>
          <div className="mt-5 text-center text-[13px] text-ink-soft">
            點擊可查看能力值與花費紀錄 → 詳見右側面板
          </div>
        </div>

        {/* 側邊面板 */}
        <div className="flex flex-col gap-5">
          <div className="rounded-[20px] bg-panel p-5 shadow-out">
            <div className="mb-3.5 flex items-center justify-between">
              <span className="text-[13px] font-extrabold text-ink-soft">
                能力值分配
              </span>
              <div className="flex gap-1">
                <button
                  type="button"
                  className="rounded-full bg-accent-body px-2.5 py-1.5 text-[11px] font-bold text-white"
                >
                  能力值
                </button>
                <button
                  type="button"
                  className="rounded-full bg-bg px-2.5 py-1.5 text-[11px] font-bold text-ink-soft"
                >
                  花費紀錄
                </button>
              </div>
            </div>

            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-body/12 px-2.5 py-1.5 text-xs font-bold text-accent-body">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-body" />
              培育中
            </div>
            <div className="mb-4 text-xs text-ink-soft">
              記帳區間：2026/09/17 － 2026/09/24
            </div>

            {ABILITIES.map((ability) => (
              <div
                key={ability.name}
                className="mb-3 flex items-center gap-2.5 text-xs"
              >
                <span className="w-14 shrink-0 font-bold">{ability.name}</span>
                <div className="h-1.75 flex-1 overflow-hidden rounded-lg shadow-in">
                  <div
                    className={`h-full rounded-lg ${ability.color}`}
                    style={{ width: `${ability.percent}%` }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right font-extrabold">
                  {ability.value}
                </span>
              </div>
            ))}

            <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3.5 text-[13px] font-extrabold text-accent-money">
              <span>🪙 鈔能力</span>
              <span>$3,200</span>
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
      </div>
    </div>
  );
}
