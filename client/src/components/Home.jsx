import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import Card from "./Card"; // Assuming Card component is located in a file named Card.js

const Home = () => {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    fullName: "",
    age: "",
    dateOfBirth: "",
    numberOfClasses: "",
  });
  const [searchName, setSearchName] = useState(""); // State to store the search query
  const [filterCriteria, setFilterCriteria] = useState("none");
  const [showAverage, setShowAverage] = useState(false); // State to toggle the average display

  // Function to fetch all teachers
  const fetchTeachers = async () => {
    try {
      const response = await axios.get(`/teachers`);
      setTeachers(response.data);
    } catch (error) {
      console.error("Error fetching teachers:", error);
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher((prevTeacher) => {
      if (name === "dateOfBirth") {
        const age = calculateAge(value);
        return { ...prevTeacher, [name]: value, age: age.toString() };
      }
      return { ...prevTeacher, [name]: value };
    });
  };

  // Handle form submission
  const createTeacher = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/teachers`, newTeacher);
      setNewTeacher({
        fullName: "",
        dateOfBirth: "",
        numberOfClasses: "",
        age: "",
      });
      fetchTeachers(); // Fetch updated list of teachers after creation
    } catch (error) {
      console.error("Error creating teacher:", error);
    }
  };

  // Function to delete a teacher
  const deleteTeacher = async (id) => {
    try {
      await axios.delete(`/teachers/${id}`);
      fetchTeachers(); // Fetch updated list of teachers after deletion
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const updateTeacher = async (id) => {
    navigate(`/update/${id}`);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Filter teachers by name based on the search query
  const filteredTeachers = searchName
    ? teachers.filter((teacher) =>
        teacher.fullName.toLowerCase().includes(searchName.toLowerCase())
      )
    : teachers;

  // Sort teachers based on the selected filter criteria
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    if (filterCriteria === "age(asc)") {
      return a.age - b.age;
    } else if (filterCriteria === "age(desc)") {
        return b.age - a.age;
    } else if (filterCriteria === "numberOfClasses(asc)") {
      return a.numberOfClasses - b.numberOfClasses;
    } else if (filterCriteria === "numberOfClasses(desc)") {
        return b.numberOfClasses - a.numberOfClasses;
      }
    return 0;
  });

  // Calculate the average number of classes for all teachers
  const averageNumberOfClasses =
    teachers.reduce((acc, curr) => acc + parseInt(curr.numberOfClasses), 0) /
    teachers.length;

  return (
    <div>
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

        {/* Search input to filter teachers by name */}
        <input
          style={{
            height: "40px",
            width: "300px",
            fontSize: "20px",
            margin: "auto 2px",
          }}
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          placeholder="Search by name"
        />
      </div>

      <div
        style={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {/* Button to toggle the display of the average number of classes */}
        <div style={{ display: "inline-block" }}>
          <button onClick={() => setShowAverage(!showAverage)}>
            {showAverage
              ? "Hide Average Number of Classes"
              : "Show Average Number of Classes"}
          </button>
          {showAverage && (
            <div style={{ display: "inline-flex", marginLeft: "10px" }}>
              Average Number of Classes: <b>{averageNumberOfClasses}</b>
            </div>
          )}
        </div>
        <div style={{ display: "inline-block" }}>
          Filter By:
          <select
            value={filterCriteria}
            onChange={(e) => setFilterCriteria(e.target.value)}
          >
            <option value="none">None</option>
            <option value="age(asc)">Age(asc)</option>
            <option value="age(desc)">Age(desc)</option>
            <option value="numberOfClasses(asc)">Number of Classes(asc)</option>
            <option value="numberOfClasses(desc)">
              Number of Classes(desc)
            </option>
          </select>
        </div>
      </div>

      <div style={{ padding: "15px" }}>
        <form onSubmit={createTeacher}>
          {/* Form to create a new teacher */}
          <input
            type="text"
            style={{
              height: "30px",
              width: "200px",
              margin: "5px",
              fontSize: "18px",
            }}
            name="fullName"
            value={newTeacher.fullName}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="date"
            style={{
              height: "30px",
              width: "250px",
              margin: "5px",
              fontSize: "18px",
            }}
            name="dateOfBirth"
            max={moment().format("YYYY-MM-DD")}
            value={newTeacher.dateOfBirth}
            onChange={handleChange}
            placeholder="Enter teacher date of birth"
            required
          />
          <input
            type="number"
            min="0"
            style={{
              height: "30px",
              width: "250px",
              margin: "5px",
              fontSize: "18px",
            }}
            name="numberOfClasses"
            value={newTeacher.numberOfClasses}
            onChange={handleChange}
            placeholder="Enter number of classes"
            required
          />
          <button
            type="submit"
            style={{
              height: "35px",
              width: "200px",
              margin: "5px",
              backgroundColor: "#91F394",
              border: "1px solid #91F394",
              cursor: "pointer",
            }}
          >
            Add Teacher
          </button>
        </form>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "100%",
          textAlign: "center",
          margin: "10px",
        }}
      >
        <table style={{ border: "2px solid black", width: "98%" }}>
          <thead style={{ fontSize: "25px", fontWeight: "bold" }}>
            <tr
              style={{
                outline: "2px solid",
                height: "50px",
              }}
            >
              <td>Name</td>
              <td>Age</td>
              <td>Date of Birth</td>
              <td>Number of Classes</td>
              <td>Operation</td>
            </tr>
          </thead>
          <tbody>
            {sortedTeachers.map((teacher) => (
              <Card
                key={teacher.id}
                teacher={teacher}
                updateTeacher={updateTeacher}
                deleteTeacher={deleteTeacher}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
