import * as React from "react";
import { Link } from "react-router-dom";

interface IProps {
  match?: any;
}
class UnauthenticatedHeader extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <div className="columns is-gapless is-vcentered is-full-height header-content">
        <div className="column">Widgetly</div>
        <div className="column is-narrow is-pulled-right login-link">

        </div>
        <div className="column is-narrow is-pulled-right">

        </div>


        <div className="column is-narrow is-pulled-right header-links-container is-small">
          <div className="columns is-gapless is-vcentered">

            <div className="column has-text-centered">
              <Link to="/users/login">Login</Link>
            </div>

            <div className="column is-narrow link-break" />

            <div className="column has-text-centered">
              <Link to="/users/signup">Signup</Link>
            </div>

          </div>
        </div>


      </div>
    );
  }
}

export default UnauthenticatedHeader;
