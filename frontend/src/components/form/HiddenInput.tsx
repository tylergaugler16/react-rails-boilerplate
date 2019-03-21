import * as React from 'react';

interface IProps{
  field: {
    name: string;
  }
  initialValue: any;
}
class HiddenInput extends React.Component<IProps, {}> {
  public constructor(props: IProps) {
    super(props);
  }

  public render() {
    const{field: {name }, initialValue} = this.props;
    return (
      <input value={initialValue}  type="hidden"
        name={name}
      />
    );
  }
}

export default HiddenInput;
