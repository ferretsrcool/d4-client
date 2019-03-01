import React from 'react';

import Plot from './Plot';

import { API_URL } from './config';

import Socket from './Socket';

interface props {
  style: object;
};

interface state {
  samples: number[];
};

class Monitor extends React.Component<props, state> {

  constructor(props: props) {
    super(props);


    this.state = {
      samples: [],
    };
   

    this.onSample = this.onSample.bind(this);
    this.onReading = this.onReading.bind(this);
    
  }

  componentDidMount() {
    fetch(`${API_URL}/reading/samples`)
    .then(res => res.json())
    .then((samples: string[]) => this.setState({ 
      samples: samples.map((sample: string) => parseFloat(sample)) 
    }))
    .catch((err: any) => console.log('Will render it later.'));
    
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
      return <Plot style={this.props.style} samples={this.state.samples} />; 
    }
    return null;
  }
}

export default Monitor;
