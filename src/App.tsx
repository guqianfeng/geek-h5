import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import "./App.scss";
import Layout from "./pages/Layout";
import ProfileEdit from "./pages/Edit";
import Login from "./pages/Login";
import Playground from "./pages/Playground";
import AuthRoute from "./components/auth-route";
import Chat from "./pages/Chat";

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
        {/* <Route path="/profile/edit" component={ProfileEdit}></Route> */}
        {/* <Route
          path="/profile/edit"
          render={(props) => {
            console.log(props);
            if (hasToken()) {
              return <ProfileEdit />;
            } else {
              return <Redirect to={"/login"}></Redirect>;
            }
          }}
        ></Route> */}
        <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
        {/* 后端服务器问题先cv结构处理 */}
        {/* <Route path="/chat" component={Chat}></Route> */}
        <AuthRoute path="/chat" component={Chat}></AuthRoute>
      </Switch>
    </div>
  );
}
