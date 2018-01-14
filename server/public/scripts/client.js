

$(document).ready(startUp);

function startUp(){
    $('#createTask').on('click', createTask )

}






/***************
 * Create a Task
 ****************/

 function createTask(){
    $('.middle-content').css('opacity',0.1);
    $('#create-task-dialogue').css('display','block');


 }