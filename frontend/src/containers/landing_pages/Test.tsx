import * as React from "react";
import withNotificationAlert from "components/withNotificationAlert";
import { Formik as Form, Field } from "formik";
import GoogleLogin from "containers/landing_pages/GoogleLogin";
import { isEmail, required } from "components/form/validations";
import TextInput from "components/form/TextInput";
import PasswordInput from "components/form/PasswordInput";
import SelectInput from "components/form/SelectInput";
import ColorInput from "components/form/ColorInput";

interface IProps {
  infoAlert: (message: string, redirectUrl?: string) => void;
}

class Test extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  private handleLogin(values: any) {
    this.props.infoAlert("This is a test");
  }

  public render() {
    const { infoAlert } = this.props;
    return (
      <div className="login-container">
        <GoogleLogin infoAlert={infoAlert} />
        <Form
          initialValues={{ email: "", password: "", test: "" , color: ""}}
          onSubmit={(values, { setSubmitting }) => {
            this.handleLogin(values);
            setSubmitting(true);
          }}
        >
          {({ values, errors, touched, handleSubmit, handleChange }) => (
            <form onSubmit={handleSubmit}>
              <div className="columns is-gapless is-centered">
                <div className="column is-10 ">
                  <Field
                    name="email"
                    label="Email"
                    component={TextInput}
                    validate={isEmail}
                  />
                </div>
              </div>
              <div className="columns is-gapless is-centered">
                <div className="column is-10">
                  <Field
                    name="password"
                    label="Password"
                    component={PasswordInput}
                    validate={required}
                  />
                </div>
              </div>
              <div className="columns is-gapless is-centered is-multiline">
                <div className="column is-10">
                  <Field
                    name="test"
                    label="Select Test"
                    component={SelectInput}
                    validate={required}
                    options={
                      [{label: "Hi", value: "hey"},{label: "Yo!", value: "woxo"}]
                    }
                  />
                </div>
                <div className="column is-10">
                  <Field
                    name="color"
                    label="Select Color"
                    component={ColorInput}
                    validate={required}
                    classNames="color-picker"
                  />
                </div>

              </div>
              <div className="columns is-gapless">
                <div className="column is-10 is-centered">
                  <button className="button medium-button purple-button" type="submit">Submit</button>
                </div>
              </div>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default withNotificationAlert(Test);
