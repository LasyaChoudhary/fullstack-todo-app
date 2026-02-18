import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  setTodos,
  addTodo as addTodoAction,
  deleteTodo as deleteTodoAction,
  updateTodo,
} from "./redux/todoSlice";

function TodoPage() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.items);

  const [title, setTitle] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  // 🌤 Weather States
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  // 🔹 Fetch Todos
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:5000/api/todos");
    dispatch(setTodos(res.data));
  };

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 2000);
  };

  // 🌤 Fetch Weather
  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/weather/${city}`
      );
      setWeather(res.data);
    } catch (error) {
      alert("City not found");
    }
  };

  // 🔹 Add / Update Todo
  const addTodo = async () => {
    if (!title.trim()) return;

    if (editId) {
      const res = await axios.put(
        `http://localhost:5000/api/todos/${editId}`,
        { title }
      );

      dispatch(updateTodo(res.data));
      showMessage("Task updated successfully ✅");
      setEditId(null);
    } else {
      const res = await axios.post(
        "http://localhost:5000/api/todos",
        { title }
      );

      dispatch(addTodoAction(res.data));
      showMessage("Task added successfully 🎉");
    }

    setTitle("");
  };

  // 🔹 Delete Todo
  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:5000/api/todos/${id}`);
    dispatch(deleteTodoAction(id));
    showMessage("Task deleted 🗑");
  };

  // 🔹 Toggle Complete
  const toggleComplete = async (todo) => {
    const res = await axios.put(
      `http://localhost:5000/api/todos/${todo._id}`,
      { completed: !todo.completed }
    );

    dispatch(updateTodo(res.data));
  };

  const startEdit = (todo) => {
    setTitle(todo.title);
    setEditId(todo._id);
  };

  const cancelEdit = () => {
    setEditId(null);
    setTitle("");
  };

  const remaining = todos.filter((todo) => !todo.completed).length;
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode ? "#1e1e1e" : "#f4f6f9",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "0.3s",
      }}
    >
      <div
        style={{
          width: "420px",
          background: darkMode ? "#2c2c2c" : "#ffffff",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          color: darkMode ? "#fff" : "#000",
          transition: "0.3s",
        }}
      >
        {/* 🌤 WEATHER SECTION */}
        <div style={{ marginBottom: "25px" }}>
          <h3 style={{ marginBottom: "10px" }}>Weather Check 🌤</h3>

          <div style={{ display: "flex", marginBottom: "10px" }}>
            <input
              type="text"
              placeholder="Enter city..."
              value={city}
              onChange={(e) => setCity(e.target.value)}
              style={{
                flex: 1,
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={fetchWeather}
              style={{
                marginLeft: "10px",
                padding: "8px 12px",
                borderRadius: "6px",
                border: "none",
                background: "#2980b9",
                color: "white",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>

          {weather && (
            <div
              style={{
                background: darkMode ? "#3a3a3a" : "#ecf0f1",
                padding: "10px",
                borderRadius: "6px",
                marginBottom: "10px",
              }}
            >
              <p>🌡 Temperature: {weather.main.temp} °C</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
              <p>☁ Condition: {weather.weather[0].description}</p>
            </div>
          )}
        </div>

        {/* TODO SECTION */}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Todo Manager</h2>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            {darkMode ? "☀" : "🌙"}
          </button>
        </div>

        <p style={{ fontSize: "14px", marginBottom: "10px" }}>
          {remaining} task(s) remaining
        </p>

        {message && (
          <div
            style={{
              background: "#2ecc71",
              color: "white",
              padding: "8px",
              borderRadius: "6px",
              marginBottom: "15px",
              textAlign: "center",
            }}
          >
            {message}
          </div>
        )}

        <div style={{ display: "flex", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Add a new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={addTodo}
            style={{
              marginLeft: "10px",
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              background: "#2c3e50",
              color: "white",
              cursor: "pointer",
            }}
          >
            {editId ? "Update" : "Add"}
          </button>

          {editId && (
            <button
              onClick={cancelEdit}
              style={{
                marginLeft: "8px",
                padding: "10px",
                borderRadius: "6px",
                border: "none",
                background: "#95a5a6",
                color: "white",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>

        <h4>Active</h4>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {todos
            .filter((todo) => !todo.completed)
            .map((todo) => (
              <li
                key={todo._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px",
                  marginBottom: "10px",
                  background: darkMode ? "#3a3a3a" : "#f9f9f9",
                  borderRadius: "6px",
                }}
              >
                <span
                  onClick={() => toggleComplete(todo)}
                  style={{ cursor: "pointer" }}
                >
                  {todo.title}
                </span>

                <div>
                  <button
                    onClick={() => startEdit(todo)}
                    style={{
                      marginRight: "8px",
                      background: "#3498db",
                      border: "none",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTodo(todo._id)}
                    style={{
                      background: "#e74c3c",
                      border: "none",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
        </ul>

        {completedTodos.length > 0 && (
          <>
            <h4 style={{ marginTop: "20px" }}>Completed</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {completedTodos.map((todo) => (
                <li
                  key={todo._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    marginBottom: "10px",
                    background: darkMode ? "#3a3a3a" : "#f1f1f1",
                    borderRadius: "6px",
                    opacity: 0.7,
                  }}
                >
                  <span
                    onClick={() => toggleComplete(todo)}
                    style={{
                      textDecoration: "line-through",
                      cursor: "pointer",
                    }}
                  >
                    {todo.title}
                  </span>

                  <button
                    onClick={() => deleteTodo(todo._id)}
                    style={{
                      background: "#e74c3c",
                      border: "none",
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoPage;
