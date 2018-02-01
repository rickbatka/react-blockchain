import * as React from 'react';
import { observer } from 'mobx-react';
import { Node } from './BStore'
@observer
export class NodeView extends React.Component<{node: Node}> {

  constructor(props:{node: Node}){
    super(props);
  }

  render() {
    return (
      <li className="node">
        Node here, id {this.props.node.nodeId}.
      </li>
    );
  }
}
