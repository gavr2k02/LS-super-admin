import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import HeaderBaseCard from '../../components/header-base-card';
import { useObservable } from '../../common/utils/useObservable';
import { api } from '../../services/api';
import { useEffect, useState } from 'preact/hooks';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import Loading from '../loading';
import UserEdit from '../../components/user-edit';
import Swal from 'sweetalert2';
import clone from 'just-clone';
import { ITeacher } from 'models/interfaces/ITeacher';

interface IParamsStudent {
  teacherId: string;
}

export default function Teacher() {
  const { teacherId } = useParams() as IParamsStudent;

  const [teacher, setTeacher] = useState<ITeacher>();
  const [loading, setLoading] = useState(true);

  const teachers: ITeacher[] = useObservable(api.studentsService.students);

  useEffect(() => {
    getData();
    return () => {
      api.teachersService.unsubscribe(`${api.authService.cid}-teachers`);
    };
  }, []);

  const getData = async () => {
    try {
      const teacher = await api.teachersService.getTeacherById(teacherId);
      api.teachersService.subscribe(`${api.authService.cid}-teachers`);
      setTeacher(teacher);
    } catch (e) {
      Swal.fire('Error', 'Opps... Sometime went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  let editTeacher = teachers?.find((item) => item.id === teacherId);

  if (!editTeacher) {
    editTeacher = clone(teacher);
    delete editTeacher['group'];
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div class={style.main}>
        <div class={style.header}>
          <div class={style.text}>Teacher</div>
          <div class={style.cardsContainer}>
            {teacher && <HeaderBaseCard value={teacher} type={CardTypePopup.TEACHER} />}
          </div>
        </div>
        <UserEdit value={teacher} type={CardTypePopup.TEACHER} />
      </div>
    );
  }
}
