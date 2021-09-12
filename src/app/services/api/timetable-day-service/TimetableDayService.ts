import { RestService } from '../rest-serive/RestService';
import { ITimetableDayService } from './ITimetableDayService';
import Pubnub from 'pubnub';
import { baseCardHandler } from '../../../common/utils/baseCardDataHandler';
import { Subject } from 'rxjs';
import { IDayLesson } from 'models/interfaces/IDayLesson';
import { toDateString } from '../../../common/utils';

export class TimetableDayService extends RestService<IDayLesson> implements ITimetableDayService {
  private _dayLessons: IDayLesson[] = [];

  constructor() {
    super();
  }

  public async getTimetablesDayByDay(facultyId: string, date: Date): Promise<void> {
    const dateString = toDateString(date);
    const result: IDayLesson[] = await this.get(`timetable/${facultyId}/day/${dateString}`);
    this.next(result);
    this._dayLessons = result || [];
  }

  public async getTimetableDayById(timetableDayId: string): Promise<IDayLesson> {
    return this.get(`timetable/day/${timetableDayId}`);
  }

  public async saveTimetableDay(value: IDayLesson): Promise<void> {
    this.valiadteData(value);
    const result: IDayLesson = await this.post(`timetable/day`, value);
    this.timetableDayHandler(result);
  }

  public async deleteTimetableDay(timetableDayId: string): Promise<void> {
    const result: IDayLesson = await this.delete(`timetable/day/${timetableDayId}`);
    this.timetableDayHandler(result);
  }

  public subscribe(channel: string): void {
    this.pubnub.subscribe({ channels: [channel] });
    this.pubnub.addListener({
      message: this.pubnunHandler.bind(this),
    });
  }

  public unsubscribe(channel: string): void {
    this.pubnub.unsubscribe({ channels: [channel] });
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: IDayLesson = data.message;

    if (!value) {
      return;
    }

    this.timetableDayHandler(value);
  }

  private timetableDayHandler(value: IDayLesson): void {
    const updatedData = baseCardHandler(value, this._dayLessons) as IDayLesson[];
    if (!updatedData?.length || !updatedData) {
      return;
    }

    this.next(updatedData);

    this._dayLessons = updatedData;
  }

  public get dayLessons(): Subject<IDayLesson[]> {
    return this.subject as Subject<IDayLesson[]>;
  }

  private valiadteData(value: IDayLesson): void {
    for (const item of value.lessons) {
      if (item?.courseId?.length && !item?.teacherId?.length) {
        throw 'Please, chose teacher!';
      }
    }
  }
}
