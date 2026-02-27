import React, { createContext, useReducer, useContext } from "react";

// Mock data (thay API)
const mockAccounts = [
  {
    id: 1,
    username: "admin",
    email: "admin@example.com",
    password: "123456",
    role: "admin",
    status: "active"
  },
  {
    id: 2,
    username: "user1",
    email: "user1@example.com",
    password: "123456",
    role: "user",
    status: "active"
  },
  {
    id: 3,
    username: "user2",
    email: "user2@example.com",
    password: "123456",
    role: "user",
    status: "locked"
  }
];

// Initial state
const initialState = {
  user: null,
  error: null
};

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { user: action.payload, error: null };
    case "LOGIN_FAIL":
      return { user: null, error: action.payload };
    case "LOGOUT":
      return { user: null, error: null };
    default:
      return state;
  }
}

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = (username, password) => {
    const account = mockAccounts.find(
      (acc) => acc.username === username && acc.password === password
    );

    if (!account) {
      dispatch({ type: "LOGIN_FAIL", payload: "Sai tài khoản hoặc mật khẩu" });
      return;
    }

    if (account.status !== "active") {
      dispatch({ type: "LOGIN_FAIL", payload: "Tài khoản bị khóa" });
      return;
    }

    if (account.role !== "admin") {
      dispatch({ type: "LOGIN_FAIL", payload: "Chỉ admin được phép đăng nhập" });
      return;
    }

    dispatch({ type: "LOGIN_SUCCESS", payload: account });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};