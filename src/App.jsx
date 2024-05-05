import React from 'react';
import './App.css';
import Header from './header/Header';
import AllTodos from './AllTodos/AllTodos';

function App() {

  return (
    <div className='App-wrapper'>
      <Header />
      <AllTodos />
    </div>
  )
}

export default App
