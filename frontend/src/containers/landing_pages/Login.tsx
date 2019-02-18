import * as React from 'react';
import {api} from '../../utils/apiUtil';




interface IProps{
  match?: any;
  history: any;
}

interface IState {
  loading: any;
}

class Login extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.login = this.login.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  } 

  private handleLogin(){
    this.setState({
      loading: true,
    }, () =>{
      this.login(() =>{
        this.setState({
          loading: false,
        });
      })
    });

  }
  private login(callback: () => void){
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
            this.props.history.push('users/home')
          }
          callback();
        }).catch(() => callback())
  }

  public render() {
    return (
      <div className="login-container">
        <button onClick={this.handleLogin}>Login</button>
        {
          this.state.loading? "loading" : "done"
        }
      </div>
    );
  }
}

export default Login;
