import { IBaseCard } from 'models/interfaces/IBaseCard';

export const defaultCard: IBaseCard = {
  name: '',
  color: '#0000ff',
};

const START_TIME_LESSONS = new Date(0, 0, 0, 9);
export const TIME_LESSON = 45;
const TIME_TURN = 15;

export const NUM_LESSONS_IN_DAY = [...Array(6).keys()].map((x) => x);
export const TIMES_LESSONS_START = NUM_LESSONS_IN_DAY.map((item) => {
  const date = new Date(START_TIME_LESSONS);
  date.setMinutes((TIME_LESSON + TIME_TURN) * item);
  return date;
});

export const TIMES_LESSONS_END = NUM_LESSONS_IN_DAY.map((item) => {
  const date = new Date(START_TIME_LESSONS);
  date.setMinutes((TIME_LESSON + TIME_TURN) * item + TIME_LESSON);
  return date;
});
