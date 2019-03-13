export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
} ;
export type Organization = {
  name: string;
} ;

export type OrganizationsQuery = {
    organizations: Array<Organization> | null;
} ;


export type AuthencicatedHeaderQuery = {
  user: User | null;
  organizations: Array<Organization> | null;
}
