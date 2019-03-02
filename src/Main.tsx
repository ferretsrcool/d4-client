import React from 'react';

import Monitor from './Monitor';
import History from './History';

import Socket from './Socket';

import './Main.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

interface props {};

interface state {
  monitoredReadings: reading[];
}

class Main extends React.Component<props, state> {

  constructor(props: props) {
    super(props);

    this.state = {
      monitoredReadings: [],
    };

    Socket.init(); 

    this.addToMonitor = this.addToMonitor.bind(this);
    this.removeFromMonitor = this.removeFromMonitor.bind(this);
  }

  addToMonitor(reading: reading) {
    this.setState((prevState: state) => ({
      monitoredReadings: [...prevState.monitoredReadings, reading], 
    }));
  }

  removeFromMonitor(monitoredReading: reading) {
    this.setState((prevState: state) => ({
      monitoredReadings: prevState.monitoredReadings.filter((reading: reading) => reading._id !== monitoredReading._id), 
    }));
  }

  render() {
    console.log(this.state.monitoredReadings);
    return (
      <Container>
        <Row className='monitor-tab'>
          <Monitor
            monitoredReadings={this.state.monitoredReadings}
            style={{ marginTop: '50px',}} 
          />
        </Row>
        <Row className='history-tab'>
          <History 
            addToMonitor={this.addToMonitor}
            removeFromMonitor={this.removeFromMonitor}
          />
        </Row>
      </Container>
    );
  }
}

export default Main;

