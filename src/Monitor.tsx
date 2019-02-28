import React from 'react';

import Plot from './Plot';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Socket from './Socket';

interface props {};

interface state {
  samples: number[],
};

class Monitor extends React.Component<props, state> {

  constructor(props: props) {
    super(props);


    this.state = {
      samples: [],
    };
   

    this.onSample = this.onSample.bind(this);
    this.onReading = this.onReading.bind(this);
    
    Socket.onSample(this.onSample);
    Socket.onReading(this.onReading);
  }

  onSample(sample: string) {
    this.setState((prevState: state) => ({
      samples: [...prevState.samples, parseFloat(sample)], 
    }));
  }

  onReading() {
    this.setState({
      samples: [],
    });
  }

  render() {
    if(this.state.samples.length > 0) {
      return <Plot samples={this.state.samples} />; 
    }
    return null;
  }
}

export default Monitor;
