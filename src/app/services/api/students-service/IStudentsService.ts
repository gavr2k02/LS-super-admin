import { IStudent } from 'models/interfaces/IStudent';
import { Subject } from 'rxjs';

export interface IStudentsService {
  students: Subject<IStudent[]>;
  setSearch(value: string): void;
  getStudents(groupId: string): Promise<void>;
  getStudentById(studentId: string): Promise<IStudent>;
  getStudentByIdFullData(studentId: string): Promise<IStudent>;
  createStudent(value: IStudent): Promise<void>;
  deleteStudent(studentId: string): Promise<void>;
  updateStudent(value: IStudent): Promise<void>;
  updateStudentPassword(value: IStudent): Promise<void>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
