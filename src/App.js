import React, { Component } from 'react';
import './App.css';
import CreateStudent from '../src/components/CreateStudent';
class App extends Component {
  render() {
    return (
      <div className="App">
        <CreateStudent />
      </div>
    );
  }
}

export default App;
