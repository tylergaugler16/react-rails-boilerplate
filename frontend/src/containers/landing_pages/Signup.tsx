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
        key="signup-form"
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
          <form onSubmit={handleSubmit} id="signup-form" key="signup-form-form">
          <div className="columns is-gapless ">
            <div className="column is-12 ">
            <h1 className="title-1 has-text-centered">Create an Account</h1>
            </div>
          </div>
          <div className="columns is-gapless is-centered">
            <div className="column is-10 ">
            <Field
              key="signup.first_name"
              name="first_name"
              label="First Name"
              placeholder="Joe"
              component={TextInput}
              validate={required}
            />
            </div>
          </div>
          <div className="columns is-gapless is-centered">
            <div className="column is-10 ">
            <Field
              key="signup.last_name"
              name="last_name"
              label="Last Name"
              placeholder="Shmoe"
              component={TextInput}
              validate={required}
            />
            </div>
          </div>
          <div className="columns is-gapless is-centered">
            <div className="column is-10 ">
            <Field
              key="signup.email"
              name="email"
              label="Email"
              placeholder="joeshmoe@test.com"
              component={TextInput}
              validate={isEmail}
            />
            </div>
          </div>
          <div className="columns is-gapless is-centered">
            <div className="column is-10 ">
            <Field
              key="signup.password"
              name="password"
              label="Password"
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
              Sign Up
            </button>
            </div>
          </div>
          </form>
        )}
      </Form>
    )
  }

  public render() {
    const { currentView} = this.props;

    return (
      <div
        className={`signup-container current-view-container ${
          currentView === "signup" ? "is-active" : "is-inactive"
        }`}
      >
        {this.getSignupForm()}
      </div>
    );
  }
}

export default withNotificationAlert(Signup);
