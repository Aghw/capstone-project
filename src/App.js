import React, { Component } from 'react';
import logo from './logo.svg';
import Company from './StockMarket';
import ExampleChart from './ExampleChart';
import './App.css';
import './StockMarket/Stock.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Capstone React Project</h1>
        </header>
        <div className="page-header">
          <h1 id="primary-content">Financial Stock Performances</h1>
        </div>
        {/* <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p> */}
        {/* <div className="page-setting"> */}
          <Company />
        {/* </div> */}
        {/* <ExampleChart /> */}
        <footer>
          <p>Page layout design and react components code by asmerom.</p>
          <p>Copyright &#169; 2018, All rights reserved.</p>
        </footer>
      </div>
    );
  }
}

export default App;
