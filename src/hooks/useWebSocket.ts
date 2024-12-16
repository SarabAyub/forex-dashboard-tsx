import { useState, useEffect, useRef } from 'react';

const useWebSocket = (url: string | null) => {
  const [quote, setQuote] = useState<{
    data: {
      ask: number;
      bid: number;
      last: number;
      symbol: string;
      time: string;
      volume: number;
    };
    id: string;
    timestampUTC: number;
    type: string;
  } | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!url) return;

    socketRef.current = new WebSocket(url);

    socketRef.current.onopen = () => {
      console.log('WebSocket connected');
    };

    socketRef.current.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setQuote(newData);
      console.log('WebSocket Data:', newData);
    };

    socketRef.current.onerror = (event) => {
      console.error('WebSocket error', event);
      setError(new Error('WebSocket error'));
    };

    return () => {
      // if (socketRef.current) {
      //   socketRef.current.close();
      // }
    };
  }, [url]);

  const closeSocket = () => {
    if (socketRef.current) {
      socketRef.current.close();
      socketRef.current = null;
      console.log('WebSocket manually closed');
    }
  };

  return { quote, error, closeSocket };
};

export default useWebSocket;
