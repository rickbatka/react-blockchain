import * as React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
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
        
        <div className="columns is-marginless" id="main-content">
          <div className="column left-sidebar">
            <h1>
              Nodes
            </h1>
          </div>
          <div className="column middle is-three-fifths">
            <h1>Blocks</h1>
          </div>
          <div className="column right-sidebar">
            <h1>
              Miners
            </h1>
          </div>
        </div>
        <div id="footer-content">
          <h1>Output</h1>
        </div>
      </div>
    );
  }
}

export default App;
