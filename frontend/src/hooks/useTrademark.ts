import { useEffect, useState } from 'react';

export type Trademark = { 
  mark_text: string;
  owner_id: number;
  status: 'registered' | 'accepted' | 'published' | 'refused' | 'withdrawn';
  reg_num: string;
  classes?: string;
  filing_date: Date | string;
  country: string;
}

export function useTrademark(): [Trademark[] | null, boolean] {
    const [trademarks, setTrademarks] = useState<Trademark[] | null>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchTrademarks() {
        try {
            // method: get
            const resp = await fetch('http://localhost:4000/api/trademarks', {
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
            });
            const data: Trademark[] = await resp.json();
            setTrademarks(data)
        } catch {
            setTrademarks(null);
        } finally {
            setLoading(false);
        }
        }
        fetchTrademarks();
    },[]);
    return [trademarks, loading];
}