import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import styled from "styled-components"
import Home from './Home';
import OrderForm from './Form';

const App = () => {
  return (
    <div>
      <NavStyle>
      <Link to='/'>
        <button className='homeBtn'>Home</button>
      </Link>
      <Link to='/form'>
        <button className='orderBtn'>Order Pizza</button>
      </Link>
      </NavStyle>

      <Route exact path='/' component={Home} />
      <Route path='/Form' component={OrderForm} />
    </div>
  );
};
export default App;

const NavStyle = styled.div`
  padding: 40px;

  button {
    width: 10rem;
    height: 4rem;
    align-items: center;
  
  }

  .homeBtn {
    font-size: 1.5rem;
    margin: 20px;
  }

  .orderBtn {
    font-size: 1.5rem;
    margin: 20px;
  }

`
