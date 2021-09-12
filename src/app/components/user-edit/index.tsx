import style from './style.module.scss';
import { IStudent } from 'models/interfaces/IStudent';
import { useEffect, useState } from 'preact/hooks';
import Spinner from '../spinner';
import { api } from '../../services/api';
import { ITeacher } from 'models/interfaces/ITeacher';
import { CardTypePopup } from '../../common/enums/CardTypePopup';
import { IFaculty } from 'models/interfaces/IFaculty';
import { useObservable } from '../../common/utils/useObservable';
import { IGroup } from 'models/interfaces/IGroup';
import UserCardPreview from '../user-card-preview';
import UserEditForm from '../user-edit-form';
import Swal from 'sweetalert2';
import { ICourse } from 'models/interfaces/ICourse';

export interface IUserEditProps {
  value: IStudent | ITeacher;
  type: CardTypePopup;
}

export default function UserEdit({ value, type }: IUserEditProps) {
  const [load, setLoad] = useState(false);
  const [data, setData] = useState<ITeacher | IStudent>(value);

  const faculties: IFaculty[] = useObservable(api.facultiesService.faculties);
  const groups: IGroup[] = useObservable(api.groupsService.groups);
  const courses: ICourse[] = useObservable(api.coursesService.courses);

  useEffect(() => {
    getFaculties();
    api.facultiesService.subscribe(`${api.authService.user.cid}-faculties`);
    return () => {
      api.facultiesService.unsubscribe(`${api.authService.user.cid}-faculties`);
    };
  }, []);

  const getFaculties = async () => {
    try {
      await api.facultiesService.getFaculties();
    } catch (e) {
      Swal.fire('Error', 'Opps... went wrong', 'error');
    } finally {
      setLoad(false);
    }
  };

  return (
    <>
      {load && <Spinner />}
      <div className={style.main}>
        <UserEditForm
          value={data}
          type={type}
          setLoad={setLoad}
          faculties={faculties}
          groups={groups}
          courses={courses}
          setData={setData}
        />
        <UserCardPreview value={data} type={type} faculties={faculties} groups={groups} courses={courses} />
      </div>
    </>
  );
}
