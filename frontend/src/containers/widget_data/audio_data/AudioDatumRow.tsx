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
        <td><span>{audioDatum.title}</span></td>
        <td>{audioDatum.series}</td>
        <td>{audioDatum.speaker}</td>
        <td>{audioDatum.theme}</td>
        <td>{audioDatum.fileSize}</td>
        <td>
          {
            audioDatum.downloadUrl ?
              <a href={audioDatum.downloadUrl}>Download</a>
            :
              null
          }
        </td>

      </tr>
    );
  }
}

export default AudioDatumRow;
