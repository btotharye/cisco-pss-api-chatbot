import React from 'react';
import ReactDOM from 'react-dom';
import CiscoBot from './App.js';
import Header from './components/Header';
import './index.css';


ReactDOM.render(
  <div>
    <Header />
    <CiscoBot />
  </div>,
  document.getElementById('root')
);
