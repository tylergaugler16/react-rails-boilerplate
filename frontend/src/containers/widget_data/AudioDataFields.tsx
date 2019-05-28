import * as React from "react";

import TextInput from "components/form/TextInput";
import UploadFileInput from "components/form/UploadFileInput";
import { required } from "components/form/validations";
import { Field } from "formik";

import { User } from "types";

interface IProps {
  match?: any;
  currentUser: User;
}

class AudioDataFields extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const { currentUser } = this.props;
    return (
      <React.Fragment>
        <div className="columns is-gapless is-centered">
          <div className="column is-4 ">
            <Field
              name="title"
              label="Title"
              placeholder="How to.."
              component={TextInput}
              validate={required}
            />
          </div>
          <div className="column is-4 ">
            <Field
              name="speaker"
              label="Speaker"
              placeholder="Deb Dab"
              component={TextInput}
              validate={required}
            />
          </div>
        </div>
        <div className="columns is-gapless is-centered">
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
          <div className="column is-4 has-text-centered">
            <Field
              name="file_upload.data"
              label="Upload File"
              accept="audio/*"
              maxFileSize={currentUser.maxAllowedFileSize}
              component={UploadFileInput}
              validate={required}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default AudioDataFields;
