import * as React from "react";
import { getApi } from "utils/apiUtil";
import { Formik as Form, Field } from "formik";
import withNotificationAlert from "components/withNotificationAlert";
import TextInput from "components/form/TextInput";
import PasswordInput from "components/form/PasswordInput";
import { isEmail, required} from "components/form/validations";

interface IProps {
  infoAlert: (message: string, redirectUrl?: string) => void;
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

  public render() {
    return (
      <div className="signup-container">
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

              <Field name="email" label="Email" component={TextInput} validate={isEmail} />

              <Field name="first_name" label="First Name" component={TextInput} validate={required} />

              <Field name="last_name" label="Last Name" component={TextInput} validate={required} />

              <Field name="password" label="Password" component={PasswordInput} validate={required} />

              <div>
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
              </div>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default withNotificationAlert(Signup);
