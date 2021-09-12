import { IBaseCard } from 'models/interfaces/IBaseCard';
import { IFaculty } from 'models/interfaces/IFaculty';
import Popup from 'reactjs-popup';
import menu from '../../../assets/img/menu2.svg';
import { CardTypePopup } from '../../../common/enums/CardTypePopup';
import CardPopup from '../card-popup';
import SubmitDeletePopup from '../submit-delete-popup';
import style from './style.module.scss';

const styleContent = {
  height: '9vh',
  width: '6%',
  backgroundColor: '#282828',
  border: 0,
};

interface IBoundedTooltipProps {
  value: IBaseCard;
  type: CardTypePopup;
  faculties?: IFaculty[];
}

export default function BoundedTooltip({ value, type, faculties }: IBoundedTooltipProps) {
  return (
    <div className='tooltipBoundary'>
      <Popup
        contentStyle={styleContent}
        trigger={<img class={style.menuIcon} src={menu} />}
        position={'right center'}
        closeOnDocumentClick
        nested
      >
        <div class={style.buttons}>
          <CardPopup value={value} type={type} isCreate={false} faculties={faculties} />
          <SubmitDeletePopup id={value.id} type={type} />
        </div>
      </Popup>
    </div>
  );
}
