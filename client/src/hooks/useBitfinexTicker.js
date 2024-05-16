import { useState, useEffect } from "react";
import axios from "axios";

const useBitfinexTicker = (symbol) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch initial data from the proxy server
        const response = await axios.get(
          `http://localhost:5000/api/ticker/${symbol}`
        );
        const initialData = response.data;
        setData({
          ask: initialData.ask,
          last_price: initialData.last_price,
          volume: initialData.volume,
          high: initialData.high,
          low: initialData.low,
        });
        setLoading(false);

        // Establish WebSocket connection
        const ws = new WebSocket("wss://api-pub.bitfinex.com/ws/2");

        ws.onopen = () => {
          ws.send(
            JSON.stringify({
              event: "subscribe",
              channel: "ticker",
              symbol: `t${symbol.toUpperCase()}`,
            })
          );
        };

        ws.onmessage = (msg) => {
          const message = JSON.parse(msg.data);
          // The first response is the subscription confirmation
          if (message.event || !Array.isArray(message)) return;

          // Merge the initial data with the real-time data
          setData((prevData) => ({
            ...prevData,
            ask: message[3] || prevData.ask,
            last_price: message[7] || prevData.last_price,
            volume: message[8] || prevData.volume,
            high: message[9] || prevData.high,
            low: message[10] || prevData.low,
          }));
        };

        ws.onerror = (err) => {
          console.error("WebSocket error:", err);
          setError("WebSocket error");
        };

        return () => {
          ws.close();
        };
      } catch (err) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchData();
  }, [symbol]);

  return { data, error, loading };
};

export default useBitfinexTicker;
