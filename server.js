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
    console.error("Error fetching incharges:", err);
    res.status(500).send("Server error");
  }
});

//endpoints for incharges tableskidoodles
//read incharges
app.get("/incharges", async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("SELECT inchargeName, lastName, email FROM incharges");
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching incharges:", err);
    res.status(500).send("Server error");
  }
});

//create incharge
app.post("/incharges", async (req, res) => {
  const { inchargeName, lastName, email } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("inchargeName", sql.VarChar, inchargeName)
      .input("lastName", sql.VarChar, lastName)
      .input("email", sql.VarChar, email)
      .query(
        "INSERT INTO incharges (inchargeName, lastName, email) VALUES (@inchargeName, @lastName, @email)"
      );
    res.status(201).send("Incharge created");
  } catch (err) {
    console.error("Error creating incharge:", err);
    res.status(500).send("Server error");
  }
});

//update incharge
app.put("/incharges/:id", async (req, res) => {
  const { id } = req.params;
  const { inchargeName, lastName, email } = req.body;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("inchargeName", sql.VarChar, inchargeName)
      .input("lastName", sql.VarChar, lastName)
      .input("email", sql.VarChar, email)
      .query(
        "UPDATE incharges SET inchargeName = @inchargeName, lastName = @lastName, email = @email WHERE inchargeID = @id"
      );
    res.send("Incharge updated");
  } catch (err) {
    console.error("Error updating incharge:", err);
    res.status(500).send("Server error");
  }
});

//delete incharge
app.delete("/incharges/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await poolPromise;
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM incharges WHERE inchargeID = @id");
    res.send("Incharge deleted");
  } catch (err) {
    console.error("Error deleting incharge:", err);
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

//read modules
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
        "select taskID, project, module, task, budgetHours, targetDate, status, incharge, startDate, endDate, actualHours, leadTime, notes FROM tasks;"
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
    incharge,
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
      .input("incharge", sql.VarChar, incharge)
      .input("startDate", sql.DateTime, startDate)
      .input("endDate", sql.DateTime, endDate)
      .input("actualHours", sql.Decimal, actualHours)
      .input("leadTime", sql.Decimal, leadTime)
      .input("notes", sql.VarChar, notes)
      .query(
        "INSERT INTO tasks (project, module, task, budgetHours, targetDate, status, incharge, startDate, endDate, actualHours, leadTime, notes) VALUES (@project, @module, @task, @budgetHours, @targetDate, @status, @incharge, @startDate, @endDate, @actualHours, @leadTime, @notes)"
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
    incharge,
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
      .input("incharge", sql.VarChar, incharge)
      .input("startDate", sql.DateTime, startDate)
      .input("endDate", sql.DateTime, endDate)
      .input("actualHours", sql.Decimal, actualHours)
      .input("leadTime", sql.Decimal, leadTime)
      .input("notes", sql.VarChar, notes)
      .query(
        "UPDATE tasks SET project = @project, module = @module, task = @task, budgetHours = @budgetHours, targetDate = @targetDate, status = @status, incharge = @incharge, startDate = @startDate, endDate = @endDate, actualHours = @actualHours, leadTime = @leadTime, notes = @notes WHERE taskID = @id"
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
