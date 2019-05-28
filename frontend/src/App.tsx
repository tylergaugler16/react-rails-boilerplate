import * as React from "react";
import { ToastContainer } from "react-toastify";
import { withRouter } from "react-router";
import CustomRouter from "./containers/layouts/_CustomRouter";
import WorkspaceContext from "contexts/currentWorkspace";

interface IProps {
  match: any;
  history: any;
  location: any;
}

interface IState {
  currentWorkspaceId: any;
}
const CloseButton = ({ closeToast }: any) => (
  <i className="fas fa-times close-button has-pointer" onClick={closeToast} />
);

class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { currentWorkspaceId: undefined };
    this.updateWorkspaceId = this.updateWorkspaceId.bind(this);
  }

  private updateWorkspaceId(workspaceId: string) {
    this.setState({ currentWorkspaceId: workspaceId });
  }

  public render() {
    const { match, history, location } = this.props;
    const WorkspaceContextValue = {
      currentWorkspaceId: this.state.currentWorkspaceId,
      updateWorkspaceId: this.updateWorkspaceId
    };
    return (
      <div>
        <WorkspaceContext.Provider value={WorkspaceContextValue}>
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
        </WorkspaceContext.Provider>
      </div>
    );
  }
}
// {
//   currentUser && currentUser.id ?
//     <div>user is logged in! {currentUser.id}</div>
//   :
//     <div>NO USER</div>
// }

export default withRouter(App);
