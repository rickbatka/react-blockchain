import * as React from 'react';
import './App.css';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { ChangeEvent } from 'react';

const logo = require('./logo.svg');

@observer
class App extends React.Component {
  @observable name: string = 'asd';

  constructor(props: any) {
    super(props);
  }
  
  public nameChanged = (e: ChangeEvent<HTMLInputElement>) => {
    this.name = e.target.value;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React, {name}</h1>
        </header>
        <p className="App-intro">
          <input name="yourname" value={this.name} onChange={this.nameChanged} />
        </p>
        <h3>here it is: {this.name} </h3>
      </div>
    );
  }
}

export default App;
