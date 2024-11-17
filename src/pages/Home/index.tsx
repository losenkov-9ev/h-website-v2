import React from 'react';
import { Products } from '../../widgets/Products';
import { Top } from '../../widgets/Top';
import { Reviews } from '../../widgets/Reviews';

export const Home: React.FC = () => {
  return (
    <>
      <Top />
      <Products />
      <Reviews title="Отзывы" type="masonry" />
    </>
  );
};
