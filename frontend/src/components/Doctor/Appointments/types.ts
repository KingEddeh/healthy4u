export type AppointmentStatus = 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'no-show';

export interface Appointment {
  id: number;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: AppointmentStatus;
}

export interface FilterOptions {
  searchText: string;
  status: AppointmentStatus | null;
  date: string | null;
}

export const statusOptions = [
  { label: 'All', value: null },
  { label: 'Scheduled', value: 'scheduled' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'No Show', value: 'no-show' }
] as const;

export const dateOptions = [
  { label: 'All', value: null },
  { label: 'Today', value: 'today' },
  { label: 'Tomorrow', value: 'tomorrow' },
  { label: 'This Week', value: 'week' },
  { label: 'This Month', value: 'month' }
] as const;

export const getStatusColor = (status: AppointmentStatus): string => {
  switch (status) {
    case 'scheduled': return 'primary';
    case 'in-progress': return 'orange';
    case 'completed': return 'positive';
    case 'cancelled': return 'negative';
    case 'no-show': return 'grey';
  }
};