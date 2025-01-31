// /client/src/ApiRequest3.jsx
import { useState } from 'react';
import useApiRequest from './useApiRequest';

const ApiRequest3 = () => {
    const [endpoint, setEndpoint] = useState('');
    const [queryParams, setQueryParams] = useState('');
    const [httpMethod, setHttpMethod] = useState('GET');
    const [triggerRequest, setTriggerRequest] = useState(false);

    const { response, loading, error } = useApiRequest(triggerRequest ? endpoint : null, queryParams, httpMethod);

    const handleSubmit = (e) => {
        e.preventDefault();
        setTriggerRequest(true);
    };

    return (
        <div>
            <h2>API Request</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>HTTP Method:</label>
                    <select value={httpMethod} onChange={(e) => setHttpMethod(e.target.value)}>
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                        <option value="PUT">PUT</option>
                        <option value="DELETE">DELETE</option>
                    </select>
                </div>
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
            {error && (
                <div>
                    <h3>Error:</h3>
                    <pre>{error}</pre>
                </div>
            )}
            {response && (
                <div>
                    <h3>Response:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default ApiRequest3;