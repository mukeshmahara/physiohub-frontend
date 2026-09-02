export const appointments = [
  { id: 1, patient: "Aarav Sharma", initials: "AS", therapist: "Dr. Maya Patel", time: "09:00 AM", duration: "45 min", type: "Initial assessment", location: "Treatment Room 1", status: "Confirmed", date: "2026-09-03" },
  { id: 2, patient: "Sofia Williams", initials: "SW", therapist: "Dr. James Wilson", time: "10:30 AM", duration: "30 min", type: "Follow-up session", location: "Treatment Room 2", status: "Checked in", date: "2026-09-03" },
  { id: 3, patient: "Noah Thompson", initials: "NT", therapist: "Dr. Maya Patel", time: "01:00 PM", duration: "60 min", type: "Manual therapy", location: "Treatment Room 1", status: "Confirmed", date: "2026-09-03" },
  { id: 4, patient: "Isabella Garcia", initials: "IG", therapist: "Dr. Liam Brown", time: "02:30 PM", duration: "45 min", type: "Exercise therapy", location: "Gym Area", status: "Confirmed", date: "2026-09-03" },
  { id: 5, patient: "Ethan Miller", initials: "EM", therapist: "Dr. James Wilson", time: "09:30 AM", duration: "45 min", type: "Follow-up session", location: "Treatment Room 2", status: "Confirmed", date: "2026-09-04" },
  { id: 6, patient: "Mia Davis", initials: "MD", therapist: "Dr. Liam Brown", time: "11:00 AM", duration: "30 min", type: "Post-operative review", location: "Treatment Room 3", status: "Pending", date: "2026-09-05" },
];

export const waitingList = [
  { id: 7, patient: "Oliver Wilson", initials: "OW", requested: "Today, 08:42 AM", preferred: "Dr. Maya Patel", reason: "Earlier appointment" },
  { id: 8, patient: "Amelia Taylor", initials: "AT", requested: "Yesterday, 04:15 PM", preferred: "Any therapist", reason: "New patient" },
  { id: 9, patient: "Lucas Anderson", initials: "LA", requested: "Sep 1, 11:20 AM", preferred: "Dr. James Wilson", reason: "Reschedule request" },
];

export const viewTabs = [
  { label: "Calendar", path: "/appointments/calendar" },
  { label: "Today's appointments", path: "/appointments/todays" },
  { label: "Upcoming", path: "/appointments/upcoming" },
  { label: "Waiting list", path: "/appointments/waiting" },
];

export const statusStyles = {
  Confirmed: "bg-emerald-50 text-emerald-700",
  "Checked in": "bg-blue-50 text-blue-700",
  Pending: "bg-amber-50 text-amber-700",
};
