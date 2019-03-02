import React, { Component } from 'react';

import './History.css';

import Socket from './Socket';

import Plot from './Plot';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { API_URL } from './config';

interface props {
  addToMonitor: CallableFunction;
  removeFromMonitor: CallableFunction;
};

interface state {
  readings: reading[]; 
};

class App extends Component<props, state> {

  constructor(props: props) {
    super(props);

    this.state = {
      readings: [],
    };

    this.fetchSamples = this.fetchSamples.bind(this);
    this.plotReading = this.plotReading.bind(this);
    this.renderReading = this.renderReading.bind(this);
    this.onReading = this.onReading.bind(this);
    
    Socket.onReading(this.onReading);
  }

  componentDidMount() {
    fetch(`${API_URL}/reading`)
    .then(res => res.json())
    .then(readings => this.setState({ readings }));
  }

  onReading(reading: reading) {
    this.setState((prevState: state) => ({
      readings: [...prevState.readings, reading],
    }));
  }

  fetchSamples(readingId: string) {
    return fetch(`${API_URL}/reading/${readingId}`)
      .then(res => res.json())
  }

  plotReading(index: number) {
    return () => {
      const readings = this.state.readings;
      // Toggle between showing and hiding the plot
      if(!readings[index].showPlot) {
        // Load the samples if not already loaded.
        if(!readings[index].samples) {
          this.fetchSamples(readings[index]._id)
          .then(reading => {
            readings[index] = {
              showPlot: true,
              ...reading,
            };
            this.setState({
              readings
            });
          });
        } else {
          readings[index].showPlot = true;
          this.setState({
            readings
          });
        }
      } else {
        readings[index].showPlot = false;
        this.setState({
          readings
        });
      }
    };
  }

  renderReading(reading: reading, index: number) {
    const { _id, title, createdAt } = reading;
    const date = new Date(createdAt);
    return (
      <div key={_id}>
        <Row className={`reading${index % 2 ? ' even' : ' odd'}`} >
          <Col sm={6} className='date'>{date.toLocaleString()}</Col>
          <Col sm={3} className='show-reading'>
            <Button onClick={this.plotReading(index)} variant='primary'>
              Show plot
            </Button>
          </Col>
          <Col sm={3} className='add-to-monitor'>
            <Button variant='primary'>
              Add to monitor
            </Button>
          </Col>
        </Row>
        {
            reading.showPlot ?
            (<Row className='plot' >
              <Plot samples={reading.samples || []} />
            </Row>)
            : null
        }
      </div>
    );
  }

  render() {
    console.log(this.state.readings);
    return (
      <Container className="main">
        <Row className='history-title-div'>
            <h1 className='page-title'>Readings history</h1>
        </Row>
        <div className='readings-list'>
          {
            this.state.readings.map(this.renderReading)
          }
        </div>
      </Container>
    );
  }
}

export default App;
