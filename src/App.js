import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import AdminBoard from "./components/AdminBoard";
import { getUsers, authenticateUser, getTasks, saveTasks } from "./utils/storage";
import "./App.css";

function App() {
  const [user, setUser] = useState(null); 
  const [tasks, setTasks] = useState([]);
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    setTasks(getTasks());
    setUsersList(getUsers()); 
  }, []);

  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  const handleLogin = (username, password) => {
    const foundUser = authenticateUser(username, password);
    if (foundUser) {
      setUser(foundUser);
    } else {
      alert("Invalid Credentials! Try admin/admin123");
    }
  };

  const handleAddTask = (title, assigneeId) => {
    const newTask = {
      id: Date.now().toString(), 
      title,
      assignedTo: assigneeId, 
      status: "Pending"
    };
    setTasks([...tasks, newTask]);
  };

  const handleReassign = (taskId, newUserId) => {
    const updated = tasks.map(t => 
      t.id.toString() === taskId.toString() ? { ...t, assignedTo: newUserId } : t
    );
    setTasks(updated);
  };

  const handleComplete = (taskId) => {
    const updated = tasks.map(t => 
      t.id === taskId ? { ...t, status: "Completed" } : t
    );
    setTasks(updated);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="app">
      <header className="top-bar">
        <h1>Task Manager Pro</h1>
        <div className="profile-sec">
          <span>{user.username} ({user.role})</span>
          <button onClick={() => setUser(null)} className="btn-logout">Logout</button>
        </div>
      </header>

      <main>
        {user.role === 'admin' ? (
          <AdminBoard 
            users={usersList} 
            tasks={tasks} 
            onAssignTask={handleAddTask}
            onReassignTask={handleReassign}
          />
        ) : (
          <div className="user-dashboard">
            <h2>My Tasks</h2>
            <div className="my-tasks-grid">
              {tasks.filter(t => t.assignedTo === user.id).length === 0 ? (
                 <p>No tasks assigned to you.</p>
              ) : (
                tasks.filter(t => t.assignedTo === user.id).map(task => (
                  <div key={task.id} className={`task-card ${task.status}`}>
                    <h3>{task.title}</h3>
                    <p>Status: {task.status}</p>
                    {task.status !== "Completed" && (
                      <button 
                        onClick={() => handleComplete(task.id)}
                        className="btn-primary"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
