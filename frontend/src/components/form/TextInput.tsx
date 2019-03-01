import * as React from 'react';
import { ErrorMessage } from 'formik';
import FormError from "components/form/FormError";

interface IProps{
  name: string;
  handleChange: (value: any) => void;
  field: {
    onChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    value: any;
    name: string;
  }
  form: any;
  label: string;
}
class TextInput extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const{field: {name, onChange }, label} = this.props;
    return (
      <div className="field">
        <label>{label}</label>
        <input
          type="text"
          name={name}
          onChange={onChange}
        />
        <ErrorMessage name={name} component={FormError} />
      </div>
    );
  }
}

export default TextInput;
