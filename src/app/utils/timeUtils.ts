import { DateTime } from 'luxon';

/**
 * Переводит дату и время к часовому поясу пользователя.
 * @param startTime - Строка времени в формате `HH:mm DD.MM.YYYY`.
 * @param timeZone - Часовой пояс, по умолчанию определяется автоматически.
 * @returns Время в формате `HH:mm DD.MM.YYYY` с учетом часового пояса.
 */
export const convertToUserTimeZone = (
  startTime: string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
): string => {
  const [time, date] = startTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  const [day, month, year] = date.split('.').map(Number);

  // Создаем дату в UTC
  const utcDateTime = DateTime.utc(year, month, day, hours, minutes);

  // Преобразуем в заданный часовой пояс и форматируем
  return utcDateTime.setZone(timeZone).toFormat('HH:mm dd.MM.yyyy');
};
