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
    const queryText = 'SELECT * FROM tasks ORDER BY id ASC';
    pool.query(queryText)
        .then( ( result)=>{
            res.send(result.rows);
        })
        .catch( (err) => {
            console.log('error with tasks GET:', err);
            res.sendStatus(500);
        })
});

//Delete a task 

router.delete('/:id', (req,res)=> {
    const queryText = 'DELETE FROM tasks WHERE id=$1';
    pool.query(queryText, [req.params.id] )
    .then( ( result )=> {
        console.log('successfully deleted item id: ',req.params.id);
        res.sendStatus(200);
    })
    .catch( (err) =>{
        console.log('error deleting item', err);
        res.sendStatus(500);       
    });
}); //end DELETE


//UPDATE task completion status
router.put('/:id', (req,res)=> {
    const queryText = 'UPDATE tasks SET completion_status = TRUE WHERE id=$1 RETURNING completion_status';
    pool.query(queryText, [req.params.id] )
    .then( ( result )=>{
        res.send(result.rows);
         })
    .catch( (err)=>{
        console.log('error updating status: ', err);
    });
});
















  module.exports = router;