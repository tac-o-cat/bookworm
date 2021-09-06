import React from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import { ListPage } from "./List/ListPage";
console.log("??????????");
export const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Book shelve</Link>
          </li>
          <li>
            <Link to="add">Add a book</Link>
          </li>
        </ul>
      </nav>
    </div>

    <Switch>
      <Route exact path="/">
        <ListPage />
      </Route>
      <Route exact path="/add">
        <div>짜잔~</div>
      </Route>
    </Switch>
  </Router>
);
