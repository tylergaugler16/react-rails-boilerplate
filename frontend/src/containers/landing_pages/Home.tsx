import * as React from "react";
import logo from "logo.svg";
import { getApi } from "utils/apiUtil";
import LoggedInHome from "containers/users/Home";

import About from "containers/landing_pages/About";

import { User } from "types";

interface IState {
  content: string;
}
interface IProps {
  currentUser: User | null;
  currentUserIsLoading: boolean;
  history: any;
  location: any;
  match: any;
}

class Home extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      content: "Waiting for a response from Rails..."
    };
  }

  public async componentDidMount() {

    const api = getApi();
    api
      .get(`api/greetings/hello`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        this.setState(prevState => {
          return {
            ...prevState,
            content: res.data.content
          };
        });
      });
  }
  public componentWillReceiveProps(nextProps: any){
    console.log(nextProps.currentUser);
  }

  public render() {
    const {currentUser} = this.props;
    return (
      <React.Fragment>
        {currentUser ? (
          <LoggedInHome currentUser={currentUser} history={history}/>
        ) : (
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{this.state.content}</p>
            <About test="hello" />
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Home;
