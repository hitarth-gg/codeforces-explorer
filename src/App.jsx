import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Home from "./pages/Home";
import User from "./pages/User";
import ErrorPage from "./pages/ErrorPage";
import Solutions from "./pages/Solutions";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <AppLayout props={<ErrorPage />} />,
    children: [
      {
        path: "/",
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/user/:id",
        element: <User />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/problem/:contest/:index",
        element: <Solutions />,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
