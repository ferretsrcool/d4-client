import React from 'react';

import Plot from './Plot';

import { API_URL } from './config';

import Socket from './Socket';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

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
    return (
      <Container fluid className="main">
        <Row className='page-title-div'>
            <h1 className='page-title'>Monitor</h1>
        </Row>
        <Row style={{ justifyContent: 'center', }}>
          <Plot style={this.props.style} samples={this.state.samples} />
        </Row>
      </Container>
    );
  }
}

export default Monitor;
