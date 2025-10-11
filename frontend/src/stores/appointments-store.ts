import { defineStore } from 'pinia';
import type { Appointment } from '../types/data';

interface AppointmentState {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
}

export const useAppointmentsStore = defineStore('appointments', {
  state: (): AppointmentState => ({
    appointments: [],
    loading: false,
    error: null
  }),

  getters: {
    getAppointmentById: (state) => (id: string) => 
      state.appointments.find(apt => apt.id === id),
    
    getUpcomingAppointments: (state) => 
      state.appointments
        .filter(apt => apt.status === 'scheduled')
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
    
    getAppointmentsByDate: (state) => (date: string) =>
      state.appointments.filter(apt => apt.date === date)
  },

  actions: {
    async fetchAppointments() {
      this.loading = true;
      this.error = null;
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.appointments = [
          {
            id: '1',
            patientId: 'patient1',
            doctorId: 'doc1',
            doctorName: 'Dr. John Smith',
            specialization: 'General Medicine',
            date: '2025-10-15',
            time: '09:00',
            status: 'scheduled',
            reason: 'Annual checkup',
            isOnline: false
          },
          {
            id: '2',
            patientId: 'patient1',
            doctorId: 'doc2',
            doctorName: 'Dr. Sarah Johnson',
            specialization: 'Pediatrics',
            date: '2025-10-20',
            time: '14:30',
            status: 'scheduled',
            reason: 'Follow-up consultation',
            isOnline: true
          }
        ];
      } catch (error) {
        this.error = 'Failed to fetch appointments';
        console.error('Error fetching appointments:', error);
      } finally {
        this.loading = false;
      }
    },

    async createAppointment(appointment: Partial<Appointment>) {
      this.loading = true;
      this.error = null;
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        const newAppointment: Appointment = {
          id: Math.random().toString(36).substr(2, 9),
          patientId: 'patient1',
          ...appointment
        } as Appointment;
        this.appointments.push(newAppointment);
        return newAppointment;
      } catch (error) {
        this.error = 'Failed to create appointment';
        console.error('Error creating appointment:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async cancelAppointment(appointmentId: string) {
      this.loading = true;
      this.error = null;
      try {
        // Mock API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.appointments = this.appointments.map(apt =>
          apt.id === appointmentId
            ? { ...apt, status: 'cancelled' as const }
            : apt
        );
      } catch (error) {
        this.error = 'Failed to cancel appointment';
        console.error('Error cancelling appointment:', error);
        throw error;
      } finally {
        this.loading = false;
      }
    }
  }
});