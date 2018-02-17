import * as React from 'react';
import { observer } from 'mobx-react';
import { Miner } from './Miner';
const spinner = require('./../tail-spin.svg');

@observer
export class MinerView extends React.Component<{ miner: Miner }> {

    constructor(props: { miner: Miner }) {
        super(props);
    }

    render() {
        return (
            <li className="node miner">
                Miner {this.props.miner.minerId}
                {this.props.miner.mining ? 
                    <p>Mining...<br /><img src={spinner} /></p>
                    : <p>Waiting...</p>}
            </li>
        );
    }
}
