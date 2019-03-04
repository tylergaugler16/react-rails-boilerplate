import * as React from 'react';
import { ErrorMessage } from 'formik';
import FormError from "components/form/FormError";
import { BlockPicker } from 'react-color';

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
  options: [{label: string, value: any}];
  clearable: boolean;
}
interface IState{
  isOpen: boolean;
}
class TextInput extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state ={isOpen: false}
  }

  public render() {
    const{field: {name, value: currentValue }, form, label} = this.props;

    const handleChangeComplete = (color: any) => {
        form.setFieldValue(name, color.hex);
    };

    return (
      <div className="field-input select-input">
      <label onClick={() => this.setState({isOpen: !this.state.isOpen})}>
        {label}
      </label>
      <div className="color-picker-display">
        <div className="display-selected-color"></div>
        <div className="selected-color-value"></div>
      </div>
      {
        this.state.isOpen?
        <BlockPicker
          color={currentValue}
          onChange={handleChangeComplete}
          />
        :
          null
      }

        <ErrorMessage name={name} component={FormError} />

      </div>
    );
  }
}

export default TextInput;
