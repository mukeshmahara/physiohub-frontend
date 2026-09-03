import { useMemo, useState } from "react";
import { Activity, CalendarDays, Search, UserRound, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PatientNavigation from "./PatientNavigation";
import PatientRow from "./PatientRow";
import SummaryCard from "./SummaryCard";
import { usePatientsQuery } from "../../services/patientQueries";
import { useDeletePatientMutation, useUpdatePatientMutation } from "../../services/patientQueries";

const PatientList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [editingPatient, setEditingPatient] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const deletePatient = useDeletePatientMutation({ onSuccess: () => setDeleteCandidate(null) });
  const activeOnly = location.pathname.endsWith("/active");
  const { data, isLoading, isError, error } = usePatientsQuery();
  const patients = Array.isArray(data) ? data : data?.patients || data?.data || [];
  const normalizedPatients = patients.map(normalizePatient);
  const filteredPatients = useMemo(
    () =>
      normalizedPatients.filter((patient) => {
        const search = query.toLowerCase();
        return (
          (!activeOnly || patient.status === "Active") &&
          (!search ||
            `${patient.name} ${patient.email} ${patient.condition}`
              .toLowerCase()
              .includes(search))
        );
      }),
    [activeOnly, normalizedPatients, query],
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {activeOnly ? "Active patients" : "Patients"}
        </h1>
        <button type="button" onClick={() => navigate("/patients/new")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-teal-700">
          Add patient
        </button>
      </header>
      <PatientNavigation pathname={location.pathname} navigate={navigate} />
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryCard label="Total patients" value={normalizedPatients.length} icon={<Users size={20} />} />
        <SummaryCard label="Active patients" value={normalizedPatients.filter((patient) => patient.status === "Active").length} icon={<Activity size={20} />} />
        <SummaryCard label="New this month" value={normalizedPatients.filter((patient) => patient.createdAt?.slice(0, 7) === new Date().toISOString().slice(0, 7)).length} icon={<CalendarDays size={20} />} />
      </section>
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex justify-end border-b border-slate-100 p-4 sm:p-5">
          <label className="relative block sm:w-72">
            <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search patients..." className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
          </label>
        </div>
        {isLoading && <div className="px-6 py-16 text-center text-sm text-slate-500">Loading patients...</div>}
        {isError && <div className="px-6 py-16 text-center text-sm text-red-600">{error?.message || "Unable to load patients."}</div>}
        {!isLoading && !isError && <div className="overflow-x-auto"><table className="w-full min-w-[760px]"><thead><tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-semibold uppercase tracking-wide text-slate-400"><th className="px-5 py-3">Patient</th><th className="px-5 py-3">Contact</th><th className="px-5 py-3">Condition</th><th className="px-5 py-3">Therapist</th><th className="px-5 py-3">Last visit</th><th className="px-5 py-3">Status</th><th className="px-5 py-3" /></tr></thead><tbody className="divide-y divide-slate-100">{filteredPatients.map((patient) => <PatientRow key={patient.id} patient={patient} onEdit={setEditingPatient} onDelete={setDeleteCandidate} />)}</tbody></table></div>}
        {!filteredPatients.length && <div className="px-6 py-16 text-center"><UserRound size={30} className="mx-auto text-slate-300" /><p className="mt-3 text-sm text-slate-500">No patients match your search.</p></div>}
        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-500">Showing {filteredPatients.length} of {normalizedPatients.length} patients</div>
      </section>
      {editingPatient && <PatientEditModal patient={editingPatient} onClose={() => setEditingPatient(null)} />}
      {deleteCandidate && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4"><div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl"><h2 className="text-lg font-bold text-slate-900">Delete patient?</h2><p className="mt-2 text-sm text-slate-500">This will permanently remove {deleteCandidate.name}.</p><div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setDeleteCandidate(null)} className="rounded-lg border border-slate-200 px-4 py-2 text-sm">Cancel</button><button type="button" disabled={deletePatient.isPending} onClick={() => deletePatient.mutate(deleteCandidate.id)} className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60">{deletePatient.isPending ? "Deleting..." : "Delete"}</button></div></div></div>}
    </div>
  );
};

const normalizePatient = (patient) => ({
  ...patient,
  id: patient.id,
  name: patient.full_name || patient.name || "Unnamed patient",
  initials: patient.initials || patient.full_name?.split(/\s+/).map((name) => name[0]).join("").slice(0, 2).toUpperCase() || "P",
  email: patient.email || "-",
  phone: patient.phone || patient.phone_number || "-",
  condition: patient.condition || patient.occupation || "-",
  therapist: patient.therapist || patient.referred_by || "-",
  lastVisit: patient.lastVisit || patient.registration_date || "-",
  status: patient.status || "Active",
  createdAt: patient.createdAt || patient.created_at,
  color: patient.color || "bg-teal-50 text-teal-700",
});

export default PatientList;

function PatientEditModal({ patient, onClose }) {
  const updatePatient = useUpdatePatientMutation({ onSuccess: onClose });
  const [form, setForm] = useState({
    full_name: patient.full_name || patient.name || "",
    dob: patient.dob || "",
    sex: patient.sex || "",
    phone: patient.phone || "",
    email: patient.email === "-" ? "" : patient.email || "",
    address: patient.address || "",
    occupation: patient.occupation || "",
    marital_status: patient.marital_status || "",
    referred_by: patient.referred_by || "",
  });
  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    updatePatient.mutate({ id: patient.id, patientData: form });
  };
  const field = (label, name, type = "text") => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      <input name={name} type={type} required={["full_name", "dob", "sex", "phone", "email"].includes(name)} value={form[name]} onChange={update} className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" />
    </label>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
      <form onSubmit={submit} className="w-full max-w-2xl space-y-5 rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-slate-900">Edit patient</h2><p className="mt-1 text-sm text-slate-500">Update patient information.</p></div><button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-700" aria-label="Close">×</button></div>
        <div className="grid gap-4 sm:grid-cols-2">{field("Full name", "full_name")}{field("Date of birth", "dob", "date")}{field("Sex", "sex")}{field("Phone number", "phone", "tel")}{field("Email address", "email", "email")}{field("Address", "address")}{field("Occupation", "occupation")}{field("Marital status", "marital_status")}{field("Referred by", "referred_by")}</div>
        {updatePatient.isError && <p className="text-sm text-red-600">{updatePatient.error?.message || "Unable to update patient."}</p>}
        <div className="flex justify-end gap-3 border-t border-slate-100 pt-5"><button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm">Cancel</button><button type="submit" disabled={updatePatient.isPending} className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60">{updatePatient.isPending ? "Saving..." : "Save changes"}</button></div>
      </form>
    </div>
  );
}
