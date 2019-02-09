import axios from 'axios';
import * as React from 'react';
import './assets/stylesheets/css/App.css';

import logo from './logo.svg';

interface IState {
  content: string;
}

const apiUrl = process.env.REACT_APP_ENV === "production"
                  ?
                  "https://widgetly-app.herokuapp.com"
                :
                  "http://localhost:3001";

class App extends React.Component<{}, IState> {
  public constructor(props: {}) {
    super(props);
    this.state = {
      content: 'Waiting for a response from Rails...',
    };
  }



  public async componentDidMount() {
    const response = await axios.get(`${apiUrl}/greetings/testing_greeting`,{
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    this.setState(prevState => {
      return {
        ...prevState,
        content: response.data.content,
      }
    })
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
        <p>{apiUrl}</p>
      </div>
    );
  }
}

export default App;
