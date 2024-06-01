import { useState, useEffect } from "react";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const UpdateTeacherPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [teacher, setTeacher] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    numberOfClasses: "",
  });

  useEffect(() => {
    fetchTeacherDetails();
  }, []);

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(
        `/teachers/${id}`
      );
      setTeacher(response.data);
    } catch (error) {
      console.error("Error fetching teacher details:", error);
    }
  };

  // Function to calculate age from date of birth
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if the birthday hasn't occurred yet this year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeacher((prevTeacher) => {
      if (name === "dateOfBirth") {
        const age = calculateAge(value);
        return { ...prevTeacher, [name]: value, age: age.toString() };
      }
      return { ...prevTeacher, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/teachers/${id}`, teacher);
      navigate("/");
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: "#91F3E3",
        }}
      >
        <h1 style={{ margin: "10px", display: "inline-block" }}>
          Teacher Management Application
        </h1>
      </div>
      <div style={styles.container}>
        <h1 style={styles.header}>Update Teacher</h1>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Name:</label>
            <input
              type="text"
              name="fullName"
              value={teacher.fullName}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Birth:</label>
            <input
              type="date"
              name="dateOfBirth"
              max={moment().format("YYYY-MM-DD")}
              value={teacher.dateOfBirth}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Number of Classes:</label>
            <input
              type="number"
              min="0"
              name="numberOfClasses"
              value={teacher.numberOfClasses}
              onChange={handleInputChange}
              style={styles.input}
              required
            />
          </div>
          <button style={styles.button} type="submit">
            Update
          </button>
          <button
            style={{ ...styles.button, backgroundColor: "#FF6B6B" }}
            type="button"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: "400px",
    border: "2px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    marginBottom: "5px",
    fontSize: "16px",
    color: "#333",
  },
  input: {
    height: "35px",
    width: "100%",
    padding: "5px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "10px",
    margin: "5px",
    backgroundColor: "#91F394",
    border: "none",
    borderRadius: "5px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default UpdateTeacherPage;
