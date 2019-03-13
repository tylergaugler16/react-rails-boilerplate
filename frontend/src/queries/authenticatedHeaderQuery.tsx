import * as React from "react";
import { getApi } from "utils/apiUtil";
import { AuthencicatedHeaderQuery, User } from "types";

interface IProps {
  [prop: string]: any;
  currentUser?: User | null;
  currentUserIsLoading?: boolean;
  history?: any;
  location?: any;
  match?: any;
}
interface IState {
  data: AuthencicatedHeaderQuery;
  queryIsLoading: boolean;
}

export default function withAuthenticationHeaderQuery(
  WrappedComponent: React.ComponentType<any>
) {
  class WithAuthenticationHeaderQuery extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        data: {
          user: null,
          organizations: null
        },
        queryIsLoading: false
      };
    }
    public async componentWillMount() {
      this.setState(
        {
          queryIsLoading: true
        },
        () => {
          const api = getApi();
          api
            .get(`api/users/authenticated_header_info`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            })
            .then(res => {
              if (res.data) {
                this.setState({
                  data: res.data,
                  queryIsLoading: false
                });
              }
            })
            .catch(() => {
              this.setState({
                queryIsLoading: false
              });
            });
        }
      );
    }

    public render() {
      return (
        <WrappedComponent
          {...this.props}
          data={this.state.data}
          queryIsLoading={this.state.queryIsLoading}
        />
      );
    }
  }

  return WithAuthenticationHeaderQuery;
}
