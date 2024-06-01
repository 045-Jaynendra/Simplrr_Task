import React, { useState } from "react";
import moment from "moment";

const Card = ({ teacher, updateTeacher, deleteTeacher }) => {
  const [updatedTeacher, setUpdatedTeacher] = useState({ ...teacher });

  const handleUpdate = () => {
    updateTeacher(teacher.id, updatedTeacher); // Pass updated teacher data to the parent component
  };

  const handleDelete = () => {
    deleteTeacher(teacher.id); // Pass the teacher id to the parent component for deletion
  };

  return (
    <tr style={{ height: "60px", outline: "2px solid" }}>
      <td
        style={{
          padding: "5px",
          margin: "5px",
          fontSize: "22px",
        }}
      >
        {teacher.fullName}
      </td>
      <td
        style={{
          padding: "5px",
          margin: "5px",
          fontSize: "22px",
        }}
      >
        {teacher.age}
      </td>
      <td
        style={{
          padding: "5px",
          margin: "5px",
          fontSize: "22px",
        }}
      >
        {moment(teacher.dateOfBirth).format('DD-MM-YYYY')}
      </td>
      <td
        style={{
          padding: "5px",
          margin: "5px",
          fontSize: "22px",
        }}
      >
        {teacher.numberOfClasses}
      </td>
      <td
        style={{
          height: "60px",
          padding: "5px",
          margin: "0px",
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <button
          style={{
            width: "100px",
            height: "40px",
            margin: "auto",
            fontSize: "18px",
            backgroundColor: "rgb(118, 122, 240)"
          }}
          onClick={handleUpdate}
        >
          Update
        </button>
        <button
          style={{
            width: "100px",
            height: "40px",
            margin: "auto",
            fontSize: "18px",
            backgroundColor: "rgb(253, 93, 93)"
          }}
          onClick={handleDelete}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Card;
