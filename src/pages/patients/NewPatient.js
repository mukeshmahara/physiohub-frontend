import { useState } from "react";
import { Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import PatientNavigation from "./PatientNavigation";
import { useCreatePatientMutation } from "../../services/patientQueries";

const initialForm = {
  full_name: "",
  dob: "",
  sex: "",
  phone: "",
  email: "",
  address: "",
  occupation: "",
  marital_status: "",
  referred_by: "",
};

const NewPatient = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(initialForm);
  const createPatient = useCreatePatientMutation();
  const update = (event) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const submit = (event) => {
    event.preventDefault();
    createPatient.mutate(
      {
        ...form,
      },
      { onSuccess: () => setSaved(true) },
    );
  };
  const field = (label, name, type = "text", required = false) => (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label}
        {required && " *"}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        value={form[name]}
        onChange={update}
        className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
      />
    </label>
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Add patient
        </h1>
      </header>
      <PatientNavigation pathname={location.pathname} navigate={navigate} />
      {saved && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          <Check size={18} /> Patient profile saved successfully.
        </div>
      )}
      {createPatient.isError && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {createPatient.error?.message || "Unable to save patient."}
        </div>
      )}
      <form
        onSubmit={submit}
        className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7"
      >
        <div>
          <h2 className="font-semibold text-slate-900">Personal information</h2>
          <p className="mt-1 text-sm text-slate-500">
            Basic details used for identification and communication.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("Full name", "full_name", "text", true)}
          {field("Date of birth", "dob", "date", true)}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Sex *
            </span>
            <select
              name="sex"
              required
              value={form.sex}
              onChange={update}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">Select sex</option>
              <option>Female</option>
              <option>Male</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </label>
          {field("Phone number", "phone", "tel", true)}
          {field("Email address", "email", "email", true)}
          {field("Address", "address")}
          {field("Occupation", "occupation")}
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-slate-700">
              Marital status
            </span>
            <select
              name="marital_status"
              value={form.marital_status}
              onChange={update}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
            >
              <option value="">Select status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </label>
          {field("Referred by", "referred_by")}
        </div>
        <div className="flex flex-col-reverse justify-end gap-3 border-t border-slate-100 pt-5 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={createPatient.isPending}
            className="rounded-lg bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {createPatient.isPending ? "Saving..." : "Save patient"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewPatient;
