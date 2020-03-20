import React from 'react';
import logo from './logo.svg';
import './App.css';

import Board from './components/board';
import {taskMap } from './components/data';


function App() {
  return (
    <div className="App">
      <Board initial={taskMap} />
    </div>
  );
}

export default App;
