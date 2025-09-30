export enum UserRole {
  MIGRANT = 'MIGRANT',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN',
}

export enum Language {
  EN = 'en',
  ML = 'ml',
  HI = 'hi',
  BN = 'bn',
  TA = 'ta',
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  status: 'Active' | 'Inactive';
}

export interface MigrantProfile extends User {
  role: UserRole.MIGRANT;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  phone: string;
  address: string;
  preferredLanguage: Language;
}

export interface DoctorProfile extends User {
  role: UserRole.DOCTOR;
  specialization: string;
  hospital: string;
  licenseNumber: string;
}

export interface AdminProfile extends User {
  role: UserRole.ADMIN;
  permissions: string[];
}

export type CurrentUser = MigrantProfile | DoctorProfile | AdminProfile | null;

export interface HealthRecord {
  id: string;
  patientId: string;
  doctorId: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  notes: string;
}

export interface Prescription {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface LabReportResult {
  parameter: string;
  value: string;
  unit: string;
  referenceRange: string;
}

export interface LabReport {
    id: string;
    patientId: string;
    testName: string;
    date: string;
    results: LabReportResult[];
    interpretation: string;
    fileUrl: string;
}

export interface Vaccination {
    id: string;
    patientId: string;
    vaccineName: string;
    date: string;
    dose: number;
}

export interface Appointment {
    id: string;
    patientId: string;
    doctorId: string;
    doctorName: string;
    specialization: string;
    date: string;
    time: string;
    status: 'Upcoming' | 'Completed' | 'Cancelled';
}

export interface UploadedDocument {
  id: string;
  patientId: string;
  documentName: string;
  documentType: 'Prescription' | 'Lab Report' | 'Other';
  date: string;
  fileUrl: string;
}
