import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { CurrentUser, UserRole, Language } from '../types';
import { dummyMigrant, dummyDoctor, dummyAdmin } from '../data/dummyData';

// Fix: Extracted English translations to a separate constant to avoid self-reference during initialization.
const enTranslations = {
  // General
  dashboard: 'Dashboard',
  welcomeBack: 'Welcome back, {{name}}!',
  welcome: 'Welcome, {{name}}!',
  cancel: 'Cancel',

  // Login Page
  loginPageTitle: 'MediFlow',
  loginPageSubtitle: 'Your secure digital health companion.',
  loginAsMigrant: 'Login as Migrant',
  loginAsDoctor: 'Login as Doctor',
  loginAsAdmin: 'Login as Admin',

  // Roles
  MIGRANT: 'Migrant',
  DOCTOR: 'Doctor',
  ADMIN: 'Admin',

  // Sidebar
  healthRecords: 'Health Records',
  appointments: 'Appointments',
  aiChatbot: 'AI Chatbot',
  migrantSearch: 'Migrant Search',
  userManagement: 'User Management',
  analytics: 'Analytics',
  roadmap: 'Roadmap',
  
  // Migrant Dashboard
  upcomingAppointment: 'Upcoming Appointment',
  noUpcomingAppointments: 'No upcoming appointments.',
  recentHealthRecord: 'Recent Health Record',
  noHealthRecords: 'No health records found.',
  quickActions: 'Quick Actions',
  bookNewAppointment: 'Book New Appointment',
  askAiAssistant: 'Ask AI Assistant',
  uploadDocument: 'Upload Document',

  // Health Records Page
  consultations: 'Consultations',
  prescriptions: 'Prescriptions',
  labReports: 'Lab Reports',
  vaccinations: 'Vaccinations',
  medication: 'Medication',
  details: 'Details',
  date: 'Date',
  noConsultationRecords: 'No consultation records found.',
  noPrescriptionRecords: 'No prescription records found.',
  noLabReports: 'No lab reports found.',
  noVaccinationRecords: 'No vaccination records found.',

  // Appointments Page
  upcoming: 'Upcoming',
  history: 'History',
  noPastAppointments: 'No past appointments.',

  // Book Appointment Modal
  bookAppointmentTitle: 'Book an Appointment',
  doctor: 'Doctor',
  confirmBooking: 'Confirm Booking',

  // Doctor Dashboard
  pendingReports: 'Pending Reports',
  totalPatients: 'Total Patients',
  findMigrantRecord: "Find a Migrant's Record",
  searchPlaceholder: 'Search by name, phone, or ID...',
  recentPatients: 'Recent Patients',
  viewProfile: 'View Profile',
  
  // Migrant Profile Page (Doctor View)
  backToSearchResults: 'Back to Search Results',
  addNewRecord: 'Add New Record',
  
  // Admin Dashboard
  totalMigrants: 'Total Migrants',
  totalDoctors: 'Total Doctors',
  systemAlerts: 'System Alerts',
};

const translations: Record<string, Record<string, string>> = {
  [Language.EN]: enTranslations,
  [Language.TA]: {
    // General
    dashboard: 'முகப்பு',
    welcomeBack: 'மீண்டும் வருக, {{name}}!',
    welcome: 'வருக, {{name}}!',
    cancel: 'ரத்துசெய்',
    
    // Login Page
    loginPageTitle: 'MediFlow',
    loginPageSubtitle: 'உங்கள் பாதுகாப்பான டிஜிட்டல் சுகாதார துணை.',
    loginAsMigrant: 'புலம்பெயர்ந்தவராக உள்நுழைக',
    loginAsDoctor: 'மருத்துவராக உள்நுழைக',
    loginAsAdmin: 'நிர்வாகியாக உள்நுழைக',

    // Roles
    MIGRANT: 'புலம்பெயர்ந்தவர்',
    DOCTOR: 'மருத்துவர்',
    ADMIN: 'நிர்வாகி',

    // Sidebar
    healthRecords: 'சுகாதார பதிவுகள்',
    appointments: 'சந்திப்புகள்',
    aiChatbot: 'AI சாட்பாட்',
    migrantSearch: 'புலம்பெயர்ந்தோர் தேடல்',
    userManagement: 'பயனர் மேலாண்மை',
    analytics: 'பகுப்பாய்வு',
    roadmap: 'திட்ட வரைபடம்',
    
    // Migrant Dashboard
    upcomingAppointment: 'வரவிருக்கும் சந்திப்பு',
    noUpcomingAppointments: 'வரவிருக்கும் சந்திப்புகள் எதுவும் இல்லை.',
    recentHealthRecord: 'சமீபத்திய சுகாதார பதிவு',
    noHealthRecords: 'சுகாதார பதிவுகள் எதுவும் இல்லை.',
    quickActions: 'விரைவு நடவடிக்கைகள்',
    bookNewAppointment: 'புதிய சந்திப்பை பதிவு செய்யுங்கள்',
    askAiAssistant: 'AI உதவியாளரிடம் கேளுங்கள்',
    uploadDocument: 'ஆவணத்தைப் பதிவேற்றவும்',

    // Health Records Page
    consultations: 'ஆலோசனைகள்',
    prescriptions: 'மருந்துச்சீட்டுகள்',
    labReports: 'ஆய்வக அறிக்கைகள்',
    vaccinations: 'தடுப்பூசிகள்',
    medication: 'மருந்து',
    details: 'விவரங்கள்',
    date: 'தேதி',
    noConsultationRecords: 'ஆலோசனை பதிவுகள் எதுவும் இல்லை.',
    noPrescriptionRecords: 'மருந்துச்சீட்டு பதிவுகள் எதுவும் இல்லை.',
    noLabReports: 'ஆய்வக அறிக்கைகள் எதுவும் இல்லை.',
    noVaccinationRecords: 'தடுப்பூசி பதிவுகள் எதுவும் இல்லை.',

    // Appointments Page
    upcoming: 'வரவிருக்கிறது',
    history: 'வரலாறு',
    noPastAppointments: 'கடந்த சந்திப்புகள் எதுவும் இல்லை.',

    // Book Appointment Modal
    bookAppointmentTitle: 'ஒரு சந்திப்பை பதிவு செய்யுங்கள்',
    doctor: 'மருத்துவர்',
    confirmBooking: 'பதிவை உறுதிப்படுத்து',

    // Doctor Dashboard
    pendingReports: 'நிலுவையில் உள்ள அறிக்கைகள்',
    totalPatients: 'மொத்த நோயாளிகள்',
    findMigrantRecord: "ஒரு புலம்பெயர்ந்தவரின் பதிவைக் கண்டறியவும்",
    searchPlaceholder: 'பெயர், தொலைபேசி அல்லது ஐடி மூலம் தேடவும்...',
    recentPatients: 'சமீபத்திய நோயாளிகள்',
    viewProfile: 'சுயவிவரத்தைக் காண்க',
    
    // Migrant Profile Page (Doctor View)
    backToSearchResults: 'தேடல் முடிவுகளுக்குத் திரும்பு',
    addNewRecord: 'புதிய பதிவைச் சேர்',
    
    // Admin Dashboard
    totalMigrants: 'மொத்த புலம்பெயர்ந்தோர்',
    totalDoctors: 'மொத்த மருத்துவர்கள்',
    systemAlerts: 'கணினி எச்சரிக்கைகள்',
  },
  [Language.ML]: enTranslations,
  [Language.HI]: enTranslations,
  [Language.BN]: enTranslations,
};


interface AuthContextType {
  isAuthenticated: boolean;
  user: CurrentUser;
  login: (role: UserRole) => void;
  logout: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string, replacements?: Record<string, string | undefined>) => string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser>(null);
  const [language, setLanguage] = useState<Language>(Language.EN);

  const login = (role: UserRole) => {
    // In a real app, this would involve an API call
    switch (role) {
      case UserRole.MIGRANT:
        setUser(dummyMigrant);
        // Do not set language based on user preference, default to English
        break;
      case UserRole.DOCTOR:
        setUser(dummyDoctor);
        break;
      case UserRole.ADMIN:
        setUser(dummyAdmin);
        break;
      default:
        setUser(null);
    }
  };

  const logout = () => {
    setUser(null);
    setLanguage(Language.EN); // Reset language on logout
  };

  const isAuthenticated = !!user;
  
  // Fix: The translation function `t` was incomplete. This completes the logic to handle placeholder replacements and return a string.
  const t = useCallback((key: string, replacements?: Record<string, string | undefined>): string => {
    const langTranslations = translations[language] || translations.en;
    let translation = langTranslations[key] || key;
    if (replacements) {
      Object.keys(replacements).forEach(rKey => {
        const value = replacements[rKey];
        if (value) {
          translation = translation.replace(`{{${rKey}}}`, value);
        }
      });
    }
    return translation;
  }, [language]);

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    language,
    setLanguage,
    t,
  };

  // Fix: The AuthProvider was not providing the context value to its children. This wraps children in AuthContext.Provider.
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Fix: The `useAuth` hook was missing. This adds the hook and exports it so other components can access the authentication context.
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
