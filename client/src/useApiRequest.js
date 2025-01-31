// /client/src/useApiRequest.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useApiRequest = (endpoint, queryParams, httpMethod) => {
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!endpoint) return;
            setLoading(true);
            try {
                const params = JSON.parse(queryParams);
                let res;
                switch (httpMethod) {
                    case 'POST':
                        res = await axios.post(endpoint, params);
                        break;
                    case 'PUT':
                        res = await axios.put(endpoint, params);
                        break;
                    case 'DELETE':
                        res = await axios.delete(endpoint, { data: params });
                        break;
                    case 'GET':
                    default:
                        res = await axios.get(endpoint, { params });
                        break;
                }
                setResponse(res.data);
            } catch (err) {
                console.error('Error fetching data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [endpoint, queryParams, httpMethod]);

    return { response, loading, error };
};

export default useApiRequest;