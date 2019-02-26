import * as React from 'react';

import withNotificationAlert from "components/withNotificationAlert"


interface IProps{
  history: any;
  errorAlert: (message: string, redirectUrl?: string) => void;
  test: any;
}



class About extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }




  public render() {
    return (
      <div className="App">
        <button onClick={() => this.props.errorAlert("hello")}>ALERT</button>
      </div>
    );
  }
}

export default withNotificationAlert(About);
