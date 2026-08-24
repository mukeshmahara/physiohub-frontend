import Home from "./components/Home";
import Contact from "./components/Contact";
import Features from "./components/Features";
import DemoForm from "./components/DemoForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Export route definitions as component references so the router can render them
export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/contact", component: Contact },
  { path: "/features", component: Features },
  { path: "/demo", component: DemoForm },
  { path: "/login", component: Login },
  { path: "/signup", component: Register }, // Assuming signup is handled by the same component as login
];

// Private routes (render behind a ProtectedRoute wrapper)
export const privateRoutes = [{ path: "/dashboard", component: Dashboard }];

const routesConfig = { publicRoutes, privateRoutes };
export default routesConfig;
