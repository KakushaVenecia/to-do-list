
function getStarted() {
    const getStarted = document.getElementById("theForm");
    if (getStarted.style.display === "none") {
      getStarted.style.display = "block";
    } else {
      getStarted.style.display = "none";
    }
  }

// let allForms = document.forms
// console.log(allForms)
const formTask = document.getElementById('myForm');
formTask.addEventListener('submit', function(e){
  e.preventDefault();
  const value = formTask.querySelector('#new-task').value;
  const tasks = document.getElementById('tasks');
  const divTasks = document.createElement('div');
  const span = document.createElement('span')
  const listItem = document.createElement('li');
  const deleteBtn = document.createElement('button');
  const editBtn = document.createElement('button');
  listItem.textContent = value;

  divTasks.appendChild(span);
  divTasks.appendChild(editBtn);
  divTasks.appendChild(deleteBtn);


  divTasks.style.display = 'flex';
  divTasks.style.fontWeight = 'bolder';
  divTasks.style.flexDirection='column';
  divTasks.style.width ='60%'
  divTasks.style.margin='auto'
  divTasks.justifyContent='space-evenly';
  // divTasks.style.flexDirection = 'column';


  listItem.className = 'list'
  listItem.style.listStyle='none'
  listItem.style.textAlign='center'
  listItem.style.width='100%'
  listItem.style.margin='auto'
  listItem.style.marginTop='10px'

  deleteBtn.textContent = 'Delete Task';
  deleteBtn.textAlign= 'center';
  deleteBtn.style.backgroundColor='red'
  deleteBtn.addEventListener('click', function() {
    divTasks.remove();
  });

  editBtn.textContent = 'Edit Task';
  editBtn.textAlign= 'center';
  editBtn.style.backgroundColor='lightblue'
  editBtn.addEventListener('click', function() {
    const taskText = listItem.textContent;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = taskText;
    listItem.textContent = '';
    listItem.appendChild(inputField);

    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save';
    saveBtn.textAlign= 'center';
    editBtn.style.backgroundColor='green'
    saveBtn.style.marginLeft = '10px';
    saveBtn.addEventListener('click', function() {
      const newTaskText = inputField.value;
      listItem.removeChild(inputField);
      listItem.textContent = newTaskText;
      listItem.appendChild(editBtn);
      listItem.appendChild(deleteBtn);
    });

    listItem.appendChild(saveBtn);
    listItem.removeChild(editBtn);
    listItem.removeChild(deleteBtn);
  });

// span.style.display='flex'
// span.style.justifyContent='space-between'

  tasks.appendChild(divTasks);
  divTasks.appendChild(span);
  span.appendChild(listItem);
  listItem.appendChild(editBtn);
  listItem.appendChild(deleteBtn);

  
});
