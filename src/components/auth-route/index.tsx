import { hasToken } from "@/utils/token";
import React, { ComponentType } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";

export default function AuthRoute({ component, ...rest }: RouteProps) {
  const Component = component as ComponentType;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (hasToken()) {
          return <Component></Component>;
        } else {
          return <Redirect to={"/login"}></Redirect>;
        }
      }}
    ></Route>
  );
}
