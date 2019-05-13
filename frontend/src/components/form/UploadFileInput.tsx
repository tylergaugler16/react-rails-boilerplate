import * as React from 'react';
import { Dashboard as DashboardComponent} from '@uppy/react';
const Uppy = require('@uppy/core');
const AwsS3Multipart = require("@uppy/aws-s3-multipart");

import { ErrorMessage } from 'formik';
import FormError from "components/form/FormError";


interface IProps{
  name: string;
  handleChange?: (value: any) => void;
  field: {
    onChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
    value: any;
    name: string;
  }
  form: any;
  label: string;
  placeholder: string;
  accept: string; // can be audio/*, image/*, video/*
}



class UploadFileInput extends React.Component<IProps, {}> {
  private uppy: any;
  public constructor(props: IProps) {
    super(props);
    this.uppy = Uppy({
      restrictions: { maxNumberOfFiles: 5 },
      autoProceed: true,
    });

    this.uppy.use(AwsS3Multipart, {
      companionUrl: 'http://localhost:3001', // will call `/s3/multipart/*` endpoints on your app
    });

    this.uppy.on('upload-success', (file: any, data: any) => {

      const uploadedFileData = JSON.stringify({
        id: data.uploadURL.match(/\/cache\/([^\?]+)/)[1], // extract key without prefix
        storage: 'cache',
        metadata: {
          size:      file.size,
          filename:  file.name,
          mime_type: file.type,
        }
      })
      const { form: { setFieldValue } } = this.props;
      setFieldValue("file_upload.data", uploadedFileData, true);
      console.log(uploadedFileData);
    })

  }

  public componentWillUnmount () {
    this.uppy.close()
  }


  public render() {
    const{field: { name }, label} = this.props;

    return (
      <div className="field-input">
      <input type="hidden" name={name} />

      <label>{label}</label>
       <DashboardComponent
          uppy={this.uppy}
          inline={true}
          showProgressDetails={true}
        />
        <ErrorMessage name={name} component={FormError} />
      </div>
    );
  }
}

export default UploadFileInput;
