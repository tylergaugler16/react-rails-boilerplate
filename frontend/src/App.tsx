import * as React from 'react';
import Home from "./containers/landing_pages/Home";
import { BrowserRouter as Router, Route } from "react-router-dom";


interface IProps {
  match?: any;
}

class App extends React.Component <IProps,{}> {
  constructor(props: IProps) {
    super(props);
  }
  public render(){
    return (
      <Router>
        <div>
            <Route exact={true} path="/" component={Home} />
            <Route path="/about" component={Home} />
            <Route path="/topics" component={Home} />
          </div>
      </Router>
    )
  }
}

export default App;
