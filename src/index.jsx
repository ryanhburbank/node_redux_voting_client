import React from 'react';
import ReactDOM from 'react-dom';
import Voting from './components/Voting';

const pair = ['Chinatown', 'Children of Men'];

ReactDOM.render(
  <Voting pair={pair} winner="Chinatown"/>,
  document.getElementById('app')
);

