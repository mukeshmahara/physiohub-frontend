import React from "react";
import AppRoutes from "./components/Routes";
import Toast from "./components/Toast";
import "./App.css";

function App() {
  return (
    <div className="App">
      <AppRoutes />
      <Toast />
    </div>
  );
}

export default App;
