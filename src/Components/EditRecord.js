import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditRecord = () => {
  const { id } = useParams();
  const history = useNavigate();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    const fetchRecordDetails = async () => {
      try {
        const response = await axios.get(
          `https://65aad8b6081bd82e1d97e451.mockapi.io/CRUDPRApp/${id}`
        );

        setRecord(response.data);
      } catch (error) {
        console.error("Error fetching record details:", error.message);
      }
    };

    fetchRecordDetails();
  }, [id]); // Make sure to include 'id' as a dependency

  const handleUpdateRecord = async () => {
    try {
      // Perform update logic here
      console.log("Updating record:", record);

      // Redirect to the record list page or another appropriate location
      history.push("/");
    } catch (error) {
      console.error("Error updating record:", error.message);
    }
  };

  return (
    <div>
      <h2>Edit Record {id}</h2>
      {record ? (
        <div>
          {/* Render form fields for editing record */}
          <button onClick={handleUpdateRecord}>Update Record</button>
        </div>
      ) : (
        <p>Loading record details...</p>
      )}
    </div>
  );
};

export default EditRecord;
