export const patients = [
  { id: 1, name: "Aarav Sharma", initials: "AS", email: "aarav.sharma@email.com", phone: "+977 9841 234 567", condition: "Lower back pain", therapist: "Dr. Maya Patel", lastVisit: "Sep 02, 2026", status: "Active", color: "bg-teal-50 text-teal-700" },
  { id: 2, name: "Sofia Williams", initials: "SW", email: "sofia.williams@email.com", phone: "+977 9801 456 789", condition: "Shoulder mobility", therapist: "Dr. James Wilson", lastVisit: "Sep 01, 2026", status: "Active", color: "bg-blue-50 text-blue-700" },
  { id: 3, name: "Noah Thompson", initials: "NT", email: "noah.thompson@email.com", phone: "+977 9860 111 222", condition: "Sports injury", therapist: "Dr. Maya Patel", lastVisit: "Aug 28, 2026", status: "Active", color: "bg-violet-50 text-violet-700" },
  { id: 4, name: "Isabella Garcia", initials: "IG", email: "isabella.garcia@email.com", phone: "+977 9812 333 444", condition: "Post-operative rehab", therapist: "Dr. Liam Brown", lastVisit: "Aug 24, 2026", status: "Inactive", color: "bg-amber-50 text-amber-700" },
  { id: 5, name: "Ethan Miller", initials: "EM", email: "ethan.miller@email.com", phone: "+977 9822 555 666", condition: "Neck pain", therapist: "Dr. James Wilson", lastVisit: "Aug 18, 2026", status: "Active", color: "bg-rose-50 text-rose-700" },
  { id: 6, name: "Mia Davis", initials: "MD", email: "mia.davis@email.com", phone: "+977 9803 777 888", condition: "Knee rehabilitation", therapist: "Dr. Liam Brown", lastVisit: "Jul 30, 2026", status: "Inactive", color: "bg-cyan-50 text-cyan-700" },
];

export const patientTabs = [
  { label: "All patients", path: "/patients" },
  { label: "Add patient", path: "/patients/new" },
  { label: "Active patients", path: "/patients/active" },
];
