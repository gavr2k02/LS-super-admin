import { RestService } from '../rest-serive/RestService';
import { IGroupsService } from './IGroupsService';
import Pubnub from 'pubnub';
import { IGroup } from 'models/interfaces/IGroup';
import { validateCardData } from '../../../common/utils/validateCardData';
import { baseCardHandler } from '../../../common/utils/baseCardDataHandler';
import { Subject } from 'rxjs';

export class GroupsService extends RestService<IGroup> implements IGroupsService {
  private _groups: IGroup[] = [];
  private _search: string = '';

  constructor() {
    super();
  }

  public async getGroups(facultyId: string): Promise<void> {
    const result: IGroup[] = await this.get(`groups/${facultyId}`);
    this._groups = result;
    this.searchHandler(this._groups);
  }

  public async getGroupById(groupId: string): Promise<IGroup> {
    return this.get(`group/${groupId}`);
  }

  public async getGroupByIdFullData(groupId: string): Promise<IGroup> {
    return this.get(`group/full/${groupId}`);
  }

  public async createGroup(group: IGroup): Promise<void> {
    this.validateGroup(group);

    const result: IGroup = await this.post('groups', group);
    this.groupHandler(result);
  }

  public async deleteGroup(groupId: string): Promise<void> {
    const result: IGroup = await this.delete(`groups/${groupId}`);
    this.groupHandler(result);
  }

  public async updateGroup(group: IGroup): Promise<void> {
    const result: IGroup = await this.patch('groups', group);
    this.groupHandler(result);
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
    this.searchHandler(this._groups);
  }

  private pubnunHandler(data: Pubnub.MessageEvent): void {
    const value: IGroup = data.message;

    if (!value) {
      return;
    }

    this.groupHandler(value);
  }

  private groupHandler(value: IGroup): void {
    const updatedData = baseCardHandler(value, this._groups) as IGroup[];
    if (!updatedData?.length || !updatedData) {
      return;
    }

    if (this._search.length) {
      this.searchHandler(updatedData);
    } else {
      this.next(updatedData);
    }
    this._groups = updatedData;
  }

  private validateGroup(group: IGroup): void {
    validateCardData(group, this._groups);

    if (!group?.facultyId) {
      throw 'Faculty id empty!';
    }
  }

  private searchHandler(value: IGroup[]): void {
    const filtredData = value.filter((item) => item.name.toLowerCase().includes(this._search.toLowerCase()));
    this.next(filtredData);
  }

  public get groups(): Subject<IGroup[]> {
    return this.subject as Subject<IGroup[]>;
  }
}
