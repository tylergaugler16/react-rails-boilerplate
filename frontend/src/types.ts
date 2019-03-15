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
} ;
export type Widget = {
  id: string;
  name: string;
} ;

// QUERIES

export type WorkspacesQuery = {
    workspaces: Array<Workspace> | null;
} ;

export type WidgetsQuery = {
  widgets: Array<Widget> | null;
}

export type AuthencicatedHeaderQuery = {
  user: User | null;
  workspaces: Array<Workspace> | null;
}
