import * as React from "react";
import Home from "containers/landing_pages/Home";
import Settings from "containers/users/Settings";
import UserIsAuthenticated from "components/UserIsAuthenticated";
import Header from "containers/layouts/Header";
import WithCurrentUser from "queries/currentUser";
import Login from "containers/landing_pages/Login";
import SignUp from "containers/landing_pages/Signup";
import Test from "containers/landing_pages/Test";
import SignupAndLoginWrapper from "containers/landing_pages/SignupAndLoginWrapper";
import ShowWorkspace from "containers/workspaces/ShowWorkspace";

import NewWidget from "containers/widgets/NewWidget";
import { Route } from "react-router-dom";
import { User } from "types";
import CurrentUserContext from "contexts/currentUser";


interface IProps {
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
}

class CustomRouter extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
    this.userIsAuthenticated = this.userIsAuthenticated.bind(this);
  }
  private userIsAuthenticated(component: any){
    const {
      currentUser,
      currentUserIsLoading
    } = this.props;
    return UserIsAuthenticated(component, currentUserIsLoading, currentUser );
  }
  public render() {
    const {
      history,
      match,
      location,
      currentUser,
      currentUserIsLoading
    } = this.props;
    const defaultProps = {
      history,
      match,
      location,
      currentUser,
      currentUserIsLoading
    };
    return (
      <React.Fragment>
      <CurrentUserContext.Provider value={{currentUser, currentUserIsLoading}}>
        <Header {...defaultProps} />
        <div className="main-content">
          <Route
            exact={true}
            path="/"
            render={(props: any) => <Home {...defaultProps} />}
          />
          <Route
            exact={true}
            path="/login"
            render={(props: any) => <Login {...defaultProps} />}
          />
          <Route
            exact={true}
            path="/signup"
            render={(props: any) => <SignUp {...defaultProps} />}
          />
          <Route
            exact={true}
            path="/test"
            render={(props: any) => <Test {...defaultProps} />}
          />
          <Route
            exact={true}
            path="/users/login"
            render={(props: any) => <SignupAndLoginWrapper {...defaultProps} currentView="login" />}
          />
          <Route
            exact={true}
            path="/users/signup"
            render={(props: any) => <SignupAndLoginWrapper {...defaultProps} currentView="signup" />}
          />


          <Route
            exact={true}
            path="/settings"
            component={this.userIsAuthenticated(Settings)}
            {...defaultProps}
          />
          <Route
            exact={true}
            path="/workspace/:workspace_id"
            component={this.userIsAuthenticated(ShowWorkspace)}
            {...defaultProps}
          />
          <Route
            exact={true}
            path="/workspace/:workspace_id/widget/new"
            component={this.userIsAuthenticated(NewWidget)}
            {...defaultProps}
          />

        </div>
        </CurrentUserContext.Provider>
      </React.Fragment>
    );
  }
}

export default WithCurrentUser(CustomRouter);
