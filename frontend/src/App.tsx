import * as React from "react";
import { ToastContainer } from "react-toastify";
import { withRouter } from "react-router";
import CustomRouter from "./containers/layouts/_CustomRouter";

interface IProps {
  match: any;
  history: any;
  location: any;
}

const CloseButton = ({ closeToast }: any) => (
  <i className="fas fa-times close-button has-pointer" onClick={closeToast} />
);

class App extends React.Component<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }


  public render() {
    const { match, history, location } = this.props;
    return (
      <div>
        <ToastContainer
          closeButton={<CloseButton />}
          hideProgressBar={true}
          closeOnClick={true}
          autoClose={false}
          className="custom-toast-container"
          bodyClassName="custom-toast-body"
          position="bottom-right"
          draggable={false}
        />
        <CustomRouter match={match} history={history} location={location} />
      </div>
    );
  }
}

export default withRouter(App);
