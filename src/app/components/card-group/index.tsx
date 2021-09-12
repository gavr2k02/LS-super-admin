import style from './style.module.scss';
import { IGroup } from 'models/interfaces/IGroup';

interface IGroupProps {
  group: IGroup;
}

export default function CardGroup({ group }: IGroupProps) {
  return (
    <div class={style.cardGroup}>
      <div class={style.name}>{group.name}</div>
      <div class={style.editPanel} style={{ backgroundColor: group.color }}></div>
    </div>
  );
}
