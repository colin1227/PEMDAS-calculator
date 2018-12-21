import React, { Component } from 'react';
import './App.css';
import Calculator from "./calculator"
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Calculator/>
        </header>
      </div>
    );
  }
}

export default App;
