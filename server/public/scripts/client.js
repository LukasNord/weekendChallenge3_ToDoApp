

$(document).ready(startUp);

function startUp(){
    $('#createTask').on('click', createTask )
    $('#createTaskCancel').on('click', createTaskCancelBtn);
}






/***************
 * Create a Task
 ****************/

 function createTask(){
    $('.middle-content').css('opacity',0.1);
    $('#create-task-dialogue').css('display','block');

 }
 function createTaskCancelBtn(){
    $('#create-task-dialogue').find('input:text').val(''); 
    $('#createTaskDescription').val('');
    $('#createTaskDate').val('');
    $('#create-task-dialogue').css('display','none');
    $('.middle-content').css('opacity', 1);

 }