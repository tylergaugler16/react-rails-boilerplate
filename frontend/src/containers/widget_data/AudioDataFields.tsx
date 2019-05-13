import * as React from "react";

import TextInput from "components/form/TextInput";
import UploadFileInput from "components/form/UploadFileInput";
import { required } from "components/form/validations";
import { Field } from "formik";

interface IProps {
  match?: any;
}

class AudioDataFields extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    return (
      <React.Fragment>
        <div className="columns is-gapless is-centered">
          <div className="column is-4 ">
            <Field
              name="speaker"
              label="Speaker"
              placeholder="Deb Dab"
              component={TextInput}
              validate={required}
            />
          </div>
          <div className="column is-4 ">
            <Field
              name="theme"
              label="Theme"
              placeholder=""
              component={TextInput}
              validate={required}
            />
          </div>
          <div className="column is-4 ">
            <Field
              name="series"
              label="Series"
              placeholder=""
              component={TextInput}
              validate={required}
            />


          </div>
        </div>
        <div className="columns is-gapless is-centered">
          <div className="column is-12 ">
            <Field
              name="upload_file_to_s3"
              label="Upload File"
              accept="audio/*"
              component={UploadFileInput}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AudioDataFields;
