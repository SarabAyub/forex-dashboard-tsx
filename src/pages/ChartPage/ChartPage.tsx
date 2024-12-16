import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useWebSocket from '../../hooks/useWebSocket.ts';
import ChartRenderer from '../../components/chart/ChartRenderer.tsx';
import { CircularProgress, Typography } from '@mui/material';
import { FlexCol, FlexRow, OptionsContainer, StyledContainer } from './ChartPage.styles.ts';
import { useLazySubscribeQuery } from '../../features/apiSlice.ts';
import Dropdown from '../../components/core/dropdown/dropdown.tsx';
import LogoutButton from '../../components/logout-button/LogoutButton.tsx';

interface Quote {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

const ChartPage: React.FC = () => {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'bar' | 'area'>('candlestick');
  const [subscribeSymbol, setSubscribeSymbol] = useState<string>('EURUSD');
  const [subscribe] = useLazySubscribeQuery();
  const sessionId = useSelector((state: any) => state.session.sessionId);
  const websocketUrl = sessionId ? `ws://212.117.171.68:5000/OnQuote?id=${sessionId}` : null;
  const MAX_QUOTES = 500;
  const { quote: websocketData, error, closeSocket } = useWebSocket(websocketUrl);

  useEffect(() => {
    if (sessionId) {
      console.log('Subscribing with sessionId:', sessionId);
      subscribe({ id: sessionId, symbol: subscribeSymbol });
    }
  }, [sessionId, subscribe, subscribeSymbol]);

  useEffect(() => {
    if (websocketData && websocketData.type === 'Quote' && websocketData.data.symbol === subscribeSymbol) {
      const { time, bid, ask, volume } = websocketData.data;
      const date = new Date(time);
      const lastQuote = quotes[quotes.length - 1] || { close: (bid + ask) / 2 };

      const newQuote: Quote = {
        date,
        open: lastQuote.close,
        high: Math.max(lastQuote.close, (bid + ask) / 2),
        low: Math.min(lastQuote.close, (bid + ask) / 2),
        close: (bid + ask) / 2,
        volume: volume || 0,
      };

      setQuotes((prevQuotes) => {
        const updatedQuotes = [...prevQuotes, newQuote];
        return updatedQuotes.length > MAX_QUOTES
          ? updatedQuotes.slice(updatedQuotes.length - MAX_QUOTES)
          : updatedQuotes;
      });
    }
  }, [websocketData, quotes]);

  console.log('Qoutes',quotes);

  const handleSubscribeSymbolChange = (symbol: string) => {
    setSubscribeSymbol(symbol);
    setQuotes([]);
  }

  return (
    <FlexCol>
      <Typography variant="h4" component="h1" gutterBottom>
        {subscribeSymbol} Chart
      </Typography>
      <FlexRow>
        {error ? (
          <Typography variant="body1" color="error">
            WebSocket Error: {error.message}
          </Typography>
        ) : quotes.length > 0 ? (
          <StyledContainer>
            <ChartRenderer quotes={quotes} chartType={chartType} />
          </StyledContainer>
        ) : (
          <StyledContainer>
            <CircularProgress />
            <Typography variant="body1">Waiting for quotes...</Typography>
          </StyledContainer>
        )}
        <OptionsContainer>
          <Dropdown
            label="Subscribe Symbol"
            value={subscribeSymbol}
            options={[
              { label: 'EURUSD', value: 'EURUSD' },
              { label: 'GBPUSD', value: 'GBPUSD' },
              { label: 'USDJPY', value: 'USDJPY' },
              { label: 'AUDUSD', value: 'AUDUSD' },
            ]}
            onChange={handleSubscribeSymbolChange}
          />
          <Dropdown
            label="Chart Type"
            value={chartType}
            options={[
              { label: 'Candlestick', value: 'candlestick' },
              { label: 'Line', value: 'line' },
              { label: 'Bar', value: 'bar' },
              { label: 'Area', value: 'area' },
            ]}
            onChange={setChartType}
          />
          <LogoutButton closeSocket={closeSocket} />
        </OptionsContainer>
      </FlexRow>
    </FlexCol>
  );
};

export default ChartPage;
