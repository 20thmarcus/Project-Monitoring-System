// routes.js
const express = require('express');
const router = express.Router();
const { sql, poolPromise } = require('./db');

// gets or fetches all tasksbidoodles
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM tasks');
        res.json(result.recordset);
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).send('Server error');
    }
});

// router that creates tasksbidoodles
router.post('/', async (req, res) => {
    const { module, task, budgetHours, targetDate, status } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('module', sql.VarChar, module)
            .input('task', sql.VarChar, task)
            .input('budgetHours', sql.Int, budgetHours)
            .input('targetDate', sql.Date, targetDate)
            .input('status', sql.VarChar, status)
            .query('INSERT INTO tasks (module, task, budget_hours, target_date, status) VALUES (@module, @task, @budget_hours, @target_date, @status)');
        res.status(201).send('Task created');
    } catch (err) {
        console.error('Error inserting task:', err);
        res.status(500).send('Server error');
    }
});

// Update
router.put('/', async (req, res) => {
    const { id } = req.params;
    const { module, task, budget_hours, target_date, status } = req.body;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .input('module', sql.VarChar, module)
            .input('task', sql.VarChar, task)
            .input('budget_hours', sql.Int, budget_hours)
            .input('target_date', sql.Date, target_date)
            .input('status', sql.VarChar, status)
            .query('UPDATE tasks SET module = @module, task = @task, budget_hours = @budget_hours, target_date = @target_date, status = @status WHERE id = @id');
        res.send('Task updated');
    } catch (err) {
        console.error('Error updating task:', err);
        res.status(500).send('Server error');
    }
});

// Delete
router.delete('/', async (req, res) => {
    const { id } = req.params;
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, id)
            .query('DELETE FROM tasks WHERE id = @id');
        res.send('Task deleted');
    } catch (err) {
        console.error('Error deleting task:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;
