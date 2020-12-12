import "./App.css";
import React from "react";

import AddCategory from "./components/AddCategory";
import ShowCategory from "./components/ShowCategory";

function App() {
  return (
    <div className="App container">
      <AddCategory />
      <ShowCategory />
    </div>
  );
}

export default App;
