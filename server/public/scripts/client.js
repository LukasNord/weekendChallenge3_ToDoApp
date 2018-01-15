
$(document).ready(startUp);

function startUp(){
     getTasks();
    $('#createTask').on('click', createTaskDialogue );
    $('#createTaskCancel').on('click', createTaskCancelBtn);
    $('#submitCreateTask').on('click', submitCreatedTask);
    $('#middle-content').on('click', '#deleteBtn', deleteTask);
    $('#middle-content').on('click','#markComplete', updateStatus);
}

/********************
 * Create a Task
 ********************/

 //Opens Create Task Dialogue Box
 function createTaskDialogue(){
    $('.middle-content').css('opacity',0.1);
    $('#create-task-dialogue').css('display','block');

 }
//Clears out the Create Task Dialogue when submit button is pressed.
function toggleClassDialogueBox(){

    $('#create-task-dialogue').css('display','none');
    $('.middle-content').css('opacity', 1);
    
 }


 //clear inputs from create task dialogue  box and restore back to starting state.
 function createTaskCancelBtn(){
    $('#create-task-dialogue').find('input:text').val(''); 
    $('#createTaskDescription').val('');
    $('#createTaskDate').val('');
    toggleClassDialogueBox();
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
                createTaskCancelBtn()
                toggleClassDialogueBox();
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
    $('#middle-content').empty();
    $.ajax({
        method: 'GET',
        url: '/taskmanager/',
        success: ( response ) =>{
            $('#middle-content').empty();
            appendTaskData(response);  
            console.log('GET tasks completed');       
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
    //unpack the objects from the array and append them to the DOM
    for(let i=0; i<taskArray.length; i++){
        let task = taskArray[i];
        let due_date = convertDate( task.due_date ); 
        let date_created = convertDate( task.date_created);
        
        
        $('#middle-content').prepend(
            `<div id="activeTaskContainer" class="active-task-container">
                <div>
                    <p class="task-name">${task.task}</p>
                    <p class="task-description-label">Task Description</p>  
                    <p class="task-description-body">${task.details} </p>
                </div>
                <div class="owner-date-container">
                    <label class="task-owner-label">Task Owner</label><p class="task-owner-data">${task.task_owner}</p>     
                    <label class="task-due-date-label">Due Date</label><p class="task-due-date">${due_date}</p>          
                    <label class="bold">Date Created:</label><p class="date-created italic">${date_created} </p><br>
                    <label id="markComplete" class="bold red">Not Complete</label><br>
                     <i id="deleteBtn" class="fa fa-trash-o icon" aria-hidden="true"></i>
                </div>
            
            </div>`
        
        ); // end append
        //put data for task into the container element for later use
        $('#activeTaskContainer').data(task);

        //styling logic based on status.  This... doesn't work perfectly.
         
            if( task.completion_status == true){
               $('#activeTaskContainer').addClass('completed');
               $('#markComplete').html('Completed!');
            }else{console.log('not completed');}
        
    }//end FOR loop
}// end appendTaskData Function


 /***********************
   DELETE a Selected Task
  ***********************/

function deleteTask(){

    //validate deletion
    let confirm = window.confirm("Are you sure you want to delete this task?");
    if(confirm == true){
        let task = $(this).parent().parent('#activeTaskContainer').data();
        
        //AJAX call
        $.ajax({
            method: 'DELETE',
            url: '/taskmanager/' + task.id,
            success: function(response){
                console.log(response);
                getTasks();
            }
        });
        
    }

    
    
}//end DeleteTask

/**********************
 * PUT updated completion status
 **********************/

function updateStatus(){
    //jquery selector in this section isn't getting the appropriate data... which is weird. 
    //works if it's the only task, but if there are multiple tasks it is fetching the task id from the top first then in descending order..
    //Today is Angular so maybe i'll just swap this all out for Angular.
    let task = $(this).parent().parent('#activeTaskContainer').data();
    console.log(task.id);
    
    $.ajax({
        method: 'PUT',
        url: '/taskmanager/'+ task.id,
        success: (response)=>{
            getTasks();
        }
    });
    
}//end updateStatus function

