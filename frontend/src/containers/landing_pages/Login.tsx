import * as React from 'react';
import {getApi} from 'utils/apiUtil';
import withNotificationAlert from "components/withNotificationAlert"
import { Formik as Form} from 'formik';
import GoogleLogin from "containers/landing_pages/GoogleLogin"


interface IProps{
  infoAlert: (message: string, redirectUrl?: string) => void;
  errorAlert: (message: string, redirectUrl?: string) => void;
}


class Login extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  private handleLogin(values: any){
    const api = getApi();
    api.post(`login`, values, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        validateStatus: (status: number) => {
         return true; // I'm always returning true, you may want to do it depending on the status received
       },
      }).then(res => {
          if(res.data.token){
            localStorage.setItem('token', res.data.token);
            this.props.infoAlert("Logged in", "/");
          } else if(res.data.errors){
            this.props.errorAlert(res.data.errors.join("/n"))
          }
        }).catch((error) => console.log(error.message));
  }


  public render() {
    const {infoAlert} = this.props;
    return (
      <div className="login-container">
      <GoogleLogin infoAlert={infoAlert}/>
      <Form
          initialValues={{ email: '', password: '' }}
          validate={values => {
            const errors: any = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            this.handleLogin(values);
            console.log(values);
            setSubmitting(true);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                 onChange={handleChange}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                 onChange={handleChange}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit">
                Submit
              </button>
            </form>
          )}
        </Form>
      </div>
    );
  }
}


export default withNotificationAlert(Login);
