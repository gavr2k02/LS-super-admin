import style from './style.module.scss';
import { IFaculty } from 'models/interfaces/IFaculty';
import { Link } from 'react-router-dom';
import menu from '../../assets/img/menu2.svg';
import { IGroup } from 'models/interfaces/IGroup';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { getPatchOnTypeHeader } from '../../common/utils/getPatchOnTypeHeader';

interface IFacultyProps {
  value: IFaculty | IGroup;
  type: CardTypePopup;
  date?: Date;
}

export default function HeaderBaseCard({ value, type, date }: IFacultyProps) {
  const patch = getPatchOnTypeHeader(type, value);

  return (
    <Link
      className={style.cardFacultyHeader}
      to={date ? `/timetable/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/faculties` : patch}
    >
      <div class={style.name}>{value.name}</div>
      <div class={style.editPanel} style={{ backgroundColor: value.color }}>
        <img class={style.menuIcon} src={menu} />
      </div>
    </Link>
  );
}
