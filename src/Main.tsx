import React from 'react';

import Monitor from './Monitor';
import History from './History';

import Socket from './Socket';

import './Main.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const Main = () => {
  Socket.init(); 
  return (
    <Container fluid>
      <Row className='monitor-tab'>
        <Monitor />
      </Row>
      <Row className='history-tab'>
        <History />
      </Row>
    </Container>
  )
};

export default Main;

