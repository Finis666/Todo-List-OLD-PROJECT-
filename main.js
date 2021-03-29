var arrImg  = ['black.png','green.png','yellow.png'],
    content = document.getElementById('content'),
    id,
    txt     = '';
function getTasks(){
    let tasks;
    var data = localStorage.getItem('todos');
    if(data === null){
        tasks = [];
        id = 1;
    }else{
        tasks = JSON.parse(data);
    }
    for(let i = 0; i < tasks.length; i++) {
        txt += `<div class="tasks-wrappers" id="task-id-`+tasks[i][0]+`" data-id="`+tasks[i][0]+`">
                    <p class="text-tasks text-title-tasks">`+tasks[i][1]+` </p>
                    <p class="text-tasks text-desc-tasks">`+tasks[i][2]+`</p>
                    <div class="buttons">                                               
                                        <button class="edit-task"> Edit task </button>
                                        <button  class="remove-btn"> Remove </button>
                                </div>
                    <img class="img-tasks-body" src="images/`+tasks[i][3]+`">
                </div>`;
                id = tasks[i][0];
    }
    document.getElementById('content').innerHTML = txt;
}
getTasks();

function newTask(){
    let randomMonth = arrImg[Math.floor(Math.random() * arrImg.length)];
    var title       = document.getElementById('title').value,
        textarea    = document.getElementById('text-area').value,
        msg         = '',
        flag        = true;
    if(!title && !title.trim().length){
            flag = false;
            msg += 'Title is required ,'; 
        }
    if(!textarea && !textarea.trim().length){
        flag = false;
        msg += 'Description is required';
        }
    if(flag){
        id++;
        content.innerHTML += `<div class="tasks-wrappers" id="task-id-`+id+`" data-id="`+id+`" >
                                    <p class="text-tasks text-title-tasks"> Title: `+title+` </p>                           
                                    <p class="text-tasks"> Description:`+textarea+`</p>
                                    <div class="buttons">                                               
                                            <button class="edit-task"> Edit task </button>
                                            <button class="remove-btn"> Remove </button>
                                    </div>
                                    <img class="img-tasks-body" src="images/`+randomMonth+`">
                                </div>`;
        savelocal(title,textarea,id,randomMonth);
        document.getElementById('title').value = '';
        document.getElementById('text-area').value = '';
    }else{
        alert(msg)
    }
}
var parent = document.getElementById('content');
function savelocal(title,textarea,id,randomMonth){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push([id,title,textarea,randomMonth]);
    localStorage.setItem('todos',JSON.stringify(todos));
}

var el          = document.querySelectorAll(".remove-btn"),
    editbtn     = document.querySelectorAll(".edit-task");             
for(var i = 0; i < el.length; i++){
    (function(i) {
        el[i].onclick = function(){ 
            var localStorageId = el[i].parentElement.parentElement.getAttribute("data-id"),
                removeDiv      = el[i].parentElement.parentElement,
                tasks,
                data           = localStorage.getItem('todos');
            if(data === null){
                tasks = [];
            }else{
                tasks = JSON.parse(data);
            }
            for (let t = 0; t < tasks.length; t++){
                if(parseInt(tasks[t][0]) === parseInt(localStorageId)){
                    removeDiv.remove();
                    tasks.splice(tasks[t], 1);    
                }
                localStorage.setItem('todos',JSON.stringify(tasks)); 
                if(tasks.length == 0){
                    localStorage.removeItem('todos');
                     
                }
            }
            
        };   
    })(i);
}
for (let e = 0; e < editbtn.length; e++){
    (function(e){
        editbtn[e].onclick = function(){
            var editId      = editbtn[e].parentElement.parentElement.getAttribute("data-id"),
                tasksTitle  = editbtn[e].parentElement.parentElement.querySelector('.text-title-tasks').textContent,
                description = editbtn[e].parentElement.parentElement.querySelector('.text-desc-tasks').textContent,
                titleLine   = editbtn[e].parentElement.parentElement.querySelector('.text-title-tasks'),
                desLine     = editbtn[e].parentElement.parentElement.querySelector('.text-desc-tasks'),
                savebtn     = editbtn[e].parentElement.parentElement.querySelector('.buttons'),
                localitem   = localStorage.getItem('todos'),
                tasks;
                titleLine.innerHTML = '<input id="edit-task-title" type="text" value="'+tasksTitle+' " >';
                desLine.innerHTML   = '<input id="edit-task-des" type="text" value="'+description+' " >';
                savebtn.innerHTML   = '<button onclick="saveBtn('+editId+')" id="save-bth">Save</button><button   onclick="cancelBtn('+editId+')"  id="cancelBtn">cancel</button>';
            }
            
    })(e);
}

function saveBtn(id){
    var title       = document.getElementById('edit-task-title').value,
        title_2     = document.getElementById('edit-task-title'),
        description = document.getElementById('edit-task-des').value,
        saveId      = document.getElementById('task-id-'+id),
        data        = localStorage.getItem('todos'),
        tasks;
        if(data === null){
            tasks = [];
        }else{
            tasks = JSON.parse(data);
        }
        for (let t = 0; t < tasks.length; t++){
            if(parseInt(id) === parseInt(tasks[t][0])){
                tasks[t][1] = title;
                tasks[t][2] = description;  
                localStorage.setItem('todos',JSON.stringify(tasks));
                saveId.innerHTML = 
                                    `<p class="text-tasks text-title-tasks">`+title+`</p>
                                    <p class="text-tasks text-desc-tasks">`+description+`</p>
                                    <div class="buttons">                                               
                                                        <button class="edit-task"> Edit task </button>
                                                        <button class="remove-btn"> Remove </button>
                                                </div>
                                    <img class="img-tasks-body" src="images/`+tasks[t][3]+`">
                                </div>`

            }else{
                             
            }
            
        }       
}
function cancelBtn(id){
    let currentId = document.getElementById('task-id-'+id);
        buttons   = document.querySelectorAll('.buttons');
    var input       = document.getElementById('edit-task-title'),
        desinput    = document.getElementById('edit-task-des'),
        save        = document.getElementById('save-bth'),
        cancel      = document.getElementById('cancelBtn')
        save.remove();
        cancel.remove();
        input.remove();
        desinput.remove();
    var data        = localStorage.getItem('todos'),
        title       = currentId.querySelector('.text-tasks'),
        des         = currentId.querySelector('.text-desc-tasks'),
        editButton  = currentId.querySelector('.buttons'),
        tasks;
    if(data === null){
        tasks = [];
    }else{
        tasks = JSON.parse(data);
    }
    for (let c = 0; c < tasks.length; c++){
        if(id == tasks[c][0]){
            title.innerHTML     = tasks[c][1];
            des.innerHTML        = tasks[c][2];
            editButton.innerHTML =                                         
                                    `<button class="edit-task"> Edit task </button>
                                    <button class="remove-btn"> Remove </button>`;
        
        }
    }
}