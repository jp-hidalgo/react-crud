import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddPlayer from "./components/add-player.component";
import Player from "./components/player.component";
import PlayersList from "./components/player-list.component";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/players" className="navbar-brand">
          bezKoder
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/players"} className="nav-link">
              Players
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/players"]} component={PlayersList} />
          <Route exact path="/add" component={AddPlayer} />
          <Route path="/players/:id" component={Player} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
