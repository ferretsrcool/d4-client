import React from 'react';

import { Chart } from 'react-charts';

import math from 'mathjs';
import { InputGroup } from 'react-bootstrap';

interface props {
  data: string[] | reading[]; 
  scale?: string;
  className?: string;
  style?: object;
};

const convertSampleToScale = (sample: string, scale: string): string => {
  if (scale === 'linear') {
    return sample;
  }
  if (sample === '0') {
    throw Error('Cannot logarithmically plot sample containing 0 value.');
  }
  // @ts-ignore
  let logarithmicResult: number = math.log(parseFloat(sample), 10);
  if(!logarithmicResult) {
    logarithmicResult = Number.MIN_VALUE;
  }
  return logarithmicResult.toString();
}

const convertSamples = (samples: string[], scale: string): (string | number)[][] => {
  if (typeof samples === 'undefined') {
    throw Error('No samples provided');
  }
  return samples.map((sample: string, index: number) => [index * 0.1, convertSampleToScale(sample, scale)]);
};

const convertData = (data: any[], scale: string): (string | number)[][][] => {
  if(typeof data[0] === 'string') {
    return [convertSamples(data, scale)];
  } else {
    return data.map((reading: reading) => {
      if(typeof reading.samples === 'undefined') {
        throw Error('Cannot plot reading with no samples provided.');
      } 
      return convertSamples(reading.samples, scale);
    });
  }
};

const Plot = ({ data, scale, className, style = {} }: props) => {
  if (typeof data === 'undefined') {
    throw Error('No samples or reading given');
  }
  if (typeof scale === 'undefined') {
    scale = 'linear';
  }
  if (scale !== 'linear' && scale !== 'log') {
    throw Error('Invalid scale being used');
  }
  let plotData: (string | number)[][][]
  try { 
    plotData = convertData(data, scale);
  } catch (err) {
    return (
      <div> 
        <h1>A plotting error has occured!</h1> 
        <h3>{err.message}</h3>
      </div>
    );
  }
  console.log(plotData);
  return (
    <div className={`chart ${className || ''}`}
        style={{
          width: "400px",
          height: "300px",
          ...style,
        }}
    >
      <Chart
        data={plotData}
        axes={[
          { primary: true, type: "linear", position: "bottom" },
          { type: 'linear', position: "left" }
        ]}
      />
    </div>
  )
};

export default Plot;
