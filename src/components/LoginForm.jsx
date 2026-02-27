import React, { useReducer } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "react-bootstrap";

const initialState = {
  username: "",
  password: "",
  errors: {}
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "SET_ERRORS":
      return { ...state, errors: action.payload };
    default:
      return state;
  }
}

function LoginForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { user, error, login, logout } = useAuth();

  const validate = () => {
    const errors = {};
    if (!state.username) errors.username = "Username bắt buộc";
    if (!state.password) errors.password = "Password bắt buộc";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: "SET_ERRORS", payload: errors });
      return;
    }

    login(state.username, state.password);
  };

  if (user) {
    return (
      <div style={{ padding: "20px" }}>
        <h2>Xin chào {user.username}</h2>
        <Button onClick={logout}>Đăng xuất</Button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login (Chỉ admin)</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={state.username}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "username",
                value: e.target.value
              })
            }
          />
          <div style={{ color: "red" }}>{state.errors.username}</div>
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "password",
                value: e.target.value
              })
            }
          />
          <div style={{ color: "red" }}>{state.errors.password}</div>
        </div>

        <Button type="submit">Đăng nhập</Button>
      </form>

      {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
    </div>
  );
}

export default LoginForm;