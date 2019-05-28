import * as React from "react";
import UnauthenticatedHeader from "containers/layouts/UnauthenticatedHeader";
import { User } from "types";

interface IProps {
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
  children: any;
}
class LandingLayout extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { children } = this.props;
    return (
      <div>
        <div className="header">
            <UnauthenticatedHeader {...this.props}/>
        </div>
        {children}
      </div>
    );
  }
}

export default LandingLayout;
