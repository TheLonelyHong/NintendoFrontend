import React from 'react';
import AnimatePage from '../../hoc/AnimatePage';
import Title from './Title';
import ConsoleProduct from './ConsoleProduct';
import Motto from './Motto';

const Home = () => {
  return (
    <AnimatePage>
        <Title/>
        <ConsoleProduct/>
        <Motto/>
    </AnimatePage>
  )
}

export default Home