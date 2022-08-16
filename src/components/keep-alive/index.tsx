import React, { ComponentType } from "react";
import { Route, RouteProps } from "react-router-dom";

export default function KeepAlive({ component, ...rest }: RouteProps) {
  const Component = component as ComponentType;
  return (
    <Route
      {...rest}
      children={(props) => {
        return (
          <div style={{ display: props.match ? "block" : "none" }}>
            <Component></Component>
          </div>
        );
      }}
    ></Route>
  );
}
