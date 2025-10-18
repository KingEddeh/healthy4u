import { defineStore } from 'pinia'
import { ref } from 'vue'

interface PatientEMR {
  allergies: string[]
  currentMedications: string[]
  pastMedicalHistory: string
  familyMedicalHistory: string
  immunizationHistory: string[]
  bloodType: string
  height: number
  weight: number
  lastUpdated: string
}

interface Patient {
  id: string
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  address: string
  createdAt: string
  updatedAt: string
  syncedAt?: string
  emr?: PatientEMR
}

interface CheckIn {
  id: string
  patientId: string
  timestamp: string
  status: 'pending' | 'completed'
  syncedAt?: string
}

export const usePatientStore = defineStore('patient', () => {
  const patients = ref<Patient[]>([])
  const checkIns = ref<CheckIn[]>([])
  const isInitialized = ref(false)

  // Initialize store from local storage
  const initializeStore = () => {
    if (isInitialized.value) return

    const storedPatients = localStorage.getItem('patients')
    if (storedPatients) {
      patients.value = JSON.parse(storedPatients)
    }

    const storedCheckIns = localStorage.getItem('checkIns')
    if (storedCheckIns) {
      checkIns.value = JSON.parse(storedCheckIns)
    }

    isInitialized.value = true
  }

  // Save changes to local storage
  const saveToLocalStorage = () => {
    localStorage.setItem('patients', JSON.stringify(patients.value))
    localStorage.setItem('checkIns', JSON.stringify(checkIns.value))
  }

  // Add a new patient
  const addPatient = (patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString()
    const newPatient: Patient = {
      ...patient,
      id: `PT${Date.now().toString(36).toUpperCase()}`,
      createdAt: now,
      updatedAt: now
    }
    patients.value.push(newPatient)
    saveToLocalStorage()
    void syncWithBackend()
    return newPatient
  }

  // Get a patient by ID
  const getPatientById = (id: string) => {
    return patients.value.find(p => p.id === id)
  }

  // Add a check-in record
  const addCheckIn = (patientId: string) => {
    const now = new Date().toISOString()
    const newCheckIn: CheckIn = {
      id: `CI${Date.now().toString(36).toUpperCase()}`,
      patientId,
      timestamp: now,
      status: 'pending'
    }
    checkIns.value.push(newCheckIn)
    saveToLocalStorage()
    void syncWithBackend()
    return newCheckIn
  }

  // Get check-ins for a patient
  const getCheckInsByPatientId = (patientId: string) => {
    return checkIns.value.filter(ci => ci.patientId === patientId)
  }

  // Sync with backend when online
  const syncWithBackend = async () => {
    if (!navigator.onLine) return

    try {
      // Get unsynced patients
      const unsyncedPatients = patients.value.filter(p => !p.syncedAt)
      for (const patient of unsyncedPatients) {
        try {
          // Example API call:
          // await api.post('/patients', patient)
          // For now, simulate an API call
          await new Promise(resolve => setTimeout(resolve, 100))
          patient.syncedAt = new Date().toISOString()
        } catch (error) {
          console.error('Failed to sync patient:', patient.id, error)
        }
      }

      // Get unsynced check-ins
      const unsyncedCheckIns = checkIns.value.filter(ci => !ci.syncedAt)
      for (const checkIn of unsyncedCheckIns) {
        try {
          // Example API call:
          // await api.post('/check-ins', checkIn)
          // For now, simulate an API call
          await new Promise(resolve => setTimeout(resolve, 100))
          checkIn.syncedAt = new Date().toISOString()
        } catch (error) {
          console.error('Failed to sync check-in:', checkIn.id, error)
        }
      }

      saveToLocalStorage()
    } catch (error) {
      console.error('Failed to sync with backend:', error)
      // Will retry on next sync attempt
    }
  }

  // Handler for online event
  const handleOnline = () => {
    void syncWithBackend()
  }

  // Listen for online/offline events
  if (typeof window !== 'undefined') {
    window.addEventListener('online', handleOnline)
  }

  // EMR related functions
  const updatePatientEMR = (patientId: string, emrData: PatientEMR) => {
    const patient = getPatientById(patientId)
    if (!patient) {
      throw new Error('Patient not found')
    }

    patient.emr = emrData
    patient.updatedAt = new Date().toISOString()
    saveToLocalStorage()
    void syncWithBackend()
  }

  const getPatientEMR = (patientId: string) => {
    const patient = getPatientById(patientId)
    if (!patient) {
      throw new Error('Patient not found')
    }
    return patient.emr
  }

  return {
    initializeStore,
    addPatient,
    getPatientById,
    addCheckIn,
    getCheckInsByPatientId,
    updatePatientEMR,
    getPatientEMR,
    syncWithBackend
  }
})
