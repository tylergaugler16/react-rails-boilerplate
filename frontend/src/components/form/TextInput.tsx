import * as React from 'react';
import { ErrorMessage } from 'formik';
import FormError from "components/form/FormError";

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
  placeholder: string;
}
class TextInput extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    const {field: {value}} = this.props;
    this.handleChange(value);
  }
  private handleChange(value: any){
    const{field: { onChange }} = this.props;
    if(typeof this.props.handleChange === "function"){
      this.props.handleChange(value);
    }
    onChange(value);
  }

  public render() {
    const{field: {name, value }, label, placeholder} = this.props;
    return (
      <div className="field-input">
      <label className="field a-field a-field_a2 page__field">
       <input className="field__input a-field__input"  type="text"
         name={name}
         value={value}
         onChange={this.handleChange} placeholder={placeholder || " "} />
         <span className="a-field__label-wrap">
          <span className="a-field__label">{label}</span>
        </span>
     </label>
        <ErrorMessage name={name} component={FormError} />

      </div>
    );
  }
}

export default TextInput;
