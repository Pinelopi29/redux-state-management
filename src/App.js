import React, { Component } from "react";

import "./App.css";
import { Projects } from "./components/view-projects/Projects";

class App extends Component {
  render() {
    return (
      <div className="app-con">
        <header className="App-header">
          <h1 className="App-title">Projects</h1>
        </header>
        <div className="App-container">
          <Projects />
        </div>
      </div>
    );
  }
}

export default App;
