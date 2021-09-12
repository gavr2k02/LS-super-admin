import { Switch, Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'preact/hooks';
import Header from '../components/header';
import LeftSideBar from '../components/left-side-bar';
import RightSideBar from '../components/right-side-bar';
import Home from './home';
import Faculties from './faculties';
import Students from './students';
import style from './style.module.scss';
import Groups from './groups';
import SignIn from './signIn';
import SpinnerMain from '../components/spinner-main';
import Student from './student';
import { api } from '../services/api';
import { Routes } from '../common/enums/Routes';
import Teachers from './teachers';
import Teacher from './teacher';
import Courses from './courses';
import Timetable from './timetable';
import TimetableGroups from './timetable-groups';

export default function App() {
  const [loadingMain, setLoadingMain] = useState(true);
  const [loadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {}, [setLoadingMain, setLoadingAuth]);

  const authToken = async () => {
    try {
      await api.authService.loginWithToken();
    } finally {
      setLoadingMain(false);
    }
  };

  if (loadingMain) {
    authToken();
    return <SpinnerMain />;
  } else {
    return api.authService.isLoggedIn ? (
      <>
        <Header />
        <div class={style.app}>
          <LeftSideBar />
          <Switch>
            <Route path={Routes.HOME} component={Home} />
            <Route path={Routes.FACULTIES} component={() => <Faculties />} />
            <Route path={Routes.GROUPS} component={() => <Groups />} />
            <Route path={Routes.STUDENTS} component={() => <Students />} />
            <Route path={Routes.STUDENT} component={() => <Student />} />
            <Route path={Routes.TEACHERS} component={() => <Teachers />} />
            <Route path={Routes.TEACHER} component={() => <Teacher />} />
            <Route path={Routes.COURSES} component={() => <Courses />} />
            <Route path={Routes.TIMETABLE} component={() => <Timetable />} />
            <Route path={Routes.TIMETABLE_FACULTIES} component={() => <Faculties />} />
            <Route path={Routes.TIMETABLE_FACULTY} component={() => <TimetableGroups />} />
            <Redirect from='/' to={Routes.HOME} />
          </Switch>
          <RightSideBar />
        </div>
      </>
    ) : (
      <div class={`${style.app} ${style.full}`}>
        <Switch>
          <Route path='/signin' component={() => <SignIn setLoad={setLoadingAuth} load={loadingAuth} />} />
          <Redirect from='/' to='/signin' />
        </Switch>
      </div>
    );
  }
}
