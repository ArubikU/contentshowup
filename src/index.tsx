import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import App from './App';
import Portfolio from './Components/Portfolio/Portfolio';
import './index.css';
const RouterType = process.env.HASH_ROUTER === 'true' ? HashRouter : BrowserRouter

ReactDOM.render(
  <React.StrictMode>
    
  <RouterType>
    <Routes>
    <Route path="/contentshowup/portfolio" element={<Portfolio />} />
    <Route path="*" element={<App />} />
    </Routes> 
    </RouterType>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
