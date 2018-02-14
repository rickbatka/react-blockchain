import * as React from 'react';
import { observer } from 'mobx-react';
import { BNode } from './Node';

@observer
export class NodeView extends React.Component<{node: BNode}> {

  constructor(props:{node: BNode}){
    super(props);
  }

  render() {
    return (
      <li className="node">
        Node {this.props.node.nodeId}
      </li>
    );
  }
}
