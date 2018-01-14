

$(document).ready(startUp);

function startUp(){
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

 }
//package up the input fields and send to server.




 function submitCreatedTask(){
    let newTask = {
        taskname: $('#createTaskName').val(),
        duedate: $('#createTaskDate').val(),
        taskowner: $('#createTaskOwner').val(),
        taskdescription: $('#createTaskDescription').val()
    }

    console.log(newTask);
    
    $.ajax({
        method: 'POST',
        url: '/taskmanager/create',
        data: newTask,
        success: () =>{
            console.log('post hit the server and came back with:',result);
        }
        /***
         * Chain the get request to display the updated database  resultsto the DOm
         */
    });
 }