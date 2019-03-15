import * as React from "react";
import { Link } from "react-router-dom";

import { Workspace, User } from "types";

interface IProps {
  workspace: Workspace;
  currentUser?: User;
}
class SelectWorkspaceBox extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { workspace } = this.props;
    if (!workspace) {
      return null;
    }
    return (
      <div className="select-workspace-box">
        <Link to={`/workspace/${workspace.id}`} className="purple-link">
          {workspace.name}
        </Link>
      </div>
    );
  }
}

export default SelectWorkspaceBox;
