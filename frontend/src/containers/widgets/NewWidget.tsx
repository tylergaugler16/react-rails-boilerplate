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
class NewWidget extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.createWidget = this.createWidget.bind(this);
    this.getInititialValues = this.getInititialValues.bind(this);
  }

  private createWidget(values: any) {
    const api = getApi();
    api
      .post(`/api/widget/new`, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data) {
          this.props.infoAlert("Widget Created", "/");
        }else if (res.data.errors) {
          this.props.errorAlert(res.data.errors.join("/n"));
        }
      })
      .catch(() => console.log("errors"));
  }

  private getInititialValues(){
    const {match: {params}} = this.props;
    return {
      workspace_id: params? params.workspace_id : undefined
    }
  }

  public render() {

    return (
      <div className="new-widget-container">
        <WidgetForm action={this.createWidget} initialValues={this.getInititialValues()} />
      </div>
    );
  }
}

export default withNotificationAlert(NewWidget);
