import clone from 'just-clone';

export function baseCardHandler<T extends { id?: string; deleted?: boolean }>(value: T, data: T[]): T[] {
  const index = data?.findIndex((item) => item.id === value.id);

  if (index === -1) {
    if (value?.deleted) {
      return;
    }

    data.push(value);
    data.sort();
  } else {
    value?.deleted ? data.splice(index, 1) : data.splice(index, 1, value);
  }

  return clone(data);
}
