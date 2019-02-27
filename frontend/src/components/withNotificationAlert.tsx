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
          this.redirect(redirectUrl);
      }
    }
    private successAlert(message: string, redirectUrl?: string){
      toast.success(message);
      if(redirectUrl){
          this.redirect(redirectUrl);
      }
    }
    private infoAlert(message: string, redirectUrl?: string){
      toast.info(message);
      if(redirectUrl){
        this.redirect(redirectUrl);
      }
    }
    private warnAlert(message: string, redirectUrl?: string){
      toast.warn(message);
      if(redirectUrl){
        this.redirect(redirectUrl);
      }
    }

    private redirect(url: string){
      const {location, history} = this.props;
      if(location.pathname === url){
        window.location.reload();
      } else{
        history.push(url)
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
