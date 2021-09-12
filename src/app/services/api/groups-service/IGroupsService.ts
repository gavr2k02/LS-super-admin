import { IGroup } from 'models/interfaces/IGroup';
import { Subject } from 'rxjs';

export interface IGroupsService {
  groups: Subject<IGroup[]>;
  setSearch(value: string): void;
  getGroups(facultyId: string): Promise<void>;
  getGroupById(groupId: string): Promise<IGroup>;
  getGroupByIdFullData(groupId: string): Promise<IGroup>;
  createGroup(group: IGroup): Promise<void>;
  deleteGroup(groupId: string): Promise<void>;
  updateGroup(group: IGroup): Promise<void>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
