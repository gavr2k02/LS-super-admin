import { Subject } from 'rxjs';
import { ITeacher } from 'models/interfaces/ITeacher';

export interface ITeachersService {
  teachers: Subject<ITeacher[]>;
  setSearch(value: string): void;
  getTeachers(): Promise<void>;
  getTeacherById(teacherId: string): Promise<ITeacher>;
  createTeacher(value: ITeacher): Promise<void>;
  deleteTeacher(teacherId: string): Promise<void>;
  updateTeacher(teacher: ITeacher): Promise<void>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
