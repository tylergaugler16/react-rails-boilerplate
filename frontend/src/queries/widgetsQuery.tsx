import * as React from "react";
import { getApi } from "utils/apiUtil";
import { WidgetsQuery, User } from "types";

interface IProps {
  [prop: string]: any;
  currentUser?: User | null;
  currentUserIsLoading?: boolean;
  history?: any;
  location?: any;
  match?: any;
}
interface IState {
  data: WidgetsQuery;
  queryIsLoading: boolean;
}

export default function withWidgetsQuery(
  WrappedComponent: React.ComponentType<any>
) {
  class WithWidgetsQuery extends React.Component<IProps, IState> {
    private compHasMounted: boolean = false;
    constructor(props: IProps) {
      super(props);
      this.state = {
        data: {
          widgets: null
        },
        queryIsLoading: false
      };
    }
    public componentWillUnmount() {
      this.compHasMounted = false;
    }

    public async componentDidMount() {
      this.compHasMounted = true;
      this.setState(
        {
          queryIsLoading: true
        },
        () => {
          const api = getApi();
          api
            .get(`api/widgets`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              params: {
                workspace_id: 1
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

  return WithWidgetsQuery;
}
