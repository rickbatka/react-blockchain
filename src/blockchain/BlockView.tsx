import * as React from 'react';
import { observer } from 'mobx-react';
import { Block } from './Block';

@observer
export class BlockView extends React.Component<{ block: Block }> {

    constructor(props: { block: Block }) {
        super(props);
    }

    render() {
        return (
            <li className={`block ${this.props.block.isValid ? 'valid' : 'invalid'}`}>
                <p>Block {this.props.block.index}</p>
                <p className="data">text data</p>
                <p>PrevHash {this.props.block.previousHash}</p>
                <p>Hash {this.props.block.hash}</p>
            </li>
        );
    }
}
