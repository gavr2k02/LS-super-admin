import style from './style.module.scss';
import { Link } from 'react-router-dom';

interface ICalendarProps {
  superDate: Date;
}

const NUM_LINE = 6;
const DAY_IN_WEEK = 7;

export default function Calendar({ superDate }: ICalendarProps) {
  const weekday = new Date(superDate.getFullYear(), superDate.getMonth(), 1).getDay();
  let date = new Date(superDate.getFullYear(), superDate.getMonth(), getDayOnWeek(weekday));

  const linesDates: Array<Array<Date>> = [];

  for (let i = 0; i < NUM_LINE; i++) {
    const dates: Date[] = [];
    for (let i = 0; i < DAY_IN_WEEK; i++) {
      dates.push(date);
      date = addDays(date, 1);
    }
    linesDates.push(dates);
  }

  return (
    <table class={style.main}>
      <tr>
        <th class={style.lineHead}>Mon</th>
        <th class={style.lineHead}>Tue</th>
        <th class={style.lineHead}>Wed</th>
        <th class={style.lineHead}>Thu</th>
        <th class={style.lineHead}>Fri</th>
        <th class={style.lineHead}>Sat</th>
        <th class={style.lineHead}>Sun</th>
      </tr>
      {linesDates.map((item) => (
        <tr>
          {item.map((day) => (
            <td class={`${style.line} ${day.getDay() !== 0 && day.getDay() !== 6 && style.output}`}>
              <Link
                className={style.link}
                to={`/timetable/${day.getFullYear()}/${day.getMonth()}/${day.getDate()}/faculties`}
              >
                {day.getDate() === new Date().getDate() &&
                day.getMonth() === new Date().getMonth() &&
                day.getFullYear() === new Date().getFullYear() ? (
                  <div class={style.red}>{day.getDate().toString()}</div>
                ) : (
                  <div class={style.white} style={day.getMonth() !== superDate.getMonth() && { color: 'gray' }}>
                    {day.getDate().toString()}
                  </div>
                )}
              </Link>
            </td>
          ))}
        </tr>
      ))}
    </table>
  );
}

function addDays(date: Date, days: number): Date {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function getDayOnWeek(day: number) {
  switch (day) {
    case 1:
      return 1;
    case 2:
      return 0;
    case 3:
      return -1;
    case 4:
      return -2;
    case 5:
      return -3;
    case 6:
      return -4;
    case 0:
      return -5;
  }
}
