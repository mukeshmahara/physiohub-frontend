import Home from "./components/Home";
import Contact from "./components/Contact";
import Features from "./components/Features";
import DemoForm from "./components/DemoForm";
import Login from "./pages/Login";

// Export route definitions as component references so the router can render them
export const publicRoutes = [
  { path: "/", component: Home },
  { path: "/contact", component: Contact },
  { path: "/features", component: Features },
  { path: "/demo", component: DemoForm },
  { path: "/login", component: Login },
];

// Private routes (render behind a ProtectedRoute wrapper)
export const privateRoutes = [{ path: "/demo", component: DemoForm }];

export default { publicRoutes, privateRoutes };
