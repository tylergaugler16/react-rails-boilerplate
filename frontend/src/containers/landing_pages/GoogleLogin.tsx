import * as React from 'react';
import {getApi} from 'utils/apiUtil';

interface IProps{
  infoAlert: (message: string, redirectUrl?: string) => void;
}

class GoogleLogin extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }
  private async login(idToken: string) {
    const api = getApi();
    api.post(`login`, { googleLogin: true, googleToken: idToken }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => {
          if(res.data.token){
            localStorage.setItem('token', res.data.token);
            this.props.infoAlert('Logged in!','/');
            const auth2 =  (window as any).gapi.auth2.getAuthInstance();
            auth2.signOut();
          }
        }).catch(() => console.log("errors"));
  }
  public componentDidMount() {
      (window as any).gapi.load('auth2', () => {
          (window as any).gapi.auth2.init({
          client_id: "1078865227946-n88q5b9jgmf5nolqppi1800e18ttsrfh.apps.googleusercontent.com"
      }).then(() => {
          (window as any).gapi.signin2.render('my-signIn', {
            'scope': 'profile email',
            'width': 250,
            'height': 50,
            'longtitle': false,
            'theme': 'dark',
            'onsuccess':  (user: any) => this.login(user.Zi.id_token),
            'onfailure': () => alert("failure")
          })
        })
      })

 }
 public render(){
   return (
     <div id="my-signIn" />
   );
 }

  }


export default GoogleLogin;

// https://github.com/zquestz/omniauth-google-oauth2
