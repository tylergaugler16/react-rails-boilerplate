import * as React from "react";
import EditWidget from "containers/widgets/EditWidget";
import withWidget from "queries/widgetQuery";

import { WidgetQuery, User } from "types";

interface IProps {
  data: WidgetQuery;
  match?: any;
  history?: any;
  location?: any;
  queryIsLoading: boolean;
  currentUser: User;
}
class EditWidgetWrapper extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      match,
      history,
      location,
      currentUser,
      data: {
        widget
      },
      queryIsLoading
    } = this.props;


    if(queryIsLoading){
      return "Loading..."
    }
    if(!widget){
      return null;
    }
    return (
        <EditWidget
          match={match}
          location={location}
          history={history}
          widget={widget}
          currentUser={currentUser}/>
    );
  }
}

export default withWidget(EditWidgetWrapper);
