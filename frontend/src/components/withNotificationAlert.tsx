import * as React from 'react';
import { withRouter } from "react-router";
import { toast } from 'react-toastify';

interface IProps {
  history: any;
  match: any;
  location: any;
  [prop: string]: any;
}

export default function withNotificationAlert(WrappedComponent: React.ComponentType<any>) {
   class NotificationAlertComponent extends React.Component<IProps, {}> {
    constructor(props: IProps) {
      super(props);
      this.errorAlert = this.errorAlert.bind(this);
      this.successAlert = this.successAlert.bind(this);
      this.infoAlert = this.infoAlert.bind(this);
      this.warnAlert = this.warnAlert.bind(this);
    }

    private errorAlert(message: string, redirectUrl?: string){
      toast.error(message);
      if(redirectUrl){
          this.props.history(redirectUrl);
      }
    }
    private successAlert(message: string, redirectUrl?: string){
      const { history } = this.props;
      toast.success(message);
      if(redirectUrl){
        history.push(redirectUrl)
      }
    }
    private infoAlert(message: string, redirectUrl?: string){
      const { history } = this.props;
      toast.info(message);
      if(redirectUrl){
        history.push(redirectUrl)
      }
    }
    private warnAlert(message: string, redirectUrl?: string){
      const { history } = this.props;
      toast.warn(message);
      if(redirectUrl){
        history.push(redirectUrl)
      }
    }

    public render() {
      return (
        <WrappedComponent
          {...this.props}
          errorAlert={this.errorAlert}
          successAlert={this.successAlert}
          infoAlert={this.infoAlert}
          warnAlert={this.warnAlert}
        />
      )


    }
  };
  return withRouter(NotificationAlertComponent);
}
