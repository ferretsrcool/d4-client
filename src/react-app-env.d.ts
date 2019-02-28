/// <reference types="react-scripts" />

declare module 'react-charts';

type reading = {
  _id: string,
  user: string,
  title: string | null,
  createdAt: Date,
  showPlot?: boolean,
  samples?: number[],
};