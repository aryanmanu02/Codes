import React, { useState } from 'react';
import './App.css';

function App() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState('');
    const [deadlineInput, setDeadlineInput] = useState('');

    const addTask = () => {
        if (taskInput.trim() && deadlineInput) {
            setTasks([...tasks, { text: taskInput, deadline: deadlineInput, completed: false }]);
            setTaskInput('');
            setDeadlineInput('');
        }
    };

    const toggleTaskCompletion = (index) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    const removeTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    };

    return (
        <div className="App">
            <h1>To-Do List</h1>
            <div className="input-container">
                <input 
                    type="text" 
                    value={taskInput} 
                    onChange={(e) => setTaskInput(e.target.value)} 
                    placeholder="Add a new task" 
                />
                <input 
                    type="date" 
                    value={deadlineInput} 
                    onChange={(e) => setDeadlineInput(e.target.value)} 
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul className="task-list">
                {tasks.map((task, index) => (
                    <li key={index} className={task.completed ? 'completed' : ''}>
                        <span onClick={() => toggleTaskCompletion(index)}>
                            {task.text} - {task.deadline}
                        </span>
                        <button onClick={() => removeTask(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;


// App.css
// .App {
//     text-align: center;
//     max-width: 600px;
//     margin: 0 auto;
//     padding: 20px;
// }

// .input-container {
//     margin-bottom: 20px;
// }

// input {
//     padding: 10px;
//     margin: 5px;
//     width: 40%;
//     border: 1px solid #ccc;
//     border-radius: 4px;
// }

// button {
//     padding: 10px 15px;
//     background-color: #007bff;
//     color: white;
//     border: none;
//     border-radius: 4px;
//     cursor: pointer;
// }

// button:hover {
//     background-color: #0056b3;
// }

// .task-list {
//     list-style: none;
//     padding: 0;
// }

// .task-list li {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 10px;
//     border-bottom: 1px solid #ccc;
// }

// .completed {
//     text-decoration: line-through;
//     color: #6c757d;
// }
