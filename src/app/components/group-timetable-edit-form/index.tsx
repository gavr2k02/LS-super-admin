import style from './style.module.scss';
import { useState } from 'preact/hooks';
import Swal from 'sweetalert2';
import { ITeacher } from 'models/interfaces/ITeacher';
import { ICourse } from 'models/interfaces/ICourse';
import { IGroup } from 'models/interfaces/IGroup';
import { IDayLesson } from 'models/interfaces/IDayLesson';
import { NUM_LESSONS_IN_DAY, TIMES_LESSONS_START, TIMES_LESSONS_END } from '../../common/constans/constans';
import { ILesson } from 'models/interfaces/ILesson';
import clone from 'just-clone';
import { api } from '../../services/api';

export interface IUserEditProps {
  teachers: ITeacher[];
  courses: ICourse[];
  group: IGroup;
  facultyId: string;
  day: string;
  setLoad: (value: boolean) => void;
  currentDayLesson: IDayLesson;
}

export default function GroupTimeTableEditForm({
  setLoad,
  teachers,
  courses,
  group,
  facultyId,
  day,
  currentDayLesson,
}: IUserEditProps) {
  const value = currentDayLesson || {
    facultyId,
    groupId: group.id,
    day: day,
    lessons: [...Array(NUM_LESSONS_IN_DAY.length).keys()].map((x) => {
      return {} as ILesson;
    }),
  };
  const [dayLesson, setDayLesson] = useState<IDayLesson>(value);

  const saveHandler = async () => {
    try {
      setLoad(true);
      await api.timetableDayService.saveTimetableDay(dayLesson);
    } catch (e) {
      Swal.fire('Error', 'Opps... Went wrong!', 'error');
    } finally {
      setLoad(false);
    }
  };

  const lessonHandler = (currentLesson: ILesson, element: Partial<ILesson>, id: number) => {
    const lesson: ILesson = { ...currentLesson, ...element };
    const currentLessons = clone(dayLesson.lessons);
    currentLessons.splice(id, 1, lesson);
    setDayLesson({ ...dayLesson, lessons: currentLessons });
  };

  return (
    <div class={style.baseForm}>
      <h2 class={style.header}>{group.name}</h2>
      <table class={style.table}>
        <tr>
          <th class={style.lineHead}>Time</th>
          <th class={style.lineHead}>Course</th>
          <th class={style.lineHead}>Teacher</th>
        </tr>
        {dayLesson.lessons.map((item, id) => (
          <tr>
            <td class={`${style.line} ${style.time}`}>{getTimeLesson(id)}</td>
            <td class={style.line}>
              <select
                class={`${style.field}`}
                value={item?.courseId || ''}
                onChange={(e) =>
                  lessonHandler(
                    item,
                    { startTime: getStartTime(id), courseId: (e.target as HTMLSelectElement).value, teacherId: '' },
                    id,
                  )
                }
              >
                {courses
                  ?.filter((course) => course?.facultyIds.includes(facultyId))
                  ?.map((course) => (
                    <option id={course.id} value={course.id}>
                      {course.name}
                    </option>
                  ))}
              </select>
            </td>
            <td class={style.line}>
              <select
                class={`${style.field}`}
                value={item?.teacherId || ''}
                onChange={(e) => lessonHandler(item, { teacherId: (e.target as HTMLSelectElement).value }, id)}
                disabled={!!!item?.courseId}
              >
                {teachers
                  ?.filter((teacher) => teacher?.courseIds?.includes(item?.courseId))
                  ?.map((teacher) => (
                    <option id={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </option>
                  ))}
              </select>
            </td>
          </tr>
        ))}
      </table>
      <button className={style.button} onClick={() => saveHandler()}>
        Save
      </button>
    </div>
  );
}

function getTimeLesson(id: number): string {
  return `${TIMES_LESSONS_START[id].getHours()}:${
    TIMES_LESSONS_START[id].getMinutes().toString().length === 1 ? '00' : TIMES_LESSONS_START[id].getMinutes()
  } - ${TIMES_LESSONS_END[id].getHours()}:${
    TIMES_LESSONS_END[id].getMinutes().toString().length === 1 ? '00' : TIMES_LESSONS_END[id].getMinutes()
  }`;
}

function getStartTime(id: number): string {
  return `${TIMES_LESSONS_START[id].getHours()}:${
    TIMES_LESSONS_START[id].getMinutes().toString().length === 1 ? '00' : TIMES_LESSONS_START[id].getMinutes()
  }`;
}
