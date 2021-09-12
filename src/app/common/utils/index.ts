export function toDateString(value: Date): string {
  if (typeof value !== 'string') {
    return `${value.getUTCFullYear()}-${value.getUTCMonth()}-${value.getDate()}`;
  } else {
    const date = new Date(value);
    return `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getDate()}`;
  }
}
