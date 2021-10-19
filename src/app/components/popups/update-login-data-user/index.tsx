import Popup from 'reactjs-popup';

import style from './style.module.scss';
import 'reactjs-popup/dist/index.css';

import { CardTypePopup } from '../../../common/enums/CardTypePopup';
import Swal from 'sweetalert2';
import { api } from '../../../services/api';
import { IFIelds, IUser } from 'models/interfaces/IUser';
import { IStudent } from 'models/interfaces/IStudent';
import { ITeacher } from 'models/interfaces/ITeacher';
import { useState } from 'preact/hooks';

interface IGroupProps {
  user: IUser;
  type: CardTypePopup;
}

const styleContent = {
  height: '20%',
  width: '20%',
  borderRadius: '15px',
  backgroundColor: '#282828',
  border: 0,
  padding: '1vw',
};

export default function UpdateLoginDataUser({ user, type }: IGroupProps) {
  const [data, setData] = useState<IUser>(user);
  const [password, setPassword] = useState<string>('');

  const updateHandler = async (): Promise<void> => {
    try {
      switch (type) {
        case CardTypePopup.STUDENT: {
          await api.studentsService.updateStudentPassword({ ...data, fields: { password } } as any);
          break;
        }
        case CardTypePopup.TEACHER: {
          await api.teachersService.updateTeacherPassword({ ...data, fields: { password } } as any);
          break;
        }
      }
    } catch (e) {
      Swal.fire('Error', 'Opss... Sometime went wrong', 'error');
    }
  };

  return (
    <Popup contentStyle={styleContent} trigger={<button class={style.button}>Change login data</button>} modal nested>
      {(close) => (
        <div class={style.alert}>
          <input
            class={style.field}
            type='text'
            value={data.name}
            onChange={(e) => setData({ ...data, name: (e.target as HTMLTextAreaElement).value })}
          />
          <input
            class={style.field}
            type='text'
            value={password}
            onChange={(e) => setPassword((e.target as HTMLTextAreaElement).value)}
          />
          <div className={style.buttons}>
            <button
              class={style.buttonForm}
              onClick={() => {
                updateHandler();
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
