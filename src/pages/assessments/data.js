export const tabs = [
  { label: "Assessments", path: "/assessments" },
  { label: "New assessment", path: "/assessments/new" },
  { label: "Assessment history", path: "/assessments/history" },
];

export const assessments = [
  { id: 1, patient: "Aarav Sharma", initials: "AS", type: "Initial assessment", therapist: "Dr. Maya Patel", date: "Sep 03, 2026", score: "82%", status: "In progress", color: "bg-teal-50 text-teal-700" },
  { id: 2, patient: "Sofia Williams", initials: "SW", type: "Shoulder assessment", therapist: "Dr. James Wilson", date: "Sep 02, 2026", score: "76%", status: "Completed", color: "bg-blue-50 text-blue-700" },
  { id: 3, patient: "Noah Thompson", initials: "NT", type: "Sports evaluation", therapist: "Dr. Maya Patel", date: "Aug 28, 2026", score: "68%", status: "Completed", color: "bg-violet-50 text-violet-700" },
  { id: 4, patient: "Mia Davis", initials: "MD", type: "Knee evaluation", therapist: "Dr. Liam Brown", date: "Aug 26, 2026", score: "Pending", status: "Scheduled", color: "bg-cyan-50 text-cyan-700" },
];
