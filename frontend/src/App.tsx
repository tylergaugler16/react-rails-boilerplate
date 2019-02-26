import * as React from 'react';
import { ToastContainer } from 'react-toastify';
import { withRouter } from "react-router";
import CustomRouter from './containers/layouts/_CustomRouter';

interface IProps {
  match: any;
  history: any;
  location: any;

}
const CloseButton = ({ closeToast }: any) => (
   <i className="fas fa-times" onClick={closeToast}></i>
 );

class App extends React.Component <IProps,{}> {
  constructor(props: IProps) {
    super(props);

  }

  public render(){
    const {match, history, location} = this.props;
    return (
      <div>
        <ToastContainer
          closeButton={<CloseButton/>}
          hideProgressBar={true}
          autoClose={false}
          />
        <CustomRouter match={match} history={history} location={location}/>
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
