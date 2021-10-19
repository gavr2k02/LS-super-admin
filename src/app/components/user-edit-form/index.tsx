import style from './style.module.scss';
import { IStudent } from 'models/interfaces/IStudent';
import { useEffect, useState } from 'preact/hooks';
import { api } from '../../services/api';
import Swal from 'sweetalert2';
import { ITeacher } from 'models/interfaces/ITeacher';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { IFaculty } from 'models/interfaces/IFaculty';
import { IGroup } from 'models/interfaces/IGroup';
import { ICourse } from 'models/interfaces/ICourse';
import UpdateLoginDataUser from '../popups/update-login-data-user';

export interface IUserEditProps {
  value: IStudent | ITeacher;
  type: CardTypePopup;
  faculties: IFaculty[];
  groups?: IGroup[];
  courses?: ICourse[];
  setLoad: (value: boolean) => void;
  setData: (value: IStudent | ITeacher) => void;
}

export default function UserEditForm({ value, type, setLoad, faculties, groups, courses, setData }: IUserEditProps) {
  useEffect(() => {
    if (type === CardTypePopup.STUDENT) {
      const id = faculties?.find((item) => item.groupIds.includes((value as IStudent).groupId)).id;

      if (!id) {
        return;
      }

      getGroups(id);
      api.facultiesService.subscribe(`${api.authService.cid}-groups-${id}`);
      return () => {
        api.facultiesService.unsubscribe(`${api.authService.cid}-groups-${id}`);
      };
    }

    if (type === CardTypePopup.TEACHER) {
      getCourses();
      api.coursesService.subscribe(`${api.authService.cid}-courses`);
      return () => {
        api.coursesService.unsubscribe(`${api.authService.cid}-courses`);
      };
    }
  }, [faculties]);

  const getGroups = async (id: string) => {
    try {
      await api.groupsService.getGroups(id);
    } catch (e) {
      Swal.fire('Error', 'Opps... went wrong', 'error');
    } finally {
      setLoad(false);
    }
  };

  const getCourses = async () => {
    try {
      await api.coursesService.getCourses();
    } catch (e) {
      Swal.fire('Error', 'Opps... went wrong', 'error');
    } finally {
      setLoad(false);
    }
  };

  const editHandler = async () => {
    try {
      setLoad(true);
      switch (type) {
        case CardTypePopup.STUDENT: {
          await api.studentsService.updateStudent(value as IStudent);
          break;
        }
        case CardTypePopup.TEACHER: {
          await api.teachersService.updateTeacher(value as ITeacher);
          break;
        }
      }
    } catch (e) {
      Swal.fire('Error', 'Opps... Went wrong!', 'error');
    } finally {
      setLoad(false);
    }
  };

  return (
    <div class={style.baseForm}>
      <label class={style.label}>First Name:</label>
      <input
        class={style.field}
        type='text'
        value={value.firstName}
        onChange={(e) => setData({ ...value, firstName: (e.target as HTMLTextAreaElement).value })}
      />
      <label class={style.label}>Last name:</label>
      <input
        class={style.field}
        type='text'
        value={value.lastName}
        onChange={(e) => setData({ ...value, lastName: (e.target as HTMLTextAreaElement).value })}
      />

      <label class={style.label}>Faculty:</label>
      {type === CardTypePopup.TEACHER ? (
        <>
          <select
            class={`${style.field} ${style.select} ${style.multi}`}
            onChange={(e) =>
              setData({
                ...value,
                facultyIds: Array.from((e.target as HTMLSelectElement).selectedOptions, (option) => option.value),
              })
            }
            multiple
          >
            {faculties?.map((faculty) => (
              <option
                id={faculty.id}
                value={faculty.id}
                selected={(value as ITeacher).facultyIds?.includes(faculty.id)}
              >
                {faculty.name}
              </option>
            ))}
          </select>
          <label class={style.label}>Courses:</label>
          <select
            class={`${style.field} ${style.select} ${style.multi}`}
            onChange={(e) =>
              setData({
                ...value,
                courseIds: Array.from((e.target as HTMLSelectElement).selectedOptions, (option) => option.value),
              })
            }
            multiple
          >
            {courses
              ?.filter(
                (course) =>
                  course?.facultyIds.findIndex((item) => (value as ITeacher).facultyIds?.includes(item)) !== -1,
              )
              ?.map((course) => (
                <option id={course.id} value={course.id} selected={(value as ITeacher).courseIds?.includes(course.id)}>
                  {course.name}
                </option>
              ))}
          </select>
        </>
      ) : (
        <select
          class={`${style.field} ${style.select}`}
          style={{ height: '10%' }}
          onChange={(e) => getGroups((e.target as HTMLSelectElement).value)}
        >
          {faculties?.map((faculty) => (
            <option id={faculty.id} value={faculty.id} selected={(value as ITeacher).facultyIds?.includes(faculty.id)}>
              {faculty.name}
            </option>
          ))}
        </select>
      )}

      {type === CardTypePopup.STUDENT && (
        <>
          <label class={style.label}>Group:</label>
          <select
            class={`${style.field} ${style.select}`}
            style={{ height: '10%' }}
            onChange={(e) =>
              setData({
                ...value,
                groupId: (e.target as HTMLSelectElement).value,
              })
            }
            value={(value as IStudent).groupId}
          >
            {groups?.map((group) => (
              <option id={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </>
      )}

      <button className={style.button} onClick={() => editHandler()}>
        Update
      </button>
      <UpdateLoginDataUser user={value} type={type} />
    </div>
  );
}
