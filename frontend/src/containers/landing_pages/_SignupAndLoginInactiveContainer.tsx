import * as React from "react";

interface IProps {
  changeView: (newValue: "signup" | "login") => void;
  currentView: "signup" | "login";
}

class SignupAndLoginInactiveContainer extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { currentView, changeView } = this.props;

    return (
      <div className="signup-and-login-inactive-container">
        <div
          className={`login-view-content ${
            currentView === "login" ? "should-show" : "should-hide"
          }`}
        >
          <h1 className="title-1 white-font">Welcome!</h1>
          <p className="white-font">
            If you dont have an account
            <span onClick={() => changeView("signup")}>create an account.</span>
          </p>
          <div className="button-container">
            <button
              className="button large-button white-transparent-button"
              onClick={() => changeView("signup")}
            >
              <span>Sign Up</span>
            </button>
          </div>
        </div>
        <div
          className={`signup-view-content ${
            currentView === "signup" ? "should-show" : "should-hide"
          }`}
        >
          <h1 className="title-1 white-font">Good to see you again!</h1>
          <p className="white-font">
            If you already have an account, login
            <span onClick={() => changeView("login")}>here.</span>
          </p>
          <div className="button-container">
            <button
              className="button large-button white-transparent-button"
              onClick={() => changeView("login")}
            >
              <span>Login</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SignupAndLoginInactiveContainer;
