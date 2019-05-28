import * as React from "react";
import { Link } from "react-router-dom";

import { Widget } from "types";

interface IProps {
  widget: Widget;
  workspaceId: string;
}
class WidgetBox extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { widget, workspaceId } = this.props;
    if (!widget) {
      return null;
    }
    return (
      <div className="widget-box">
        <Link to={`/workspace/${workspaceId}/widget/${widget.id}`}>
          {widget.dataType}
        </Link>
      </div>
    );
  }
}

export default WidgetBox;
