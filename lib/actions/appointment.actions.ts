// src/lib/actions/appointment.actions.ts
// QueueCare: Client-safe appointment actions

interface CreateAppointmentParams {
  userId: string;
  patient: string;
  primaryPhysician: string;
  reason: string;
  schedule: Date;
  status: string;
  note?: string;
}

interface UpdateAppointmentParams {
  appointmentId: string;
  userId: string;
  appointment: any;
  type: string;
}

interface Appointment {
  $id: string;
  patient: any;
  schedule: Date;
  status: string;
  primaryPhysician: string;
  reason: string;
  note?: string;
  userId: string;
  cancellationReason?: string;
}

// Helper function to check if we're in browser
const isBrowser = () => typeof window !== 'undefined';

// Create appointment with proper date handling
export const createAppointment = async (appointment: CreateAppointmentParams): Promise<Appointment> => {
  try {
    const newAppointment: Appointment = {
      $id: crypto.randomUUID(),
      patient: appointment.patient,
      schedule: new Date(appointment.schedule),
      reason: appointment.reason,
      note: appointment.note,
      status: 'pending',
      primaryPhysician: appointment.primaryPhysician,
      userId: appointment.userId,
    };

    // Only use localStorage if in browser
    if (isBrowser()) {
      // Store in localStorage with proper date serialization
      const appointmentKey = `queuecare-appointment-${newAppointment.$id}`;
      const appointmentData = {
        ...newAppointment,
        schedule: newAppointment.schedule.toISOString(), // Store as ISO string
      };
      localStorage.setItem(appointmentKey, JSON.stringify(appointmentData));

      // Add to queue
      const queueEntry = {
        id: crypto.randomUUID(),
        patientId: appointment.patient,
        appointmentId: newAppointment.$id,
        position: 1,
        arrivalTime: new Date().toISOString(),
        status: 'waiting',
        priority: 'normal',
        reason: appointment.reason
      };

      const queueKey = `queuecare-queue-${queueEntry.id}`;
      localStorage.setItem(queueKey, JSON.stringify(queueEntry));
    }

    console.log('QueueCare: Appointment created successfully', {
      appointment: newAppointment,
      schedule: newAppointment.schedule.toISOString(),
      primaryPhysician: newAppointment.primaryPhysician
    });
    
    return newAppointment;
  } catch (error) {
    console.error('QueueCare: Error creating appointment', error);
    throw error;
  }
};

// Get appointment with proper date parsing
export const getAppointment = async (appointmentId: string): Promise<Appointment | null> => {
  try {
    // Return null if not in browser
    if (!isBrowser()) {
      console.log('QueueCare: Not in browser, returning null');
      return null;
    }

    const stored = localStorage.getItem(`queuecare-appointment-${appointmentId}`);
    if (stored) {
      const appointmentData = JSON.parse(stored);
      console.log('QueueCare: Found appointment in localStorage', appointmentData);
      
      // Convert ISO string back to Date object
      return {
        ...appointmentData,
        schedule: new Date(appointmentData.schedule)
      };
    }
    
    console.log('QueueCare: No appointment found for ID', appointmentId);
    return null;
  } catch (error) {
    console.error('QueueCare: Error getting appointment', error);
    return null;
  }
};

// Update appointment
export const updateAppointment = async ({ appointmentId, appointment, type }: UpdateAppointmentParams): Promise<Appointment> => {
  try {
    if (!isBrowser()) {
      throw new Error('Cannot update appointment: not in browser environment');
    }

    const existingAppointment = await getAppointment(appointmentId);
    
    if (!existingAppointment) {
      throw new Error('Appointment not found');
    }

    const updatedAppointment = {
      ...existingAppointment,
      ...appointment,
      $id: appointmentId,
    };

    // Handle different update types
    if (type === 'schedule') {
      updatedAppointment.status = 'scheduled';
    } else if (type === 'cancel') {
      updatedAppointment.status = 'cancelled';
    }

    // Store updated appointment with proper date handling
    const appointmentData = {
      ...updatedAppointment,
      schedule: updatedAppointment.schedule instanceof Date 
        ? updatedAppointment.schedule.toISOString() 
        : new Date(updatedAppointment.schedule).toISOString()
    };
    localStorage.setItem(`queuecare-appointment-${appointmentId}`, JSON.stringify(appointmentData));

    console.log('QueueCare: Appointment updated', updatedAppointment);
    return updatedAppointment;
  } catch (error) {
    console.error('QueueCare: Error updating appointment', error);
    throw error;
  }
};

// Get recent appointments
export const getRecentAppointmentList = async (): Promise<{ documents: Appointment[], total: number }> => {
  try {
    if (!isBrowser()) {
      return { documents: [], total: 0 };
    }

    const appointments: Appointment[] = [];
    
    // Get all appointments from localStorage
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('queuecare-appointment-')) {
        const stored = localStorage.getItem(key);
        if (stored) {
          const appointmentData = JSON.parse(stored);
          appointments.push({
            ...appointmentData,
            schedule: new Date(appointmentData.schedule)
          });
        }
      }
    }

    // Sort by creation date (most recent first)
    appointments.sort((a, b) => new Date(b.schedule).getTime() - new Date(a.schedule).getTime());

    console.log('QueueCare: Retrieved recent appointments', appointments);
    return {
      documents: appointments,
      total: appointments.length
    };
  } catch (error) {
    console.error('QueueCare: Error getting recent appointments', error);
    return { documents: [], total: 0 };
  }
};

// Send SMS notification (mock)
export const sendSMSNotification = async (userId: string, content: string): Promise<boolean> => {
  try {
    console.log('QueueCare: SMS notification sent (mock)', { userId, content });
    return true;
  } catch (error) {
    console.error('QueueCare: Error sending SMS', error);
    return false;
  }
};