import * as React from "react";
import { Link } from "react-router-dom";

import { Workspace, User } from "types";

interface IProps {
  workspace: Workspace;
  currentUser?: User;
}
const SelectWorkspaceBox = (props: IProps) => {


  const { workspace } = props;
  if (!workspace) {
    return null;
  }
  return (
    <div className="select-workspace-box">
      <Link to={`/workspace/${workspace.id}`} className="white-link">
        {workspace.name}
      </Link>
    </div>
  );

}

export default SelectWorkspaceBox;
