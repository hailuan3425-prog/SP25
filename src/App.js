import { ThemeProvider, useTheme } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import LightSwitch from "./components/LightSwitch";
import CounterComponent from "./components/CounterComponent";
import LoginForm from "./components/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";

function MainContent() {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: theme === "light" ? "#ffffff" : "#121212",
        color: theme === "light" ? "#000000" : "#ffffff",
        transition: "all 0.3s ease",
        padding: "20px"
      }}
    >
      {!user ? (
        <LoginForm />
      ) : (
        <>
          <h2>Xin chào {user.username}</h2>
          <CounterComponent />
          <LightSwitch />
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <MainContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;