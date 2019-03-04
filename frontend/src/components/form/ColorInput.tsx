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
      <label >
        {label}
      </label>
      <div className="color-picker-display" onClick={() => this.setState({isOpen: !this.state.isOpen})}>
        <div className="display-selected-color">
        <div className="display-color-container" style={{backgroundColor: currentValue? `${currentValue}`: "#ffffff"}}></div>
        </div>
        <div className="selected-color-value">
          <span> {currentValue? currentValue : "Choose a color..." } </span>
        </div>
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
