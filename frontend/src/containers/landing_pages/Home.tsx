import * as React from 'react';
import logo from '../../logo.svg';
import {api} from '../../utils/apiUtil';

interface IState {
  content: string;
}



class Home extends React.Component<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      content: 'Waiting for a response from Rails...',
    };
  }


  public async componentDidMount() {
    api.get(`api/greetings/hello`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(res => {
      this.setState(prevState => {
        return {
          ...prevState,
          content: res.data.content,
        }
      })
    });

  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          {this.state.content}
        </p>
      </div>
    );
  }
}

export default Home;
