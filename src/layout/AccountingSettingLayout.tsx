import { Outlet, useMatches } from 'react-router';

type SettingsHandle = { title: string; subtitle: string };

export default function AccountingSettingLayout() {
  const matches = useMatches();
  const { title, subtitle } =
    (matches.at(-1)?.handle as SettingsHandle | undefined) ?? {};
  return (
    <div className="flex-1">
      <div className="mb-6.5">
        <h1 className="mb-1 text-[26px]">{title}</h1>
        <p className="text-sm text-ink-soft">{subtitle}</p>
      </div>

      <div className="rounded-[20px] border-2 border-line bg-panel p-5.5">
        <div className=" [view-transition-name:settings-outlet]">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
