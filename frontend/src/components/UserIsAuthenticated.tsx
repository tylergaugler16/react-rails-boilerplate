import * as React from "react";
import { Redirect } from "react-router-dom";
// typings
// import { withRouter } from "react-router-dom";
import { User } from '../types';

interface IProps {
  currentUser: User;
  currentUserIsLoading: boolean;
}

export default function UserIsAuthenticated(
  WrappedComponent: React.ComponentType<any>
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
      const { currentUser, currentUserIsLoading } = props || this.props;
      if (!currentUserIsLoading && !currentUser) {
        return(
          "yo"
        )
      }
      else{
        return;
      }
    }

    public render() {
      const { currentUser, currentUserIsLoading } = this.props;
      if (currentUserIsLoading || !currentUser) {
        return <Redirect to="unathenticatd"/>
      }
      return <WrappedComponent {...this.props} />;
    }
  }

  return ComponentUserIsAuthenticated
}
