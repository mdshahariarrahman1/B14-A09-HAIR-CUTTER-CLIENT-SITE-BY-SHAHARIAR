// Static placeholder data for the dashboard UI. No backend is wired up yet.

export type AppointmentStatus = "Pending" | "Confirmed" | "Cancelled";
export type PaymentStatus = "Unpaid" | "Paid";

export type Appointment = {
  id: string;
  date: string;
  time: string;
  service: string;
  category: string;
  image: string;
  customer: string;
  customerEmail: string;
  duration: string;
  price: number;
  status: AppointmentStatus;
  paymentStatus: PaymentStatus;
  message?: string;
  requestedAt: string;
};

export const appointments: Appointment[] = [
  {
    id: "AP-1042",
    date: "2026-11-28",
    time: "10:30 AM",
    service: "Classic Haircut",
    category: "Haircut",
    image: "/images/img-34.webp",
    customer: "Rahim Ahmed",
    customerEmail: "rahim@example.com",
    duration: "45 min",
    price: 45,
    status: "Confirmed",
    paymentStatus: "Unpaid",
    message: "Please use a fade on the sides.",
    requestedAt: "2026-11-24 09:12",
  },
  {
    id: "AP-1041",
    date: "2026-11-27",
    time: "02:00 PM",
    service: "Beard Trim & Shave",
    category: "Shave",
    image: "/images/img-34-2.webp",
    customer: "Rahim Ahmed",
    customerEmail: "rahim@example.com",
    duration: "30 min",
    price: 35,
    status: "Pending",
    paymentStatus: "Unpaid",
    requestedAt: "2026-11-25 14:40",
  },
  {
    id: "AP-1038",
    date: "2026-11-21",
    time: "11:00 AM",
    service: "Hair Styling",
    category: "Styling",
    image: "/images/img-71.webp",
    customer: "Rahim Ahmed",
    customerEmail: "rahim@example.com",
    duration: "60 min",
    price: 70,
    status: "Confirmed",
    paymentStatus: "Paid",
    requestedAt: "2026-11-18 10:05",
  },
  {
    id: "AP-1035",
    date: "2026-11-18",
    time: "04:30 PM",
    service: "Hot Towel Shave",
    category: "Shave",
    image: "/images/img-34.webp",
    customer: "Tanvir Hasan",
    customerEmail: "tanvir@example.com",
    duration: "45 min",
    price: 50,
    status: "Cancelled",
    paymentStatus: "Unpaid",
    requestedAt: "2026-11-15 16:20",
  },
  {
    id: "AP-1030",
    date: "2026-11-30",
    time: "09:15 AM",
    service: "Classic Haircut",
    category: "Haircut",
    image: "/images/img-34-2.webp",
    customer: "Imran Khan",
    customerEmail: "imran@example.com",
    duration: "45 min",
    price: 45,
    status: "Pending",
    paymentStatus: "Unpaid",
    message: "First visit - sensitive skin.",
    requestedAt: "2026-11-12 11:30",
  },
  {
    id: "AP-1028",
    date: "2026-12-02",
    time: "05:00 PM",
    service: "Kids Haircut",
    category: "Haircut",
    image: "/images/img-71.webp",
    customer: "Nayeem Islam",
    customerEmail: "nayeem@example.com",
    duration: "30 min",
    price: 30,
    status: "Confirmed",
    paymentStatus: "Paid",
    requestedAt: "2026-11-23 08:45",
  },
];

// The customer-facing list only contains the signed-in demo customer's rows.
export const customerAppointments = appointments.filter(
  (item) => item.customer === "Rahim Ahmed"
);

export type Service = {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  durationMinutes: number;
  image: string;
  status: "Active" | "Inactive";
};

export const services: Service[] = [
  {
    id: "SVC-01",
    name: "Classic Haircut",
    category: "Haircut",
    description: "A timeless cut with a wash and finish.",
    price: 45,
    durationMinutes: 45,
    image: "/images/img-34.webp",
    status: "Active",
  },
  {
    id: "SVC-02",
    name: "Beard Trim & Shave",
    category: "Shave",
    description: "Precision shaping with a hot towel finish.",
    price: 35,
    durationMinutes: 30,
    image: "/images/img-34-2.webp",
    status: "Active",
  },
  {
    id: "SVC-03",
    name: "Hair Styling",
    category: "Styling",
    description: "Styling for a polished, lasting look.",
    price: 70,
    durationMinutes: 60,
    image: "/images/img-71.webp",
    status: "Active",
  },
  {
    id: "SVC-04",
    name: "Hot Towel Shave",
    category: "Shave",
    description: "A relaxing traditional shave ritual.",
    price: 50,
    durationMinutes: 45,
    image: "/images/img-34.webp",
    status: "Active",
  },
  {
    id: "SVC-05",
    name: "Kids Haircut",
    category: "Haircut",
    description: "A quick, comfortable cut for younger guests.",
    price: 30,
    durationMinutes: 30,
    image: "/images/img-34-2.webp",
    status: "Inactive",
  },
];

export type UserRow = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "customer" | "admin";
  joined: string;
  status: "Active" | "Blocked";
};

export const users: UserRow[] = [
  {
    id: "USR-01",
    name: "Rahim Ahmed",
    email: "rahim@example.com",
    phone: "+880 1711 000 101",
    role: "customer",
    joined: "2026-09-12",
    status: "Active",
  },
  {
    id: "USR-02",
    name: "Tanvir Hasan",
    email: "tanvir@example.com",
    phone: "+880 1711 000 102",
    role: "customer",
    joined: "2026-10-03",
    status: "Active",
  },
  {
    id: "USR-03",
    name: "Salon Manager",
    email: "admin@haircutter.com",
    phone: "+880 1711 000 001",
    role: "admin",
    joined: "2026-01-08",
    status: "Active",
  },
  {
    id: "USR-04",
    name: "Imran Khan",
    email: "imran@example.com",
    phone: "+880 1711 000 104",
    role: "customer",
    joined: "2026-11-02",
    status: "Blocked",
  },
];

export type Transaction = {
  id: string;
  date: string;
  customer: string;
  customerEmail: string;
  service: string;
  appointmentDate: string;
  amount: number;
  currency: string;
  sessionId: string;
  status: PaymentStatus;
};

export const transactions: Transaction[] = [
  {
    id: "TXN-8801",
    date: "2026-11-25 10:14",
    customer: "Rahim Ahmed",
    customerEmail: "rahim@example.com",
    service: "Classic Haircut",
    appointmentDate: "2026-11-21 · 11:00 AM",
    amount: 45,
    currency: "USD",
    sessionId: "cs_test_a1kL92mQ",
    status: "Paid",
  },
  {
    id: "TXN-8800",
    date: "2026-11-25 09:02",
    customer: "Tanvir Hasan",
    customerEmail: "tanvir@example.com",
    service: "Hair Styling",
    appointmentDate: "2026-11-24 · 02:00 PM",
    amount: 70,
    currency: "USD",
    sessionId: "cs_test_b2nR73pW",
    status: "Paid",
  },
  {
    id: "TXN-8799",
    date: "2026-11-24 16:38",
    customer: "Imran Khan",
    customerEmail: "imran@example.com",
    service: "Hot Towel Shave",
    appointmentDate: "2026-11-27 · 04:30 PM",
    amount: 50,
    currency: "USD",
    sessionId: "cs_test_c3sP84xY",
    status: "Unpaid",
  },
  {
    id: "TXN-8796",
    date: "2026-11-22 12:20",
    customer: "Sabbir Ali",
    customerEmail: "sabbir@example.com",
    service: "Beard Trim & Shave",
    appointmentDate: "2026-11-20 · 09:00 AM",
    amount: 35,
    currency: "USD",
    sessionId: "cs_test_d4tQ95zZ",
    status: "Paid",
  },
];

export const adminStats = [
  { label: "Total Registered Customers", value: "348", hint: "+16 this month" },
  { label: "Total Active Services", value: "24", hint: "2 inactive" },
  { label: "Total Appointment Requests", value: "18", hint: "All time" },
  { label: "Pending Appointments", value: "4", hint: "Awaiting review" },
  { label: "Confirmed Appointments", value: "12", hint: "Ready for visits" },
  { label: "Total Successful Payments", value: "16", hint: "Verified payments" },
];

export const customerStats = [
  { label: "Total Appointment Requests", value: "4", hint: "All time" },
  { label: "Pending Appointments", value: "1", hint: "Awaiting confirmation" },
  { label: "Confirmed Appointments", value: "2", hint: "1 ready to pay" },
  { label: "Cancelled Appointments", value: "1", hint: "Past requests" },
];
