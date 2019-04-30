import * as React from "react";
import { getApi } from "utils/apiUtil";
import { WorkspacesQuery, User } from "types";

interface IProps {
  [prop: string]: any;
  currentUser?: User | null;
  currentUserIsLoading?: boolean;
  history?: any;
  location?: any;
  match?: any;
}
interface IState {
  data: WorkspacesQuery;
  queryIsLoading: boolean;
}

export default function withWorkspacesQuery(
  WrappedComponent: React.ComponentType<any>
) {
  class WithWorkspacesQuery extends React.Component<IProps, IState> {
    private compHasMounted: boolean = false;
    constructor(props: IProps) {
      super(props);
      this.state = {
        data: {
          workspaces: null
        },
        queryIsLoading: false
      };
    }
    public componentWillUnmount() {
      this.compHasMounted = false;
    }
    public async componentDidMount() {
      const { currentUser } = this.props;
      if(!currentUser){
        return;
      }
      this.compHasMounted = true;
      this.setState(
        {
          queryIsLoading: true
        },
        () => {
          const api = getApi();
          api
            .get(`api/workspaces`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
            })
            .then(res => {
              if (res.data && this.compHasMounted) {
                this.setState({
                  data: res.data,
                  queryIsLoading: false
                });
              }
            })
            .catch(() => {
              if (this.compHasMounted) {
                this.setState({
                  queryIsLoading: false
                });
              }
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

  return WithWorkspacesQuery;
}
