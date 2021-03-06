/// <reference types="react-scripts" />

declare module 'react-charts';

type reading = {
  _id: string,
  user: string,
  title: string | null,
  monitored?: boolean,
  createdAt: Date,
  showPlot?: boolean,
  samples?: string[],
};