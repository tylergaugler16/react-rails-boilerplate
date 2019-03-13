import * as React from 'react';
import { User, AuthencicatedHeaderQuery, Organization } from "types";
import { Link } from "react-router-dom";
import withAuthenticationHeaderQuery from "queries/authenticatedHeaderQuery";
import OrganizationContext from "Contexts/currentOrg";

interface IProps{
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
  data: AuthencicatedHeaderQuery;
  queryIsLoading: boolean;
}
class Header extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const{ currentUser, data: { organizations }, queryIsLoading } = this.props;

    if(!currentUser){
      return null;
    }
    if(queryIsLoading){
      return <div>loading...</div>
    }
    return (
      <OrganizationContext.Consumer>
      {
        (organizationContext: any) => (
          <div className="columns">

            <div className="column">{`${currentUser.firstName} ${currentUser.lastName}`}</div>
            {
              organizations? organizations.map( (organization: Organization) => <div>{organization.name}</div>)
                           : null
            }
            <div className="column is-narrow is-pulled-right"><Link to="/">Home</Link></div>
            <div className="column is-narrow is-pulled-right"><Link to="/settings">Settings</Link></div>
          </div>
        )
      }
      </OrganizationContext.Consumer>
    );
  }
}

export default withAuthenticationHeaderQuery(Header);
