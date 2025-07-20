// src/lib/appwrite-disabled.ts
// Temporary mock functions to replace Appwrite

export const createUser = async (user: any) => {
  console.log('Mock: Creating user', user);
  return { $id: 'mock-user-id' };
};

export const getUser = async (userId: string) => {
  console.log('Mock: Getting user', userId);
  return { $id: userId, name: 'Mock User' };
};

export const registerPatient = async (patient: any) => {
  console.log('Mock: Registering patient', patient);
  return { $id: 'mock-patient-id' };
};

// Add any other Appwrite functions you see errors for