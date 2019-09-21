import * as React from "react";
import AuthenticatedHeader from "containers/layouts/AuthenticatedHeader";
import { User } from "types";

interface IProps {
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
  children: any;
}
class MainLayout extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { children } = this.props;
    return (
      <React.Fragment>
        <div className="header">
          <AuthenticatedHeader {...this.props} />
        </div>
          {children}
      </React.Fragment>
    );
  }
}

export default MainLayout;
