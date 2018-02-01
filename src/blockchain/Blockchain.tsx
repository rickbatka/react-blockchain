import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

@observer
class Blockchain extends React.Component {
  @observable name: string = 'asd';

  constructor(props: any) {
    super(props);
  }


  render() {
    return (
      <div className="blockchain">
        Blockchain.
      </div>
    );
  }
}

export default Blockchain;
