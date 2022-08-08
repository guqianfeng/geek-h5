import React from "react";
import { Route } from "react-router-dom";
import "./App.scss";
import Layout from "./pages/Layout";
import Login from "./pages/Login";

export default function App() {
  return (
    <div className="app">
      <h1>我是App</h1>
      <Route path={"/home"} component={Layout}></Route>
      <Route path={"/login"} component={Login}></Route>
    </div>
  );
}
