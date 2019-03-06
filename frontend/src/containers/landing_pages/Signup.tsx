import * as React from "react";
import { getApi } from "utils/apiUtil";
import { Formik as Form, Field } from "formik";
import withNotificationAlert from "components/withNotificationAlert";
import TextInput from "components/form/TextInput";
import PasswordInput from "components/form/PasswordInput";
import { isEmail, required } from "components/form/validations";

interface IProps {
  infoAlert: (message: string, redirectUrl?: string) => void;
  changeView: (newValue: "signup" | "login") => void;
  currentView: "signup" | "login";
}

class Signup extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private handleSubmit(values: any) {
    const api = getApi();
    api
      .post(`/signup`, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          this.props.infoAlert("Created an account!", "/");
        }
      })
      .catch(() => console.log("errors"));
  }

  private getSignupForm(){
    return (
      <Form
        initialValues={{
          email: "",
          password: "",
          first_name: "",
          last_name: ""
        }}
        onSubmit={(values, { setSubmitting }) => {
          this.handleSubmit(values);
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
            <Field
              name="email"
              label="Email"
              component={TextInput}
              validate={isEmail}
            />

            <Field
              name="first_name"
              label="First Name"
              component={TextInput}
              validate={required}
            />

            <Field
              name="last_name"
              label="Last Name"
              component={TextInput}
              validate={required}
            />

            <Field
              name="password"
              label="Password"
              component={PasswordInput}
              validate={required}
            />

            <div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </div>
          </form>
        )}
      </Form>
    )
  }

  public render() {
    const { currentView, changeView} = this.props;

    return (
      <div
        className={`signup-container current-view-container ${
          currentView === "signup" ? "is-active" : "is-inactive"
        }`}
      >
        {this.getSignupForm()}
        <span onClick={() => changeView("login")}>Login</span>
      </div>
    );
  }
}

export default withNotificationAlert(Signup);
