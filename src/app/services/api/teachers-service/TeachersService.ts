import { ITeacher } from 'models/interfaces/ITeacher';
import { RestService } from '../rest-serive/RestService';
import { ITeachersService } from './ITeachersService';
import Pubnub from 'pubnub';
import { validateCardData } from '../../../common/utils/validateCardData';
import { baseCardHandler } from '../../../common/utils/baseCardDataHandler';
import { Subject } from 'rxjs';

export class TeachersService extends RestService<ITeacher> implements ITeachersService {
  private _teachers: ITeacher[] = [];
  private _search: string = '';

  constructor() {
    super();
  }

  public async getTeachers(): Promise<void> {
    const result: ITeacher[] = await this.get('teachers');
    this._teachers = result || [];
    this.searchHandler(this._teachers);
  }

  public async getTeacherById(teacherId: string): Promise<ITeacher> {
    return this.get(`teacher/${teacherId}`);
  }

  public async createTeacher(value: ITeacher): Promise<void> {
    validateCardData(value, this._teachers);

    const result: ITeacher = await this.post('teachers', value);
    this.teacherHandler(result);
  }

  public async deleteTeacher(teacherId: string): Promise<void> {
    const result: ITeacher = await this.delete(`teachers/${teacherId}`);
    this.teacherHandler(result);
  }

  public async updateTeacher(value: ITeacher): Promise<void> {
    validateCardData(value, this._teachers);

    const result: ITeacher = await this.patch('teachers', value);
    this.teacherHandler(result);
  }

  public async updateTeacherPassword(value: ITeacher): Promise<void> {
    validateCardData(value, this._teachers);

    const result: ITeacher = await this.patch('teachers/password', value);
    this.teacherHandler(result);
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
    this.searchHandler(this._teachers);
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: ITeacher = data.message;

    if (!value) {
      return;
    }

    this.teacherHandler(value);
  }

  private teacherHandler(value: ITeacher): void {
    const updatedData = baseCardHandler(value, this._teachers) as ITeacher[];
    if (!updatedData?.length || !updatedData) {
      return;
    }
    if (this._search.length) {
      this.searchHandler(updatedData);
    } else {
      this.next(updatedData);
    }
    this._teachers = updatedData;
  }

  private searchHandler(value: ITeacher[]): void {
    const filtredData = value.filter(
      (item) =>
        item.name.toLowerCase().includes(this._search.toLowerCase()) ||
        item.lastName?.toLowerCase().includes(this._search.toLowerCase()) ||
        item.firstName?.toLowerCase().includes(this._search.toLowerCase()),
    );
    this.next(filtredData);
  }

  public get teachers(): Subject<ITeacher[]> {
    return this.subject as Subject<ITeacher[]>;
  }
}
