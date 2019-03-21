export type User = {
  id: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
} ;
export type Workspace = {
  id: string;
  name: string;
  widgets: Array<Widget> | null;
} ;
export type Widget = {
  id: string;
  name: string;
  dataType: string;
} ;

// QUERIES

export type WorkspacesQuery = {
    workspaces: Array<Workspace> | null;
} ;
export type WorkspaceQuery = {
    workspace: Workspace | null;
    availableWidgetTypes: Array<string> | null;
} ;

export type WidgetsQuery = {
  widgets: Array<Widget> | null;
}

export type WidgetQuery = {
  widget: Widget | null;
}

export type AuthencicatedHeaderQuery = {
  user: User | null;
  workspaces: Array<Workspace> | null;
}
