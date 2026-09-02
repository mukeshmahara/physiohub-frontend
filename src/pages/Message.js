import { useMemo, useState } from "react";
import {
  ChevronLeft,
  MoreHorizontal,
  Paperclip,
  Search,
  Send,
  Smile,
} from "lucide-react";

const initialConversations = [
  { id: 1, name: "Sofia Williams", initials: "SW", preview: "Thank you, I will be there tomorrow.", time: "10:42 AM", unread: true, color: "bg-blue-50 text-blue-700" },
  { id: 2, name: "Dr. Maya Patel", initials: "MP", preview: "The updated treatment plan is ready.", time: "09:18 AM", unread: true, color: "bg-teal-50 text-teal-700" },
  { id: 3, name: "Aarav Sharma", initials: "AS", preview: "My back feels much better today.", time: "Yesterday", unread: false, color: "bg-violet-50 text-violet-700" },
  { id: 4, name: "Dr. James Wilson", initials: "JW", preview: "Can we discuss the afternoon schedule?", time: "Yesterday", unread: false, color: "bg-amber-50 text-amber-700" },
];

const messagesByConversation = {
  1: [
    { from: "them", text: "Hi, I wanted to confirm my appointment for tomorrow.", time: "10:35 AM" },
    { from: "me", text: "Hi Sofia, your appointment with Dr. James Wilson is confirmed for 10:30 AM.", time: "10:39 AM" },
    { from: "them", text: "Thank you, I will be there tomorrow.", time: "10:42 AM" },
  ],
  2: [
    { from: "them", text: "The updated treatment plan is ready.", time: "09:18 AM" },
    { from: "me", text: "Great, I will review it before the next session.", time: "09:22 AM" },
  ],
  3: [{ from: "them", text: "My back feels much better today.", time: "Yesterday" }],
  4: [{ from: "them", text: "Can we discuss the afternoon schedule?", time: "Yesterday" }],
};

const Message = () => {
  const [conversations, setConversations] = useState(initialConversations);
  const [selectedId, setSelectedId] = useState(1);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const selected = conversations.find((conversation) => conversation.id === selectedId);
  const visibleConversations = useMemo(
    () => conversations.filter((conversation) => conversation.name.toLowerCase().includes(query.toLowerCase())),
    [conversations, query],
  );

  const selectConversation = (id) => {
    setSelectedId(id);
    setConversations((current) => current.map((conversation) => conversation.id === id ? { ...conversation, unread: false } : conversation));
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setDraft("");
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">Messages</h1>
        <p className="mt-1 text-sm text-slate-500">Communicate with patients and your care team.</p>
      </header>
      <section className="grid min-h-[580px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm lg:grid-cols-[320px_minmax(0,1fr)]">
        <aside className="border-b border-slate-200 lg:border-b-0 lg:border-r">
          <div className="border-b border-slate-100 p-4">
            <label className="relative block"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search conversations..." className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" /></label>
          </div>
          <div className="divide-y divide-slate-100">{visibleConversations.map((conversation) => <button key={conversation.id} type="button" onClick={() => selectConversation(conversation.id)} className={`flex w-full items-center gap-3 p-4 text-left transition hover:bg-slate-50 ${selectedId === conversation.id ? "bg-teal-50/60" : ""}`}><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${conversation.color}`}>{conversation.initials}</span><span className="min-w-0 flex-1"><span className="flex items-center justify-between gap-2"><span className="truncate text-sm font-semibold text-slate-900">{conversation.name}</span><span className="text-[11px] text-slate-400">{conversation.time}</span></span><span className="mt-1 flex items-center gap-2"><span className="truncate text-xs text-slate-500">{conversation.preview}</span>{conversation.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-teal-500" />}</span></span></button>)}</div>
        </aside>
        {selected && <div className="flex min-h-[500px] flex-col"><div className="flex items-center justify-between border-b border-slate-100 p-4 sm:p-5"><div className="flex items-center gap-3"><button type="button" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 lg:hidden" aria-label="Back to conversations"><ChevronLeft size={18} /></button><span className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${selected.color}`}>{selected.initials}</span><div><p className="font-semibold text-slate-900">{selected.name}</p><p className="text-xs text-emerald-600">Active conversation</p></div></div><button type="button" aria-label="More conversation options" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><MoreHorizontal size={18} /></button></div><div className="flex-1 space-y-4 overflow-y-auto bg-slate-50/60 p-4 sm:p-6">{(messagesByConversation[selectedId] || []).map((message, index) => <div key={`${message.time}-${index}`} className={`flex ${message.from === "me" ? "justify-end" : "justify-start"}`}><div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.from === "me" ? "rounded-br-md bg-teal-600 text-white" : "rounded-bl-md bg-white text-slate-700 shadow-sm"}`}><p>{message.text}</p><p className={`mt-1 text-[11px] ${message.from === "me" ? "text-teal-100" : "text-slate-400"}`}>{message.time}</p></div></div>)}</div><form onSubmit={sendMessage} className="border-t border-slate-100 p-4"><div className="flex items-end gap-2 rounded-xl border border-slate-200 bg-white p-2 focus-within:border-teal-500"><button type="button" aria-label="Attach a file" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Paperclip size={18} /></button><textarea value={draft} onChange={(event) => setDraft(event.target.value)} rows="1" placeholder="Write a message..." className="max-h-28 min-h-10 flex-1 resize-none border-0 px-2 py-2 text-sm outline-none" /><button type="button" aria-label="Add emoji" className="rounded-lg p-2 text-slate-400 hover:bg-slate-100"><Smile size={18} /></button><button type="submit" aria-label="Send message" className="rounded-lg bg-teal-600 p-2 text-white hover:bg-teal-700"><Send size={17} /></button></div></form></div>}
      </section>
    </div>
  );
};

export default Message;
