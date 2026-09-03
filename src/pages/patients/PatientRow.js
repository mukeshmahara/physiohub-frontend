import { useEffect, useRef, useState } from "react";
import { Mail, MoreHorizontal, Pencil, Phone, Trash2 } from "lucide-react";

const PatientRow = ({ patient, onEdit, onDelete }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const menuButtonRef = useRef(null);

  useEffect(() => {
    if (!menuOpen || !menuButtonRef.current) return undefined;

    const updatePosition = () => {
      const rect = menuButtonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        left: Math.max(8, rect.right - 144),
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [menuOpen]);

  const edit = () => {
    setMenuOpen(false);
    onEdit(patient);
  };

  const remove = () => {
    setMenuOpen(false);
    onDelete(patient);
  };

  return (
  <tr className="transition hover:bg-slate-50">
    <td className="px-5 py-4"><div className="flex items-center gap-3"><span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${patient.color}`}>{patient.initials}</span><div><p className="font-semibold text-slate-900">{patient.name}</p><p className="text-xs text-slate-400">Patient #{String(patient.id).padStart(4, "0")}</p></div></div></td>
    <td className="px-5 py-4 text-sm text-slate-500"><p className="flex items-center gap-2"><Mail size={14} />{patient.email}</p><p className="mt-1 flex items-center gap-2"><Phone size={14} />{patient.phone}</p></td>
    <td className="px-5 py-4 text-sm text-slate-600">{patient.condition}</td>
    <td className="px-5 py-4 text-sm text-slate-600">{patient.therapist}</td>
    <td className="px-5 py-4 text-sm text-slate-500">{patient.lastVisit}</td>
    <td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-medium ${patient.status === "Active" ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{patient.status}</span></td>
    <td className="px-5 py-4"><div className="flex justify-end"><button ref={menuButtonRef} type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={`More options for ${patient.name}`} aria-expanded={menuOpen} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><MoreHorizontal size={18} /></button>{menuOpen && <div style={{ top: menuPosition.top, left: menuPosition.left }} className="fixed z-[100] w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg"><button type="button" onClick={edit} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700"><Pencil size={15} /> Edit</button><button type="button" onClick={remove} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"><Trash2 size={15} /> Delete</button></div>}</div></td>
  </tr>
);
};

export default PatientRow;
