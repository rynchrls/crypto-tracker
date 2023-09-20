import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Show from './pages/show';
import Home from './pages/home';
import React from 'react';

function App() {
  const [darkMode, setDarkMode] = React.useState(false)

  const handleClick = () => {
    setDarkMode(!darkMode)
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route index path='/crypto-tracker' element={<Home darkMode={darkMode} handleClick={handleClick} />} />
        <Route path='/:id' element={<Show darkMode={darkMode} handleClick={handleClick} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
