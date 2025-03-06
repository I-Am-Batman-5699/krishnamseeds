"use client";

import getAppContext from "@/lib/appContext";
import { MainAppData, RootMainAppData } from "@/lib/types";
import { useEffect, useState } from 'react';

export default function UseAppData()  {
    const [appData, setAppData] = useState<MainAppData|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response:RootMainAppData = await getAppContext();
                setAppData(response?.appData);
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
