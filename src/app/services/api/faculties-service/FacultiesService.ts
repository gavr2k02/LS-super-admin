import { IFaculty } from 'models/interfaces/IFaculty';
import { RestService } from '../rest-serive/RestService';
import { IFacultiesService } from './IFacultiesService';
import Pubnub from 'pubnub';
import { validateCardData } from '../../../common/utils/validateCardData';
import { baseCardHandler } from '../../../common/utils/baseCardDataHandler';
import { Subject } from 'rxjs';

export class FacultiesService extends RestService<IFaculty> implements IFacultiesService {
  private _faculties: IFaculty[] = [];
  private _search: string = '';

  constructor() {
    super();
  }

  public async getFaculties(): Promise<void> {
    const faculties: IFaculty[] = await this.get('faculties');
    this._faculties = faculties;
    this.searchHandler(this._faculties);
  }

  public async getFacultyById(facultyId: string): Promise<IFaculty> {
    return this.get(`faculty/${facultyId}`);
  }

  public async createFaculty(faculty: IFaculty): Promise<void> {
    validateCardData(faculty, this._faculties);

    const result: IFaculty = await this.post('faculties', faculty);
    this.factultyHandler(result);
  }

  public async deleteFaculty(facultyId: string): Promise<void> {
    const result: IFaculty = await this.delete(`faculties/${facultyId}`);
    this.factultyHandler(result);
  }

  public async updateFaculty(faculty: IFaculty): Promise<void> {
    validateCardData(faculty, this._faculties);

    const result: IFaculty = await this.patch('faculties', faculty);
    this.factultyHandler(result);
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
    this.searchHandler(this._faculties);
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: IFaculty = data.message;

    if (!value) {
      return;
    }

    this.factultyHandler(value);
  }

  private factultyHandler(value: IFaculty): void {
    const updatedData = baseCardHandler(value, this._faculties) as IFaculty[];
    if (!updatedData?.length || !updatedData) {
      return;
    }
    if (this._search.length) {
      this.searchHandler(updatedData);
    } else {
      this.next(updatedData);
    }
    this._faculties = updatedData;
  }

  private searchHandler(value: IFaculty[]): void {
    const filtredData = value.filter((item) => item.name.toLowerCase().includes(this._search.toLowerCase()));
    this.next(filtredData);
  }

  public get faculties(): Subject<IFaculty[]> {
    return this.subject as Subject<IFaculty[]>;
  }
}
