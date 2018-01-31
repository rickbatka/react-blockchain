import * as React from 'react';
import './App.css';
import { observable } from "mobx"

const logo = require('./logo.svg');

class App extends React.Component {
  @observable name: string = 'asd';
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, {name}</h1>
        </header>
        <p className="App-intro">
          <input name="yourname" value="" onChange=TODORICK/>
        </p>
      </div>
    );
  }
}

export default App;
