import { IBaseCard } from 'models/interfaces/IBaseCard';
import { isValidHex } from './validateHex';

export function validateCardData(value: IBaseCard, data: IBaseCard[]): void {
  if (!value.name.length || value.name.length > 34) {
    throw 'Wrong data! Name must be less than 34 characters and greater than 0.';
  }

  if (!isValidHex(value.color)) {
    throw 'Wrong data! Use hex format color.';
  }

  const isRepeatName = data.findIndex((item) => item.name === value.name && item.id !== value?.id);

  if (isRepeatName !== -1) {
    throw 'Wrong data! This name exists.';
  }
}
