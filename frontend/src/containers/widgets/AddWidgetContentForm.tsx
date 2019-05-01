import * as React from "react";
import { getApi } from "utils/apiUtil";

import { Formik as Form, Field } from "formik";

import HiddenInput from "components/form/HiddenInput";

import AudioDataFields from "containers/widget_data/AudioDataFields";


// import { Widget } from "types";

interface IProps {
  widgetType: string;
  initialValues: any;
  successAlert: (message: string, redirectUrl?: string) => void;
  errorAlert: (message: string, redirectUrl?: string) => void;
}
interface IState {
  initialValues: any;
}

class AddWidgetContentForm extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    const { initialValues } = this.props;
    const defaultValues = {
      speaker: "",
      theme: "",
      series: "",
      widget_id: undefined,
      s3_object_url: "",
      file_name: "",
      file_size: "",
    };
    this.state = {
      initialValues: {...defaultValues, ...initialValues},
    }
    this.getWidgetDataFields = this.getWidgetDataFields.bind(this);
  }

  private handleSubmit(values: any){
    const api = getApi();
    api
      .post(`/api/widgets/create_data`, values, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
      .then(res => {
        console.log(res.data);
        if (res.data.widgetData) {
          console.log(res.data.widgetData);
          const workspaceId =  res.data.widget.workspaceId;
          const widgetId =  res.data.widget.id;
          const redirectUrl = `/workspace/${workspaceId}/widget/${widgetId}/edit`;
          this.props.successAlert("Widget Content Created", redirectUrl);
        }else if (res.data.errors) {
          this.props.errorAlert(res.data.errors.join("/n"));
        }
      })
      .catch(() => console.log("errors"));
  }

  private getWidgetDataFields(){
    const {widgetType} = this.props;
    switch(widgetType){
      case "Audio":
        return <AudioDataFields />
      default:
        return null;
    }

  }

  public render() {
    const {
      widgetType,
    } = this.props;

    return (
        <div className="add-widget-content-form">
          Add {widgetType } content
          <div>
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
                <h1 className="title-1 has-text-centered"></h1>
                </div>
              </div>

              {
                this.getWidgetDataFields()
              }

              <div className="columns is-gapless is-centered">
                <div className="column is-10 ">
                <Field
                  name="widget_id"
                  initialValue={this.state.initialValues.id}
                  component={HiddenInput}
                />
                <button
                  className="button large-button purple-button is-centered-block"
                  type="submit"
                >
                  Submit
                </button>
                </div>
              </div>
              </form>
            )}
          </Form>
          </div>
        </div>
    );
  }
}

export default  AddWidgetContentForm;
