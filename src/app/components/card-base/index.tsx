import style from './style.module.scss';
import { Link } from 'react-router-dom';
import BoundedTooltip from '../popups/bounded-tooltip';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { getPatchOnType } from '../../common/utils/getPatchOnType';
import menu from '../../assets/img/menu2.svg';
import { IBaseCard } from 'models/interfaces/IBaseCard';
import { IStudent } from 'models/interfaces/IStudent';
import { IFaculty } from 'models/interfaces/IFaculty';
import { ICourse } from 'models/interfaces/ICourse';

interface IBaseCardPopups {
  value: IBaseCard;
  type: CardTypePopup;
  isPreview?: boolean;
  faculties?: IFaculty[];
  date?: Date;
}

export default function CardBase({ value, type, isPreview = false, faculties, date }: IBaseCardPopups) {
  const name = value.name.length < 16 ? value.name : value.name.slice(0, 16) + '...';
  let facultiesString: string;
  let peopleName: string;

  if (type === CardTypePopup.COURSE) {
    facultiesString = faculties
      ?.filter((faculty) => (value as ICourse)?.facultyIds?.includes(faculty.id))
      .map((faculty) => faculty.name)
      .toString();
    facultiesString = facultiesString.length < 16 ? facultiesString : facultiesString.slice(0, 16) + '...';
  }

  if (type === CardTypePopup.STUDENT || type === CardTypePopup.TEACHER) {
    if ((value as IStudent)?.lastName) {
      peopleName = `${
        (value as IStudent).lastName?.length < 13
          ? (value as IStudent).lastName
          : (value as IStudent).lastName?.slice(0, 16) + '...'
      } ${(value as IStudent).firstName?.charAt(0)}`;
    }
  }

  return (
    <div className={style.cardFaculty}>
      {isPreview ? (
        <>
          {type !== CardTypePopup.COURSE ? (
            <div className={style.link}>
              <div class={style.name}>{name}</div>
              <div class={style.name}>{peopleName}</div>
            </div>
          ) : (
            <div className={style.link}>
              <div class={style.name}>{name}</div>
              <div class={style.name}>{facultiesString}</div>
            </div>
          )}

          <div class={style.editPanel} style={{ backgroundColor: value.color }}>
            <img class={style.menuIcon} src={menu} />
          </div>
        </>
      ) : (
        <>
          {type !== CardTypePopup.COURSE ? (
            <Link
              className={style.link}
              to={
                date
                  ? `/timetable/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/faculty/${value.id}`
                  : getPatchOnType(type, value)
              }
            >
              <div class={style.name}>{name}</div>
              <div class={style.name}>{peopleName}</div>
            </Link>
          ) : (
            <div className={style.link}>
              <div class={style.name}>{name}</div>
              <div class={style.name}>{facultiesString}</div>
            </div>
          )}

          <div class={style.editPanel} style={{ backgroundColor: value.color }}>
            <BoundedTooltip value={value} type={type} faculties={faculties} />
          </div>
        </>
      )}
    </div>
  );
}
