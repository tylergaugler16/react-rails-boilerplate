import * as React from "react";
import withWidget from "queries/widgetQuery";
import { Link } from "react-router-dom";

import { WidgetQuery } from "types";

interface IProps {
  data: WidgetQuery;
  match?: any;
  history?: any;
  location?: any;
  queryIsLoading: boolean;
}
class ShowWidget extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      match:{
        params
      },
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
    const widgetId = params && params.widget_id ? params.widget_id : null;
    const workspaceId = params && params.workspace_id ? params.workspace_id : null;
    const editUrl = `/workspace/${workspaceId}/widget/${widgetId}/edit`;
    return (
      <div className="show-widget-container">
        <h1> {widget.dataType} Widget </h1>
        <h3><Link to={editUrl}>Edit</Link></h3>
      </div>
    );
  }
}

export default withWidget(ShowWidget);
