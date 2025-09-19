import React, { useState, useEffect } from 'react';
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

export type Language = 'en' | 'hi' | 'pa';
export type UserType = 'patient' | 'doctor' | 'pharmacy' | 'admin';

export interface AppState {
  currentScreen: string;
  language: Language;
  userType: UserType | null;
  isLoggedIn: boolean;
  isOnline: boolean;
}

export default function App() {
  const [appState, setAppState] = useState<AppState>({
    currentScreen: 'splash',
    language: 'en',
    userType: null,
    isLoggedIn: false,
    isOnline: true
  });

  const navigateTo = (screen: string) => {
    setAppState(prev => ({ ...prev, currentScreen: screen }));
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
      // Removed setLanguage, login, logout from commonProps as they are not needed by all components
      // We can pass them specifically where needed to make it cleaner
    };

    switch (appState.currentScreen) {
      case 'splash':
        return <Splash navigateTo={navigateTo} />;
      case 'onboarding':
        return <Onboarding navigateTo={navigateTo} setLanguage={setLanguage} />;
      case 'login':
        return <PatientLogin navigateTo={navigateTo} login={login} language={appState.language} />;
      
      // Patient Screens
      case 'patient-dashboard':
        return <PatientDashboard {...commonProps} logout={logout} isOnline={appState.isOnline} />;
      
      // 2. UPDATED: 'video-consultation' now shows the doctor list
      case 'video-consultation':
        return <DoctorSelection {...commonProps} />;
      
      // 3. ADDED: New route for the actual video call screen
      case 'video-call-patient':
        return <VideoConsultation {...commonProps} isOnline={appState.isOnline} />;
        
      case 'health-records':
        return <HealthRecords {...commonProps} />;
      case 'medicine-availability':
        return <MedicineAvailability {...commonProps} />;
      case 'symptom-checker':
        return <SymptomChecker {...commonProps} />;

      // Other User Dashboards
      case 'doctor-dashboard':
        return <DoctorDashboard {...commonProps} logout={logout} isOnline={appState.isOnline} />;
      case 'video-consultation-doctor':
        return <VideoConsultationDoctor {...commonProps} isOnline={appState.isOnline} />;
      case 'pharmacy-dashboard':
        return <PharmacyDashboard {...commonProps} logout={logout} isOnline={appState.isOnline} />;
      case 'admin-dashboard':
        return <AdminDashboard {...commonProps} logout={logout} isOnline={appState.isOnline} />;
      default:
        return <Splash navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="app-container min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
      <OfflineIndicator isOnline={appState.isOnline} language={appState.language} />
      <div className="flex-1">
        {renderCurrentScreen()}
      </div>
    </div>
  );
}