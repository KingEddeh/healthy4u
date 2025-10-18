export interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'pending';
}

export interface Appointment {
  id: number | string;
  patientName: string;
  doctorName: string;
  service: string;
  date: string;
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled' | 'pending';
}

export interface Report {
  id: number | string;
  title: string;
  type: string;
  date: string;
  status: 'completed' | 'pending' | 'error';
}

export interface Review {
  id: number | string;
  patientName: string;
  rating: number;
  comment: string;
  date: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  status: 'resolved' | 'pending' | 'flagged';
  tags: string[];
}

export interface Notification {
  id: number | string;
  type: 'system' | 'patient' | 'report' | 'alert';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface TableColumn<T = Record<string, unknown>> {
  name: string;
  required?: boolean;
  label: string;
  align?: 'left' | 'right' | 'center';
  field: keyof T | ((row: T) => unknown);
  sortable?: boolean;
  format?: (val: unknown) => string;
  sort?: (a: unknown, b: unknown, rowA: T, rowB: T) => number;
}

export interface Pagination {
  sortBy: string | null;
  descending: boolean;
  page: number;
  rowsPerPage: number;
  rowsNumber?: number;
}
