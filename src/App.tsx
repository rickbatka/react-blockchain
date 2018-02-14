import * as React from 'react';
import './App.css';
import 'bulma/css/bulma.css';
import { observer } from 'mobx-react';
import { Network } from './blockchain/Network';
import { NodeView } from './blockchain/NodeView';
import { BlockView } from './blockchain/BlockView';

const logo = require('./logo.svg');

@observer
class App extends React.Component {

    constructor(props: any) {
        super(props);
        Network.addNode();
        window.setTimeout(Network.addNode, 500);
    }

    render() {
        let allNodes = Network.queryNodes.get();
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Blockchain demo{name}</h1>
                </header>

                <div className="columns is-marginless" id="main-content">
                    <div className="column left-sidebar">
                        <h1 className="subheader">
                            Nodes
                        </h1>
                        <ul>
                            {allNodes.map(n =>
                                <NodeView node={n} key={n.nodeId} />
                            )}
                        </ul>
                    </div>
                    <div className="column middle is-three-fifths">
                        <h1 className="subheader">Blocks</h1>
                        {allNodes.map(n =>
                            <ul className="blockchain" key={n.nodeId}>
                                {n.blocks.map(b =>
                                    <BlockView block={b} key={b.index} />
                                )}
                            </ul>
                        )}

                    </div>
                    <div className="column right-sidebar">
                        <h1 className="subheader">
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
