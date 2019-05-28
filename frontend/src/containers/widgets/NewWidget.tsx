import * as React from "react";
import { getApi } from "utils/apiUtil";
import WidgetForm from "containers/widgets/WidgetForm";
// import { Widget } from "types";
import withNotificationAlert from "components/withNotificationAlert";

interface IProps {
  match?: any;
  history?: any;
  location?: any;
  infoAlert: (message: string, redirectUrl?: string) => void;
  errorAlert: (message: string, redirectUrl?: string) => void;
}

interface IState {
  widgetType: string;
}
class NewWidget extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.createWidget = this.createWidget.bind(this);
    this.getInititialValues = this.getInititialValues.bind(this);
    this.state = {
      widgetType: "Audio"
    };
  }

  private createWidget(values: any) {
    const api = getApi();
    api
      .post(`/api/widgets/create`, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.widget) {
          console.log(res.data.widget);
          const workspaceId = res.data.widget.workspaceId;
          const id = res.data.widget.id;
          const redirectUrl = `/workspace/${workspaceId}/widget/${id}`;
          this.props.infoAlert("Widget Created", redirectUrl);
        } else if (res.data.errors) {
          this.props.errorAlert(res.data.errors.join("/n"));
        }
      })
      .catch(() => console.log("errors"));
  }

  private getInititialValues() {
    const {
      match: { params }
    } = this.props;
    return {
      workspaceId: params ? params.workspace_id : undefined,
      dataType: this.state.widgetType
    };
  }

  public render() {
    return (
      <div className="new-widget-container">
        <WidgetForm
          action={this.createWidget}
          initialValues={this.getInititialValues()}
          headerText="Create Widget"
          buttonText={"Create"}
        />
      </div>
    );
  }
}

export default withNotificationAlert(NewWidget);
