// /client/src/ApiRequest2.jsx
//import React, { useState } from 'react';
import { useState } from 'react';
import axios from 'axios';

const ApiRequest2 = () => {
    const [endpoint, setEndpoint] = useState('');
    const [queryParams, setQueryParams] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const params = JSON.parse(queryParams);
            const res = await axios.get(endpoint, { params });
            setResponse(res.data);
        } catch (err) {
            console.error('Error fetching data:', err);
            setResponse({ error: err.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>API Request</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Endpoint:</label>
                    <input
                        type="text"
                        value={endpoint}
                        onChange={(e) => setEndpoint(e.target.value)}
                    />
                </div>
                <div>
                    <label>Query Parameters (JSON format):</label>
                    <textarea
                        value={queryParams}
                        onChange={(e) => setQueryParams(e.target.value)}
                        rows="4"
                        cols="50"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Fetching...' : 'Fetch'}
                </button>
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

export default ApiRequest2;