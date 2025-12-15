import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const AdminBoard = ({ users, tasks, onAssignTask, onReassignTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [assignee, setAssignee] = useState(users[0]?.id || "");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!taskTitle) return;
    onAssignTask(taskTitle, parseInt(assignee)); // Ensure ID is number/string correctly
    setTaskTitle("");
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    // result.draggableId = Task ID
    // result.destination.droppableId = User ID (Target)
    onReassignTask(result.draggableId, parseInt(result.destination.droppableId));
  };

  // Filter out admin from the drag columns
  const standardUsers = users.filter(u => u.role !== 'admin');

  return (
    <div className="dashboard-container">
      {/* Task Creation Section */}
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

      {/* Drag Drop Area */}
      <div className="board-layout">
        <DragDropContext onDragEnd={onDragEnd}>
          {standardUsers.map((user) => (
            <div key={user.id} className="user-column">
              <div className="column-header">
                <h4>{user.username}</h4>
                <span className="badge">User</span>
              </div>
              
              <Droppable droppableId={user.id.toString()}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
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