const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');




//INSERT new task received from client into the database.
router.post('/', (req,res) => {
    console.log('came from client:', req.body);
    const queryText = `INSERT INTO tasks (task,details, due_date, task_owner)VALUES($1, $2, $3, $4)`;
    pool.query(queryText, [req.body.taskname,req.body.taskdescription,req.body.duedate,req.body.taskowner])
        .then( ( result) => {
            console.log('query results:', result);
            res.sendStatus(201);          
        })
        .catch( (err) => {
            console.log('poolquery for insert into tasks broken');
            res.sendStatus(500);
        })
  });
  
//SELECT all tasks currently in data base and send to Client.
router.get('/', (req,res)=> {
    const queryText = 'SELECT * FROM tasks';
    pool.query(queryText)
        .then( ( result)=>{
            res.send(result.rows);
        })
        .catch( (err) => {
            console.log('error with tasks GET:', err);
            res.sendStatus(500);
        })
});



  module.exports = router;