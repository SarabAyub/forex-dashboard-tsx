import React from 'react';
import {
  ChartCanvas,
  Chart,
  CandlestickSeries,
  LineSeries,
  BarSeries,
  AreaSeries,
  XAxis,
  YAxis,
  plotDataLengthBarWidth,
} from 'react-financial-charts';
import { scaleTime } from 'd3-scale';
import { timeFormat } from 'd3-time-format';
import { Box } from '@mui/material';

interface Quote {
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
}

interface ChartRendererProps {
  quotes: Quote[];
  chartType: 'candlestick' | 'line' | 'bar' | 'area';
}

const ChartRenderer: React.FC<ChartRendererProps> = ({ quotes, chartType }) => {
  const xScale = scaleTime();
  const xAccessor = (d: Quote) => d?.date || new Date();
  const xExtents = [
    quotes.length > 100 ? quotes[quotes.length - 100].date : quotes[0]?.date || new Date(),
    quotes[quotes.length - 1]?.date || new Date(),
  ];

  const renderChart = () => {
    switch (chartType) {
      case 'candlestick':
        return <CandlestickSeries widthRatio={0.8} />;
      case 'line':
        return <LineSeries yAccessor={(d: Quote) => d.close} />;
      case 'bar':
        return (
          <BarSeries
            yAccessor={(d: Quote) => d.close}
            width={plotDataLengthBarWidth}
            strokeStyle="green"
          />
        );
      case 'area':
        return <AreaSeries yAccessor={(d: Quote) => d.close} />;
      default:
        return <CandlestickSeries widthRatio={0.8} />;
    }
  };

  return (
    <Box>
      <ChartCanvas
        height={400}
        width={800}
        ratio={window.devicePixelRatio || 1}
        margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
        data={quotes}
        xScale={xScale}
        xAccessor={xAccessor}
        xExtents={xExtents}
        seriesName="ChartRenderer"
      >
        <Chart id={1} yExtents={(d: Quote) => [d.high, d.low]}>
          <XAxis axisAt="bottom" orient="bottom" tickFormat={timeFormat('%H:%M')} />
          <YAxis axisAt="left" orient="left" ticks={5} />
          {renderChart()}
        </Chart>
      </ChartCanvas>
    </Box>
  );
};

export default ChartRenderer;
