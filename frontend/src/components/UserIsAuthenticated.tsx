import * as React from "react";

import { User } from 'types';

interface IProps {
  currentUser: User;
  currentUserIsLoading: boolean;
  history: any;
}

export default function UserIsAuthenticated(
  WrappedComponent: React.ComponentType<any>,
  currentUserIsLoading: boolean,
  currentUser: User | null,
) {
  class ComponentUserIsAuthenticated extends React.Component<IProps, {}> {
    constructor(props: IProps) {
      super(props);
      this.redirectIfUserIsNotAuthenticated = this.redirectIfUserIsNotAuthenticated.bind(
        this
      );
    }

    public componentWillMount() {
      this.redirectIfUserIsNotAuthenticated();
    }

    public componentWillReceiveProps(nextProps: IProps) {
      this.redirectIfUserIsNotAuthenticated(nextProps);
    }

    private redirectIfUserIsNotAuthenticated(props?: IProps) {
      console.log(currentUserIsLoading);
      console.log(currentUser);
      if(currentUserIsLoading){
          return;
        }
      else if(currentUser){
        return;
      }
      else{
          this.props.history.push("/login")
        }
      }


    public render() {
      return <WrappedComponent {...this.props} currentUserIsLoading={currentUserIsLoading} currentUser={currentUser} />;
    }
  }

  return ComponentUserIsAuthenticated
}
