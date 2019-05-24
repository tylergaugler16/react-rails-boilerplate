import * as React from "react";
import { getApi } from "utils/apiUtil";
import WidgetForm from "containers/widgets/WidgetForm";
import AddWidgetContentForm from "containers/widgets/AddWidgetContentForm";
import ListWidgetDataWrapper from "containers/widgets/ListWidgetDataWrapper";
import { Widget, User} from "types";
import withNotificationAlert from "components/withNotificationAlert";

interface IProps {
  match?: any;
  history?: any;
  location?: any;
  successAlert: (message: string, redirectUrl?: string) => void;
  errorAlert: (message: string, redirectUrl?: string) => void;
  widget: Widget;
  currentUser: User;
}

class EditWidget extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.editWidget = this.editWidget.bind(this);
  }

  private editWidget(values: any) {
    const api = getApi();
    api
      .post(`/api/widgets/update`, values, {
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
          const redirectUrl = `/workspace/${workspaceId}/widget/${id}/edit`;
          this.props.successAlert("Updated widget", redirectUrl);
        } else if (res.data.errors) {
          this.props.errorAlert(res.data.errors.join("/n"));
        }
      })
      .catch(() => console.log("errors"));
  }

  public render() {
    const { widget, errorAlert, successAlert, currentUser, match, location } = this.props;
    const workspaceId = match.params && match.params.workspace_id ? match.params.workspace_id : null;
    return (
      <div className="edit-widget-container">
        <WidgetForm
          action={this.editWidget}
          initialValues={widget}
          headerText="Update Widget"
          buttonText={"Update"}
        />
        <AddWidgetContentForm
          widgetType={widget.dataType}
          initialValues={{ widgetId: widget.id }}
          successAlert={successAlert}
          errorAlert={errorAlert}
          currentUser={currentUser}
        />
        <div className="data-display-container">
          <ListWidgetDataWrapper
            widgetType={widget.dataType}
            widget={widget}
            currentUser={currentUser}
            workspaceId={workspaceId}
            match={match}
            location={location}
          />
        </div>
      </div>
    );
  }
}

export default withNotificationAlert(EditWidget);
