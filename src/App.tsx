import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Splash } from './components/Splash';
import { Onboarding } from './components/Onboarding';
import { PatientLogin } from './components/PatientLogin';
import { PatientDashboard } from './components/PatientDashboard';
import { VideoConsultation } from './components/VideoConsultation';
import { HealthRecords } from './components/HealthRecords';
import { MedicineAvailability } from './components/MedicineAvailability';
import { SymptomChecker } from './components/SymptomChecker';
import { DoctorDashboard } from './components/DoctorDashboard';
import { PharmacyDashboard } from './components/PharmacyDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { OfflineIndicator } from './components/OfflineIndicator';
import { VideoConsultationDoctor } from './components/VideoConsultationDoctor';
import { DoctorSelection } from './components/DoctorSelection';
import { PatientRecord } from './components/PatientRecord';
import { UserProfile } from './components/UserProfile';

export type Language = 'en' | 'hi' | 'pa';
export type UserType = 'patient' | 'doctor' | 'pharmacy' | 'admin';

export interface AppState {
  currentScreen: string;
  language: Language;
  userType: UserType | null;
  isLoggedIn: boolean;
  isOnline: boolean;
  selectedPatientId?: string;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'splash',
    language: 'en',
    userType: null,
    isLoggedIn: false,
    isOnline: true,
    selectedPatientId: undefined
  });

  const navigateTo = (screen: string, patientId?: string) => {
    setAppState(prev => ({ ...prev, currentScreen: screen, selectedPatientId: patientId }));
  };

  const setLanguage = (lang: Language) => {
    setAppState(prev => ({ ...prev, language: lang }));
  };

  const login = (userType: UserType) => {
    setAppState(prev => ({ 
      ...prev, 
      isLoggedIn: true, 
      userType,
      currentScreen: userType === 'patient' ? 'patient-dashboard' : 
                    userType === 'doctor' ? 'doctor-dashboard' :
                    userType === 'pharmacy' ? 'pharmacy-dashboard' : 'admin-dashboard'
    }));
  };

  const logout = () => {
    setAppState(prev => ({
      ...prev,
      isLoggedIn: false,
      userType: null,
      currentScreen: 'login'
    }));
  };

  // Simulate network status changes
  useEffect(() => {
    const handleOnline = () => setAppState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setAppState(prev => ({ ...prev, isOnline: false }));
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderCurrentScreen = () => {
    const commonProps = {
      navigateTo,
      language: appState.language,
      setLanguage,
      login,
      logout,
      isOnline: appState.isOnline
    };

    switch (appState.currentScreen) {
      case 'splash':
        return <Splash {...commonProps} />;
      case 'onboarding':
        return <Onboarding {...commonProps} />;
      case 'login':
        return <PatientLogin {...commonProps} />;
      case 'patient-dashboard':
        return <PatientDashboard {...commonProps} />;
      case 'video-consultation-doctor':
        return <VideoConsultationDoctor {...commonProps} />;
      case 'video-consultation':
        return <VideoConsultation {...commonProps} />;
      case 'health-records':
        return <HealthRecords {...commonProps} />;
      case 'medicine-availability':
        return <MedicineAvailability {...commonProps} />;
      case 'symptom-checker':
        return <SymptomChecker {...commonProps} />;
      case 'doctor-dashboard':
        return <DoctorDashboard {...commonProps} />;
      case 'pharmacy-dashboard':
        return <PharmacyDashboard {...commonProps} />;
      case 'admin-dashboard':
        return <AdminDashboard {...commonProps} />;
      case 'doctor-selection':
        return <DoctorSelection {...commonProps} />;
      case 'patient-record':
        return <PatientRecord {...commonProps} patientId={appState.selectedPatientId} />;
      case 'user-profile':
        return <UserProfile {...commonProps} />;
      default:
        return <Splash {...commonProp />;
    }
  };

  return (
    <div className="app-container min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      <Toaster position="top-center" />
      <OfflineIndicator isOnline={appState.isOnline} language={appState.language} />
      <div className="flex-1">
        {renderCurrentScreen()}
      </div>
    </div>
  );
}