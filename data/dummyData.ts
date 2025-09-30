import { UserRole, Language, MigrantProfile, DoctorProfile, AdminProfile, Appointment, HealthRecord, Prescription, LabReport, Vaccination, UploadedDocument } from '../types';

// Using ui-avatars.com for consistent, name-based avatars
export const getAvatarUrl = (name: string, background: string = '0067a3', color: string = 'ffffff') => {
  const formattedName = name.replace('Dr. ', '').replace(/ /g, '+');
  return `https://ui-avatars.com/api/?name=${formattedName}&background=${background}&color=${color}&bold=true`;
};


export const dummyMigrants: MigrantProfile[] = [
  {
    id: 'MIGRANT001',
    name: 'Baala',
    role: UserRole.MIGRANT,
    dateOfBirth: '1992-08-21',
    gender: 'Male',
    phone: '+91 91234 56780',
    address: 'Kochi, Kerala',
    preferredLanguage: Language.TA,
    avatarUrl: getAvatarUrl('Baala'),
    status: 'Active',
  },
  {
    id: 'MIGRANT002',
    name: 'Ajith Kumar',
    role: UserRole.MIGRANT,
    dateOfBirth: '1989-03-10',
    gender: 'Male',
    phone: '+91 91234 56781',
    address: 'Thiruvananthapuram, Kerala',
    preferredLanguage: Language.ML,
    avatarUrl: getAvatarUrl('Ajith Kumar'),
    status: 'Active',
  },
  {
    id: 'MIGRANT003',
    name: 'Manoj Kumar',
    role: UserRole.MIGRANT,
    dateOfBirth: '1995-12-01',
    gender: 'Male',
    phone: '+91 91234 56782',
    address: 'Kozhikode, Kerala',
    preferredLanguage: Language.HI,
    avatarUrl: getAvatarUrl('Manoj Kumar'),
    status: 'Active',
  },
  {
    id: 'MIGRANT004',
    name: 'Gengu Raj',
    role: UserRole.MIGRANT,
    dateOfBirth: '1998-07-19',
    gender: 'Male',
    phone: '+91 91234 56783',
    address: 'Thrissur, Kerala',
    preferredLanguage: Language.HI,
    avatarUrl: getAvatarUrl('Gengu Raj'),
    status: 'Active',
  },
  {
    id: 'MIGRANT005',
    name: 'Priya',
    role: UserRole.MIGRANT,
    dateOfBirth: '1996-05-25',
    gender: 'Female',
    phone: '+91 91234 56784',
    address: 'Kollam, Kerala',
    preferredLanguage: Language.BN,
    avatarUrl: getAvatarUrl('Priya'),
    status: 'Active',
  },
];

export const dummyMigrant = dummyMigrants[0];

export const dummyDoctors: DoctorProfile[] = [
  {
    id: 'DOC001',
    name: 'Dr. Dhinesh Kumar',
    role: UserRole.DOCTOR,
    specialization: 'General Physician',
    hospital: 'General Hospital, Ernakulam',
    licenseNumber: 'KMC12345',
    avatarUrl: getAvatarUrl('Dr. Dhinesh Kumar', '00537f'),
    status: 'Active',
  },
  {
    id: 'DOC002',
    name: 'Dr. Karthick',
    role: UserRole.DOCTOR,
    specialization: 'Cardiologist',
    hospital: 'City Hospital, Kochi',
    licenseNumber: 'KMC67890',
    avatarUrl: getAvatarUrl('Dr. Karthick', '00537f'),
    status: 'Active',
  },
  {
    id: 'DOC003',
    name: 'Dr. Ashwin',
    role: UserRole.DOCTOR,
    specialization: 'Sexologist',
    hospital: 'Skin Care Clinic, Thiruvananthapuram',
    licenseNumber: 'KMC11223',
    avatarUrl: getAvatarUrl('Dr. Ashwin', '00537f'),
    status: 'Active',
  }
];

export const dummyDoctor: DoctorProfile = dummyDoctors[0];

export const dummyAdmins: AdminProfile[] = [
    {
      id: 'ADMIN001',
      name: 'Vijay Menon',
      role: UserRole.ADMIN,
      permissions: ['MANAGE_USERS', 'VIEW_ANALYTICS'],
      avatarUrl: getAvatarUrl('Vijay Menon', '343a40'),
      status: 'Active',
    }
];

export const dummyAdmin: AdminProfile = dummyAdmins[0];

export const dummyAppointments: Appointment[] = [
    // Migrant 1
    { id: 'APP001', patientId: 'MIGRANT001', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', specialization: 'General Physician', date: '2024-08-05', time: '10:00 AM', status: 'Upcoming' },
    { id: 'APP002', patientId: 'MIGRANT001', doctorId: 'DOC002', doctorName: 'Dr. Karthick', specialization: 'Cardiologist', date: '2024-07-20', time: '02:30 PM', status: 'Completed' },
    { id: 'APP004', patientId: 'MIGRANT001', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', specialization: 'General Physician', date: '2024-05-12', time: '09:00 AM', status: 'Cancelled' },
    { id: 'APP006', patientId: 'MIGRANT001', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', specialization: 'General Physician', date: '2024-06-18', time: '11:30 AM', status: 'Completed' },
    
    // Migrant 2
    { id: 'APP003', patientId: 'MIGRANT002', doctorId: 'DOC003', doctorName: 'Dr. Ashwin', specialization: 'Dermatologist', date: '2024-06-15', time: '11:00 AM', status: 'Completed' },
    { id: 'APP007', patientId: 'MIGRANT002', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', specialization: 'General Physician', date: '2024-08-12', time: '09:30 AM', status: 'Upcoming' },

    // Migrant 3
    { id: 'APP008', patientId: 'MIGRANT003', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', specialization: 'General Physician', date: '2024-08-08', time: '03:00 PM', status: 'Upcoming' },
    { id: 'APP009', patientId: 'MIGRANT003', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', specialization: 'General Physician', date: '2024-07-01', time: '10:00 AM', status: 'Completed' },
    
    // Migrant 4
    { id: 'APP010', patientId: 'MIGRANT004', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', specialization: 'General Physician', date: '2024-07-22', time: '04:00 PM', status: 'Completed' },
    { id: 'APP011', patientId: 'MIGRANT004', doctorId: 'DOC002', doctorName: 'Dr. Karthick', specialization: 'Cardiologist', date: '2024-05-30', time: '10:30 AM', status: 'Completed' },

    // Migrant 5
    { id: 'APP005', patientId: 'MIGRANT005', doctorId: 'DOC002', doctorName: 'Dr. Karthick', specialization: 'Cardiologist', date: '2024-08-10', time: '11:00 AM', status: 'Upcoming' },
    { id: 'APP012', patientId: 'MIGRANT005', doctorId: 'DOC002', doctorName: 'Dr. Karthick', specialization: 'Cardiologist', date: '2024-07-15', time: '02:00 PM', status: 'Completed' },
];

export const dummyHealthRecords: HealthRecord[] = [
    // Migrant 1
    { id: 'HR001', patientId: 'MIGRANT001', doctorId: 'DOC002', doctorName: 'Dr. Karthick', date: '2024-07-20', diagnosis: 'Mild Hypertension', notes: 'Advised lifestyle changes and regular monitoring.' },
    { id: 'HR002', patientId: 'MIGRANT001', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', date: '2024-05-10', diagnosis: 'Viral Fever', notes: 'Prescribed paracetamol and rest.' },
    { id: 'HR005', patientId: 'MIGRANT001', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', date: '2024-06-18', diagnosis: 'Annual Check-up', notes: 'Overall health is good. Advised to continue balanced diet.' },

    // Migrant 2
    { id: 'HR003', patientId: 'MIGRANT002', doctorId: 'DOC003', doctorName: 'Dr. Ashwin', date: '2024-06-15', diagnosis: 'Allergic Dermatitis', notes: 'Prescribed topical steroids and antihistamines.' },
    
    // Migrant 3
    { id: 'HR006', patientId: 'MIGRANT003', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', date: '2024-07-01', diagnosis: 'Common Cold', notes: 'Advised steam inhalation and hydration.' },

    // Migrant 4
    { id: 'HR007', patientId: 'MIGRANT004', doctorId: 'DOC001', doctorName: 'Dr. Dhinesh Kumar', date: '2024-07-22', diagnosis: 'Minor Wrist Sprain', notes: 'Prescribed pain relief gel and advised rest.' },
    { id: 'HR008', patientId: 'MIGRANT004', doctorId: 'DOC002', doctorName: 'Dr. Karthick', date: '2024-05-30', diagnosis: 'High Cholesterol', notes: 'Dietary changes recommended. Follow up in 3 months.' },

    // Migrant 5
    { id: 'HR004', patientId: 'MIGRANT005', doctorId: 'DOC002', doctorName: 'Dr. Karthick', date: '2024-07-28', diagnosis: 'Follow-up on Palpitations', notes: 'ECG normal. Likely stress-related.' },
    { id: 'HR009', patientId: 'MIGRANT005', doctorId: 'DOC002', doctorName: 'Dr. Karthick', date: '2024-07-15', diagnosis: 'Initial Consultation for Palpitations', notes: 'Patient reports occasional heart palpitations. ECG ordered.' },
];

export const dummyPrescriptions: Prescription[] = [
    // Migrant 1
    { id: 'PRE001', patientId: 'MIGRANT001', doctorId: 'DOC001', date: '2024-05-10', medication: 'Paracetamol 500mg', dosage: '1 tablet', frequency: '3 times a day', duration: '3 days' },

    // Migrant 2
    { id: 'PRE002', patientId: 'MIGRANT002', doctorId: 'DOC003', date: '2024-06-15', medication: 'Clobetasol Propionate Cream', dosage: 'Apply thin layer', frequency: 'Twice daily', duration: '7 days' },

    // Migrant 3
    { id: 'PRE004', patientId: 'MIGRANT003', doctorId: 'DOC001', date: '2024-07-01', medication: 'Cetirizine 10mg', dosage: '1 tablet', frequency: 'At night', duration: '5 days' },

    // Migrant 4
    { id: 'PRE005', patientId: 'MIGRANT004', doctorId: 'DOC001', date: '2024-07-22', medication: 'Diclofenac Gel', dosage: 'Apply locally', frequency: 'As needed', duration: '10 days' },
    { id: 'PRE006', patientId: 'MIGRANT004', doctorId: 'DOC002', date: '2024-05-30', medication: 'Atorvastatin 10mg', dosage: '1 tablet', frequency: 'Once daily', duration: '3 months' },

    // Migrant 5
    { id: 'PRE003', patientId: 'MIGRANT005', doctorId: 'DOC002', date: '2024-07-28', medication: 'No medication prescribed', dosage: '-', frequency: '-', duration: '-' },
];

export const dummyLabReports: LabReport[] = [
    // Migrant 1
    { 
      id: 'LAB001', 
      patientId: 'MIGRANT001', 
      testName: 'Complete Blood Count (CBC)', 
      date: '2024-07-21', 
      results: [
        { parameter: 'Hemoglobin', value: '14.5', unit: 'g/dL', referenceRange: '13.5-17.5' },
        { parameter: 'WBC Count', value: '7.8', unit: 'x10^3/μL', referenceRange: '4.5-11.0' },
        { parameter: 'Platelet Count', value: '250', unit: 'x10^3/μL', referenceRange: '150-450' },
      ],
      interpretation: 'All values are within the normal range. No signs of anemia or infection.',
      fileUrl: '#' 
    },
    
    // Migrant 2
    { 
      id: 'LAB002', 
      patientId: 'MIGRANT002', 
      testName: 'Allergy Panel', 
      date: '2024-06-16', 
      results: [
        { parameter: 'Dust Mites', value: 'Positive', unit: '', referenceRange: 'Negative' },
        { parameter: 'Pollen', value: 'Negative', unit: '', referenceRange: 'Negative' },
      ],
      interpretation: 'Patient shows a significant allergic reaction to dust mites, consistent with diagnosis of allergic dermatitis.',
      fileUrl: '#' 
    },
    
    // Migrant 3
    { 
      id: 'LAB003', 
      patientId: 'MIGRANT003', 
      testName: 'Blood Sugar Test', 
      date: '2024-07-02', 
      results: [
        { parameter: 'Fasting Glucose', value: '95', unit: 'mg/dL', referenceRange: '70-100' },
      ],
      interpretation: 'Fasting blood sugar is normal. No indication of diabetes.',
      fileUrl: '#' 
    },

    // Migrant 4
    { 
      id: 'LAB004', 
      patientId: 'MIGRANT004', 
      testName: 'Lipid Profile', 
      date: '2024-05-30', 
      results: [
        { parameter: 'Total Cholesterol', value: '220', unit: 'mg/dL', referenceRange: '< 200' },
        { parameter: 'LDL Cholesterol', value: '150', unit: 'mg/dL', referenceRange: '< 100' },
        { parameter: 'HDL Cholesterol', value: '45', unit: 'mg/dL', referenceRange: '> 40' },
        { parameter: 'Triglycerides', value: '180', unit: 'mg/dL', referenceRange: '< 150' },
      ],
      interpretation: 'Elevated total and LDL cholesterol levels, and high triglycerides. Confirms diagnosis of high cholesterol. Lifestyle modification and medication advised.',
      fileUrl: '#' 
    },

    // Migrant 5
    { 
      id: 'LAB005', 
      patientId: 'MIGRANT005', 
      testName: 'ECG', 
      date: '2024-07-15', 
      results: [],
      interpretation: 'Normal sinus rhythm with a heart rate of 78 bpm. No arrhythmias or signs of ischemia observed. The patient\'s reported palpitations are likely benign.',
      fileUrl: '#' 
    },
];

export const dummyVaccinations: Vaccination[] = [
    // Migrant 1
    { id: 'VAC001', patientId: 'MIGRANT001', vaccineName: 'COVID-19 (Covishield)', date: '2021-06-15', dose: 1 },
    { id: 'VAC002', patientId: 'MIGRANT001', vaccineName: 'COVID-19 (Covishield)', date: '2021-09-10', dose: 2 },
    
    // Migrant 2
    { id: 'VAC003', patientId: 'MIGRANT002', vaccineName: 'Tetanus Toxoid', date: '2023-01-20', dose: 1 },
    
    // Migrant 3
    { id: 'VAC005', patientId: 'MIGRANT003', vaccineName: 'COVID-19 (Covaxin)', date: '2021-08-01', dose: 1 },
    { id: 'VAC006', patientId: 'MIGRANT003', vaccineName: 'COVID-19 (Covaxin)', date: '2021-09-15', dose: 2 },
    
    // Migrant 4
    { id: 'VAC007', patientId: 'MIGRANT004', vaccineName: 'Hepatitis B', date: '2022-03-10', dose: 1 },

    // Migrant 5
    { id: 'VAC004', patientId: 'MIGRANT005', vaccineName: 'COVID-19 (Covishield)', date: '2021-07-01', dose: 1 },
    { id: 'VAC008', patientId: 'MIGRANT005', vaccineName: 'COVID-19 (Covishield)', date: '2021-09-25', dose: 2 },
];

export const dummyUploadedDocuments: UploadedDocument[] = [
    {
        id: 'DOCU001',
        patientId: 'MIGRANT001',
        documentName: 'External Clinic Prescription.pdf',
        documentType: 'Prescription',
        date: '2024-04-15',
        fileUrl: '#'
    },
    {
        id: 'DOCU002',
        patientId: 'MIGRANT004',
        documentName: 'X-Ray Scan - Wrist.jpg',
        documentType: 'Lab Report',
        date: '2024-07-23',
        fileUrl: '#'
    }
];