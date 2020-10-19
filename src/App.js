import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const handleClick = async () => {
    const res = await fetch('/chart')
    console.log(res, 'res')
  }

  return (
    <div className="App">
      <button onClick={handleClick}>GET CHART</button>
    </div>
  );
}

export default App;
