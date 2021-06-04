import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import './App.css';
import MainPage from "./components/MainPage/MainPage";
import { withSuspense } from "./hoc/withSuspense";

const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));
const WatchPostPageContainer = React.lazy(() => import("./components/WatchPostPage/WatchPostPageContainer"));

class App extends Component {
  render() {
    return (
      <div>
          <Switch>
            <Redirect exact from="/" to="/main" />
            <Route path="/main" component={MainPage}/>
            <Route path="/watchPost/:id" render={withSuspense(WatchPostPageContainer)}/>
            <Route path="*" render={withSuspense(NotFound)}/>
          </Switch>
      </div>
    );
  }
}
export default App;
