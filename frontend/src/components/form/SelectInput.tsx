import * as React from 'react';
import { ErrorMessage } from 'formik';
import FormError from "components/form/FormError";
import Select from 'react-select';

interface IProps{
  name: string;
  handleChange?: (value: any) => void;
  field: {
    onChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    value: any;
    name: string;
  }
  form: any;
  label: string;
  options: [{label: string, value: any}];
  clearable: boolean;
}
class TextInput extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const{field: {name, value: currentValue }, form, label, options, clearable} = this.props;
    const handleChange = (selectedOption: any) => {
      if(typeof this.props.handleChange === "function"){
        this.props.handleChange(selectedOption.value);
      }
      const newValue = selectedOption && selectedOption.value ? selectedOption.value : null;
      form.setFieldValue(name, newValue);
    }


      const handleBlur = () =>
        form.setFieldTouched(name, true);
    return (
      <div className="field-input select-input">
      <label>
        {label}
      </label>
        <Select
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          options={options}
          clearable={clearable}
          value={options ? options.find(option => option.value === currentValue) : ''}/>
        <ErrorMessage name={name} component={FormError} />

      </div>
    );
  }
}

export default TextInput;
