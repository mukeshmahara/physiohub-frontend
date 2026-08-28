import Home from "./components/Home";
import Contact from "./components/Contact";
import Features from "./components/Features";
import DemoForm from "./components/DemoForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Appointment from "./pages/Appointments";
import { Patients, NewPatient } from "./pages/Patients";
import Doctor from "./pages/Doctors";
import Setting from "./pages/Setting";
import Therapist from "./pages/Therapist";
import Notification from "./pages/Notification";
import Message from "./pages/Message";
import Treatment from "./pages/Treatment";
import Assessment from "./pages/Assessment";
import Billing from "./pages/Billing";
import Report from "./pages/Report";

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
export const privateRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/patients", component: Patients },
  { path: "/patients/new", component: NewPatient },

  { path: "/appointments", component: Appointment },
  { path: "/doctors", component: Doctor },
  { path: "/settings", component: Setting },
  { path: "/treatments", component: Treatment },
  { path: "/therapists", component: Therapist },
  { path: "/notifications", component: Notification },
  { path: "/messages", component: Message },
  { path: "/reports", component: Report },
  { path: "/assessments", component: Assessment },
  { path: "/billings", component: Billing },
];

const routesConfig = { publicRoutes, privateRoutes };
export default routesConfig;
