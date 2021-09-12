import { RestService } from '../rest-serive/RestService';
import { ICoursesService } from './ICoursesService';
import Pubnub from 'pubnub';
import { validateCardData } from '../../../common/utils/validateCardData';
import { baseCardHandler } from '../../../common/utils/baseCardDataHandler';
import { Subject } from 'rxjs';
import { ICourse } from 'models/interfaces/ICourse';

export class CoursesSerivce extends RestService<ICourse> implements ICoursesService {
  private _courses: ICourse[] = [];
  private _search: string = '';

  constructor() {
    super();
  }

  public async getCourses(): Promise<void> {
    const result: ICourse[] = await this.get('courses');
    this._courses = result || [];
    this.searchHandler(this._courses);
  }

  public async getCourseById(courseId: string): Promise<ICourse> {
    return this.get(`course/${courseId}`);
  }

  public async createCourse(value: ICourse): Promise<void> {
    validateCardData(value, this._courses);

    const result: ICourse = await this.post('courses', value);
    this.courseHandler(result);
  }

  public async deleteCourse(courseId: string): Promise<void> {
    const result: ICourse = await this.delete(`courses/${courseId}`);
    this.courseHandler(result);
  }

  public async updateCourse(value: ICourse): Promise<void> {
    validateCardData(value, this._courses);

    const result: ICourse = await this.patch('courses', value);
    this.courseHandler(result);
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

  public setSearch(value: string): void {
    this._search = value;
    this.searchHandler(this._courses);
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: ICourse = data.message;

    if (!value) {
      return;
    }

    this.courseHandler(value);
  }

  private courseHandler(value: ICourse): void {
    const updatedData = baseCardHandler(value, this._courses) as ICourse[];
    if (!updatedData?.length || !updatedData) {
      return;
    }
    if (this._search.length) {
      this.searchHandler(updatedData);
    } else {
      this.next(updatedData);
    }
    this._courses = updatedData;
  }

  private searchHandler(value: ICourse[]): void {
    const filtredData = value.filter((item) => item.name.includes(this._search));
    this.next(filtredData);
  }

  public get courses(): Subject<ICourse[]> {
    return this.subject as Subject<ICourse[]>;
  }
}
