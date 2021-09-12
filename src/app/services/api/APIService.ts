import { IAuthService } from './auth-service/IAuthService';
import { ICoursesService } from './courses-service/ICoursesService';
import { IFacultiesService } from './faculties-service/IFacultiesService';
import { IGroupsService } from './groups-service/IGroupsService';
import { IStudentsService } from './students-service/IStudentsService';
import { ITeachersService } from './teachers-service/ITeachersService';
import { ITimetableDayService } from './timetable-day-service/ITimetableDayService';

export class APIService {
  private readonly _authService: IAuthService;
  private readonly _facultiesService: IFacultiesService;
  private readonly _groupsService: IGroupsService;
  private readonly _studentsService: IStudentsService;
  private readonly _teachersService: ITeachersService;
  private readonly _coursesSerivce: ICoursesService;
  private readonly _timetableDayService: ITimetableDayService;

  constructor(
    authService: IAuthService,
    facultiesService: IFacultiesService,
    gropsService: IGroupsService,
    studentsService: IStudentsService,
    teachersService: ITeachersService,
    coursesService: ICoursesService,
    timetableDayService: ITimetableDayService,
  ) {
    this._authService = authService;
    this._facultiesService = facultiesService;
    this._groupsService = gropsService;
    this._studentsService = studentsService;
    this._teachersService = teachersService;
    this._coursesSerivce = coursesService;
    this._timetableDayService = timetableDayService;
  }

  public get authService(): IAuthService {
    return this._authService;
  }

  public get facultiesService(): IFacultiesService {
    return this._facultiesService;
  }

  public get groupsService(): IGroupsService {
    return this._groupsService;
  }

  public get studentsService(): IStudentsService {
    return this._studentsService;
  }

  public get teachersService(): ITeachersService {
    return this._teachersService;
  }

  public get coursesService(): ICoursesService {
    return this._coursesSerivce;
  }

  public get timetableDayService(): ITimetableDayService {
    return this._timetableDayService;
  }
}
