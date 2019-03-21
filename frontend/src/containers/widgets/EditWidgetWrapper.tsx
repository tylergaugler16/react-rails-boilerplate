import * as React from "react";
import EditWidget from "containers/widgets/EditWidget";
import withWidget from "queries/widgetQuery";

import { WidgetQuery } from "types";

interface IProps {
  data: WidgetQuery;
  match?: any;
  history?: any;
  location?: any;
  queryIsLoading: boolean;
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
        <EditWidget match={match} location={location} history={history} widget={widget}/>
    );
  }
}

export default withWidget(EditWidgetWrapper);
