export type User = {
  id: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
} ;
export type Organization = {
  id: string;
  name: string;
} ;
export type Widget = {
  id: string;
  name: string;
} ;

// QUERIES

export type OrganizationsQuery = {
    organizations: Array<Organization> | null;
} ;

export type WidgetsQuery = {
  widgets: Array<Widget> | null;
}

export type AuthencicatedHeaderQuery = {
  user: User | null;
  organizations: Array<Organization> | null;
}
