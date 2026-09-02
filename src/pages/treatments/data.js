export const treatmentTabs = [
  { label: "Treatment sessions", path: "/treatments" },
  { label: "Treatment plans", path: "/treatments/plans" },
  { label: "Treatment history", path: "/treatments/history" },
];

export const sessions = [
  { patient: "Aarav Sharma", initials: "AS", treatment: "Manual therapy", therapist: "Dr. Maya Patel", date: "Today, 09:00 AM", duration: "45 min", status: "In progress" },
  { patient: "Sofia Williams", initials: "SW", treatment: "Shoulder mobility", therapist: "Dr. James Wilson", date: "Today, 10:30 AM", duration: "30 min", status: "Scheduled" },
  { patient: "Noah Thompson", initials: "NT", treatment: "Sports rehabilitation", therapist: "Dr. Maya Patel", date: "Today, 01:00 PM", duration: "60 min", status: "Scheduled" },
  { patient: "Ethan Miller", initials: "EM", treatment: "Neck pain therapy", therapist: "Dr. James Wilson", date: "Yesterday, 02:00 PM", duration: "45 min", status: "Completed" },
];

export const plans = [
  { patient: "Isabella Garcia", initials: "IG", plan: "Post-operative recovery", therapist: "Dr. Liam Brown", progress: "68%", sessions: "17 / 25", status: "Active" },
  { patient: "Mia Davis", initials: "MD", plan: "Knee rehabilitation", therapist: "Dr. Liam Brown", progress: "42%", sessions: "8 / 20", status: "Active" },
  { patient: "Oliver Wilson", initials: "OW", plan: "Lower back strengthening", therapist: "Dr. Maya Patel", progress: "100%", sessions: "12 / 12", status: "Completed" },
];

export const history = [
  { patient: "Aarav Sharma", initials: "AS", treatment: "Manual therapy", therapist: "Dr. Maya Patel", date: "Sep 02, 2026", notes: "Improved lumbar mobility" },
  { patient: "Sofia Williams", initials: "SW", treatment: "Therapeutic exercise", therapist: "Dr. James Wilson", date: "Sep 01, 2026", notes: "Progressing well" },
  { patient: "Noah Thompson", initials: "NT", treatment: "Sports rehabilitation", therapist: "Dr. Maya Patel", date: "Aug 28, 2026", notes: "Reduced pain reported" },
];
