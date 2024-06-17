import { Theme } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import "./App.css";
import Main from "./components/Main";
import AuthProvider from "./Auth/AuthContext";
import Upsolve from "./components/Upsolve/Upsolve";

// router
import {
  BrowserRouter as Router,
  Route,
  Switch,
  BrowserRouter,
  Routes,
} from "react-router-dom";

function App() {
  // const [theme, setTheme] = useState("dark");

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <AuthProvider>
              <Theme appearance={theme}>
                <Main setTheme={setTheme} />
              </Theme>
            </AuthProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
