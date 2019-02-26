import * as React from 'react';
import Home from "containers/landing_pages/Home";
import LoggedInHome from "containers/users/Home";
import UserIsAuthenticated from "components/UserIsAuthenticated";
import WithCurrentUser from "queries/currentUser";
import Login from "containers/landing_pages/Login";
import SignUp from "containers/landing_pages/Signup"
import { Route } from "react-router-dom";
import {User} from 'types'


interface IProps {
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
}


class CustomRouter extends React.Component <IProps,{}> {
  constructor(props: IProps) {
    super(props);
  }
  public render(){
    const {history, match, location, currentUser, currentUserIsLoading} = this.props;
    const defaultProps = {
      history,
      match,
      location,
      currentUser,
      currentUserIsLoading
    }
    return (
          <div>
            <Route exact={true} path="/" component={Home} {...defaultProps} test={"ey"}/>
            <Route exact={true} path="/login" component={Login} {...defaultProps} />
            <Route exact={true} path="/signup" component={SignUp} {...defaultProps} />
            <Route exact={true} path="/users/home" component={UserIsAuthenticated(LoggedInHome, currentUserIsLoading, currentUser)} {...defaultProps} />

          </div>
    )
  }
}

export default WithCurrentUser(CustomRouter);
