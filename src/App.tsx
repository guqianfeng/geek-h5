import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.scss";
import Layout from "./pages/Layout";
import ProfileEdit from "./pages/Edit";
import Login from "./pages/Login";
import Playground from "./pages/Playground";

export default function App() {
  return (
    <div className="app">
      <Switch>
        {/* <Route path="/" exact> */}
        {/* <Redirect to={"/home"}></Redirect> */}
        {/* </Route>  */}
        <Route
          path={"/"}
          exact
          render={() => {
            return <Redirect to={"/home"}></Redirect>;
          }}
        ></Route>
        <Route path={"/home"} component={Layout}></Route>
        <Route path={"/login"} component={Login}></Route>
        <Route path={"/playground"} component={Playground}></Route>
        <Route path="/profile/edit">
          <ProfileEdit />
        </Route>
      </Switch>
    </div>
  );
}
