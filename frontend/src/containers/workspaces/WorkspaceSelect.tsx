import * as React from "react";
import withWorkspaces from "queries/workspacesQuery";
import SelectWorkspaceBox from "containers/workspaces/SelectWorkspaceBox";

import { User, WorkspacesQuery, Workspace } from "types";

interface IProps {
  data: WorkspacesQuery;
  currentUser: User;
}
class WorkspaceSelect extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      currentUser,
      data: { workspaces }
    } = this.props;
    if (!currentUser || !workspaces) {
      return null;
    }
    return (
      <div className="App">
        Select Workspace
        {workspaces.map((workspace: Workspace) => (
          <SelectWorkspaceBox workspace={workspace} key={workspace.id} />
        ))}
      </div>
    );
  }
}

export default withWorkspaces(WorkspaceSelect);
