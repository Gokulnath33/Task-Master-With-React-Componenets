const { useState, useEffect } = React;

// --- Components ---

// 1. TaskItem Component
const TaskItem = ({ task, onToggle, onDelete }) => {
    return (
        <div className="task-item">
            <div className="task-content">
                <label className="checkbox-container">
                    <input 
                        type="checkbox" 
                        checked={task.completed} 
                        onChange={() => onToggle(task.id)} 
                    />
                    <span className="checkmark"></span>
                </label>
                <span className={`task-text ${task.completed ? 'completed' : ''}`}>
                    {task.text}
                </span>
            </div>
            <div className="task-actions">
                <button 
                    className="action-btn delete" 
                    onClick={() => onDelete(task.id)}
                    title="Delete Task"
                >
                    <i className="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    );
};

// 2. TaskList Component
const TaskList = ({ tasks, onToggle, onDelete }) => {
    if (tasks.length === 0) {
        return (
            <div className="empty-state">
                <i className="fas fa-clipboard-list"></i>
                <p>No tasks yet. Add one above!</p>
            </div>
        );
    }

    return (
        <div className="task-list">
            {tasks.map(task => (
                <TaskItem 
                    key={task.id} 
                    task={task} 
                    onToggle={onToggle} 
                    onDelete={onDelete} 
                />
            ))}
        </div>
    );
};

// 3. TaskForm Component
const TaskForm = ({ onAdd }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;
        
        onAdd(text);
        setText('');
    };

    return (
        <form className="task-form" onSubmit={handleSubmit}>
            <input 
                type="text" 
                className="task-input" 
                placeholder="What needs to be done?" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                autoFocus
            />
            <button type="submit" className="add-btn">
                <i className="fas fa-plus"></i>
            </button>
        </form>
    );
};

// 4. Main App Component
const App = () => {
    // Initial state with some demo data to show off the UI
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Learn React Components', completed: true },
        { id: 2, text: 'Build a premium UI design', completed: false },
        { id: 3, text: 'Master glassmorphism CSS', completed: false }
    ]);

    const addTask = (text) => {
        const newTask = {
            id: Date.now(),
            text,
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    const toggleTask = (id) => {
        setTasks(tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const deleteTask = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const completedCount = tasks.filter(t => t.completed).length;

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Task Master</h1>
                <p>Manage your daily goals with style</p>
            </header>

            <TaskForm onAdd={addTask} />
            
            <TaskList 
                tasks={tasks} 
                onToggle={toggleTask} 
                onDelete={deleteTask} 
            />

            <div className="task-stats">
                <span>Total tasks: {tasks.length}</span>
                <span>Completed: {completedCount} of {tasks.length}</span>
            </div>
        </div>
    );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
