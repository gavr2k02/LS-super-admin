import style from './style.module.scss';
import { useParams } from 'react-router-dom';
import HeaderBaseCard from '../../components/header-card-faculty';
import { useObservable } from '../../common/utils/useObservable';
import { api } from '../../services/api';
import { useEffect, useState } from 'preact/hooks';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import Loading from '../loading';
import Swal from 'sweetalert2';
import { IStudent } from 'models/interfaces/IStudent';
import clone from 'just-clone';
import UserEdit from '../../components/user-edit';

interface IParamsStudent {
  studentId: string;
}

export default function Student() {
  const { studentId } = useParams() as IParamsStudent;

  const [student, setStudent] = useState<IStudent>();
  const [loading, setLoading] = useState(true);

  const students: IStudent[] = useObservable(api.studentsService.students);

  useEffect(() => {
    getData();
    return () => {
      api.groupsService.unsubscribe(`${api.authService.cid}-students-${student?.groupId}`);
    };
  }, []);

  const getData = async () => {
    try {
      const student = await api.studentsService.getStudentByIdFullData(studentId);
      api.groupsService.subscribe(`${api.authService.cid}-students-${student?.groupId}`);
      setStudent(student);
    } catch (e) {
      Swal.fire('Error', 'Opps... Sometime went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  let editStudent = students?.find((item) => item.id === studentId);

  if (!editStudent) {
    editStudent = clone(student);
    delete editStudent['group'];
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div class={style.main}>
        <div class={style.header}>
          <div class={style.text}>Student</div>
          <div class={style.cardsContainer}>
            {student && <HeaderBaseCard value={student} type={CardTypePopup.STUDENT} />}
            {student.group && <HeaderBaseCard value={student.group} type={CardTypePopup.GROUP} />}
            {student.group.faculty && <HeaderBaseCard value={student.group.faculty} type={CardTypePopup.FACULTY} />}
          </div>
        </div>
        <UserEdit value={editStudent} type={CardTypePopup.STUDENT} />
      </div>
    );
  }
}
