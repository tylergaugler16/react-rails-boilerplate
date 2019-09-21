import * as React from "react";
import { Link } from "react-router-dom";

class WidgetlyWalkthrough extends React.Component<{}, {}> {

  public render() {
    return (
      <div className="widgetly-walkthrough-container">

        <div className="columns is-gapless step">
          <div className="column is-number is-narrow">
            <h2 className="title-1 ">1.</h2>
          </div>
          <div className="column step-description">
            <Link to="/users/signup" className="white-link">Create an account </Link> <br/>
            or  <br/>
            <Link to="/users/login" className="white-link"> Login here</Link>.
          </div>
        </div>

        <div className="columns is-gapless  step">
          <div className="column step-description">
            lorem ipsum blah oh yeah lorem. oh yeah bluaj
          </div>
          <div className="column is-number is-narrow">
            <h2 className="title-1 ">2.</h2>
          </div>
        </div>


        <div className="columns is-gapless  step">
          <div className="column is-number is-narrow">
            <h2 className="title-1 ">3.</h2>
          </div>
          <div className="column step-description">
            lorem ipsum blah oh yeah lorem. oh yeah bluaj
          </div>
        </div>

        <div className="columns is-gapless  step">
          <div className="column step-description">
            lorem ipsum blah oh yeah lorem. oh yeah bluaj
          </div>
          <div className="column is-number is-narrow">
            <h2 className="title-1 ">4.</h2>
          </div>
        </div>

      </div>
    );
  }
}

export default WidgetlyWalkthrough;
