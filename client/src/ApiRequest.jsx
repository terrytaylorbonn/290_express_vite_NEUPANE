// /client/src/ApiRequest.jsx
// import React, { useState } from 'react';
import { useState } from 'react';
import axios from 'axios';
const ApiRequest = () => {
    const [field1, setField1] = useState('');
    const [field2, setField2] = useState('');
    const [field3, setField3] = useState([]);
    const [response, setResponse] = useState(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // const res = await axios.post('http://localhost:8080/api/create', {
            const res = await axios.post('https://two90-express-vite-neupane.onrender.com/api/create', {
                field1,
                field2: parseInt(field2),
                field3: field3.split(',')
            });
            setResponse(res.data);
        } catch (err) {
            console.error('Error creating document:', err);
            setResponse({ error: err.message });
        }
    };
    return (
        <div>
            <h2>Create Document</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Field 1:</label>
                    <input
                        type="text"
                        value={field1}
                        onChange={(e) => setField1(e.target.value)}
                    />
                </div>
                <div>
                    <label>Field 2:</label>
                    <input
                        type="number"
                        value={field2}
                        onChange={(e) => setField2(e.target.value)}
                    />
                </div>
                <div>
                    <label>Field 3 (comma-separated):</label>
                    <input
                        type="text"
                        value={field3}
                        onChange={(e) => setField3(e.target.value)}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};
export default ApiRequest;
