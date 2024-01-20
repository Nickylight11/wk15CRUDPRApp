// RecordList.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css"; // Import the CSS file

const RecordList = () => {
  const [records, setRecords] = useState([]);

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

  return (
    <div className="recordListContainer">
      <h2>Weightlifting Records</h2>
      <Link to="/create">
        <button className="createButton">Create Personal Record</button>
      </Link>
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
