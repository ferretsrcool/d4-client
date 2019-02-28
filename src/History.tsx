import React, { Component } from 'react';

import './History.css';

import Plot from './Plot';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { API_URL } from './config';

interface props {};

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
  }

  componentDidMount() {
    fetch(`${API_URL}/reading`)
    .then(res => res.json())
    .then(readings => this.setState({ readings }));
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
        <Row onClick={this.plotReading(index)} className={`reading${index % 2 ? ' even' : ' odd'}`} >
          <Col sm={6} className='title'>{title || ''}</Col>
          <Col sm={6} className='date'>{date.toLocaleString()}</Col>
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
      <Container fluid className="main">
        <Row className='page-title-div'>
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
