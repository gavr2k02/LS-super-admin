import style from './style.module.scss';

export default function SpinnerMain() {
  return (
    <div class={style.spinWrapper}>
      <div class={style.spinner}></div>
    </div>
  );
}
