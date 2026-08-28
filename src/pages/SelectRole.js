import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

const SelectRole = () => {
  const navigate = useNavigate();

  const roles = useAuthStore((state) => state.roles);
  const setActiveRole = useAuthStore((state) => state.setActiveRole);

  const handleSelectRole = (role) => {
    setActiveRole(role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-md p-6">
        <h1 className="text-2xl font-bold">Choose your role</h1>

        <p className="mt-2 text-slate-500">
          Select how you want to use PhysioHub.
        </p>

        <div className="mt-6 space-y-3">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleSelectRole(role)}
              className="w-full rounded-xl border bg-white p-4 text-left hover:bg-slate-50"
            >
              <span className="font-semibold capitalize">{role}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectRole;
