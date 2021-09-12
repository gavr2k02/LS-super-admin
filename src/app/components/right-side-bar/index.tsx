import style from './style.module.scss';
import SearchPopup from '../popups/search-popup';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../common/enums/Routes';

export default function RightSideBar() {
  return (
    <div class={style.rightSideBar}>
      <Switch>
        <Route path={Routes.FACULTIES} component={() => <SearchPopup type={CardTypePopup.FACULTY} />} />
        <Route path={Routes.GROUPS} component={() => <SearchPopup type={CardTypePopup.GROUP} />} />
        <Route path={Routes.STUDENTS} component={() => <SearchPopup type={CardTypePopup.STUDENT} />} />
        <Route path={Routes.TEACHERS} component={() => <SearchPopup type={CardTypePopup.TEACHER} />} />
        <Route path={Routes.COURSES} component={() => <SearchPopup type={CardTypePopup.COURSE} />} />
      </Switch>
    </div>
  );
}
