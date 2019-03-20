import * as React from "react";


import { Widget } from "types";

interface IProps {
  widget: Widget;
}
class WidgetBox extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props); 
  }

  public render() {
    const {
      widget
    } = this.props;
    if (!widget) {
      return null;
    }
    return (
      <div className="widget-box">
        {
          widget.dataType
        }
      </div>
    );
  }
}

export default WidgetBox;
