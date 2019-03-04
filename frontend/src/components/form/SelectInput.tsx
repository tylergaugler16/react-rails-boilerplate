import * as React from 'react';
import { ErrorMessage } from 'formik';
import FormError from "components/form/FormError";
import Select from 'react-select';

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
  options: [{label: string, value: any}]
}
class TextInput extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const{field: {name, onChange }, label, options} = this.props;
    return (
      <div className="field-input select-input">
      <label>
        {label}
      </label>
      <Select name={name} onChange={onChange} options={options} />

        <ErrorMessage name={name} component={FormError} />

      </div>
    );
  }
}

export default TextInput;
