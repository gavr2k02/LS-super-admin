import CardBase from '../../components/card-base';
import Loading from '../loading';

import { useState, useEffect } from 'preact/hooks';
import { api } from '../../services/api';
import { useObservable } from '../../common/utils/useObservable';

import style from './style.module.scss';
import CardPopup from '../../components/popups/card-popup';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { ITeacher } from 'models/interfaces/ITeacher';

export default function Faculties() {
  const [loading, setLoading] = useState(true);
  const teachers: ITeacher[] = useObservable(api.teachersService.teachers);

  useEffect(() => {
    getTeachers();
    api.teachersService.subscribe(`${api.authService.cid}-teachers`);
    return () => {
      api.teachersService.unsubscribe(`${api.authService.cid}-teachers`);
    };
  }, []);

  const getTeachers = async () => {
    try {
      await api.teachersService.getTeachers();
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
            <CardPopup type={CardTypePopup.TEACHER} value={undefined} isCreate={true} />
            Teachers
          </div>
        </div>
        <div class={style.cardsContainer}>
          {teachers?.map((data) => (
            <CardBase value={data} type={CardTypePopup.TEACHER} />
          ))}
        </div>
      </div>
    );
  }
}
