import React, { useState } from "react";
import "../App.css"; // We will use global styles

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (!username || !password) {
      setError("Please fill all fields");
      return;
    }
    
    // Pass data to parent to check credentials
    onLogin(username, password);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>System Login</h2>
        <p className="hint">Hint: admin/admin123 or user1/user123</p>
        
        {error && <p className="error-msg">{error}</p>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="btn-primary">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;