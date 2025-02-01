// /client/src/App.jsx
import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ApiRequest from './ApiRequest';
import ApiRequest2 from './ApiRequest2';
import ApiRequest3 from './ApiRequest3';
import axios from 'axios'
import GraphQLRequest from './GraphQLRequest';
import Auth from './Auth';

function App() {


  const [count, setCount] = useState(0)
  const [array, setArray] = useState([])

  const fetchAPI = async () => {
    const response = await axios.get('http://localhost:8080/api')
    // const response = await axios.get('https://two90-express-vite-neupane.onrender.com/api')

    
    setArray(response.data.fruits)
    console.log(response.data.fruits)
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
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
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <Auth />
      <GraphQLRequest />
      <ApiRequest3 />
      <ApiRequest2 />
      <ApiRequest />
    </>
  )
}

export default App
