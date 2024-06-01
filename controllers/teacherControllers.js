const fs = require("fs");

let teachers;

try {
  teachers = JSON.parse(fs.readFileSync("./teachers.json", "utf8"));
  // console.log(teachers);
} catch (e) {
  console.log(e);
}

function saveTeachers() {
  try {
    fs.writeFileSync(
      "./teachers.json",
      JSON.stringify(teachers, null, 2),
      "utf8"
    );
  } catch (error) {
    console.log(error);
  }
}

const getAllTeachers = (req, res) => {
  try {
    res.status(200).json(teachers);
    console.log(teachers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTeacherById = (req, res) => {
  const teacherId = parseInt(req.params.id);
  const teacher = teachers.find((teacher) => teacher.id === teacherId);
  if (teacher) {
    res.status(200).json(teacher);
  } else {
    res.status(404).json({ error: "Teacher not found" });
  }
};

const createTeacher = (req, res) => {
  const newTeacher = req.body;
  const teacherIds = teachers.map((teacher) => teacher.id);
  const newTeacherId = Math.max(...teacherIds) + 1;
  newTeacher.id = newTeacherId;
  teachers.push(newTeacher);
  saveTeachers();
  res.status(201).json(newTeacher);
};

const updateTeacher = (req, res) => {
  const teacherId = parseInt(req.params.id);
  const updatedTeacher = req.body;
  const index = teachers.findIndex((teacher) => teacher.id === teacherId);
  if (index !== -1) {
    console.log("updated: ",updateTeacher);
    teachers[index] = updatedTeacher;
    saveTeachers(); // Assuming this function saves the updated teachers data
    res.status(200).json(updatedTeacher);
  } else {
    res.status(404).json({ error: 'Teacher not found' });
  }
};

const deleteTeacher = (req, res) => {
  const teacherId = parseInt(req.params.id);
  const index = teachers.findIndex((teacher) => teacher.id === teacherId);
  if (index !== -1) {
    teachers.splice(index, 1);
    saveTeachers();
    res.status(200).json({ message: "Teacher deleted successfully" });
  } else {
    res.status(404).json({ error: "Teacher not found" });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
