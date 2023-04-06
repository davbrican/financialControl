import React, { useEffect } from 'react';
import ActualAccount from '../components/ActualAccount';
import Bills from '../components/Bills';
import Forms from '../components/Forms';
import Graficas from '../components/Graficas';

const Home = () => {

  
  return (
    <div>
      <ActualAccount clase="actualAccount home-actualAccount" />
      <Bills clase="bills home-bills" />
      <Forms clase="form home-form" />
      <Graficas clase="graficas home-grafica" />
    </div>
  )
}

export default Home;