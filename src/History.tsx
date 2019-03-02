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

    this.loadSamples = this.loadSamples.bind(this);
    this.plotReading = this.plotReading.bind(this);
    this.renderReading = this.renderReading.bind(this);
    this.onReading = this.onReading.bind(this);
    this.addToMonitor = this.addToMonitor.bind(this);
    this.removeFromMonitor = this.removeFromMonitor.bind(this);
    
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

  loadSamples(readingIndex: number): Promise<void> {
    const readings = this.state.readings;
    return fetch(`${API_URL}/reading/${readings[readingIndex]._id}`)
    .then(res => res.json())
    .then(reading => {
      readings[readingIndex] = reading;
      this.setState({
        readings
      });
    });
  }

  addToMonitor(index: number) {
    return () => {
      const readings = this.state.readings;
      if(!readings[index].samples) {
        this.loadSamples(index)
        .then(() => {
          this.props.addToMonitor(readings[index])
          readings[index].monitored = true;
          this.setState({
            readings
          });
        });
      } else {
        this.props.addToMonitor(readings[index]);
        readings[index].monitored = true;
        this.setState({
          readings
        });
      }
    };
  }

  removeFromMonitor(index: number) {
    return () => {
      const readings = this.state.readings;
      this.props.removeFromMonitor(readings[index]);
      readings[index].monitored = false;
      this.setState({
        readings
      });
    }
  }

  plotReading(index: number) {
    return () => {
      const readings = this.state.readings;
      // Toggle between showing and hiding the plot
      if(!readings[index].showPlot) {
        // Load the samples if not already loaded.
        if(!readings[index].samples) {
          this.loadSamples(index)
          .then(() => {
            readings[index].showPlot = true;
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
    const { _id, createdAt } = reading;
    const date = new Date(createdAt);
    return (
      <div key={_id}>
        <Row className={`reading ${index % 2 ? 'even' : 'odd'}`} >
          <Col sm={6} className='date'>{date.toLocaleString()}</Col>
          <Col sm={3} className='show-reading'>
            {
              !reading.showPlot ?
              (
              <Button onClick={this.plotReading(index)} variant='primary'>
                Show plot
              </Button>
              ) :
              (
                <Button onClick={this.plotReading(index)} variant='danger'>
                  Hide plot
                </Button>
              )
            }
          </Col>
          <Col sm={3} className='add-to-monitor'>
            {
              !reading.monitored ?
              (
                <Button 
                  variant='primary'
                  onClick={this.addToMonitor(index)}  
                >
                  Add to monitor
                </Button>
              ) :
              (
                <Button 
                  variant='danger'
                  onClick={this.removeFromMonitor(index)}  
                >
                  Remove from monitor
                </Button>
              )
            }
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
