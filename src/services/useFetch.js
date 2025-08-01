// Custom hook
import { useState, useEffect, useRef } from 'react';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export default function useFetch(url) {
    const isMounted = useRef(false);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        //To check if the page is still displayed once we get the data
        //  and try to update the values
        // this may happen when user changes pages before loading
        isMounted.current = true;
        async function init() {
            try {
                const response = await fetch(baseUrl + url);
                if (response.ok) {
                    const json = await response.json();
                    if (isMounted.current) setData(json);
                }
                else {
                    throw response;
                }
            } catch (e) {
                if (isMounted.current) setError(e);
            } finally {
                if (isMounted.current) setLoading(false);
            }
        }
        init();

        //ANY FUNCTION returned from useEffect is called on unmount 
        return () => { isMounted.current = false; };
    }, [url]);

    return { data, error, loading };
}