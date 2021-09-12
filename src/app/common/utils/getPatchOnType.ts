import { IBaseCard } from 'models/interfaces/IBaseCard';
import { CardTypePopup } from '../enums/CardTypePopup';

export function getPatchOnType(type: CardTypePopup, value: IBaseCard) {
  switch (type) {
    case CardTypePopup.FACULTY: {
      return `/faculty/${value.id}/groups`;
    }
    case CardTypePopup.GROUP: {
      return `/faculty/group/${value.id}/students`;
    }
    case CardTypePopup.STUDENT: {
      return `/faculty/group/student/${value.id}`;
    }
    case CardTypePopup.TEACHER: {
      return `/teacher/${value.id}`;
    }
    case CardTypePopup.COURSE: {
      return `/course/${value.id}`;
    }
  }
}
