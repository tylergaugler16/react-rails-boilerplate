import * as React from 'react';
import withNotificationAlert from "components/withNotificationAlert";
import OrganizationSelect from "containers/organizations/OrganizationSelect";
import { User } from "types";

interface IProps{
  match?: any;
  history?: any;
  location?: any;
  currentUser: User;
  infoAlert: (message: string, redirectUrl?: string) => void;
}
class Home extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  private logout(){
    localStorage.removeItem('token');
    this.props.infoAlert("Signed out!","/signup");
  }


  public render() {
    const{currentUser} = this.props;
    if(!currentUser){
      return null;
    }
    return (
      <div className="App">
      you are logged in as {currentUser.firstName}!
      <button onClick={this.logout}> Log out </button>
        <OrganizationSelect currentUser={currentUser}/>
      </div>
    );
  }
}

export default withNotificationAlert(Home);
