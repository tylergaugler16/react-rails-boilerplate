import * as React from "react";
import withWidgetData from "queries/widgetDataQuery";
import AudioDatumRow from "containers/widget_data/audio_data/AudioDatumRow";
import PaginatedSelector from "components/user_interface/PaginatedSelector";

import { WidgetDataQuery, WidgetDatum } from "types";

interface IProps {
  data: WidgetDataQuery;
  match?: any;
  history?: any;
  location?: any;
  queryIsLoading: boolean;
  workspaceId: string;
  refetchWidgetData: (page: any) => void;
}
class ListWidgetDataWrapper extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      data: {
        widgetData,
        currentPage,
        totalPages
      },
      queryIsLoading,
      refetchWidgetData
    } = this.props;

    if(queryIsLoading){
      return "Loading..."
    }
    if(!widgetData){
      return null;
    }
    return (
        <div>
        <table>
          <tbody>
            {
               widgetData.map( (audioDatum: WidgetDatum) => (
                <AudioDatumRow audioDatum={audioDatum} key={audioDatum.id} />
              ))
            }
          </tbody>
        </table>


          <div>
            <PaginatedSelector
              currentPage={currentPage}
              totalPages={totalPages}
              refetchQuery={refetchWidgetData}/>
          </div>
        </div>
    );
  }
}

export default withWidgetData(ListWidgetDataWrapper);
