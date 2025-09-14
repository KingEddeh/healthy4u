import { defineStore } from 'pinia';
import { ref } from 'vue';
import QRCode from 'qrcode';
import type { UserPayload } from '../types/data';

export interface MedicalQRData {
  id: string;
  name: string;
  email: string;
  emergency_contact: {
    date_of_birth: string;
    sex: string;
    allergies: string;
    current_medications: string;
    past_medical_history: string;
    family_medical_history: string;
    immunization_history: string;
    blood_type: string;
    height_cm: number | null;
    weight_kg: number | null;
  };
  timestamp: string;
}

export const useQRStore = defineStore('qr', () => {
  const currentQRData = ref<string>('');
  const currentQRImage = ref<string>('');

  /**
   * Generate QR code data URL from user medical data
   */
  async function generateQRFromUser(userData: UserPayload): Promise<string> {
    try {
      const medicalData: MedicalQRData = {
        id: userData.id,
        name: `${userData.first_name} ${userData.last_name}`,
        email: userData.email,
        emergency_contact: userData.medical_record,
        timestamp: new Date().toISOString()
      };

      const qrDataString = JSON.stringify(medicalData);
      const dataURL = await QRCode.toDataURL(qrDataString, {
        width: 256,
        margin: 2,
        color: {
          dark: '#00b0b0',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      });

      currentQRData.value = qrDataString;
      currentQRImage.value = dataURL;

      return dataURL;
    } catch (error) {
      console.error('Error generating QR code:', error);
      throw new Error('Failed to generate QR code');
    }
  }

  /**
   * Validate if a scanned QR code contains valid SiguraDok medical data
   */
  function validateMedicalQRData(data: string): MedicalQRData | null {
    try {
      const parsed = JSON.parse(data);
      
      // Check if it has the required SiguraDok medical data structure
      if (
        parsed.id &&
        parsed.name &&
        parsed.email &&
        parsed.emergency_contact &&
        parsed.timestamp
      ) {
        return parsed as MedicalQRData;
      }
      
      return null;
    } catch {
      return null;
    }
  }

  /**
   * Generate a shareable QR code image blob
   */
  async function generateQRBlob(userData: UserPayload): Promise<Blob> {
    const dataURL = await generateQRFromUser(userData);
    const response = await fetch(dataURL);
    return response.blob();
  }

  /**
   * Clear current QR data
   */
  function clearQRData() {
    currentQRData.value = '';
    currentQRImage.value = '';
  }

  /**
   * Get essential medical info for emergency situations
   */
  function getEssentialMedicalInfo(medicalData: MedicalQRData): string[] {
    const essentials: string[] = [];
    
    if (medicalData.emergency_contact.blood_type) {
      essentials.push(`Blood Type: ${medicalData.emergency_contact.blood_type}`);
    }
    
    if (medicalData.emergency_contact.allergies && medicalData.emergency_contact.allergies.trim()) {
      essentials.push(`Allergies: ${medicalData.emergency_contact.allergies}`);
    }
    
    if (medicalData.emergency_contact.current_medications && medicalData.emergency_contact.current_medications.trim()) {
      essentials.push(`Medications: ${medicalData.emergency_contact.current_medications}`);
    }
    
    return essentials;
  }

  return {
    // State
    currentQRData,
    currentQRImage,
    
    // Actions
    generateQRFromUser,
    validateMedicalQRData,
    generateQRBlob,
    clearQRData,
    getEssentialMedicalInfo
  };
});
