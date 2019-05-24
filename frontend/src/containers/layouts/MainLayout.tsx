
import * as React from 'react';
import Header from "containers/layouts/Header";
import { User } from "types";

interface IProps{
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
    const {children} = this.props;
    return (
      <div>
        <Header {...this.props} />
          {children}
      </div>
    );
  }
}

export default MainLayout;
