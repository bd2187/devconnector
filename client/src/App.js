import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import routes from "./components/routes";

import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          {routes}
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
