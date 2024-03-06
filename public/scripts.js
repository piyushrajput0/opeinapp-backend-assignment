// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch tasks from the backend API
    function fetchTasks() {
        fetch('/api/tasks')
            .then(response => response.json())
            .then(data => {
                const taskList = document.getElementById('task-list');
                taskList.innerHTML = ''; // Clear existing task list
                data.forEach(task => {
                    const taskItem = document.createElement('li');
                    taskItem.innerHTML = `
                        <h3>${task.title}</h3>
                        <p>Description: ${task.description}</p>
                        <p>Due Date: ${task.due_date}</p>
                        <p>Status: ${task.status}</p>
                    `;
                    taskList.appendChild(taskItem);
                });
            })
            .catch(error => console.error('Error fetching tasks:', error));
    }

    // Fetch tasks when the page loads
    fetchTasks();
});
