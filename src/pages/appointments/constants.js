export const viewTabs = [
  { label: "Calendar", path: "/appointments/calendar" },
  { label: "Today's appointments", path: "/appointments/todays" },
  { label: "Upcoming", path: "/appointments/upcoming" },
  { label: "Waiting list", path: "/appointments/waiting" },
];

export const statusStyles = {
  Confirmed: "bg-emerald-50 text-emerald-700",
  "Checked-in": "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
  Scheduled: "bg-blue-50 text-blue-700",
  Completed: "bg-emerald-50 text-emerald-700",
  Cancelled: "bg-red-50 text-red-700",
  Waiting: "bg-amber-50 text-amber-700",
};
