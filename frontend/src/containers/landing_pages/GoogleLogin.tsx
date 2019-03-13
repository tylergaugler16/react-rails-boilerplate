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

    if( !(window as any).gapi  ){
      return;
    }
      // (window as any).gapi.load('auth2', () => {
      //     (window as any).gapi.auth2.init({
      //     client_id: "1078865227946-n88q5b9jgmf5nolqppi1800e18ttsrfh.apps.googleusercontent.com"
      // }).then(() => {
      //
      //
      //   const auth2 =  (window as any).gapi.auth2.getAuthInstance();
      //   const isSignedIn =  auth2.isSignedIn.get()
      //   if(isSignedIn){
      //     auth2.signOut();
      //   }
      //     (window as any).gapi.signin2.render('my-signIn', {
      //       'scope': 'profile email',
      //       'width': 150,
      //       'height': 40,
      //       'longtitle': false,
      //       'theme': 'dark',
      //       'onsuccess':  (user: any) => this.login(user.Zi.id_token),
      //       'onfailure': () => alert("failure")
      //     })
      //   })
      // })
      (window as any).gapi.load('auth2', () => {
          (window as any).gapi.auth2.init({
          client_id: "1078865227946-n88q5b9jgmf5nolqppi1800e18ttsrfh.apps.googleusercontent.com"
      }).then(() => {
        const auth2 =  (window as any).gapi.auth2.getAuthInstance();
        const element = document.getElementById('customBtn');
        const buttonTextElement = document.getElementById('gmail-button-text');
        const isSignedIn =  auth2.isSignedIn.get();
        let currentUserName;
        if(isSignedIn){
          const currentUser = auth2.currentUser.get();
          currentUserName = currentUser && currentUser.w3 ? currentUser.w3.ig : null;
          console.log(currentUser);
        }

        if(currentUserName && buttonTextElement){
          buttonTextElement.innerText = `Continue as ${currentUserName}`;
        }
        auth2.attachClickHandler(element, {},
            (googleUser: any) => {
              this.login(googleUser.Zi.id_token)

            }, (error: any) => {

              alert(JSON.stringify(error, undefined, 2));
              this.login("1234");
            });
      });

 });
}
 public render(){
   return (
     <button id="customBtn" className="custom-google-button  button small-button white-button is-centered is-flex">
      <i className="fab fa-google"></i>
      <span id="gmail-button-text">Login with Google</span>
     </button>
   );
 }


  }


export default GoogleLogin;

// https://github.com/zquestz/omniauth-google-oauth2
