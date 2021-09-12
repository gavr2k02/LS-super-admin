import style from './style.module.scss';
import { IStudent } from 'models/interfaces/IStudent';
import { ITeacher } from 'models/interfaces/ITeacher';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import menAvatar from '../../assets/img/m-avatar.png';
import { IFaculty } from 'models/interfaces/IFaculty';
import { IGroup } from 'models/interfaces/IGroup';
import { ICourse } from 'models/interfaces/ICourse';

export interface IUserEditProps {
  value: IStudent | ITeacher;
  type: CardTypePopup;
  faculties: IFaculty[];
  groups?: IGroup[];
  courses?: ICourse[];
}

export default function UserCardPreview({ value, type, faculties, groups, courses }: IUserEditProps) {
  const role = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <>
      <div class={style.baseForm}>
        <img src={menAvatar} class={style.avatar} />
        <div class={style.head}>{role}</div>
        <div class={style.text}>
          Name: {value.firstName} {value.lastName}
        </div>
        <div class={style.text}>
          Faculty:
          {type === CardTypePopup.STUDENT
            ? ` ${faculties?.find((item) => item.groupIds?.includes((value as IStudent).groupId)).name || ''}`
            : ` ${
                (value as ITeacher).facultyIds?.map((id) => faculties?.find((faculty) => faculty.id === id)?.name) || ''
              }`}
        </div>
        <div class={style.text}>
          {type === CardTypePopup.STUDENT &&
            `Group: ${groups?.find((group) => group.id === (value as IStudent).groupId)?.name || ''}`}
        </div>
        <div class={style.text}>
          {type === CardTypePopup.TEACHER &&
            `Courses: ${
              (value as ITeacher).courseIds?.map((id) => courses?.find((course) => course.id === id)?.name) || ''
            }`}
        </div>
      </div>
    </>
  );
}
