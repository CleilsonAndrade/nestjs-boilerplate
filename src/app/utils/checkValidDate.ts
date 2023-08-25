import moment from 'moment';

export function checkValidDate(data: string): boolean {
  const dateFormat = 'YYYY-MM-DD';
  const toDateFormat = moment(new Date(data)).format(dateFormat);

  if (!toDateFormat) {
    return false;
  }

  const checkDate = moment(toDateFormat, dateFormat, true).isValid();

  return checkDate;
}
