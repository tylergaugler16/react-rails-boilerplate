import * as React from "react";
import withWidgetData from "queries/widgetDataQuery";
import AudioDatumRow from "containers/widget_data/audio_data/AudioDatumRow";

import { WidgetDataQuery, WidgetDatum } from "types";

interface IProps {
  data: WidgetDataQuery;
  match?: any;
  history?: any;
  location?: any;
  queryIsLoading: boolean;
  workspaceId: string;
}
class ListWidgetDataWrapper extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      data: {
        widgetData
      },
      queryIsLoading
    } = this.props;

    if(queryIsLoading){
      return "Loading..."
    }
    if(!widgetData){
      return null;
    }
    return (
        <div>

          {
             widgetData.map( (audioDatum: WidgetDatum) => (
              <AudioDatumRow audioDatum={audioDatum} key={audioDatum.id} />
            ))
          }

        </div>
    );
  }
}

export default withWidgetData(ListWidgetDataWrapper);
