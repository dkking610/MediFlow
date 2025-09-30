import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { 
    MigrantProfile, DoctorProfile, AdminProfile, Appointment, HealthRecord, 
    Prescription, LabReport, Vaccination, User, UploadedDocument, UserRole, Language
} from '../types';
import { 
    dummyMigrants, dummyDoctors, dummyAdmins, dummyAppointments, 
    dummyHealthRecords, dummyPrescriptions, dummyLabReports, dummyVaccinations,
    dummyUploadedDocuments, getAvatarUrl
} from '../data/dummyData';

interface DataContextType {
  migrants: MigrantProfile[];
  doctors: DoctorProfile[];
  admins: AdminProfile[];
  appointments: Appointment[];
  healthRecords: HealthRecord[];
  prescriptions: Prescription[];
  labReports: LabReport[];
  vaccinations: Vaccination[];
  uploadedDocuments: UploadedDocument[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  addHealthRecordAndPrescription: (record: Omit<HealthRecord, 'id'>, prescription?: Omit<Prescription, 'id'>) => void;
  addUploadedDocument: (document: Omit<UploadedDocument, 'id'>) => void;
  updateUserStatus: (userId: string, status: 'Active' | 'Inactive') => void;
  addUser: (user: Omit<User, 'id'>) => void;
  updateUser: (user: User) => void;
  getAllUsers: () => User[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [migrants, setMigrants] = useState<MigrantProfile[]>(dummyMigrants);
  const [doctors, setDoctors] = useState<DoctorProfile[]>(dummyDoctors);
  const [admins, setAdmins] = useState<AdminProfile[]>(dummyAdmins);
  const [appointments, setAppointments] = useState<Appointment[]>(dummyAppointments);
  const [healthRecords, setHealthRecords] = useState<HealthRecord[]>(dummyHealthRecords);
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(dummyPrescriptions);
  const [labReports, setLabReports] = useState<LabReport[]>(dummyLabReports);
  const [vaccinations, setVaccinations] = useState<Vaccination[]>(dummyVaccinations);
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>(dummyUploadedDocuments);

  const addAppointment = useCallback((appointment: Omit<Appointment, 'id'>) => {
    setAppointments(prev => [
      ...prev,
      {
        ...appointment,
        id: `APP${Date.now()}`,
      },
    ]);
  }, []);

  const addHealthRecordAndPrescription = useCallback((record: Omit<HealthRecord, 'id'>, prescription?: Omit<Prescription, 'id'>) => {
    setHealthRecords(prev => [
      {
        ...record,
        id: `HR${Date.now()}`,
      },
      ...prev,
    ]);
    if (prescription && prescription.medication) {
      setPrescriptions(prev => [
        {
          ...prescription,
          id: `PRE${Date.now()}`,
        },
        ...prev,
      ]);
    }
  }, []);
  
  const addUploadedDocument = useCallback((doc: Omit<UploadedDocument, 'id'>) => {
    setUploadedDocuments(prev => [{ ...doc, id: `DOCU${Date.now()}`}, ...prev]);
  }, []);

  const updateUserStatus = useCallback((userId: string, status: 'Active' | 'Inactive') => {
    setMigrants(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    setDoctors(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    setAdmins(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
  }, []);

  const addUser = useCallback((user: Omit<User, 'id'>) => {
    const getNewId = (role: UserRole) => `${role.substring(0,3)}${Math.floor(Date.now() / 1000)}`;
    const newAvatar = getAvatarUrl(user.name);
    
    switch (user.role) {
      case UserRole.MIGRANT:
        const newMigrant: MigrantProfile = {
            dateOfBirth: '1990-01-01', gender: 'Other', phone: '', address: 'Kerala', preferredLanguage: Language.EN, // Defaults
            ...(user as Partial<MigrantProfile>),
            id: getNewId(UserRole.MIGRANT), avatarUrl: newAvatar, status: 'Active', role: UserRole.MIGRANT, name: user.name
        };
        setMigrants(prev => [newMigrant, ...prev]);
        break;
      case UserRole.DOCTOR:
        const newDoctor: DoctorProfile = {
            specialization: 'General Physician', hospital: 'General Hospital', licenseNumber: `KMC${Math.floor(Math.random()*100000)}`, // Defaults
            ...(user as Partial<DoctorProfile>),
            id: getNewId(UserRole.DOCTOR), avatarUrl: newAvatar, status: 'Active', role: UserRole.DOCTOR, name: user.name
        };
        setDoctors(prev => [newDoctor, ...prev]);
        break;
      case UserRole.ADMIN:
        const newAdmin: AdminProfile = {
            permissions: ['MANAGE_USERS'], // Defaults
            ...(user as Partial<AdminProfile>),
            id: getNewId(UserRole.ADMIN), avatarUrl: newAvatar, status: 'Active', role: UserRole.ADMIN, name: user.name
        };
        setAdmins(prev => [newAdmin, ...prev]);
        break;
    }
  }, []);

  const updateUser = useCallback((user: User) => {
    if (user.role === UserRole.MIGRANT) {
      setMigrants(prev => prev.map(u => u.id === user.id ? { ...u, ...user } : u));
    } else if (user.role === UserRole.DOCTOR) {
      setDoctors(prev => prev.map(u => u.id === user.id ? { ...u, ...user } : u));
    } else if (user.role === UserRole.ADMIN) {
      setAdmins(prev => prev.map(u => u.id === user.id ? { ...u, ...user } : u));
    }
  }, []);

  const getAllUsers = useCallback(() => {
    return [...migrants, ...doctors, ...admins];
  }, [migrants, doctors, admins]);


  return (
    <DataContext.Provider value={{ 
        migrants, 
        doctors, 
        admins, 
        appointments, 
        healthRecords, 
        prescriptions, 
        labReports,
        vaccinations,
        uploadedDocuments,
        addAppointment,
        addHealthRecordAndPrescription,
        addUploadedDocument,
        updateUserStatus,
        addUser,
        updateUser,
        getAllUsers,
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
