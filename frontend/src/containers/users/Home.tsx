import * as React from 'react';

interface IProps{
  match: any;
  history: any;
  location: any;
}
class Home extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  private logout(){
    localStorage.removeItem('token');
    this.props.history.push("/");
  }


  public render() {
    return (
      <div className="App">
      you are logged in!
      <button onClick={this.logout}> Log out </button>
      </div>
    );
  }
}

export default Home;
