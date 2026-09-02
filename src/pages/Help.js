import { useMemo, useState } from "react";
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Mail,
  MessageCircle,
  Phone,
  Search,
} from "lucide-react";

const faqs = [
  { question: "How do I add a new patient?", answer: "Open Patients from the sidebar, select Add patient, complete the required details, and choose Save patient." },
  { question: "How do I schedule an appointment?", answer: "Open Appointments and select New appointment. Choose the patient, therapist, date, time, and treatment room before saving." },
  { question: "Can I update a treatment plan?", answer: "Open Treatments, choose Treatment plans, and select the plan you want to review or update." },
  { question: "How do I manage user permissions?", answer: "Open Settings, select Roles & permissions, adjust access for each role, and save your changes." },
  { question: "Where can I view completed assessments?", answer: "Open Assessments and select Assessment history to review completed evaluations and clinical notes." },
];

const Help = () => {
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const [sent, setSent] = useState(false);
  const filteredFaqs = useMemo(
    () => faqs.filter((faq) => `${faq.question} ${faq.answer}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Help & Support</h1>
        <p className="mt-1 text-sm text-slate-500">Find answers or contact our support team.</p>
      </header>

      <section className="rounded-2xl bg-gradient-to-br from-teal-600 to-cyan-700 p-6 text-white shadow-sm sm:p-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-bold">How can we help?</h2>
          <p className="mt-2 text-sm text-teal-50">Search our help center for quick answers about managing your clinic.</p>
          <label className="relative mt-5 block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search help articles..." className="w-full rounded-xl border-0 py-3 pl-10 pr-4 text-sm text-slate-800 outline-none ring-2 ring-transparent focus:ring-white/50" />
          </label>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-slate-100 p-5 sm:p-6">
            <BookOpen size={20} className="text-teal-600" />
            <div><h2 className="font-semibold text-slate-900">Frequently asked questions</h2><p className="mt-1 text-sm text-slate-500">Common questions from clinic teams</p></div>
          </div>
          {filteredFaqs.length ? <div className="divide-y divide-slate-100">{filteredFaqs.map((faq, index) => <div key={faq.question}><button type="button" onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between gap-4 p-5 text-left text-sm font-medium text-slate-800 hover:bg-slate-50 sm:px-6">{faq.question}{openFaq === index ? <ChevronUp size={17} className="shrink-0 text-slate-400" /> : <ChevronDown size={17} className="shrink-0 text-slate-400" />}</button>{openFaq === index && <p className="px-5 pb-5 text-sm leading-6 text-slate-500 sm:px-6">{faq.answer}</p>}</div>)}</div> : <p className="p-8 text-center text-sm text-slate-500">No help articles found.</p>}
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-slate-900">Contact support</h2>
            <p className="mt-1 text-sm text-slate-500">Our team is available Monday to Friday.</p>
            <div className="mt-5 space-y-3 text-sm text-slate-600"><a href="mailto:support@physiohub.com" className="flex items-center gap-3 hover:text-teal-700"><Mail size={17} className="text-teal-600" />support@physiohub.com</a><a href="tel:+9779800000000" className="flex items-center gap-3 hover:text-teal-700"><Phone size={17} className="text-teal-600" />+977 9800000000</a><span className="flex items-center gap-3"><MessageCircle size={17} className="text-teal-600" />Typically replies within 1 business day</span></div>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-slate-900">Send a request</h2>
            {sent ? <div className="mt-4 flex items-center gap-2 rounded-lg bg-emerald-50 p-3 text-sm text-emerald-700"><Check size={17} /> Request sent successfully.</div> : <form onSubmit={(event) => { event.preventDefault(); setSent(true); }} className="mt-4 space-y-3"><input required placeholder="Subject" className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" /><textarea required rows="4" placeholder="How can we help?" className="w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" /><button type="submit" className="w-full rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-teal-700">Send request</button></form>}
          </section>
        </div>
      </div>
    </div>
  );
};

export default Help;
