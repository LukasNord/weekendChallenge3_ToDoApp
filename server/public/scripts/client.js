

$(document).ready(startUp);

function startUp(){
     getTasks();
    $('#createTask').on('click', createTaskDialogue );
    $('#createTaskCancel').on('click', createTaskCancelBtn);
    $('#submitCreateTask').on('click', submitCreatedTask);
}



/***************
 * Create a Task
 ****************/

 //pop up the task creation dialogue box
 function createTaskDialogue(){
    $('.middle-content').css('opacity',0.1);
    $('#create-task-dialogue').css('display','block');

 }

 //clear inputs and restore back to starting state.
 function createTaskCancelBtn(){
    $('#create-task-dialogue').find('input:text').val(''); 
    $('#createTaskDescription').val('');
    $('#createTaskDate').val('');
    $('#create-task-dialogue').css('display','none');
    $('.middle-content').css('opacity', 1);
    getTasks(); //just in case this is multiple people using the app it will pull any tasks added while in the dialogue.
 }

 //Clears out the Create Task Dialogue when submit button is pressed.
 function createTaskSubmitBtn(){
    $('#create-task-dialogue').css('display','none');
    $('.middle-content').css('opacity', 1);
 }
//package up the input fields and send to server.

 function submitCreatedTask(){
    //form validation
    let validation = false;
    let valueArray = [];
    let inputs = $('input');
    let inputsArray = $('#create-task-dialogue').find(inputs);
    for(let i =0; i<inputsArray.length;i++){
        let field = inputsArray[i].value;
        if( field == ""){
            alert('Please fill out all pieces of the form');
            return false;
        }else{
            validation = true;  
        }
    }
     
    //AJAX POST call
    if(validation == true){

        let newTask = {
            taskname: $('#createTaskName').val(),
            duedate: $('#createTaskDate').val(),
            taskowner: $('#createTaskOwner').val(),
            taskdescription: $('#createTaskDescription').val()
        } //end object literal
        
        $.ajax({
            method: 'POST',
            url: '/taskmanager/',
            data: newTask,
            success: (result) =>{
                console.log(result);
                createTaskSubmitBtn();    
                getTasks(); 
            }         
        }); // end POST
    } //end if statement
 }


/*****************************
  GET tasks from database
 *****************************/

 //GET All tasks in database
function getTasks(){
    $.ajax({
        method: 'GET',
        url: '/taskmanager/',
        success: ( response ) =>{
            appendTaskData(response);        
        }
    });
}











/*******************************************
 * Append Task Data to Task Container on DOM
 *******************************************/

 function appendTaskData(taskArray){
   

    //convert date to something easier to read
    function convertDate(date){
       let newDate = date.split('T');
       newDate = newDate[0];
       return newDate;
    }
    
    for(let i=0; i<taskArray.length; i++){
        let task = taskArray[i];
        let due_date = convertDate( task.due_date ); 
        let date_created = convertDate( task.date_created);
        
        $('#middle-content').append(
            `<div class="active-task-container" >
                <div>
                    <p class="task-name">${task.task}</p>
                    <p class="task-description-label">Task Description</p>  
                    <p class="task-description-body">${task.details} </p>
                </div>
                <div class="owner-date-container">
                    <label class="task-owner-label">Task Owner</label><p class="task-owner-data">${task.task_owner}</p>     
                    <label class="task-due-date-label">Due Date</label><p class="task-due-date">${due_date}</p>          
                    <label class="bold">Date Created:</label><p class="date-created italic">${date_created} </p><br>
                    <label class="bold not-completed">Completion Status</label><br>
                     <i id="deleteBtn" class="fa fa-trash-o icon" aria-hidden="true"></i>
                </div>
            
            </div>`
        
        ); // end append
        $('.active-task-container').data(task);
        
        console.log( $('.active-task-container').data() );
        
        
    }
}// end appendTaskData Function



 
 