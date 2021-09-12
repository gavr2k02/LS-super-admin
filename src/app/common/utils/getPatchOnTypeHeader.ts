import { IFaculty } from 'models/interfaces/IFaculty';
import { IGroup } from 'models/interfaces/IGroup';
import { IStudent } from 'models/interfaces/IStudent';
import { CardTypePopup } from '../enums/CardTypePopup';

export function getPatchOnTypeHeader(type: CardTypePopup, value: IFaculty | IGroup | IStudent) {
  switch (type) {
    case CardTypePopup.FACULTY: {
      return `/faculties`;
    }
    case CardTypePopup.GROUP: {
      return `/faculty/${(value as IGroup).facultyId}/groups`;
    }
    case CardTypePopup.STUDENT: {
      return `/faculty/group/${(value as IStudent).groupId}/students`;
    }
    case CardTypePopup.TEACHER: {
      return '/teachers';
    }
    case CardTypePopup.COURSE: {
      return '/courses';
    }
  }
}
