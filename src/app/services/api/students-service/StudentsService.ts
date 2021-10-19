import { RestService } from '../rest-serive/RestService';
import { IStudentsService } from './IStudentsService';
import Pubnub from 'pubnub';
import { validateCardData } from '../../../common/utils/validateCardData';
import { baseCardHandler } from '../../../common/utils/baseCardDataHandler';
import { Subject } from 'rxjs';
import { IStudent } from 'models/interfaces/IStudent';

export class StudentsService extends RestService<IStudent> implements IStudentsService {
  private _students: IStudent[] = [];
  private _search: string = '';

  constructor() {
    super();
  }

  public async getStudents(studentId: string): Promise<void> {
    const result: IStudent[] = await this.get(`students/${studentId}`);
    this._students = result;
    this.searchHandler(this._students);
  }

  public async getStudentById(studentId: string): Promise<IStudent> {
    return this.get(`student/${studentId}`);
  }

  public async getStudentByIdFullData(studentId: string): Promise<IStudent> {
    return this.get(`student/full/${studentId}`);
  }

  public async createStudent(value: IStudent): Promise<void> {
    this.validateStudent(value);

    const result: IStudent = await this.post('students', value);
    this.studentHandler(result);
  }

  public async deleteStudent(studentId: string): Promise<void> {
    const result: IStudent = await this.delete(`students/${studentId}`);
    this.studentHandler(result);
  }

  public async updateStudent(value: IStudent): Promise<void> {
    const result: IStudent = await this.patch('students', value);
    this.studentHandler(result);
  }

  public async updateStudentPassword(value: IStudent): Promise<void> {
    const result: IStudent = await this.patch('students/password', value);
    this.studentHandler(result);
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
    this.searchHandler(this._students);
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: IStudent = data.message;

    if (!value) {
      return;
    }

    this.studentHandler(value);
  }

  private studentHandler(value: IStudent): void {
    const updatedData = baseCardHandler(value, this._students) as IStudent[];
    if (!updatedData?.length || !updatedData) {
      return;
    }

    if (this._search.length) {
      this.searchHandler(updatedData);
    } else {
      this.next(updatedData);
    }

    this._students = updatedData;
  }

  private searchHandler(value: IStudent[]): void {
    const filtredData = value.filter(
      (item) =>
        item.name.toLowerCase().includes(this._search.toLowerCase()) ||
        item.lastName?.toLowerCase().includes(this._search.toLowerCase()) ||
        item.firstName?.toLowerCase().includes(this._search.toLowerCase()),
    );
    this.next(filtredData);
  }

  private validateStudent(student: IStudent): void {
    validateCardData(student, this._students);

    if (!student?.groupId) {
      throw 'GroupId id empty!';
    }
  }

  public get students(): Subject<IStudent[]> {
    return this.subject as Subject<IStudent[]>;
  }
}
