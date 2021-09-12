import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';

import { CardTypePopup } from '../../../common/enums/CardTypePopup';
import Swal from 'sweetalert2';
import { api } from '../../../services/api';
import searchIcon from '../../../assets/img/search.svg';

interface ISearchPopup {
  type: CardTypePopup;
}

const styleContent = {
  height: '2%',
  width: '10%',
  backgroundColor: '#282828',
  border: 0,
};

export default function SearchPopup({ type }: ISearchPopup) {
  const searchHanler = (value: string): void => {
    try {
      switch (type) {
        case CardTypePopup.FACULTY: {
          api.facultiesService.setSearch(value);
          break;
        }
        case CardTypePopup.GROUP: {
          api.groupsService.setSearch(value);
          break;
        }
        case CardTypePopup.STUDENT: {
          api.studentsService.setSearch(value);
          break;
        }
        case CardTypePopup.TEACHER: {
          api.teachersService.setSearch(value);
          break;
        }
        case CardTypePopup.COURSE: {
          api.coursesService.setSearch(value);
          break;
        }
      }
    } catch (e) {
      Swal.fire('Error', 'Opss... Sometime went wrong', 'error');
    }
  };

  return (
    <div>
      <Popup
        contentStyle={styleContent}
        trigger={<img src={searchIcon} />}
        position={'left center'}
        closeOnDocumentClick
      >
        <input type='text' onChange={(e) => searchHanler((e.target as HTMLTextAreaElement).value)} />
      </Popup>
    </div>
  );
}
