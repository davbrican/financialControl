import React from 'react';
import ActualAccount from '../components/ActualAccount';
import Bills from '../components/Bills';
import Forms from '../components/Forms';

const Home = () => {
  return (
    <div>
      <ActualAccount />
      <Bills />
      <Forms />
    </div>
  )
}

export default Home;