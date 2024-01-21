import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecordList from "./Components/RecordList";
import CreateRecord from "./Components/CreateRecord";
import EditRecord from "./Components/EditRecord";
import "./App.css"; // Correct import path

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/create" element={<CreateRecord />} />
        <Route path="/edit/:id" element={<EditRecord />} />
        <Route path="/delete/:id" element={<CreateRecord />} />{" "}
      </Routes>
    </Router>
  );
}

export default App;
