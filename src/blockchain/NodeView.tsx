import * as React from 'react';
import { observer } from 'mobx-react';
import { INode } from './INode';

@observer
export class NodeView extends React.Component<{node: INode}> {

  constructor(props:{node: INode}){
    super(props);
  }

  render() {
    return (
      <li className="node">
        Node {this.props.node.nodeId}.
      </li>
    );
  }
}
