import Popup from 'reactjs-popup';

import style from './style.module.scss';
import 'reactjs-popup/dist/index.css';

import { CardTypePopup } from '../../../common/enums/CardTypePopup';
import Swal from 'sweetalert2';
import { api } from '../../../services/api';

interface IGroupProps {
  id: string;
  type: CardTypePopup;
}

const styleContent = {
  height: '10%',
  width: '20%',
  borderRadius: '15px',
  backgroundColor: '#282828',
  border: 0,
  padding: '1vw',
};

export default function SubmitDeletePopup({ id, type }: IGroupProps) {
  const deleteHandler = async (): Promise<void> => {
    try {
      switch (type) {
        case CardTypePopup.FACULTY: {
          await api.facultiesService.deleteFaculty(id);
          break;
        }
        case CardTypePopup.GROUP: {
          await api.groupsService.deleteGroup(id);
          break;
        }
        case CardTypePopup.STUDENT: {
          await api.studentsService.deleteStudent(id);
          break;
        }
        case CardTypePopup.TEACHER: {
          await api.teachersService.deleteTeacher(id);
          break;
        }
        case CardTypePopup.COURSE: {
          await api.coursesService.deleteCourse(id);
          break;
        }
      }
    } catch (e) {
      Swal.fire('Error', 'Opss... Sometime went wrong', 'error');
    }
  };

  return (
    <Popup contentStyle={styleContent} trigger={<button class={style.button}>Delete</button>} modal nested>
      {(close) => (
        <div class={style.alert}>
          <p class={style.question}>Are you sure to delete the {type}?</p>
          <div className={style.buttons}>
            <button
              class={style.buttonForm}
              onClick={() => {
                deleteHandler();
                close();
              }}
            >
              Submit
            </button>
            <button class={style.buttonForm} onClick={() => close()}>
              Canel
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
