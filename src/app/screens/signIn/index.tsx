import style from './style.module.scss';
import { useState } from 'preact/hooks';
import { ILoginPassword } from 'models/interfaces/ILoginPassword';
import { api } from '../../services/api';
import Spinner from '../../components/spinner';
import swal from 'sweetalert2/dist/sweetalert2.all.min.js';

interface IPropTypes {
  setLoad(error: boolean): void;
  load: boolean;
}

export default function SignIn({ setLoad, load }: IPropTypes) {
  const authHandler = async (e) => {
    try {
      e.preventDefault();
      setLoad(true);
      await api.authService.loginWithPassword(data);
    } catch (e) {
      swal.fire('Error', `Invalid data`, 'error');
    } finally {
      setLoad(false);
    }
  };

  const [data, setData] = useState<ILoginPassword>({ name: '', password: '' });

  return (
    <form class={style.signIn}>
      {load && <Spinner />}
      <div class={style.conatainer}>
        <input
          class={style.field}
          type='text'
          value={data.name}
          onChange={(e) => setData({ ...data, name: (e.target as HTMLTextAreaElement).value })}
        />
        <input
          class={style.field}
          type='password'
          value={data.password}
          onChange={(e) => setData({ ...data, password: (e.target as HTMLTextAreaElement).value })}
        />
        <div class={style.buttons}>
          <button class={style.buttonSignIn} onClick={(e) => authHandler(e)}>
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
}
