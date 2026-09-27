import { getWeekDay } from '@/utils/date';
import { useRef } from 'react';

type DateSelectorProps = {
  selectedDate: string;
  onDateChange: (date: string) => void;
};
export default function DateSelector({
  selectedDate,
  onDateChange,
}: DateSelectorProps) {
  const dateInput = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <input
        id="date-input"
        className="absolute inset-0 opacity-0 pointer-events-none"
        ref={dateInput}
        type="date"
        value={selectedDate}
        onChange={(e) => {
          onDateChange(e.target.value);
        }}
      />
      <div
        className="mb-5 text-center text-sm font-semibold text-ink-soft"
        onClick={() => {
          dateInput.current?.showPicker();
        }}
      >
        {selectedDate}・{getWeekDay(selectedDate)}
      </div>
    </div>
  );
}
