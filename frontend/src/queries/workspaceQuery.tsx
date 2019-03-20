import * as React from "react";
import { getApi } from "utils/apiUtil";
import { WorkspaceQuery, User } from "types";

interface IProps {
  [prop: string]: any;
  currentUser?: User | null;
  currentUserIsLoading?: boolean;
  history?: any;
  location?: any;
  match?: any;
}
interface IState {
  data: WorkspaceQuery;
  queryIsLoading: boolean;
}

export default function withWorkspaceQuery(
  WrappedComponent: React.ComponentType<any>
) {
  class WithWorkspaceQuery extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        data: {
          workspace: null,
          availableWidgetTypes: null
        },
        queryIsLoading: false
      };
    }
    public async componentWillMount() {
      const {match: {params}} = this.props;
      const id = params && params.workspace_id ? params.workspace_id : null;
      this.setState(
        {
          queryIsLoading: true
        },
        () => {
          const api = getApi();
          api
            .get(`api/workspace`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              params: {
                workspace_id: id
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

  return WithWorkspaceQuery;
}
