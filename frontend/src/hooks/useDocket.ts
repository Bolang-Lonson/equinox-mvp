import { useEffect, useState } from 'react';

export type Docket = {
    trademark_id: number;
    title: string;
    due_date: Date | string;
    completed: boolean | 'true' | 'false';
}

export function useDocket() {
    const [dockets, setDockets] = useState<Docket[]>([]);
    useEffect(() => {
        async function fetchDockets() {
            try {
                // method: get
                const resp = await fetch('http://localhost:4000/api/dockets', {
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                });
                const data: Docket[] = await resp.json();
                setDockets(data)
            } catch {
                setDockets([]);
            }
        }
        fetchDockets();
    },[]);

    return dockets;
}