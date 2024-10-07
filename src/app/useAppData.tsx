"use client";

import { useEffect, useState } from 'react';

export default function UseAppData()  {
    const [appData, setAppData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/models/appContentTexts.json");
                const data = await response.json();
                console.log(data)
                setAppData(data?.appData);
            }
            catch (error: any) {
                setError(error);
                console.error("Error fetching data:", error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { appData, loading, error };
};
