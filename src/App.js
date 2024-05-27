import { Switch, Theme } from "@radix-ui/themes";
import "./App.css";
import Main from "./components/Main";
import AuthProvider from "./Auth/AuthContext";
import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

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
