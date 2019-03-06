import * as React from "react";
import Login from "containers/landing_pages/Login";
import SignUp from "containers/landing_pages/Signup";

interface IProps {
  history: any;
  location: any;
  match: any;
  currentView:  "signup" | "login";
}

interface IState{
  currentView:  "signup" | "login";
}

class SignupAndLoginWrapper extends React.Component<IProps,IState> {
  public constructor(props: IProps) {
    super(props);
    this.changeView = this.changeView.bind(this);
    this.state = {currentView: this.props.currentView}
  }


  private changeView(newView: "signup" | "login"){
    // const {history} = this.props;
    // history.push(`/users/${newView}`);
    this.setState({currentView: newView})
  }


  public render() {
    const {currentView} = this.state;
    const changeView = this.changeView;
    const defaultProps = {changeView, currentView};
    return (

      <div className="signup-and-login-wrapper">
        <Login {...defaultProps} />
        <SignUp {...defaultProps} />
        <div className={`purple-container ${currentView === "login"? "login-is-active" : "signup-is-active"}`}>

        </div>
      </div>

    );
  }
}

export default SignupAndLoginWrapper;
