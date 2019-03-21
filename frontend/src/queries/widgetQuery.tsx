import * as React from "react";
import { getApi } from "utils/apiUtil";
import { WidgetQuery, User } from "types";

interface IProps {
  [prop: string]: any;
  currentUser?: User | null;
  currentUserIsLoading?: boolean;
  history?: any;
  location?: any;
  match?: any;
}
interface IState {
  data: WidgetQuery;
  queryIsLoading: boolean;
}

export default function withWidgetQuery(
  WrappedComponent: React.ComponentType<any>
) {
  class WithWidgetQuery extends React.Component<IProps, IState> {
    constructor(props: IProps) {
      super(props);
      this.state = {
        data: {
          widget: null
        },
        queryIsLoading: false
      };
    }
    public async componentWillMount() {
      const {match: {params}} = this.props;
      const id = params && params.widget_id ? params.widget_id : null;
      this.setState(
        {
          queryIsLoading: true
        },
        () => {
          const api = getApi();
          api
            .get(`api/widget`, {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              params: {
                widget_id: id
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

  return WithWidgetQuery;
}
