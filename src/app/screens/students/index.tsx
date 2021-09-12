import style from './style.module.scss';
import { IGroup } from 'models/interfaces/IGroup';
import { useParams } from 'react-router-dom';
import HeaderBaseCard from '../../components/header-card-faculty';
import { useObservable } from '../../common/utils/useObservable';
import { api } from '../../services/api';
import { useEffect, useState } from 'preact/hooks';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import Loading from '../loading';
import { defaultCard } from '../../common/constans/constans';

import CardPopup from '../../components/popups/card-popup';
import Swal from 'sweetalert2';
import { IFaculty } from 'models/interfaces/IFaculty';
import CardBase from '../../components/card-base';
import { IStudent } from 'models/interfaces/IStudent';

interface IParamsGroup {
  facultyId: string;
  groupId: string;
}

export default function Students() {
  const { groupId } = useParams() as IParamsGroup;

  const [group, setGroup] = useState<IGroup>();
  const [loading, setLoading] = useState(true);

  const students: IStudent[] = useObservable(api.studentsService.students);

  useEffect(() => {
    getData();
    api.groupsService.subscribe(`${api.authService.cid}-students-${groupId}`);
    return () => {
      api.groupsService.unsubscribe(`${api.authService.cid}-students-${groupId}`);
    };
  }, []);

  const getData = async () => {
    try {
      const [zero, grop] = await Promise.all([
        api.studentsService.getStudents(groupId),
        api.groupsService.getGroupByIdFullData(groupId),
      ]);
      setGroup(grop);
    } catch (e) {
      Swal.fire('Error', 'Opps... Sometime went wrong', 'error');
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
            <CardPopup type={CardTypePopup.STUDENT} value={{ ...defaultCard, groupId } as IStudent} isCreate={true} />
            Students
          </div>
          <div class={style.cardsContainer}>
            {group && <HeaderBaseCard value={group} type={CardTypePopup.GROUP} />}
            {group.faculty && <HeaderBaseCard value={group.faculty} type={CardTypePopup.FACULTY} />}
          </div>
        </div>
        <div class={style.cardsContainer}>
          {students?.map((data) => (
            <CardBase value={data} type={CardTypePopup.STUDENT} />
          ))}
        </div>
      </div>
    );
  }
}
