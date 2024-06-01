const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.use(express.json());
const teacherRoutes = require("./routes/teacherRoutes");
app.use("/teachers", teacherRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
