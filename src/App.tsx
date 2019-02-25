import React, { Component } from 'react';

import ReactList from 'react-list';

import { API_URL } from './config';
import { mockData } from './mockData';

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

    this.renderReadings = this.renderReadings.bind(this);
  }

  componentDidMount() {
    fetch(`${API_URL}/reading`)
    .then(res => res.json())
    .then(readings => this.setState({ readings }));
  }

  generateItemName(title: string | null, date: Date) {
    const dateObject: Date = new Date(date);
    if(!title) {
      return dateObject.toLocaleString();
    }
    return `${title}-${dateObject.toLocaleString()}`;
  }

  renderReadings(index: number, key: reading) {
    const { _id, title, createdAt } = this.state.readings[index];
    return (
      <div key={_id}>
        {this.generateItemName(title, createdAt)}
      </div>
    );
  }

  render() {
    return (
      <div className="main">
        <h1>Readings history</h1>
        <div style={{ overflow: 'auto', maxHeight: 400, }}>
          <ReactList 
            itemRenderer={this.renderReadings}
            length={this.state.readings.length}
            type='uniform'
          />
        </div>
      </div>
    );
  }
}

export default App;
