import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { withRouter } from "react-router";
import CustomRouter from './containers/layouts/_CustomRouter';
import OrganizationContext from "Contexts/currentOrg";

interface IProps {
  match: any;
  history: any;
  location: any;

}

interface IState {
  currentOrgId: any
}
const CloseButton = ({ closeToast }: any) => (
   <i className="fas fa-times close-button has-pointer" onClick={closeToast}></i>
 );

class App extends React.Component <IProps,IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {currentOrgId: undefined}
    this.updateOrgId = this.updateOrgId.bind(this);
  }

  private updateOrgId(orgId: string){
    this.setState({currentOrgId: orgId});
  }

  public render(){
    const {match, history, location} = this.props;
    const OrganizationContextValue = {
      currentOrgId: this.state.currentOrgId,
      updateOrgId: this.updateOrgId
    }
    return (
      <div>
        <OrganizationContext.Provider value={ OrganizationContextValue }>
          <ToastContainer
            closeButton={<CloseButton/>}
            hideProgressBar={true}
            closeOnClick={true}
            autoClose={false}
            className="custom-toast-container"
            bodyClassName="custom-toast-body"
            position="top-center"
            draggable={false}
            />


          <CustomRouter match={match} history={history} location={location}/>
        </OrganizationContext.Provider>
      </div>

    )
  }
}
// {
//   currentUser && currentUser.id ?
//     <div>user is logged in! {currentUser.id}</div>
//   :
//     <div>NO USER</div>
// }

export default withRouter(App);
