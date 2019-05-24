import * as React from "react";

import AudioDatumRow from "containers/widget_data/audio_data/AudioDatumRow";

import { WidgetDatum } from "types";

interface IProps {
  widgetData: Array<WidgetDatum> | null;
  queryIsLoading: boolean;
}

class AudioDataTable extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { widgetData, queryIsLoading } = this.props;
    if(queryIsLoading){
      return "Loading..."
    }
    if(!widgetData){
      return null;
    }
    return (
      <table className="audio-data-table is-full-width">
        <thead>
        <th>Title</th>
        <th>Speaker</th>
        <th>Theme</th>
        <th>Series</th>
        <th>File Size</th>
        <th></th>
        </thead>
        <tbody>
          {
             widgetData.map( (audioDatum: WidgetDatum) => (
              <AudioDatumRow audioDatum={audioDatum} key={audioDatum.id} />
            ))
          }
        </tbody>
      </table>
    );
  }
}

export default AudioDataTable;
