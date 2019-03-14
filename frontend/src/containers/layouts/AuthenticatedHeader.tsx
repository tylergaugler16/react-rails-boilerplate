import * as React from "react";
import { User } from "types";
import { Link } from "react-router-dom";
import CurrentUserContext from "contexts/currentUser";

interface IProps {
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
}
class AuthenticatedHeader extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { currentUser } = this.props;

    if (!currentUser) {
      return null;
    }
    return (
      <CurrentUserContext.Consumer>
        {(context: any) => (
          <div className="columns is-gapless is-vcentered is-full-height header-content">
            {!context.currentUser ? null : (
              <React.Fragment>
                <div className="column">
                  <Link to="/" className="no-style-link">
                    <h1 className="widgetly-logo title-1">Widgetly</h1>
                  </Link>
                </div>
                <div className="column is-narrow is-pulled-right header-links-container">
                  <div className="columns is-gapless is-vcentered">
                    <div className="column has-text-centered">
                      <Link to="/settings" className="white-link">
                        Workspaces
                      </Link>
                    </div>
                    <div className="column is-narrow link-break" />
                    <div className="column has-text-centered">
                      <Link to="/settings" className="white-link">
                        Settings
                      </Link>
                    </div>
                    <div className="column has-text-centered">
                      <Link to="/settings" className="white-link">
                        Account
                      </Link>
                    </div>
                    <div className="column is-narrow link-break" />
                    <div className="column has-text-centered">
                      <span>
                        {context.currentUser
                          ? context.currentUser.fullName
                          : null}
                      </span>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )}
          </div>
        )}
      </CurrentUserContext.Consumer>
    );
  }
}

export default AuthenticatedHeader;
