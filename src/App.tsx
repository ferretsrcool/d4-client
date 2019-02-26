import React, { Component } from 'react';

import './App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { API_URL } from './config';

interface props {};

interface reading {
  _id: string;
  user: string;
  title: string | null;
  createdAt: Date;
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

    this.plotReading = this.plotReading.bind(this);
    this.renderReading = this.renderReading.bind(this);
  }

  componentDidMount() {
    fetch(`${API_URL}/reading`)
    .then(res => res.json())
    .then(readings => this.setState({ readings }));
  }

  plotReading(index: number) {

  }

  renderReading(reading: reading, index: number) {
    const { _id, title, createdAt } = this.state.readings[index];
    const date = new Date(createdAt);
    return (
      <Row className={`reading${index % 2 ? ' even' : ' odd'}`} key={_id}>
        <Col sm={6} className='title'>{title || ''}</Col>
        <Col sm={6} className='date'>{date.toLocaleString()}</Col>
      </Row>
    );
  }

  render() {
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
