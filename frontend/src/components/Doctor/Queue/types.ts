export type PriorityLevel = 'routine' | 'urgent' | 'emergency'

export interface QueuePatient {
  id: number
  name: string
  reason: string
  priority: PriorityLevel
  waitTime?: string
  registeredTime: string
  appointmentType?: string
  insuranceVerified?: boolean
}

export interface QueueStats {
  totalPatients: number
  averageWaitTime: string
  byPriority: {
    routine: number
    urgent: number
    emergency: number
  }
}

export const priorityConfig = {
  routine: {
    label: 'Routine',
    color: 'green'
  },
  urgent: {
    label: 'Urgent',
    color: 'orange'
  },
  emergency: {
    label: 'Emergency',
    color: 'red'
  }
} as const