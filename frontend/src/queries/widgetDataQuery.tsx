import * as React from "react";
import { getApi } from "utils/apiUtil";
import { WidgetDataQuery, User } from "types";

interface IProps {
  [prop: string]: any;
  currentUser?: User | null;
  currentUserIsLoading?: boolean;
  history?: any;
  location?: any;
  match?: any;
}
interface IState {
  data: WidgetDataQuery;
  queryIsLoading: boolean;
}

export default function withWidgetDataQuery(
  WrappedComponent: React.ComponentType<any>
) {
  class WithWidgetDataQuery extends React.Component<IProps, IState> {
    private compHasMounted: boolean = false;
    constructor(props: IProps) {
      super(props);
      this.state = {
        data: {
          widgetData: null
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
      const {
        match: { params }
      } = this.props;
      const id = params && params.widget_id ? params.widget_id : null;
      const workspaceId = params && params.workspace_id ? params.workspace_id : null;
      this.setState(
        {
          queryIsLoading: true
        },
        () => {
          const api = getApi();
          api
            .get(`api/widget/get_data`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              params: {
                widget_id: id,
                workspace_id: workspaceId
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

  return WithWidgetDataQuery;
}
