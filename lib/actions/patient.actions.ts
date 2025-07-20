// src/lib/actions/patient.actions.ts
// QueueCare: Complete patient actions to replace Appwrite

interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

interface User {
  $id: string;
  name: string;
  email: string;
  phone: string;
}

interface Patient {
  $id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  birthDate?: Date;
  gender?: string;
  address?: string;
  occupation?: string;
  emergencyContactName?: string;
  emergencyContactNumber?: string;
  primaryPhysician?: string;
  insuranceProvider?: string;
  insurancePolicyNumber?: string;
  allergies?: string;
  currentMedication?: string;
  familyMedicalHistory?: string;
  pastMedicalHistory?: string;
  identificationType?: string;
  identificationNumber?: string;
  privacyConsent?: boolean;
}

// User functions
export const createUser = async (user: CreateUserParams): Promise<User> => {
  try {
    const newUser = {
      $id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    // Store in localStorage temporarily
    localStorage.setItem('queuecare-current-user', JSON.stringify(newUser));

    console.log('QueueCare: User created locally', newUser);
    return newUser;
  } catch (error) {
    console.error('QueueCare: Error creating user', error);
    throw error;
  }
};

export const getUser = async (userId: string): Promise<User | null> => {
  try {
    const stored = localStorage.getItem('queuecare-current-user');
    if (stored) {
      const user = JSON.parse(stored);
      if (user.$id === userId) {
        return user;
      }
    }
    
    // If not found, return a mock user for demo purposes
    return {
      $id: userId,
      name: 'Demo User',
      email: 'demo@queuecare.co.za',
      phone: '+27821234567'
    };
  } catch (error) {
    console.error('QueueCare: Error getting user', error);
    return null;
  }
};

// Patient functions
export const getPatient = async (userId: string): Promise<Patient | null> => {
  try {
    const stored = localStorage.getItem(`queuecare-patient-${userId}`);
    if (stored) {
      return JSON.parse(stored);
    }
    
    // Return null if no patient record exists yet
    return null;
  } catch (error) {
    console.error('QueueCare: Error getting patient', error);
    return null;
  }
};

export const registerPatient = async (patient: any): Promise<Patient> => {
  try {
    const newPatient = {
      $id: crypto.randomUUID(),
      userId: patient.userId,
      name: patient.name,
      email: patient.email,
      phone: patient.phone,
      birthDate: patient.birthDate,
      gender: patient.gender,
      address: patient.address,
      occupation: patient.occupation,
      emergencyContactName: patient.emergencyContactName,
      emergencyContactNumber: patient.emergencyContactNumber,
      primaryPhysician: patient.primaryPhysician,
      insuranceProvider: patient.insuranceProvider,
      insurancePolicyNumber: patient.insurancePolicyNumber,
      allergies: patient.allergies,
      currentMedication: patient.currentMedication,
      familyMedicalHistory: patient.familyMedicalHistory,
      pastMedicalHistory: patient.pastMedicalHistory,
      identificationType: patient.identificationType,
      identificationNumber: patient.identificationNumber,
      privacyConsent: patient.privacyConsent,
    };

    // Store patient data locally
    localStorage.setItem(`queuecare-patient-${patient.userId}`, JSON.stringify(newPatient));

    console.log('QueueCare: Patient registered locally', newPatient);
    return newPatient;
  } catch (error) {
    console.error('QueueCare: Error registering patient', error);
    throw error;
  }
};

// Appointment functions
export const createAppointment = async (appointment: any) => {
  try {
    const newAppointment = {
      $id: crypto.randomUUID(),
      patient: appointment.patient,
      schedule: appointment.schedule,
      reason: appointment.reason,
      note: appointment.note,
      status: 'pending',
      primaryPhysician: appointment.primaryPhysician,
    };

    console.log('QueueCare: Appointment created locally', newAppointment);
    return newAppointment;
  } catch (error) {
    console.error('QueueCare: Error creating appointment', error);
    throw error;
  }
};

export const updateAppointment = async (appointmentId: string, appointment: any) => {
  try {
    console.log('QueueCare: Appointment updated locally', appointmentId, appointment);
    return { $id: appointmentId, ...appointment };
  } catch (error) {
    console.error('QueueCare: Error updating appointment', error);
    throw error;
  }
};

export const getRecentAppointmentList = async () => {
  try {
    // Return empty array for now - we'll implement this later
    return {
      documents: [],
      total: 0
    };
  } catch (error) {
    console.error('QueueCare: Error getting appointments', error);
    return { documents: [], total: 0 };
  }
};

// Additional helper functions
export const sendSMSNotification = async (userId: string, content: string) => {
  try {
    console.log('QueueCare: SMS notification sent (mock)', userId, content);
    return true;
  } catch (error) {
    console.error('QueueCare: Error sending SMS', error);
    return false;
  }
};