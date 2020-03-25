import * as React from "react";

import { User } from "types";

interface IProps {
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
}

class Home extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div className="landing-home-container default-wrapper-padding">

        <h1 className="title-1">Welcome to React-Rails Boilerplate</h1>
      </div>
    );
  }
}

export default Home;
