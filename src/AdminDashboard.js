import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AdminBoard = ({ users, tasks, onAssignTask, onReassignTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  
  // Logic to filter ONLY standard users
  const standardUsers = users.filter(u => u.role !== 'admin');
  
  // Default to first user ID found
  const [assignee, setAssignee] = useState("");

  useEffect(() => {
    if (standardUsers.length > 0) {
        setAssignee(standardUsers[0].id);
    }
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!taskTitle || !assignee) {
        alert("Please enter title and select a user");
        return;
    }
    onAssignTask(taskTitle, assignee); 
    setTaskTitle("");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    onReassignTask(result.draggableId, result.destination.droppableId);
  };

  return (
    <div className="dashboard-container">
      <div className="control-panel">
        <h3>Create New Task</h3>
        <form onSubmit={handleCreate} className="create-form">
          <input
            type="text"
            placeholder="What needs to be done?"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
          <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
            {standardUsers.map(u => (
              <option key={u.id} value={u.id}>{u.username}</option>
            ))}
          </select>
          <button type="submit" className="btn-success">Assign Task</button>
        </form>
      </div>

      <div className="board-layout">
        <DragDropContext onDragEnd={onDragEnd}>
          {standardUsers.map((user) => (
            <div key={user.id} className="user-column">
              <div className="column-header">
                <h4>{user.username}</h4>
                <span className="badge">User</span>
              </div>
              
              <Droppable droppableId={user.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                    style={{ minHeight: '150px' }} 
                  >
                    {tasks
                      .filter(t => t.assignedTo === user.id)
                      .map((task, index) => (
                        <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`task-card ${task.status}`}
                            >
                              <p className="task-title">{task.title}</p>
                              <span className="status-label">{task.status}</span>
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default AdminBoard;