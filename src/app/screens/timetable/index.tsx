import style from './style.module.scss';
import Calendar from '../../components/calendar';
import { useState } from 'preact/hooks';
import { MONTHS, YEARS } from '../../common/constans/date';

export default function Timetable() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const monthHandler = (value: string) => {
    const date = new Date(selectedDate);
    date.setMonth(Number.parseInt(value));
    setSelectedDate(date);
  };

  const yearHandler = (value: string) => {
    const date = new Date(selectedDate);
    date.setFullYear(Number.parseInt(value));
    setSelectedDate(date);
  };

  return (
    <div class={style.main}>
      <div class={style.header}>
        <div class={style.text}>Timetable</div>
        <div class={style.containerDate}>
          <select
            class={`${style.field} ${style.select}`}
            style={{ height: '10%' }}
            onChange={(e) => monthHandler((e.target as HTMLSelectElement).value)}
            value={selectedDate.getUTCMonth().toString()}
          >
            {MONTHS?.map((mounth) => (
              <option id={mounth.num.toString()} value={mounth.num.toString()}>
                {mounth.naame}
              </option>
            ))}
          </select>
          <select
            class={`${style.field} ${style.select}`}
            style={{ height: '10%' }}
            onChange={(e) => yearHandler((e.target as HTMLSelectElement).value)}
            value={selectedDate.getUTCFullYear().toString()}
          >
            {YEARS?.map((year) => (
              <option id={year.toString()} value={year.toString()}>
                {year.toString()}
              </option>
            ))}
          </select>
        </div>
      </div>
      <Calendar superDate={selectedDate} />
    </div>
  );
}
