// /client/src/App.jsx
// import { useState } from 'react'
// import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import ApiRequest from './ApiRequest';
// import ApiRequest2 from './ApiRequest2';
// import ApiRequest3 from './ApiRequest3';
// import axios from 'axios'
// import GraphQLRequest from './GraphQLRequest';
// import Auth from './Auth';
import AuthPage from './AuthPage';
import ApiPage from './ApiPage';

function App() {

  return (
    <Router>
      <div className="App">
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>25.0202</h1>

      <p className="read-the-docs">
        Pages 
        </p>
        <nav>
                  
                            <Link to="/">Home</Link>
                  <br></br>
                            <Link to="/api">API Requests</Link>
                 <br />
                    <Link to="/auth">Authentication</Link>
  
        </nav>

        <Routes>
                    <Route path="/" element={<div>(Home Page)</div>} />
                    <Route path="/api" element={<ApiPage />} />
                    <Route path="/auth" element={<AuthPage />} />
        </Routes>

        {/* <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/api" element={<ApiPage />} />
        </Routes> */}
    </div>
</Router>
);
}

export default App
