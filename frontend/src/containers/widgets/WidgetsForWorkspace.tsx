import * as React from "react";
import withWidgets from "queries/widgetsQuery";

import { User, WidgetsQuery } from "types";

interface IProps {
  data: WidgetsQuery;
  currentUser: User;
}
class WidgetsForWorkspace extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      currentUser,
      data: { widgets }
    } = this.props; 
    if (!currentUser || !widgets) {
      return null;
    }
    return (
      <div className="widgets-for-workspace">
      {
        JSON.stringify(widgets)
      }
      </div>
    );
  }
}

export default withWidgets(WidgetsForWorkspace);
