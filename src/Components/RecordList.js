import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Import the CSS file

const RecordList = () => {
  const [records, setRecords] = useState([]);
  const [exerciseType, setExerciseType] = useState("");
  const [weightLifted, setWeightLifted] = useState("");
  const [repetitions, setRepetitions] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    // Fetch records from the Mock API when the component mounts
    const fetchRecords = async () => {
      try {
        // Fetch all records
        const response = await axios.get(
          "https://65aad8b6081bd82e1d97e451.mockapi.io/CRUDPRApp"
        );

        // Set state with the fetched records
        setRecords(response.data);
      } catch (error) {
        console.error("Error fetching records:", error.message);
      }
    };

    fetchRecords();
  }, []);

  const handleCreateRecord = async () => {
    try {
      // Validate input
      if (!exerciseType || !weightLifted || !repetitions || !date) {
        console.error("All fields are required.");
        return;
      }

      // Create new record object
      const newRecord = {
        exerciseType,
        weightLifted: parseFloat(weightLifted),
        repetitions: parseInt(repetitions),
        date,
      };

      // Log the record before sending the request
      console.log("New Record:", newRecord);

      // Send POST request to Mock API
      await axios.post(
        "https://65aad8b6081bd82e1d97e451.mockapi.io/CRUDPRApp",
        newRecord
      );

      // Fetch records again after creating a new record
      const response = await axios.get(
        "https://65aad8b6081bd82e1d97e451.mockapi.io/CRUDPRApp"
      );

      // Set state with the updated records
      setRecords(response.data);

      // Clear input fields
      setExerciseType("");
      setWeightLifted("");
      setRepetitions("");
      setDate("");
    } catch (error) {
      // Handle errors (e.g., display error message)
      console.error("Error creating record:", error.message);

      // Check for error response from the API
      if (error.response) {
        console.log("API Response (Error):", error.response.data);
      }
    }
  };

  return (
    <div className="recordListContainer">
      <h2>Weightlifting Records</h2>
      {/* Create Record Form */}
      <div>
        <form>
          <label>Exercise Type:</label>
          <input
            type="text"
            value={exerciseType}
            onChange={(e) => setExerciseType(e.target.value)}
          />

          <label>Weight Lifted:</label>
          <input
            type="text"
            value={weightLifted}
            onChange={(e) => setWeightLifted(e.target.value)}
          />

          <label>Repetitions:</label>
          <input
            type="text"
            value={repetitions}
            onChange={(e) => setRepetitions(e.target.value)}
          />

          <label>Date:</label>
          <input
            type="text"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <button type="button" onClick={handleCreateRecord}>
            Create Record
          </button>
        </form>
      </div>
      {/* Record List Table */}
      <table className="recordTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Exercise Type</th>
            <th>Weight Lifted</th>
            <th>Repetitions</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.exerciseType}</td>
              <td>{record.weightLifted}</td>
              <td>{record.repetitions}</td>
              <td>{record.date}</td>
              <td>
                <Link to={`/edit/${record.id}`}>
                  <button className="editButton">Edit</button>
                </Link>
                <Link to={`/delete/${record.id}`}>
                  <button className="deleteButton">Delete</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordList;
