import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecordList from "./Components/RecordList";
import CreateRecord from "./Components/CreateRecord";
import EditRecord from "./Components/EditRecord";
import DeleteRecord from "./Components/DeleteRecord"; // Check the relative path
import "./App.css"; // Import the CSS file

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RecordList />} />
        <Route path="/create" element={<CreateRecord />} />
        <Route path="/edit/:id" element={<EditRecord />} />
        <Route path="/delete/:id" element={<DeleteRecord />} />
      </Routes>
    </Router>
  );
}

export default App;
