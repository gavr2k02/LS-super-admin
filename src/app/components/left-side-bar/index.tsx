import Popup from 'reactjs-popup';
import { Link } from 'react-router-dom';
import style from './style.module.scss';

import faculties from '../../assets/img/faculty.svg';
import teachers from '../../assets/img/teacher.svg';
import { Routes } from '../../common/enums/Routes';

interface IIconData {
  url: string;
  patch: string;
  message: string;
  header: string;
}

const styleContent = {
  height: '10%',
  width: '10%',
  borderTopLeftRadius: '15px',
  borderBottomLeftRadius: '15px',
  backgroundColor: '#282828',
  border: 0,
  padding: '1vw',
};

export default function LeftSideBar() {
  const iconsData: IIconData[] = [
    { url: teachers, patch: Routes.HOME, header: headerHome, message: messageHome },
    { url: faculties, patch: Routes.FACULTIES, header: headerFaculties, message: messageFaculties },
    { url: teachers, patch: Routes.TEACHERS, header: headerTeachers, message: messageTeachers },
    { url: faculties, patch: Routes.COURSES, header: headerCourses, message: messageCourses },
    { url: teachers, patch: Routes.TIMETABLE, header: headerTimetable, message: messageTimetable },
  ];

  return (
    <div class={style.leftSideBar}>
      {iconsData.map((iconData) => (
        <Popup
          contentStyle={styleContent}
          trigger={
            <Link to={iconData.patch} className={style.icon}>
              <img src={iconData.url} />
            </Link>
          }
          on='hover'
          position='right center'
          closeOnDocumentClick
        >
          <div class={style.helper}>
            <div class={style.header}>{iconData.header}</div>
            <div class={style.message}>{iconData.message}</div>
          </div>
        </Popup>
      ))}
    </div>
  );
}

const headerHome = 'HOME';
const messageHome = 'The default page contains a manual';

const headerFaculties = 'FACULTIES';
const messageFaculties = 'The page contains information about faculties';

const headerTeachers = 'TEACHERS';
const messageTeachers = 'The page contains information about teachers';

const headerCourses = 'COURSES';
const messageCourses = 'The page contains information about courses';

const headerTimetable = 'TIMETABLE';
const messageTimetable = 'The page contains information about timetable';
