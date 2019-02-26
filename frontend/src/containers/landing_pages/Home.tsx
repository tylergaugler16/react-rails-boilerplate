import * as React from 'react';
import logo from 'logo.svg';
import {getApi} from 'utils/apiUtil';
import { toast } from 'react-toastify';

interface IState {
  content: string;
}
interface IProps{
  history: any;
}



class Home extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = {
      content: 'Waiting for a response from Rails...',
    };
    this.closeAfter15 = this.closeAfter15.bind(this);
  }


  public async componentDidMount() {
    const api = getApi();
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

  private closeAfter15 = () => {
    toast.success("before YOLO", { autoClose: 1 });
    this.props.history.push("/")

  }
  private close(){
      toast.dismiss()
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
        <button onClick={this.closeAfter15}>Hey</button>
        <button onClick={this.close}>clOSE</button>
      </div>
    );
  }
}

export default Home;
