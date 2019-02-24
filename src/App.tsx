import React, { Component } from 'react';

import { Chart } from 'react-charts';

import { mockData } from './mockData';

interface props {};

interface state {
  data: number[][]; 
};

class App extends Component<props, state> {

  constructor(props: props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.setState({
      data: mockData.map((dataPoint: number, index: number) => [index * 0.5, dataPoint]),
    });
  }

  render() {
    console.log(this.state.data);
    return (
      <div className="App"
         style={{
            width: "400px",
            height: "300px"
          }}
      >
        <Chart
          data={[
            {
              label: 'Voltage change over time',
              data: this.state.data,
            }
          ]}
          axes={[
            { primary: true, type: "linear", position: "bottom" },
            { type: "linear", position: "left" }
          ]}
        />
      </div>
    );
  }
}

export default App;
