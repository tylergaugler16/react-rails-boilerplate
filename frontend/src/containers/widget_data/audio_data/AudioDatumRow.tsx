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
      <tr>
        <td>{audioDatum.id}</td>
        <td>{audioDatum.series}</td>
        <td>{audioDatum.speaker}</td>
        <td>{audioDatum.theme}</td>
        <td><a href={audioDatum.s3ObjectUrl} download>{audioDatum.s3ObjectUrl}</a></td>
      </tr>
    );
  }
}

export default AudioDatumRow;
