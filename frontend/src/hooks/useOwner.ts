import { useEffect, useState } from 'react';

export type Owner = {
    id: number;
    name: string;
    contact_email: string;
}

export function useOwner() {
    const [owners, setOwners] = useState<Owner[]>([]);
    useEffect(() => {
        async function fetchTrademarks() {
            try {
                // method: get
                const resp = await fetch('http://localhost:4000/api/owners', {
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                });
                const data: Owner[] = await resp.json();
                setOwners(data)
            } catch {
                setOwners([]);
            }
        }
        fetchTrademarks();
    },[]);

    return owners;
}