import React from "react";

function UserDashboard({ currentUser, tasks, updateTaskStatus }) {
  const myTasks = tasks.filter((t) => t.assignedTo === currentUser.id);

  return (
    <div className="dashboard">
      <h2>My Tasks</h2>
      {myTasks.length === 0 ? (
        <p>No tasks assigned to you yet. Enjoy!</p>
      ) : (
        <div className="task-list">
          {myTasks.map((task) => (
            <div key={task.id} className={`task-card ${task.status}`}>
              <h3>{task.title}</h3>
              <p>Status: <strong>{task.status}</strong></p>
              {task.status !== "Completed" && (
                <button onClick={() => updateTaskStatus(task.id)}>
                  Mark as Completed
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
