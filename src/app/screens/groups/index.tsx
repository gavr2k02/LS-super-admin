import style from './style.module.scss';
import { IGroup } from 'models/interfaces/IGroup';
import { useParams } from 'react-router-dom';
import HeaderBaseCard from '../../components/header-base-card';
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

interface IParamsGroup {
  facultyId: string;
}

export default function Groups() {
  const { facultyId } = useParams() as IParamsGroup;
  const [faculty, setFaculty] = useState<IFaculty>();
  const [loading, setLoading] = useState(true);
  const groups: IGroup[] = useObservable(api.groupsService.groups);

  useEffect(() => {
    getData();
    api.groupsService.subscribe(`${api.authService.cid}-groups-${facultyId}`);
    return () => {
      api.groupsService.unsubscribe(`${api.authService.cid}-groups-${facultyId}`);
    };
  }, []);

  const getData = async () => {
    try {
      const [zero, result] = await Promise.all([
        api.groupsService.getGroups(facultyId),
        api.facultiesService.getFacultyById(facultyId),
      ]);
      setFaculty(result);
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
      <div class={style.group}>
        <div class={style.header}>
          <div class={style.text}>
            <CardPopup type={CardTypePopup.GROUP} value={{ ...defaultCard, facultyId }} isCreate={true} />
            Groups
          </div>
          {faculty && <HeaderBaseCard value={faculty} type={CardTypePopup.FACULTY} />}
        </div>
        <div class={style.cardsContainer}>
          {groups?.map((data) => (
            <CardBase value={data} type={CardTypePopup.GROUP} />
          ))}
        </div>
      </div>
    );
  }
}
