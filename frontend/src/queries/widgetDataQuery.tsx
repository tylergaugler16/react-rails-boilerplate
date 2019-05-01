import * as React from "react";
import { getApi } from "utils/apiUtil";
import { WidgetDataQuery, User } from "types";
import  { parse }  from "query-string";

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
          widgetData: null,
          totalPages: 0,
          currentPage: 0
        },
        queryIsLoading: false
      };
      this.getWidgetData = this.getWidgetData.bind(this);
      this.refetchWidgetData = this.refetchWidgetData.bind(this);
    }
    public componentWillUnmount() {
      this.compHasMounted = false;
    }

    public async componentDidMount() {
      const { currentUser, location: { search }, match: { params } } = this.props;
      if(!currentUser || this.state.queryIsLoading){
        return;
      }
      const widgetId = params && params.widget_id ? params.widget_id : null;
      const workspaceId = params && params.workspace_id ? params.workspace_id : null;
      const parsedQueryString = parse(search);
      const currentPage = parsedQueryString.page;

      this.compHasMounted = true;
      this.getWidgetData(widgetId, workspaceId, currentPage );
    }

    private refetchWidgetData(page: any){
      const {  match: { params } } = this.props;
      const widgetId = params && params.widget_id ? params.widget_id : null;
      const workspaceId = params && params.workspace_id ? params.workspace_id : null;

      this.getWidgetData(widgetId, workspaceId, page);
    }

    private getWidgetData(widgetId: any, workspaceId: any, page: any){

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
                widget_id: widgetId,
                workspace_id: workspaceId,
                page
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
          refetchWidgetData={this.refetchWidgetData}
        />
      );
    }
  }

  return WithWidgetDataQuery;
}
