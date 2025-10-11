// TypeScript interfaces for registration and medical record data

export interface MedicalRecordData {
  date_of_birth: string;
  sex: 'male' | 'female' | '';
  allergies: string;
  current_medications: string;
  past_medical_history: string;
  family_medical_history: string;
  immunization_history: string;
  blood_type: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-' | '';
  height_cm: number | null;
  weight_kg: number | null;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirm: string;
  user_type: 'patient'; // Only 'patient' is handled by this form
  medicalRecord: MedicalRecordData;
}

export interface UserPayload {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string; // Note: In a real application, never store passwords in plain text
  user_type: 'patient';
  medical_record: MedicalRecordData;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  specialization: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  reason: string;
  notes?: string;
  isOnline: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: 'user' | 'bot' | 'system';
  triageLevel?: 'routine' | 'urgent' | 'very-urgent' | 'emergency';
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  prescription: string[];
  notes: string;
  followUpDate?: string;
  attachments?: string[];
}

export interface Review {
  id: string;
  patientId: string;
  institutionId: string;
  rating: number;
  comment: string;
  date: string;
  isAnonymous: boolean;
  status: 'pending' | 'approved' | 'rejected';
}

export interface HealthCard {
  id: string;
  patientId: string;
  cardNumber: string;
  issueDate: string;
  expiryDate: string;
  status: 'active' | 'inactive' | 'expired';
  qrCode: string;
  nfcId?: string;
}
