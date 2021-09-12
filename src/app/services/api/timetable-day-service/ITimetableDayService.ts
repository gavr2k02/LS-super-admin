import { IDayLesson } from 'models/interfaces/IDayLesson';
import { Subject } from 'rxjs';

export interface ITimetableDayService {
  dayLessons: Subject<IDayLesson[]>;
  getTimetablesDayByDay(facultyId: string, date: Date): Promise<void>;
  getTimetableDayById(timetableDayId: string): Promise<IDayLesson>;
  deleteTimetableDay(timetableDayId: string): Promise<void>;
  saveTimetableDay(value: IDayLesson): Promise<void>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
