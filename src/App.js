import { Theme } from "@radix-ui/themes";
import "./App.css";
import Main from "./components/Main";
import AuthProvider from "./Auth/AuthContext";
import { useEffect, useState } from "react";

function App() {
  // const [theme, setTheme] = useState("dark");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AuthProvider>
      <Theme appearance={theme}>
        <div className="App">
          <Main setTheme={setTheme} />
        </div>
      </Theme>
    </AuthProvider>
  );
}

export default App;
