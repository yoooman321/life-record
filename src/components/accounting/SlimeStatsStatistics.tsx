import type { SlimeStatName } from '@/type/slime';
import { getFormattedDate } from '@/utils/date';
import { slimeStatNameMapping } from '@/const/slime';
import { useSlimeStat } from '@/hooks';

type SlimeStatsStatisticsProps = {
  stats: Record<SlimeStatName, number>;
  endedAt: string;
  startedAt: string;
};

type AbilityDisplay = { label: string; value: number; color: string };

const abilityOrder: SlimeStatName[] = ['str', 'dex', 'luk', 'int', 'power'];
export default function SlimeStatsStatistics({
  stats,
  endedAt,
  startedAt,
}: SlimeStatsStatisticsProps) {
  const { data: slimeStat } = useSlimeStat();
  const displayedAbilities = slimeStat?.reduce<
    Partial<Record<SlimeStatName, AbilityDisplay>>
  >((acc, cur) => {
    return {
      ...acc,
      [cur.name]: {
        label: slimeStatNameMapping[cur.name],
        value: stats[cur.name],
        color: cur.color,
      },
    };
  }, {});

  const totalValue = abilityOrder.reduce(
    (sum, name) => sum + (stats[name] ?? 0),
    0,
  );

  return (
    <>
      <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-accent-body/12 px-2.5 py-1.5 text-xs font-bold text-accent-body">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-body" />
        培育中
      </div>
      <div className="mb-4 text-xs text-ink-soft">
        記帳區間：
        {getFormattedDate({ date: new Date(startedAt), separate: '/' })} －
        {getFormattedDate({ date: new Date(endedAt), separate: '/' })}
      </div>

      {abilityOrder.map((ability) => {
        if (displayedAbilities && !displayedAbilities[ability]) {
          return null;
        }
        return (
          <div key={ability} className="mb-3 flex items-center gap-2.5 text-xs">
            <span className="w-14 shrink-0 font-bold">
              {displayedAbilities?.[ability]?.label}
            </span>
            <div className="h-1.75 flex-1 overflow-hidden rounded-lg shadow-in">
              <div
                className="h-full rounded-lg"
                style={{
                  background: displayedAbilities?.[ability]?.color,
                  width:
                    totalValue === 0
                      ? '0%'
                      : `${((displayedAbilities?.[ability]?.value ?? 0) / totalValue) * 100}%`,
                }}
              />
            </div>
            <span className="w-6 shrink-0 text-right font-extrabold">
              {displayedAbilities?.[ability]?.value}
            </span>
          </div>
        );
      })}

      <div className="mt-3.5 flex items-center justify-between border-t border-line pt-3.5 text-[13px] font-extrabold text-accent-money">
        <span>🪙 鈔能力</span>
        <span>${stats.cash}</span>
      </div>
    </>
  );
}
