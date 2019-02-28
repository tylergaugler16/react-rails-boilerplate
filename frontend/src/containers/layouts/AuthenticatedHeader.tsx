import * as React from 'react';
import { User } from "types";
import { Link } from "react-router-dom";

interface IProps{
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
}
class Header extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const{ currentUser } = this.props;
    if(!currentUser){
      return null;
    }
    return (
      <div className="columns">
        <div className="column">{`${currentUser.firstName} ${currentUser.lastName}`}</div>
          <div className="column"><Link to="/">Home</Link></div>
        <div className="column">Settings</div>
      </div>
    );
  }
}

export default Header;
