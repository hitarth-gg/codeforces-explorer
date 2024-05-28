// import { Theme } from "@radix-ui/themes";
// import "./App.css";
// import Main from "./components/Main";
// import AuthProvider from "./Auth/AuthContext";
// import { useEffect, useState } from "react";

// // router
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
//   BrowserRouter,
//   Routes,
// } from "react-router-dom";

// function App() {
//   // const [theme, setTheme] = useState("dark");

//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

//   useEffect(() => {
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   return (
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Theme appearance={theme}>
//             <div className="App">
//               {/* <Main setTheme={setTheme} /> */}
//               <Route
//                 path="/user/:userName"
//                 element={<Main setTheme={setTheme} />}
//               />
//             </div>
//           </Theme>
//         </Routes>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;
import { Theme } from "@radix-ui/themes";
import "./App.css";
import Main from "./components/Main";
import AuthProvider from "./Auth/AuthContext";
import { useEffect, useState } from "react";

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
