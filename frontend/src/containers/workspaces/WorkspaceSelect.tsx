import * as React from "react";
import withWorkspaces from "queries/workspacesQuery";
import SelectWorkspaceBox from "containers/workspaces/SelectWorkspaceBox";

import { User, WorkspacesQuery, Workspace } from "types";

interface IProps {
  data: WorkspacesQuery;
  currentUser: User;
}
const WorkspaceSelect = (props: IProps) => {

  const {
    currentUser,
    data: { workspaces }
  } = props;
  if (!currentUser || !workspaces) {
    return null;
  }
  return (
    <div className="workspace-select-container is-centered-block">
    <h1>Select Workspace</h1>
    <p>Choose which workspace you'd like to access</p>
    <div className="workspace-selection-options">
      {workspaces.map((workspace: Workspace) => (
        <SelectWorkspaceBox workspace={workspace} key={workspace.id} />
      ))}
    </div>
    </div>
  );

}

export default withWorkspaces(WorkspaceSelect);
