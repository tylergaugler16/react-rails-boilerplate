import * as React from 'react';


interface IProps{
  children: any;
}
class FormError extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    // const{ formik: {errors}, name} = this.props;
    return (
      <div className="form-error">
        {this.props.children}
      </div>
    );
  }
}

export default FormError;
