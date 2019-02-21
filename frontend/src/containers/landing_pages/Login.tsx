import * as React from 'react';
import {getApi} from 'utils/apiUtil';
import { withRouter } from "react-router-dom";
import { Formik as Form} from 'formik';


interface IProps{
  match: any;
  history: any;
  location: any;
}


class Login extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  private handleLogin(values: any){
    const api = getApi();
    api.post(`auth/login`, values, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then(res => {
          if(res.data.token){
            localStorage.setItem('token', res.data.token);
            this.props.history.push('/users/home');
          }
        }).catch(() => console.log("errors"));
  }


  public render() {
    return (
      <div className="login-container">
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
            isSubmitting,
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
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
          )}
        </Form>
        <button onClick={this.handleLogin}>Login</button>
      </div>
    );
  }
}

export default withRouter(Login);
