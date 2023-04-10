import React from 'react';
import ActualAccount from '../components/ActualAccount';
import Bills from '../components/Bills';
import Forms from '../components/Forms';
import Graficas from '../components/Graficas';

const Home = () => {

  
  return (
    <div>
      <Graficas clase="graficas home-grafica" />
      <Forms clase="form home-form" />
      <ActualAccount clase="actualAccount home-actualAccount" />
      <Bills clase="bills home-bills" />
    </div>
  )
}

export default Home;