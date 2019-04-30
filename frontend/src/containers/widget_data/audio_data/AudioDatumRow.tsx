import * as React from "react";
import { WidgetDatum } from "types";

interface IProps {
  audioDatum: WidgetDatum;
}

class AudioDatumRow extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { audioDatum } = this.props;
    return (
      <React.Fragment>
        {audioDatum.id} - {audioDatum.s3ObjectUrl}
      </React.Fragment>
    );
  }
}

export default AudioDatumRow;
