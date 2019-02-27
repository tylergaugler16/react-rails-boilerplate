import * as React from "react";
import { getApi } from "utils/apiUtil";
import { Formik as Form } from "formik";
import withNotificationAlert from "components/withNotificationAlert";

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
          validate={values => {
            const errors: any = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
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
              <div>
                <label htmlFor="email">Email</label>
                <br />
                <input type="text" name="email" onChange={handleChange} />
                {errors.email && touched.email && errors.email}
              </div>

              <div>
                <label htmlFor="first_name">First Name</label>
                <br />
                <input type="text" name="first_name" onChange={handleChange} />
                {errors.first_name && touched.first_name && errors.first_name}
              </div>

              <div>
                <label htmlFor="last_name">Last Name</label>
                <br />
                <input type="text" name="last_name" onChange={handleChange} />
                {errors.last_name && touched.last_name && errors.last_name}
              </div>

              <div>
                <label htmlFor="password">Password</label> <br />
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                />
                {errors.password && touched.password && errors.password}
              </div>

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
