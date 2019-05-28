import * as React from "react";
import Home from "containers/landing_pages/Home";
import Settings from "containers/users/Settings";
import UserIsAuthenticated from "components/UserIsAuthenticated";

import WithCurrentUser from "queries/currentUser";
import Login from "containers/landing_pages/Login";
import SignUp from "containers/landing_pages/Signup";
import Test from "containers/landing_pages/Test";
import SignupAndLoginWrapper from "containers/landing_pages/SignupAndLoginWrapper";
import ShowWorkspace from "containers/workspaces/ShowWorkspace";

import ShowWidget from "containers/widgets/ShowWidget";
import NewWidget from "containers/widgets/NewWidget";
import EditWidgetWrapper from "containers/widgets/EditWidgetWrapper";

import EmbedWidgetWrapper from "containers/widgets/EmbedWidgetWrapper";


import MainLayout from "containers/layouts/MainLayout";
import EmbedLayout from "containers/layouts/EmbedLayout";


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
  private userIsAuthenticated(component: any){
    const {
      currentUser,
      currentUserIsLoading
    } = this.props;
    return UserIsAuthenticated(component, currentUserIsLoading, currentUser );
  }
  public render() {
    const {
      currentUser,
      currentUserIsLoading
    } = this.props;
    const defaultProps = {
      currentUser,
      currentUserIsLoading
    };
    const AppRoute = ({ component: Component, layout: Layout, extraProps: extraProps, ...rest}: any) => (
      <Route {...rest}  render={props => (
        <Layout >
          <Component  {...props} {...defaultProps} {...extraProps}/>
        </Layout>
      )} />
    )
    return (
      <React.Fragment>
      <CurrentUserContext.Provider value={{currentUser, currentUserIsLoading}}>
      <div className="main-content">

      <Switch>

        <AppRoute exact path="/embed/widget" layout={EmbedLayout} component={EmbedWidgetWrapper}/>

        <AppRoute exact path="/" layout={MainLayout} component={Home}/>
        <AppRoute exact path="/login" layout={MainLayout} component={Login}/>
        <AppRoute exact path="/signup" layout={MainLayout} component={SignUp} />
        <AppRoute exact path="/test" layout={MainLayout} component={Test} />
        <AppRoute exact path="/users/login" layout={MainLayout} component={SignupAndLoginWrapper} extraProps={ {currentView: "login" }}/>
        <AppRoute exact path="/users/signup" layout={MainLayout} component={SignupAndLoginWrapper}  extraProps={ {currentView: "signup" }}/>


        <AppRoute
         exact
         path="/settings"
         layout={MainLayout}
         component={this.userIsAuthenticated(Settings)}  />

         <AppRoute
          exact
          path="/workspace/:workspace_id"
          layout={MainLayout}
          component={this.userIsAuthenticated(ShowWorkspace)}/>

          <AppRoute
           exact
           path="/workspace/:workspace_id/widget/new"
           layout={MainLayout}
           component={this.userIsAuthenticated(NewWidget)} />

           <AppRoute
            exact
            path="/workspace/:workspace_id/widget/:widget_id"
            layout={MainLayout}
            component={this.userIsAuthenticated(ShowWidget)} />

            <AppRoute
             exact
             path="/workspace/:workspace_id/widget/:widget_id/edit"
             layout={MainLayout}
             component={this.userIsAuthenticated(EditWidgetWrapper)}/>



</Switch>


          </div>







        </CurrentUserContext.Provider>
      </React.Fragment>
    );
  }
}

export default WithCurrentUser(CustomRouter);
