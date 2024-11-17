import { useEffect, useState } from 'react';
import { formatInTimeZone, toDate } from 'date-fns-tz';

/**
 * React-хук для вычисления оставшегося времени и преобразования startTime в указанный часовой пояс.
 * @param startTime - Строка времени в формате `HH:mm DD.MM.YYYY`.
 * @param duration - Продолжительность интервала в формате `30 минут`.
 * @param timeZone - Часовой пояс, по умолчанию определяется автоматически.
 * @returns Объект с оставшимся временем в минутах (минимум 1) и преобразованным startTime.
 */

export const useRemainingTime = (
  startTime: string,
  duration: string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone,
): { remainingMinutes: number; formattedStartTime: string } => {
  const [remainingMinutes, setRemainingMinutes] = useState<number>(0);
  const [formattedStartTime, setFormattedStartTime] = useState<string>('');

  useEffect(() => {
    const calculateRemainingTime = () => {
      const [time, date] = startTime.split(' ');
      const [hours, minutes] = time.split(':').map(Number);
      const [day, month, year] = date.split('.').map(Number);

      // Преобразуем строку `30 минут` в число
      const durationMinutes = parseInt(duration, 10);
      if (isNaN(durationMinutes)) {
        console.error(`Некорректное значение duration: "${duration}"`);
        return;
      }

      // Локальная дата, основанная на переданных данных
      const localDate = new Date(year, month - 1, day, hours, minutes);

      // Преобразуем startTime в объект даты с учетом часового пояса
      const startTimeWithTimeZone = toDate(localDate, { timeZone });

      // Форматируем startTime для указанного часового пояса
      const formattedStart = formatInTimeZone(startTimeWithTimeZone, timeZone, 'HH:mm dd.MM.yyyy');
      setFormattedStartTime(formattedStart);

      // Вычисляем время окончания
      const endTime = new Date(startTimeWithTimeZone.getTime() + durationMinutes * 60 * 1000);

      // Текущее время в часовом поясе
      const now = toDate(new Date(), { timeZone });

      // Разница в миллисекундах
      const remainingMs = endTime.getTime() - now.getTime();

      // Рассчитываем оставшиеся минуты, минимум 1
      const minutesRemaining = Math.max(Math.ceil(remainingMs / (60 * 1000)), 1);
      setRemainingMinutes(minutesRemaining);
    };

    calculateRemainingTime();

    // Обновление каждые 15 секунд
    const intervalId = setInterval(calculateRemainingTime, 15000);

    return () => clearInterval(intervalId);
  }, [startTime, duration, timeZone]);

  return { remainingMinutes, formattedStartTime };
};
