// src/utils/storage.js

const USERS = [
  { id: "1", username: "admin", password: "admin123", role: "admin" },
  { id: "2", username: "user1", password: "user123", role: "user" },
  { id: "3", username: "user2", password: "user223", role: "user" }, // Check password carefully
];

export const getUsers = () => {
  const storedUsers = localStorage.getItem("users");
  if (!storedUsers) {
    localStorage.setItem("users", JSON.stringify(USERS));
    return USERS;
  }
  return JSON.parse(storedUsers);
};

export const authenticateUser = (username, password) => {
  const users = getUsers();
  return users.find(
    (u) => u.username === username && u.password === password
  );
};

export const getTasks = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

export const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};