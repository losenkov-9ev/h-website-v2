import ContentLoader from 'react-content-loader';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../app/redux/theme/selectors';
import { loaderColors } from '../../app/constants';

export const TopSkeleton: React.FC = () => {
  const { theme } = useSelector(selectTheme);

  return (
    <ContentLoader
      speed={2}
      width="100%" // 100% ширины контейнера
      height="100%" // Поддержание пропорций высоты через viewBox
      viewBox="0 0 100 33.33" // Пропорции 1200x400 переведены в 100x33.33
      backgroundColor={loaderColors[theme].backgroundColor}
      foregroundColor={loaderColors[theme].foregroundColor}
      style={{ margin: '0 auto', maxWidth: '1200px', height: 'auto' }} // Центровка с ограничением ширины
    >
      {/* Рейтинг и количество отзывов */}
      <rect x="37.5" y="3.33" rx="0.67" ry="0.67" width="10.83" height="2" />
      <rect x="49.17" y="3.33" rx="0.67" ry="0.67" width="6.67" height="2" />

      {/* Заголовок */}
      <rect x="16.67" y="8.33" rx="1" ry="1" width="66.67" height="4.17" />

      {/* Описание */}
      <rect x="13.33" y="16.67" rx="0.67" ry="0.67" width="73.33" height="2" />
      <rect x="13.33" y="20" rx="0.67" ry="0.67" width="63.33" height="2" />
      <rect x="13.33" y="23.33" rx="0.67" ry="0.67" width="70" height="2" />
    </ContentLoader>
  );
};
