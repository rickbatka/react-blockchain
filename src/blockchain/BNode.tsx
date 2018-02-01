import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
export class BNode extends React.Component {
  @observable public nodeId: number;

  constructor(props: {nodeId: number}) {
    super(props);
    this.nodeId = props.nodeId;
  }


  render() {
    return (
      <div className="node">
        Node here, id {this.nodeId}.
      </div>
    );
  }
}
