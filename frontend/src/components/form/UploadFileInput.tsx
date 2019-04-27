import * as React from 'react';
import {getApi} from 'utils/apiUtil';


import { ErrorMessage } from 'formik';
import FormError from "components/form/FormError";

import ReactS3Uploader from 'react-s3-uploader';

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
}

class UploadFileInput extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.getSignedUrl = this.getSignedUrl.bind(this);
  }

  public getSignedUrl(file: any, callback: any) {
    const params = {
      objectName: file.name,
      contentType: file.type
    };
    const api = getApi();
    api
      .get(`api/s3/sign`, {
        params
      })
      .then(res => {
        const { form: { setFieldValue } } = this.props;
        const { filePath } = res.data;
        setFieldValue("s3_object_url", filePath, true);
        callback(res.data);
      })
      .catch(() => {
        alert("SOMETHING WENT WRONG");
      });

  }


  public render() {
    const{field: { name, value }, label} = this.props;
    return (
      <div className="field-input">
       <input type="hidden"
         name="s3_object_url"
         value={value}
         />
         <label>{label}</label>
       <ReactS3Uploader
         className="upload-file-input"
         getSignedUrl={this.getSignedUrl}
         accept="image/*"
         contentDisposition="auto"
         name={name}
       />
        <ErrorMessage name={name} component={FormError} />
      </div>
    );
  }
}

export default UploadFileInput;
