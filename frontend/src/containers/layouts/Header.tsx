import * as React from 'react';
import AuthenticatedHeader from "containers/layouts/AuthenticatedHeader";
import UnauthenticatedHeader from "containers/layouts/UnauthenticatedHeader";
import { User } from "types";

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
    return (
      <div className="header">
        {
          currentUser?
            <AuthenticatedHeader {...this.props} />
          :
            <UnauthenticatedHeader />
        }
      </div>
    );
  }
}

export default Header;
