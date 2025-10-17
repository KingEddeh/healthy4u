export interface DailyStats {
  patientsSeen: number;
  pendingReferrals: number;
  totalAppointments?: number;
  completedAppointments?: number;
  cancelledAppointments?: number;
  averageWaitTime?: string;
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  isUrgent: boolean;
  icon: string;
  type?: 'emergency' | 'info' | 'warning';
  action?: {
    label: string;
    handler: () => void;
  };
}

export interface StatItem {
  label: string;
  value: number | string;
  color?: string;
  icon?: string;
  trend?: {
    value: number;
    direction: 'up' | 'down' | 'stable';
  };
}