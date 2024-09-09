import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ListView from "./components/list-view.tsx";
import CalendarView from "./components/calendar-view.tsx";
import ErrorPage from "./error-page.tsx";
import NewEvent from "./new-event.tsx";
import NewRoom from "./new-room.tsx";
import Account from "./account.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "list",
        element: <ListView />,
      },
      {
        path: "calendar",
        element: <CalendarView />,
      },
      {
        path: "create",
        element: <NewEvent />,
      },
      {
        path: "new/meeting-room",
        element: <NewRoom />,
      },
      {
        path: "account",
        element: <Account />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);