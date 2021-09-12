import CardBase from '../../components/card-base';
import Loading from '../loading';

import { useState, useEffect } from 'preact/hooks';
import { api } from '../../services/api';
import { useObservable } from '../../common/utils/useObservable';

import style from './style.module.scss';
import CardPopup from '../../components/popups/card-popup';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { ICourse } from 'models/interfaces/ICourse';
import { IFaculty } from 'models/interfaces/IFaculty';

export default function Courses() {
  const [loading, setLoading] = useState(true);
  const faculties: IFaculty[] = useObservable(api.facultiesService.faculties);
  const courses: ICourse[] = useObservable(api.coursesService.courses);

  useEffect(() => {
    getData();
    api.facultiesService.subscribe(`${api.authService.user.cid}-faculties`);
    api.coursesService.subscribe(`${api.authService.cid}-courses`);
    return () => {
      api.coursesService.unsubscribe(`${api.authService.cid}-courses`);
      api.facultiesService.unsubscribe(`${api.authService.user.cid}-faculties`);
    };
  }, []);

  const getData = async () => {
    try {
      await Promise.all([api.facultiesService.getFaculties(), api.coursesService.getCourses()]);
    } catch (e) {
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
          <div class={style.text}>
            <CardPopup type={CardTypePopup.COURSE} value={undefined} isCreate={true} faculties={faculties} />
            Courses
          </div>
        </div>
        <div class={style.cardsContainer}>
          {courses?.map((data) => (
            <CardBase value={data} type={CardTypePopup.COURSE} faculties={faculties} />
          ))}
        </div>
      </div>
    );
  }
}
