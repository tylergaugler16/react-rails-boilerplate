import * as React from "react";

import About from "containers/landing_pages/About";

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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Widgetly</h1>
        </header>
        <About test="hello" />
      </div>
    );
  }
}

export default Home;
