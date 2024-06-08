import App from "./App";
import HomePage from "./Pages/HomePage";
import AdminPage from "./Pages/AdminPage";
import DogsPage from "./Pages/DogsPage";
import CatsPage from "./Pages/CatsPage";
import BirdsPage from "./Pages/BirdsPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
      {
        path: "dogs",
        element: <DogsPage />,
      },
      {
        path: "cats",
        element: <CatsPage />,
      },
      {
        path: "birds",
        element: <BirdsPage />,
      },
      
    ],
  },
 
]);
