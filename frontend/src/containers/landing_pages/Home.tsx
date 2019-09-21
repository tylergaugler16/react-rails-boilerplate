import * as React from "react";

import { User } from "types";

import WidgetlyWalkthrough from "containers/landing_pages/_WidgetlyWalkthrough";

interface IProps {
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
}

class Home extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div className="landing-home-container default-wrapper-padding">

        <h1 className="title-1">Welcome to Widgetly</h1>
        <h3> Easily add meaningful content to your website </h3>
        <p>Select from a wide variety of widgets, copy link, and embed it on your website. </p>

        <WidgetlyWalkthrough />


      </div>
    );
  }
}

export default Home;
