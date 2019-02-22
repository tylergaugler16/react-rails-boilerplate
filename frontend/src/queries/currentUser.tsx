import * as React from "react";
import { getApi } from 'utils/apiUtil';
import { User } from 'types';

interface IProps {
  history?: any;
  location?: any;
  match?: any;
}
interface IState {
  currentUser: User| null;
  currentUserIsLoading: boolean;
}

export default function withCurrentUser(
  WrappedComponent: React.ComponentType<any>,
) {
  class WithCurrentUser extends React.Component< IProps, IState> {
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

    public componentWillReceiveProps(nextProps: IProps){
      if(nextProps.location.pathname !== this.props.location.pathname){
        this.setState({
          currentUserIsLoading: true,
        }, () => {
          this.getCurrentUser();
        })
      }

    }

    private getCurrentUser(){
      const api = getApi();
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


    public render() {
      return (
        <WrappedComponent
                  {...this.props}
                  currentUser={this.state.currentUser}
                  currentUserIsLoading={this.state.currentUserIsLoading} />
                )
              }
  }

  return WithCurrentUser
}
