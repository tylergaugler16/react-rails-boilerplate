import * as React from 'react';
import { api } from './utils/apiUtil';
import { withRouter } from "react-router";
import CustomRouter from './containers/layouts/_CustomRouter';

import {User} from './types';

interface IProps {
  match: any;
  history: any;
  location: any;
}

interface IState {
  currentUser: User| null;
  currentUserIsLoading: boolean;
}


class App extends React.Component <IProps,IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {currentUser: null, currentUserIsLoading: false }
    this.getCurrentUser = this.getCurrentUser.bind(this);
  }
  public async componentWillMount() {
    this.setState({
      currentUserIsLoading: true,
    }, () => {
      this.getCurrentUser();
    })

  }

  private getCurrentUser(){
    api.get(`users/current_user`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => {
          if(res.data){
              this.setState({
                currentUser: res.data.currentUser,
                currentUserIsLoading: false
              })
          }

        }).catch( () => {
          this.setState({
            currentUserIsLoading: false
          })
        })
  }
  public render(){
    const {currentUser, currentUserIsLoading} = this.state;
    const {match, history, location} = this.props;
    return (
      <div>
      {
        currentUser && currentUser.id ?
          <div>user is logged in! {currentUser.id}</div>
        :
          <div>NO USER</div>
      }
        <CustomRouter currentUser={currentUser} currentUserIsLoading={currentUserIsLoading} match={match} history={history} location={location}/>
      </div>

    )
  }
}


export default withRouter(App);
