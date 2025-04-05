  // Check if there are saved tasks in localStorage
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let currentFilter = 'all';
  
  // Toggle form visibility
  function getStarted() {
    const formContainer = document.getElementById("theForm");
    if (formContainer.style.display === "none") {
      formContainer.style.display = "block";
    } else {
      formContainer.style.display = "block"; // Always show form
      window.scrollTo({
        top: formContainer.offsetTop - 20,
        behavior: 'smooth'
      });
    }
  }
  
  // Add event listeners
  document.addEventListener('DOMContentLoaded', function() {
    const formTask = document.getElementById('myForm');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Add task on form submit
    formTask.addEventListener('submit', addTask);
    
    // Filter tasks
    filterButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTasks();
      });
    });
    
    // Initial render
    renderTasks();
  });
  
  // Add new task
  function addTask(e) {
    e.preventDefault();
    const input = document.getElementById('new-task');
    const taskText = input.value.trim();
    
    if (taskText === '') {
      showAlert('Please add a task!');
      return;
    }
    
    // Create new task object
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false,
      createdAt: new Date()
    };
    
    // Add to tasks array
    tasks.push(task);
    
    // Save to localStorage
    saveToLocalStorage();
    
    // Reset form
    input.value = '';
    
    // Update UI
    renderTasks();
  }
  
  // Render tasks based on current filter
  function renderTasks() {
    const tasksContainer = document.getElementById('tasks');
    const filteredTasks = filterTasks();
    
    if (filteredTasks.length === 0) {
      tasksContainer.innerHTML = `
        <div class="empty-state">
          <i class="fas fa-clipboard-list"></i>
          <p>${tasks.length === 0 ? 'No tasks yet. Add a task to get started!' : 'No tasks match the current filter.'}</p>
        </div>
      `;
    } else {
      let tasksHTML = '';
      
      filteredTasks.forEach(task => {
        tasksHTML += `
          <div class="task-item" data-id="${task.id}">
            <div class="task-text ${task.completed ? 'completed' : ''}">${task.text}</div>
            <div class="task-actions">
              <button class="action-btn complete-btn" onclick="toggleComplete(${task.id})">
                <i class="fas ${task.completed ? 'fa-undo' : 'fa-check'}"></i>
                ${task.completed ? 'Undo' : 'Complete'}
              </button>
              <button class="action-btn edit-btn" onclick="editTask(${task.id})">
                <i class="fas fa-edit"></i> Edit
              </button>
              <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">
                <i class="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        `;
      });
      
      tasksContainer.innerHTML = tasksHTML;
    }
    
    // Update counter
    updateTaskCounter();
  }
  
  // Filter tasks based on current filter
  function filterTasks() {
    switch(currentFilter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return [...tasks];
    }
  }
  
  // Toggle task completion status
  function toggleComplete(id) {
    tasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    
    saveToLocalStorage();
    renderTasks();
  }
  
  // Edit task
  function editTask(id) {
    const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
    const taskText = taskItem.querySelector('.task-text');
    const taskActions = taskItem.querySelector('.task-actions');
    const currentText = taskText.textContent;
    
    taskText.innerHTML = `<input type="text" class="edit-input" value="${currentText}">`;
    taskActions.innerHTML = `
      <button class="action-btn save-btn" onclick="saveEdit(${id})">
        <i class="fas fa-save"></i> Save
      </button>
    `;
    
    taskItem.querySelector('.edit-input').focus();
  }
  
  // Save edited task
  function saveEdit(id) {
    const taskItem = document.querySelector(`.task-item[data-id="${id}"]`);
    const input = taskItem.querySelector('.edit-input');
    const newText = input.value.trim();
    
    if (newText === '') {
      showAlert('Task cannot be empty!');
      return;
    }
    
    tasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, text: newText };
      }
      return task;
    });
    
    saveToLocalStorage();
    renderTasks();
  }
  
  // Delete task
  function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveToLocalStorage();
    renderTasks();
  }
  
  // Update task counter
  function updateTaskCounter() {
    const remainingTasks = tasks.filter(task => !task.completed).length;
    document.getElementById('tasks-counter').textContent = remainingTasks;
  }
  
  // Save to localStorage
  function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  
  // Show alert
  function showAlert(message) {
    alert(message);
  }