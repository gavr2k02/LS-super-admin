import { IFaculty } from 'models/interfaces/IFaculty';
import { Subject } from 'rxjs';

export interface IFacultiesService {
  faculties: Subject<IFaculty[]>;
  setSearch(value: string): void;
  getFaculties(): Promise<void>;
  getFacultyById(facultyId: string): Promise<IFaculty>;
  createFaculty(faculty: IFaculty): Promise<void>;
  deleteFaculty(facultyId: string): Promise<void>;
  updateFaculty(faculty: IFaculty): Promise<void>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
