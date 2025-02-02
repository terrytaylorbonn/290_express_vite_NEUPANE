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
import Auth from './Auth';
import ApiPage from './ApiPage';

function App() {


  // const [count, setCount] = useState(0)
  // const [array, setArray] = useState([])

  // const fetchAPI = async () => {
  //   const response = await axios.get('http://localhost:8080/api')
  //   // const response = await axios.get('https://two90-express-vite-neupane.onrender.com/api')

    
  //   setArray(response.data.fruits)
  //   console.log(response.data.fruits)
  // };

  // useEffect(() => {
  //   fetchAPI();
  // }, []);

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
      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
        {array.map((fruit, index) => (
          <div key={index}>
            <p>{fruit}</p>
            <br></br>
          </div>
        ))}
      </div> */}
      <p className="read-the-docs">
        Pages 
        </p>
        <nav>
                  
                            <Link to="/">Home</Link>
                  <br></br>
                            <Link to="/api">API Requests</Link>
                    
        </nav>
      {/* <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/api">API Requests</Link>
                        </li>
                    </ul>
        </nav> */}
        <Routes>
                    <Route path="/" element={<Auth />} />
                    <Route path="/api" element={<ApiPage />} />
        </Routes>

        {/* <Switch>
            <Route exact path="/">
                <Auth />
            </Route>
            <Route path="/api">
                <ApiPage />
            </Route>
        </Switch> */}
    </div>
</Router>
);


}

export default App
