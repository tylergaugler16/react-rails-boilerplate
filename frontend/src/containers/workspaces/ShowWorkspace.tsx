import * as React from "react";
import withWorkspace from "queries/workspaceQuery";
import WidgetBox from "containers/widgets/WidgetBox";

import { User, WorkspaceQuery, Widget } from "types";

interface IProps {
  data: WorkspaceQuery;
  currentUser: User;
  currentUserIsLoading: boolean;
  location: any;
}
class ShowWorkspace extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      currentUser,
      data: { workspace }
    } = this.props;
    if (!currentUser || !workspace) {
      return null;
    }
    return (
      <div className="show-workspace">
        {workspace.widgets
          ? workspace.widgets.map((widget: Widget) => (
              <WidgetBox
                widget={widget}
                workspaceId={workspace.id}
                key={widget.id}
              />
            ))
          : null}
      </div>
    );
  }
}

export default withWorkspace(ShowWorkspace);
