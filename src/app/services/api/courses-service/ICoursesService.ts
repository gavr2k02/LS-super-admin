import { Subject } from 'rxjs';
import { ICourse } from 'models/interfaces/ICourse';

export interface ICoursesService {
  courses: Subject<ICourse[]>;
  setSearch(value: string): void;
  getCourses(): Promise<void>;
  getCourseById(courseId: string): Promise<ICourse>;
  createCourse(value: ICourse): Promise<void>;
  deleteCourse(courseId: string): Promise<void>;
  updateCourse(value: ICourse): Promise<void>;
  subscribe(channel: string): void;
  unsubscribe(channel: string): void;
}
