import express from "express";
import { sql, poolPromise } from "./db.js";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: "GET,POST,PUT,DELETE", // Allow specific methods
    allowedHeaders: "Content-Type,Authorization", // Allow specific headers
    optionsSuccessStatus: 204, // Some legacy browsers choke on 204
  })
);

app.get("/tasks/status", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT status FROM tasks");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
});

//endpoints for users tableskidoodles
//read users
app.get("/users", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT firstName FROM users");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Server error");
  }
});

//create user
app.post("/users", async (req, res) => {
  const { firstName, lastName, email } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("firstName", sql.VarChar, firstName)
      .input("lastName", sql.VarChar, lastName)
      .input("email", sql.VarChar, email)
      .query(
        "INSERT INTO users (firstName, lastName, email) VALUES (@firstName, @lastName, @email)"
      );
    res.status(201).send("User created");
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Server error");
  }
});

//update user
app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("firstName", sql.VarChar, firstName)
      .input("lastName", sql.VarChar, lastName)
      .input("email", sql.VarChar, email)
      .query(
        "UPDATE users SET firstName = @firstName, lastName = @lastName, email = @email WHERE userID = @id"
      );
    res.send("User updated");
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send("Server error");
  }
});

//delete user
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM users WHERE userID = @id");
    res.send("User deleted");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Server error");
  }
});

//endpoint for projects table

//read projects
app.get("/projects", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT project, projectDescription FROM projects");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).send("Server error");
  }
});

//read project name only
app.get("/projects/name", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT project FROM projects");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching projects:", err);
    res.status(500).send("Server error");
  }
});
//create project
app.post("/projects", async (req, res) => {
  const { projectDescription, project } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("projectDescription", sql.VarChar, projectDescription)
      .input("project", sql.VarChar, project)
      .query(
        "INSERT INTO projects (projectDescription, project) VALUES (@projectDescription, @project)"
      );
    res.status(201).send("Project created");
  } catch (err) {
    console.error("Error creating project:", err);
    res.status(500).send("Server error");
  }
});

//update project
app.put("/projects/:id", async (req, res) => {
  const { id } = req.params;
  const { projectDescription, project } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("projectDescription", sql.VarChar, projectDescription)
      .input("project", sql.VarChar, project)
      .query(
        "UPDATE projects SET projectDescription = @projectDescription, project = @project WHERE projectID = @id"
      );
    res.send("Project updated");
  } catch (err) {
    console.error("Error updating project:", err);
    res.status(500).send("Server error");
  }
});

//delete project
app.delete("/projects/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM projects WHERE projectID = @id");
    res.send("Project deleted");
  } catch (err) {
    console.error("Error deleting project:", err);
    res.status(500).send("Server error");
  }
});

//api endpoints for modules table

//read mmodules
app.get("/modules", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT moduleName FROM modules");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching modules:", err);
    res.status(500).send("Server error");
  }
});

//create module
app.post("/modules", async (req, res) => {
  const { moduleName, projectID } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("moduleName", sql.VarChar, moduleName)
      .query("INSERT INTO modules (moduleName) VALUES (@moduleName)");
    res.status(201).send("Module created");
  } catch (err) {
    console.error("Error creating module:", err);
    res.status(500).send("Server error");
  }
});

//update module
app.put("/modules/:id", async (req, res) => {
  const { id } = req.params;
  const { moduleName, projectID } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("moduleName", sql.VarChar, moduleName)
      .input("projectID", sql.Int, projectID)
      .query(
        "UPDATE modules SET moduleName = @moduleName, projectID = @projectID WHERE moduleID = @id"
      );
    res.send("Module updated");
  } catch (err) {
    console.error("Error updating module:", err);
    res.status(500).send("Server error");
  }
});

//delete module
app.delete("/modules/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM modules WHERE moduleID = @id");
    res.send("Module deleted");
  } catch (err) {
    console.error("Error deleting module:", err);
    res.status(500).send("Server error");
  }
});

//api endpoints for tasks table

//read tasks
app.get("/tasks/getallproject", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query(
        "select taskID, project, module, task, budgetHours, targetDate, status, user, startDate, endDate, actualHours, leadTime, notes FROM tasks;"
      );
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).send("Server error");
  }
});

//create task
app.post("/tasks", async (req, res) => {
  const {
    project,
    module,
    task,
    budgetHours,
    targetDate,
    status,
    inCharge,
    startDate,
    endDate,
    actualHours,
    leadTime,
    notes,
  } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("project", sql.VarChar, project)
      .input("module", sql.VarChar, module)
      .input("task", sql.VarChar, task)
      .input("budgetHours", sql.Decimal, budgetHours)
      .input("targetDate", sql.DateTime, targetDate)
      .input("status", sql.VarChar, status)
      .input("inCharge", sql.VarChar, inCharge)
      .input("startDate", sql.DateTime, startDate)
      .input("endDate", sql.DateTime, endDate)
      .input("actualHours", sql.Decimal, actualHours)
      .input("leadTime", sql.Decimal, leadTime)
      .input("notes", sql.VarChar, notes)
      .query(
        "INSERT INTO tasks (project, module, task, budgetHours, targetDate, status, inCharge, startDate, endDate, actualHours, leadTime, notes) VALUES (@project, @module, @task, @budgetHours, @targetDate, @status, @inCharge, @startDate, @endDate, @actualHours, @leadTime, @notes)"
      );
    res.status(201).send("Task created");
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).send("Server error");
  }
});

//update task
app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const {
    project,
    module,
    task,
    budgetHours,
    targetDate,
    status,
    inCharge,
    startDate,
    endDate,
    actualHours,
    leadTime,
    notes,
  } = req.body;

  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("project", sql.VarChar, project)
      .input("module", sql.VarChar, module)
      .input("task", sql.VarChar, task)
      .input("budgetHours", sql.Decimal, budgetHours)
      .input("targetDate", sql.DateTime, targetDate)
      .input("status", sql.VarChar, status)
      .input("inCharge", sql.VarChar, inCharge)
      .input("startDate", sql.DateTime, startDate)
      .input("endDate", sql.DateTime, endDate)
      .input("actualHours", sql.Decimal, actualHours)
      .input("leadTime", sql.Decimal, leadTime)
      .input("notes", sql.VarChar, notes)
      .query(
        "UPDATE tasks SET project = @project, module = @module, task = @task, budgetHours = @budgetHours, targetDate = @targetDate, status = @status, inCharge = @inCharge, startDate = @startDate, endDate = @endDate, actualHours = @actualHours, leadTime = @leadTime, notes = @notes WHERE taskID = @id"
      );

    res.send("Task updated");
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Server error");
  }
});

//delete task
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM tasks WHERE taskID = @id");
    res.send("Task deleted");
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).send("Server error");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
