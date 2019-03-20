import * as React from "react";
import withWorkspace from "queries/workspaceQuery";

import { User, WorkspaceQuery } from "types";

interface IProps {
  data: WorkspaceQuery;
  currentUser: User;
}
class ShowWorkspace extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      currentUser,
      data,
    } = this.props;
    if (!currentUser || !data) {
      return null;
    }
    return (
      <div className="show-workspace">
      {
        JSON.stringify(data)
      }
      </div>
    );
  }
}

export default withWorkspace(ShowWorkspace);
