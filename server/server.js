const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const taskManager = require('./routes/taskmanager.router')



app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('server/public'));


app.use('/taskmanager/', taskManager);




app.listen(port, function(){
    console.log('server running on: ', port);
});
