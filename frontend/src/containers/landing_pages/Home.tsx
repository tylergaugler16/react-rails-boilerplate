import * as React from "react";
import LoggedInHome from "containers/users/Home";

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
    const {currentUser} = this.props;
    return (
      <React.Fragment>
        {currentUser ? (
          <LoggedInHome currentUser={currentUser} history={history}/>
        ) : (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">Welcome to Widgetly</h1>
            </header>
            <About test="hello" />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
