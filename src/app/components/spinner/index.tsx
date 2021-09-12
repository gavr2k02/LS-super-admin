import { FunctionalComponent } from 'preact';
import style from './style.module.scss';

const Spinner: FunctionalComponent = () => {
  return <div class={style.loader}></div>;
};

export default Spinner;
