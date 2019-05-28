import * as React from "react";
import withWidgetData from "queries/widgetDataQuery";
import AudioDataTable from "containers/widget_data/audio_data/AudioDataTable";
import PaginatedSelector from "components/user_interface/PaginatedSelector";

import { WidgetDataQuery, Widget } from "types";

interface IProps {
  data: WidgetDataQuery;
  match?: any;
  history?: any;
  location?: any;
  queryIsLoading: boolean;
  workspaceId: string;
  refetchWidgetData: (page: any) => void;
  widgetType: string;
  widget: Widget;
}
class ListWidgetDataWrapper extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const {
      data: { widgetData, currentPage, totalPages },
      queryIsLoading,
      refetchWidgetData,
      widgetType,
      widget
    } = this.props;

    if (queryIsLoading) {
      return "Loading...";
    } else if (!widgetData) {
      return "No content";
    }
    return (
      <div className="list-widget-data-wrapper">
        // TODO this should only be set if user has permission to customize
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .audio-data-table, .audio-data-table th, .audio-data-table a { color: ${
            widget.primaryColor
          }!important }
          .audio-data-table tr:nth-child(even){
            background-color: ${widget.secondaryColor}!important;
          }
          .audio-data-table tr:nth-child(odd), .audio-data-table {
            background-color: ${widget.tertiaryColor}!important;
          }
        `
          }}
        />
        {widgetType === "Audio" ? (
          <AudioDataTable
            widgetData={widgetData}
            queryIsLoading={queryIsLoading}
          />
        ) : null}
        <div>
          <PaginatedSelector
            currentPage={currentPage}
            totalPages={totalPages}
            refetchQuery={refetchWidgetData}
          />
        </div>
      </div>
    );
  }
}

export default withWidgetData(ListWidgetDataWrapper);
