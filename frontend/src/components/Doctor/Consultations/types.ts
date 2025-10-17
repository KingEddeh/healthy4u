export interface Consultation {
  id: number;
  patientName: string;
  date: string;
  diagnosis: string;
  symptoms?: string;
  prescription?: string;
  attachments?: File[];
}

export interface PatientRecord {
  id: number;
  name: string;
  allergies: string[];
  chronicDiseases: string[];
  medicalHistory?: ConsultationHistory[];
}

export interface ConsultationHistory {
  date: string;
  diagnosis: string;
  prescription: string;
  doctor: string;
}

export interface Referral {
  specialist: string | null;
  reason: string;
  patientName: string;
  referringDoctor: string;
  date: string;
}

export const specialistOptions = [
  'Cardiologist',
  'Neurologist',
  'Pediatrician',
  'Orthopedic',
  'Dermatologist'
] as const;

export type SpecialistType = typeof specialistOptions[number];