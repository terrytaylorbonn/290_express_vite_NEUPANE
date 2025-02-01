// /client/src/useApiRequest.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useApiRequest = (endpoint, queryParams, httpMethod, token) => {
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
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                switch (httpMethod) {
                    case 'POST':
                        res = await axios.post(endpoint, params, config);
                        break;
                    case 'PUT':
                        res = await axios.put(endpoint, params, config);
                        break;
                    case 'DELETE':
                        res = await axios.delete(endpoint, { ...config, data: params });
                        break;
                    case 'GET':
                    default:
                        res = await axios.get(endpoint, { ...config, params });
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
    }, [endpoint, queryParams, httpMethod, token]);

    return { response, loading, error };
};

export default useApiRequest;