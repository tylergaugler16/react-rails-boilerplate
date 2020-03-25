export type User = {
  id: string;
  email: string;
  firstName: string;
  fullName: string;
  lastName: string;
} ;


// QUERIES

export type AuthencicatedHeaderQuery = {
  user: User | null;
}
