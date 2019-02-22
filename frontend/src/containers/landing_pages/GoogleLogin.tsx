import * as React from 'react';

class GoogleLogin extends React.Component<{}, {}> {
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
              'onsuccess':  (user: any) => console.log(user),
              'onfailure': () => alert("failure")
            })
          })
        })

   }
   public render(){
     return (<div id="my-signIn" />);
   }
}

export default GoogleLogin;
