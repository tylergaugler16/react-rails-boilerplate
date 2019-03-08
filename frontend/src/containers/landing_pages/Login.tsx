import * as React from "react";
import { getApi } from "utils/apiUtil";
import withNotificationAlert from "components/withNotificationAlert";
import { Formik as Form, Field } from "formik";
import GoogleLogin from "containers/landing_pages/GoogleLogin";
import { isEmail, required } from "components/form/validations";
import TextInput from "components/form/TextInput";
import PasswordInput from "components/form/PasswordInput";

interface IProps {
  infoAlert: (message: string, redirectUrl?: string) => void;
  errorAlert: (message: string, redirectUrl?: string) => void;
  changeView: (newValue: "signup" | "login") => void;
  currentView: "signup" | "login";
}

class Login extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  private handleLogin(values: any) {
    const api = getApi();
    api
      .post(`login`, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        validateStatus: (status: number) => {
          return true; // I'm always returning true, you may want to do it depending on the status received
        }
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          this.props.infoAlert("Logged in", "/");
        } else if (res.data.errors) {
          this.props.errorAlert(res.data.errors.join("/n"));
        }
      })
      .catch(error => console.log(error.message));
  }

  public render() {
    const { infoAlert, currentView } = this.props;
    return (
      <div
        className={`login-container current-view-container ${
          currentView === "login" ? "is-active" : "is-inactive"
        }`}
      >
        <GoogleLogin infoAlert={infoAlert} />
        <Form
          key="login-form"
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            this.handleLogin(values);
            setSubmitting(true);
          }}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit} key="login-form-form" id="login-form">

            <div className="columns is-gaplessis-marginless">
              <div className="column is-12 ">
                <h1 className="title-1  has-text-centered">Login</h1>
              </div>
            </div>
              <div className="columns is-gapless is-centered">
                <div className="column is-10 ">
                  <Field
                    key="login.email"
                    name="email"
                    label="Email"
                    placeholder="joeshmoe@test.com"
                    component={TextInput}
                    validate={isEmail}
                  />
                </div>
              </div>
              <div className="columns is-gapless is-centered">
                <div className="column is-10">
                  <Field
                    key="login.password"
                    name="password"
                    label="Password"
                    placeholder=""
                    component={PasswordInput}
                    validate={required}
                  />
                </div>
              </div>
              <div className="columns is-gapless is-centered">
                <div className="column is-10 ">
                  <button
                    className="button large-button purple-button is-centered-block"
                    type="submit"
                  >
                    Log in
                  </button>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default withNotificationAlert(Login);
