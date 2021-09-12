import { APIService } from './APIService';
import { AuthService } from './auth-service/AuthService';
import { CoursesSerivce } from './courses-service/CoursesSerivce';
import { FacultiesService } from './faculties-service/FacultiesService';
import { GroupsService } from './groups-service/GroupsService';
import { StudentsService } from './students-service/StudentsService';
import { TeachersService } from './teachers-service/TeachersService';
import { TimetableDayService } from './timetable-day-service/TimetableDayService';

const authService = new AuthService();
const facultiesService = new FacultiesService();
const groupsService = new GroupsService();
const studentsService = new StudentsService();
const teachersService = new TeachersService();
const coursesService = new CoursesSerivce();
const timetableDayService = new TimetableDayService();

export const api = new APIService(
  authService,
  facultiesService,
  groupsService,
  studentsService,
  teachersService,
  coursesService,
  timetableDayService,
);
