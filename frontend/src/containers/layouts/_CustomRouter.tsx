import * as React from "react";
import LandingHome from "containers/landing_pages/Home";
import LoggedInHome from "containers/users/Home";
import Settings from "containers/users/Settings";
import UserIsAuthenticated from "components/UserIsAuthenticated";

import WithCurrentUser from "queries/currentUser";
import Login from "containers/landing_pages/Login";
import Test from "containers/landing_pages/Test";
import SignupAndLoginWrapper from "containers/landing_pages/SignupAndLoginWrapper";

import MainLayout from "containers/layouts/MainLayout";
import LandingLayout from "containers/layouts/LandingLayout";

import { Route, Switch } from "react-router-dom";
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
  private userIsAuthenticated(component: any) {
    const { currentUser, currentUserIsLoading } = this.props;
    return UserIsAuthenticated(component, currentUserIsLoading, currentUser);
  }
  public render() {
    const { currentUser, currentUserIsLoading } = this.props;
    const defaultProps = {
      currentUser,
      currentUserIsLoading
    };
    const AppRoute = ({
      component: Component,
      layout: Layout,
      extraProps: extraProps,
      ...rest
    }: any) => (
      <Route
        {...rest}
        render={props => (
          <Layout {...props} {...defaultProps} {...extraProps}>
            <Component {...props} {...defaultProps} {...extraProps} />
          </Layout>
        )}
      />
    );
    return (
      <React.Fragment>
        <CurrentUserContext.Provider
          value={{ currentUser, currentUserIsLoading }}
        >
          <div className="main-content">
            <Switch>
              {/* use this pattern when a path should be used differently for a logged in and logged out user */}
              {
                currentUser ?
                  <AppRoute exact path="/" layout={MainLayout} component={LoggedInHome} />
                :
                  <AppRoute exact path="/" layout={LandingLayout} component={LandingHome} />
              }


              <AppRoute
                exact
                path="/login"
                layout={LandingLayout}
                component={Login}
              />
              <AppRoute
                exact
                path="/test"
                layout={LandingLayout}
                component={Test}
              />
              <AppRoute
                exact
                path="/users/login"
                layout={LandingLayout}
                component={SignupAndLoginWrapper}
                extraProps={{ currentView: "login" }}
              />
              <AppRoute
                exact
                path="/users/signup"
                layout={LandingLayout}
                component={SignupAndLoginWrapper}
                extraProps={{ currentView: "signup" }}
              />

              <AppRoute
                exact
                path="/settings"
                layout={MainLayout}
                component={this.userIsAuthenticated(Settings)}
              />
            </Switch>
          </div>
        </CurrentUserContext.Provider>
      </React.Fragment>
    );
  }
}

export default WithCurrentUser(CustomRouter);
