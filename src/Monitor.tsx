import React from 'react';

import Plot from './Plot';

import { API_URL } from './config';

import Socket from './Socket';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from'react-bootstrap/Button';

interface props {
  style: object;
  monitoredReadings: reading[];
};

interface state {
  samples: string[];
  realTime: boolean;
  scale: string;
};

class Monitor extends React.Component<props, state> {

  constructor(props: props) {
    super(props);


    this.state = {
      samples: [],
      realTime: true,
      scale: 'linear',
    };

    this.onSample = this.onSample.bind(this);
    this.onReading = this.onReading.bind(this);
    this.toggleRealTime = this.toggleRealTime.bind(this);
    this.toggleScale = this.toggleScale.bind(this);
  }

  componentDidMount() {
    fetch(`${API_URL}/reading/samples`)
    .then(res => res.json())
    .then((samples: string[]) => this.setState({ 
      samples,
    }))
    .catch((err: any) => console.log('Will render it later.'));
    
    Socket.onSample(this.onSample);
    Socket.onReading(this.onReading);
  }

  toggleRealTime() {
    this.setState((prevState) => ({
      realTime: prevState.realTime ? false : true,
    }))
  }

  toggleScale() {
    this.setState((prevState) => ({
      scale: prevState.scale === 'linear' ? 'log' : 'linear',
    }));
  }

  onSample(sample: string) {
    this.setState((prevState: state) => ({
      samples: [...prevState.samples, sample], 
    }));
  }

  onReading() {
    this.setState({
      samples: [],
    });
  }

  render() {
    const plottedData = this.state.realTime ?
      this.state.samples : this.props.monitoredReadings;
    return (
      <Container fluid className="main">
        <Row className='page-title-div'>
            <h1 className='page-title'>Monitor</h1>
        </Row>
        <Row style={{ justifyContent: 'center', }}>
          <Plot 
            style={this.props.style} 
            data={plottedData}
            scale={this.state.scale}
          />
        </Row>
        <Row style={{ justifyContent: 'center', }}>
          <Button 
            variant='primary'
            onClick={this.toggleRealTime}  
          >
            { this.state.realTime ? 'Compare' : 'Real Time' }
          </Button>
          <Button 
            variant='primary'
            onClick={this.toggleScale}  
          >
            { this.state.scale === 'linear' ? 'Logarithmic' : 'Linear' }
          </Button>
        </Row>
      </Container>
    );
  }
}

export default Monitor;
