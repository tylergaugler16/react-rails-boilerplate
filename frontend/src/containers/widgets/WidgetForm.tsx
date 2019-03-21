import * as React from "react";
import { Formik as Form, Field } from "formik";
import TextInput from "components/form/TextInput";
import HiddenInput from "components/form/HiddenInput";
import ColorInput from "components/form/ColorInput";
import SelectInput from "components/form/SelectInput";

import { required } from "components/form/validations";


interface IProps {
  action: (values: any) => void;
  initialValues: any;
}
interface IState {
  initialValues: any;
}
class WidgetForm extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    const {initialValues} = this.props;
    const defaultValues = {
      header_text: "",
      primary_color: "#ffffff",
      secondary_color: "#ffffff",
      tertiary_color: "#ffffff",
      data_type: "Audio"
    };
    this.state = {
      initialValues: {...defaultValues, ...initialValues},
    }
  }

  private handleSubmit(values: any) {
    this.props.action(values);
  }
  private generateDataTypeOptions(){
    const options = [
      {label: "Audio", value: "Audio"},
      {label: "Video", value: "Video"}
    ];
    return options;
  }

  public render() {


    return (
      <div className="new-widget-container">
      <Form
        key="signup-form"
        initialValues={this.state.initialValues}
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
            <h1 className="title-1 has-text-centered">Create Widget</h1>
            </div>
          </div>
          <div className="columns is-gapless is-centered">
            <Field
              name="workspace_id"
              initialValue={this.state.initialValues.workspace_id}
              component={HiddenInput}
            />
            <div className="column is-10 ">
              <Field
                name="header_text"
                label="Header Text"
                placeholder="Sample Header"
                component={TextInput}
                validate={required}
              />
            </div>
          </div>
          <div className="columns is-gapless is-centered">
            <div className="column is-3 ">
              <Field
                name="data_type"
                label="Widget Type"
                options={this.generateDataTypeOptions()}
                component={SelectInput}
                validate={required}
              />
            </div>
          </div>
          <div className="columns is-gapless is-centered">
            <div className="column is-3 ">
              <Field
                name="primary_color"
                label="Primary Color"
                placeholder="#ffffff"
                component={ColorInput}
              />
            </div>
            <div className="column is-3 ">
              <Field
                name="secondary_color"
                label="Secondary Color"
                placeholder="#ffffff"
                component={ColorInput}
              />
            </div>
            <div className="column is-3 ">
              <Field
                name="tertiary_color"
                label="Tertiary Color"
                placeholder="#ffffff"
                component={ColorInput}
              />
            </div>
          </div>
          <div className="columns is-gapless is-centered">
            <div className="column is-10 ">
            <button
              className="button large-button purple-button is-centered-block"
              type="submit"
            >
              Create
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

export default WidgetForm;
