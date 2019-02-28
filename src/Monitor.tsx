import React from 'react';

import Plot from './Plot';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Socket from './Socket';

interface props {};

interface state {};

class Monitor extends React.Component<props, state> {

  private socket: Socket;

  constructor(props: props) {
    super(props);

    this.socket = new Socket();

    this.state = {};
  }

  onSample(sample: string) {
    console.log(sample);
  }

  onReading(reading: reading) {
    console.log(reading);
  }

  render() {
    return (
      <div>
        Hello World!
      </div>
    )
  }
}

export default Monitor;