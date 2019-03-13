import * as React from 'react';
import withNotificationAlert from "components/withNotificationAlert"

import { User } from "types";

interface IProps{
  match?: any;
  history?: any;
  location?: any;
  currentUser: User;
  infoAlert: (message: string, redirectUrl?: string) => void;
}
class Settings extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }



  public render() {
    const{currentUser} = this.props;
    if(!currentUser){
      return null;
    }
    return (
      <div className="App">
        Settings for: {currentUser.firstName}!
      </div>
    );
  }
}

export default withNotificationAlert(Settings);
