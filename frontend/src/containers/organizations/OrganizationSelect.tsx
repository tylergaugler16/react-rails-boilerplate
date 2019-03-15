import * as React from "react";
import withOrganizations from "queries/organizationsQuery";
import SelectOrganizationBox from "containers/organizations/SelectOrganizationBox";

import { User, OrganizationsQuery, Organization } from "types";

interface IProps {
  data: OrganizationsQuery;
  currentUser: User;
}
class OrganizationSelect extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      currentUser,
      data: { organizations }
    } = this.props;
    if (!currentUser || !organizations) {
      return null;
    }
    return (
      <div className="App">
        Select org
        {organizations.map((org: Organization) => (
          <SelectOrganizationBox org={org} key={org.id} />
        ))}
      </div>
    );
  }
}

export default withOrganizations(OrganizationSelect);
