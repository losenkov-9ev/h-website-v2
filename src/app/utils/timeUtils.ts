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

/**
 * Вычисляет оставшееся время до истечения интервала.
 * @param startTime - Строка времени в формате `HH:mm DD.MM.YYYY`.
 * @param duration - Продолжительность интервала в формате `30 минут`.
 * @param timeZone - Часовой пояс, по умолчанию определяется автоматически.
 * @returns Оставшееся время в минутах, минимум 1.
 */
export const calculateRemainingTime = (
  startTime: string,
  duration: string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
): number => {
  const [time, date] = startTime.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  const [day, month, year] = date.split('.').map(Number);

  // Преобразуем строку `30 минут` в число
  const durationMinutes = parseInt(duration, 10);
  if (isNaN(durationMinutes)) {
    throw new Error(`Некорректное значение duration: "${duration}"`);
  }

  // Создаем дату начала в часовом поясе пользователя
  const startDateTime = DateTime.fromObject(
    { year, month, day, hour: hours, minute: minutes },
    { zone: timeZone },
  );

  // Рассчитываем время окончания
  const endDateTime = startDateTime.plus({ minutes: durationMinutes });

  // Текущее время в часовом поясе пользователя
  const now = DateTime.now().setZone(timeZone);

  // Вычисляем оставшееся время в минутах
  const remainingMinutes = Math.ceil(endDateTime.diff(now, 'minutes').minutes);

  // Возвращаем минимум 1
  return remainingMinutes;
};
