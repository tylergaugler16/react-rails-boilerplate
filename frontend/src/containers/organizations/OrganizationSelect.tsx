import * as React from 'react';
import withOrganizations from "queries/organizationsQuery";


import { User, OrganizationsQuery } from "types";

interface IProps{
  data: OrganizationsQuery;
  currentUser: User;
}
class OrganizationSelect extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const{currentUser} = this.props;
    if(!currentUser){
      return null;
    }
    return (
      <div className="App">
        Select org
      </div>
    );
  }
}

export default withOrganizations(OrganizationSelect);
