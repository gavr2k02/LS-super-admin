import { IFaculty } from 'models/interfaces/IFaculty';
import { IGroup } from 'models/interfaces/IGroup';
import { useEffect, useState } from 'preact/hooks';
import { useParams } from 'react-router';
import Swal from 'sweetalert2';
import { useObservable } from '../../common/utils/useObservable';
import { api } from '../../services/api';
import style from './style.module.scss';
import Loading from '../loading';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import HeaderBaseCard from '../../components/header-base-card';
import { ICourse } from 'models/interfaces/ICourse';
import { ITeacher } from 'models/interfaces/ITeacher';
import GroupTimeTableEditForm from '../../components/group-timetable-edit-form';
import { IDayLesson } from 'models/interfaces/IDayLesson';

interface IDateGroupParams {
  year: string;
  month: string;
  day: string;
  facultyId: string;
}

export default function TimetableGroups() {
  const { year, month, day, facultyId } = useParams<IDateGroupParams>();
  const dateString = `${year}-${month}-${day}`;
  const date = new Date(Number.parseInt(year), Number.parseInt(month), Number.parseInt(day));
  const [faculty, setFaculty] = useState<IFaculty>();
  const [loading, setLoading] = useState(true);

  const groups: IGroup[] = useObservable(api.groupsService.groups);
  const courses: ICourse[] = useObservable(api.coursesService.courses);
  const teachers: ITeacher[] = useObservable(api.teachersService.teachers);
  const timetablesDay: IDayLesson[] = useObservable(api.timetableDayService.dayLessons);

  useEffect(() => {
    getData();
    api.groupsService.subscribe(`${api.authService.cid}-groups-${facultyId}`);
    api.teachersService.subscribe(`${api.authService.cid}-teachers`);
    api.coursesService.subscribe(`${api.authService.cid}-courses`);
    api.timetableDayService.subscribe(`${api.authService.cid}-${dateString}-lessons-${facultyId}`);
    return () => {
      api.groupsService.unsubscribe(`${api.authService.cid}-groups-${facultyId}`);
      api.teachersService.unsubscribe(`${api.authService.cid}-teachers`);
      api.coursesService.unsubscribe(`${api.authService.cid}-courses`);
      api.timetableDayService.unsubscribe(`${api.authService.cid}-${dateString}}-lessons-${facultyId}`);
    };
  }, []);

  const getData = async () => {
    try {
      const [result] = await Promise.all([
        api.facultiesService.getFacultyById(facultyId),
        api.groupsService.getGroups(facultyId),
        api.coursesService.getCourses(),
        api.teachersService.getTeachers(),
        api.timetableDayService.getTimetablesDayByDay(facultyId, date),
      ]);
      setFaculty(result);
    } catch (e) {
      Swal.fire('Error', 'Opps... Sometime went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div class={style.main}>
        <div class={style.header}>
          <div class={style.text}>Timetable Groups</div>
          {date.toDateString()}
          {faculty && (
            <HeaderBaseCard
              value={faculty}
              type={CardTypePopup.FACULTY}
              date={year && new Date(Number.parseInt(year), Number.parseInt(month), Number.parseInt(day))}
            />
          )}
        </div>
        <div class={style.cardsContainer}>
          {groups?.map((item) => (
            <div className={style.block}>
              <GroupTimeTableEditForm
                courses={courses}
                teachers={teachers}
                group={item}
                setLoad={setLoading}
                facultyId={facultyId}
                day={dateString}
                currentDayLesson={timetablesDay?.find((lessons) => item.id === lessons?.groupId)}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
