import * as React from "react";

import withNotificationAlert from "components/withNotificationAlert";

interface IProps {
  history: any;
  errorAlert: (message: string, redirectUrl?: string) => void;
  successAlert: (message: string, redirectUrl?: string) => void;
  infoAlert: (message: string, redirectUrl?: string) => void;
  warnAlert: (message: string, redirectUrl?: string) => void;
  test: any;
}

class About extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div className="App">
        <button onClick={() => this.props.errorAlert("this is an error alert")}>
          ERROR
        </button>
        <button
          onClick={() => this.props.successAlert("this is a success alert")}
        >
          SUCCESS
        </button>
        <button onClick={() => this.props.infoAlert("this is an info alert")}>
          INFO
        </button>
        <button
          onClick={() =>
            this.props.warnAlert("this is a warning alert", "/signup")
          }
        >
          WARNING
        </button>
      </div>
    );
  }
}

export default withNotificationAlert(About);
