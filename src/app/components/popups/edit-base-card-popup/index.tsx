import { IFaculty } from 'models/interfaces/IFaculty';
import { useEffect, useState } from 'preact/hooks';
import ReinventedColorWheel from 'reinvented-color-wheel/react';

import style from './style.module.scss';
import 'reinvented-color-wheel/css/reinvented-color-wheel.min.css';

import CardBase from '../../card-base';
import Spinner from '../../spinner';

import { api } from '../../../services/api';
import Swal from 'sweetalert2';
import { IGroup } from 'models/interfaces/IGroup';
import { CardTypePopup } from '../../../common/enums/CardTypePopup';
import { defaultCard } from '../../../common/constans/constans';
import { IStudent } from 'models/interfaces/IStudent';
import { IBaseCard } from 'models/interfaces/IBaseCard';
import { ITeacher } from 'models/interfaces/ITeacher';
import { ICourse } from 'models/interfaces/ICourse';

interface IEditBaseCardPopupProps {
  value: IBaseCard | ICourse | undefined;
  onClose: () => void;
  isCreate: boolean;
  type: CardTypePopup;
  faculties?: IFaculty[];
}

export default function EditBaseCardPopup({ value, onClose, isCreate, type, faculties }: IEditBaseCardPopupProps) {
  const [data, setData] = useState<IBaseCard | ICourse>(value || defaultCard);
  const [loading, setLoading] = useState(false);

  const createCardHanler = async () => {
    try {
      setLoading(true);
      switch (type) {
        case CardTypePopup.FACULTY: {
          isCreate
            ? await api.facultiesService.createFaculty(data as IFaculty)
            : await api.facultiesService.updateFaculty(data as IFaculty);
          break;
        }
        case CardTypePopup.GROUP: {
          isCreate
            ? await api.groupsService.createGroup(data as IGroup)
            : await api.groupsService.updateGroup(data as IGroup);
          break;
        }
        case CardTypePopup.STUDENT: {
          isCreate
            ? await api.studentsService.createStudent(data as IStudent)
            : await api.studentsService.updateStudent(data as IStudent);
          break;
        }
        case CardTypePopup.TEACHER: {
          isCreate
            ? await api.teachersService.createTeacher(data as ITeacher)
            : await api.teachersService.updateTeacher(data as ITeacher);
          break;
        }
        case CardTypePopup.COURSE: {
          isCreate
            ? await api.coursesService.createCourse(data as ICourse)
            : await api.coursesService.updateCourse(data as ICourse);
        }
      }
      onClose();
    } catch (e) {
      Swal.fire('Error', `${e}`, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Spinner />}
      <div class={style.conatainer}>
        <label class={style.label}>Name:</label>
        <input
          class={style.field}
          type='text'
          value={data.name}
          onChange={(e) => setData({ ...data, name: (e.target as HTMLTextAreaElement).value })}
        />
        <label class={style.label}>Color:</label>
        <input
          class={style.field}
          type='text'
          value={data.color}
          onChange={(e) => setData({ ...data, color: (e.target as HTMLTextAreaElement).value })}
        />
        {type === CardTypePopup.COURSE && (
          <>
            <label class={style.label}>Faculties:</label>
            <select
              class={`${style.field} ${style.select} ${style.multi}`}
              onChange={(e) =>
                setData({
                  ...data,
                  facultyIds: Array.from((e.target as HTMLSelectElement).selectedOptions, (option) => option.value),
                } as ICourse)
              }
              multiple
            >
              {faculties?.map((faculty) => (
                <option
                  id={faculty.id}
                  value={faculty.id}
                  selected={(value as ITeacher)?.facultyIds?.includes(faculty.id)}
                >
                  {faculty.name}
                </option>
              ))}
            </select>
          </>
        )}

        <div class={style.preview}>
          <div>
            <label class={style.label}>Preview:</label>
            <CardBase value={data} type={type} isPreview={true} faculties={faculties} />
          </div>
          <div class={style.whellColor}>
            <ReinventedColorWheel
              hex={data.color}
              wheelDiameter={200}
              wheelThickness={20}
              handleDiameter={16}
              wheelReflectsSaturation
              onChange={({ hex }) => setData({ ...data, color: hex })}
            />
          </div>
        </div>
        <div class={style.buttons}>
          <button class={style.buttonAdd} onClick={(e) => createCardHanler()}>
            {isCreate ? 'Create' : 'Update'}
          </button>
          <button class={style.buttonCanel} onClick={() => onClose()}>
            Canel
          </button>
        </div>
      </div>
    </>
  );
}
