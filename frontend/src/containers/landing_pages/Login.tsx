import * as React from 'react';
import {api} from 'utils/apiUtil';
import { withRouter } from "react-router-dom";



interface IProps{
  match: any;
  history: any;
  location: any;
}


class Login extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  private handleLogin(){
    api.post(`auth/login`,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => {
          console.log(res);
          console.log(res.data);
          if(res.data.token){
            localStorage.setItem('token', res.data.token);
            this.props.history.push('/home');
          }
        }).catch(() => console.log("errors"));
  }

  public render() {
    return (
      <div className="login-container">
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
