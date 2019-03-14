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
          <div className="columns is-gapless is-vcentered is-full-height header-content">

            <div className="column">
              <Link to="/" className="no-style-link"><h1 className="widgetly-logo title-1">Widgetly</h1></Link>

                </div>
            {
              organizations? organizations.map( (organization: Organization) => <div>{organization.name}</div>)
                           : null
            }
            <div className="column is-narrow is-pulled-right header-links-container">
              <div className="columns is-gapless is-vcentered">
                <div className="column has-text-centered">
                  <Link to="/settings" className="white-link">Workspaces</Link>
                </div>
                <div className="column is-narrow link-break" />
                <div className="column has-text-centered">
                  <Link to="/settings" className="white-link">Settings</Link>
                </div>
                <div className="column has-text-centered">
                  <Link to="/settings" className="white-link">Account</Link>
                </div>
              </div>
            </div>

          </div>
        )
      }
      </OrganizationContext.Consumer>
    );
  }
}

export default withAuthenticationHeaderQuery(Header);
