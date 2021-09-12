import Loader from '../../components/loader';
import style from './style.module.scss';

export default function Loading() {
  return (
    <div class={style.loading}>
      <Loader />
    </div>
  );
}
