import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import Home from "./pages/Home.jsx";

import { CharacterDetails } from "./pages/character";
import { CreatePlanet } from "./pages/createPlanet";
import { PlanetDetails } from "./pages/planet";
import injectContext from "./store/appContext";
import { Login } from "./pages/login.js";
import { SignUp } from "./pages/signUp.js";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/character/:theid">
              <CharacterDetails />
            </Route>
            <Route exact path="/planet/new">
              <CreatePlanet />
            </Route>
            <Route exact path="/planet/:theid">
              <PlanetDetails />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>
            <Route>
              <h1>Not found!</h1>
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
