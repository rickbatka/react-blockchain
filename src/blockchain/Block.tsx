import * as React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
/* import { ChangeEvent } from 'react'; */

@observer
class Block extends React.Component {
  @observable name: string = 'asd';

  constructor(props: any) {
    super(props);
  }


  render() {
    return (
      <div className="block">
        Block here.
      </div>
    );
  }
}

export default Block;
