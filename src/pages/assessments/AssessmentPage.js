import { Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import AssessmentNavigation from "./AssessmentNavigation";
import AssessmentList from "./AssessmentList";
import NewAssessment from "./NewAssessment";

const AssessmentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const view = location.pathname.endsWith("/new") ? "new" : location.pathname.endsWith("/history") ? "history" : "list";
  return <div className="space-y-6"><header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{view === "new" ? "New assessment" : view === "history" ? "Assessment history" : "Assessments"}</h1>{view !== "new" && <button type="button" onClick={() => navigate("/assessments/new")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700"><Plus size={18} /> New assessment</button>}</header><AssessmentNavigation pathname={location.pathname} navigate={navigate} />{view === "new" ? <NewAssessment /> : <AssessmentList history={view === "history"} />}</div>;
};

export default AssessmentPage;
