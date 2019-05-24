import * as React from "react";
import { ErrorMessage } from "formik";
import FormError from "components/form/FormError";
import { BlockPicker } from "react-color";
import ClickOutHandler from "react-onclickout";

interface IProps {
  name: string;
  handleChange: (value: any) => void;
  field: {
    onChange: (e: React.ChangeEvent<any>) => void;
    handleBlur: (e: React.FocusEvent<any>) => void;
    value: any;
    name: string;
  };
  form: any;
  label: string;
  options: [{ label: string; value: any }];
  clearable: boolean;
}
interface IState {
  isOpen: boolean;
}
class TextInput extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props);
    this.state = { isOpen: false };
    this.closeColorPicker = this.closeColorPicker.bind(this);
    this.openColorPicker = this.openColorPicker.bind(this);
  }
  private closeColorPicker(event: any) {
    this.setState({ isOpen: false });
  }
  private openColorPicker() {
    this.setState({ isOpen: true });
  }

  public render() {
    const {
      field: { name, value: currentValue },
      form,
      label
    } = this.props;

    const handleChangeComplete = (color: any) => {
      form.setFieldValue(name, color.hex);
    };

    const colorOptions = [
      "#A63446",
      "#ffffff",
      "#393D3F",
      "#242038",
      "#F7F7F7",
      "#2589BD",
      "#F7CB15",
      "#EDAE49",
      "#D1495B",
      "#F7F7F7",
      "#003D5B",
      "#EA8C55",
      "#A167A5",
      "#D3BCCC",
      "#84BC9C"
    ]

    return (
      <div className="field-input select-input">
        <label>{label}</label>

          <div className="color-picker-display" onClick={this.openColorPicker}>
            <div className="display-selected-color">
              <div
                className="display-color-container"
                style={{
                  backgroundColor: currentValue ? `${currentValue}` : "#ffffff"
                }}
              />
            </div>
            <div className="selected-color-value">
              <span> {currentValue ? currentValue : "Choose a color..."} </span>
            </div>
          </div>

          {this.state.isOpen ? (
            <ClickOutHandler onClickOut={this.closeColorPicker}>
              <BlockPicker color={currentValue} onChange={handleChangeComplete} colors={colorOptions}/>
            </ClickOutHandler>
          ) : null}

        <ErrorMessage name={name} component={FormError} />
      </div>
    );
  }
}

export default TextInput;
