import useAuthStore from "../../store/useAuthStore";
import DashboardLayout from "./DashboardLayout";

const AppLayout = () => {
  const activeRole = useAuthStore((state) => state.activeRole);
  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardLayout activeRole={activeRole} />
    </div>
  );
};

export default AppLayout;
