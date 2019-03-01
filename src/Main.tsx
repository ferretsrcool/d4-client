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
    <Container fluid style={{ height: '100%'}}>
      <Row style={{height: '500px',}} className='monitor-tab'>
        <Monitor style={{ marginTop: '50px',}} />
      </Row>
      <Row style={{height: '500px', overflow: 'scroll',}} className='history-tab'>
        <History />
      </Row>
    </Container>
  )
};

export default Main;

