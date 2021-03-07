import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Dish from "./components/Dish";
import Dishform from "./components/Dishform";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/adddish" component={Dishform} />
          <Route exact path="/dish/:slug" component={Dish} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
