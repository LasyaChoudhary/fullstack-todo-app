import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./Welcome";
import TodoPage from "./TodoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/todos" element={<TodoPage />} />
    </Routes>
  );
}

export default App;

