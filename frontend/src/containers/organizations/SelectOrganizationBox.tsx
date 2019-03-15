import * as React from "react";
import { Link } from "react-router-dom";

import { Organization, User } from "types";

interface IProps {
  org: Organization;
  currentUser?: User;
}
class SelectOrganizationBox extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { org } = this.props;
    if (!org) {
      return null;
    }
    return (
      <div className="select-organization-box">
        <Link to={`/workspace/${org.id}`} className="purple-link">
          {org.name}
        </Link>
      </div>
    );
  }
}

export default SelectOrganizationBox;
