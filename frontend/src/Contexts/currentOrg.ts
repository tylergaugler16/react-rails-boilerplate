import * as React from 'react';

 const OrganizationContext = React.createContext(
{  currentOrgId: null,
  updateOrgId: (orgId: string) => {
    return;
  }
}
);

export default OrganizationContext;
