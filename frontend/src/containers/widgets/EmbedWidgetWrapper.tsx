import React from "react";

const EmpbedWidgetWrapper = (props: any) => (
  <div>
    <h1>Embed widget!</h1>
    {props.children}
  </div>
);

export default EmpbedWidgetWrapper;
