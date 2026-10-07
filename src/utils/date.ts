type FormattedDateArgs = {
  date: Date;
  separate?: string;
};
export const getFormattedDate = ({
  date,
  separate = '-',
}: FormattedDateArgs): string => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const d = date.getDate();

  return `${year}${separate}${month.toString().padStart(2, '0')}${separate}${d.toString().padStart(2, '0')}`;
};

export const getWeekDay = (date: string, locale = 'zh-Hans-CN'): string => {
  const dateObj = new Date(date);
  const weekday = new Intl.DateTimeFormat(locale, { weekday: 'long' }).format(
    dateObj,
  );
  return weekday;
};
