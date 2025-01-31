// /client/src/GraphQLRequest.jsx
import { useState } from 'react';
import axios from 'axios';
const GraphQLRequest = () => {
    const [query, setQuery] = useState('');
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.post('http://localhost:8080/graphql', {
                query
            });
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
            <h2>GraphQL Request</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>GraphQL Query:</label>
                    <textarea
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        rows="10"
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
export default GraphQLRequest;
