import * as React from 'react';
import Home from "../../containers/landing_pages/Home";
import LoggedInHome from "../../containers/users/Home";
import UserIsAuthenticated from "../../components/UserIsAuthenticated";

import Login from "../../containers/landing_pages/Login";
import { Route } from "react-router-dom";
import {User} from '../../types'


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
  // private isAuthenticated(){
  //   const {currentUserIsLoading, currentUser} = this.props;
  //   if(currentUserIsLoading || currentUser){
  //     return true;
  //   }else{
  //     return false;
  //   }
  // }
  public render(){
    const {history, match, location} = this.props;
    const defaultProps = {
      history,
      match,
      location
    }
    return (
          <div>
            <Route exact={true} path="/" component={Home} {...defaultProps} />
            <Route exact={true} path="/login" component={Login} {...defaultProps} />
            <Route exact={true} path="/users/home" component={UserIsAuthenticated(LoggedInHome)} {...defaultProps} />
          </div>
    )
  }
}

export default CustomRouter;
