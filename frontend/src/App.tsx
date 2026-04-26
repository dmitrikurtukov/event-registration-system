import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AppLayout } from "./layout/AppLayout";
import AdminPage from "./pages/AdminPage";
import EventsPage from "./pages/EventsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <EventsPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
