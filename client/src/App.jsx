import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AddProduct from "./pages/AddProduct";
import ChatRoom from "./pages/ChatRoom";
import EditProduct from "./pages/EditProduct";
import DetailProduct from "./pages/DetailProduct";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/add-products",
    element: <AddProduct />,
  },
  {
    path: "/edit-products/:id",
    element: <EditProduct />,
  },
  {
    path: "/chat",
    element: <ChatRoom />,
  },
  {
    path: "/detail-products/:id",
    element: <DetailProduct />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
