import * as React from 'react';
import { Link } from "react-router-dom";

interface IProps{
  match?: any;
}
class Header extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {

    return (
      <div className="columns is-gapless is-vcentered is-full-height header-content">
        <div className="column">Widgetly</div>
        <div className="column"><Link to="/users/login">Login</Link></div>
        <div className="column"><Link to="/users/signup">Signup</Link></div>
        <div className="column"><Link to="/">Home</Link></div>
      </div>
    );
  }
}

export default Header;
