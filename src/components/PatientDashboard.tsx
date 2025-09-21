import React from 'react';
import { Video, FileText, Pill, MessageCircle, User, LogOut, Bell, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

import { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import toast from 'react-hot-toast';

interface PatientDashboardProps {
  navigateTo: (screen: string, patientId?: string) => void;
  language: Language;
  logout: () => void;
  isOnline: boolean;
}

const translations = {
  en: {
    welcome: 'Welcome back',
    dashboard: 'Patient Dashboard',
    quickActions: 'Quick Actions',
    bookConsultation: 'Book Consultation',
    checkMedicines: 'Check Medicines',
    healthRecords: 'Health Records',
    symptomChecker: 'Symptom Checker',
    recentActivity: 'Recent Activity',
    nextAppointment: 'Next Appointment',
    todayAt: 'Today at 2:00 PM',
    drSharma: 'Dr. Sharma - General Physician',
    nearbyPharmacies: 'Nearby Pharmacies',
    available: 'Available',
    logout: 'Logout',
    notifications: 'Notifications',
    profile: 'Profile'
  },
  hi: {
    welcome: 'वापसी पर स्वागत है',
    dashboard: 'मरीज़ डैशबोर्ड',
    quickActions: 'त्वरित क्रियाएं',
    bookConsultation: 'परामर्श बुक करें',
    checkMedicines: 'दवाएं जांचें',
    healthRecords: 'स्वास्थ्य रिकॉर्ड',
    symptomChecker: 'लक्षण जांचकर्ता',
    recentActivity: 'हाल की गतिविधि',
    nextAppointment: 'अगला अपॉइंटमेंट',
    todayAt: 'आज दोपहर 2:00 बजे',
    drSharma: 'डॉ. शर्मा - सामान्य चिकित्सक',
    nearbyPharmacies: 'पास की फार्मेसियां',
    available: 'उपलब्ध',
    logout: 'लॉग आउट',
    notifications: 'सूचनाएं',
    profile: 'प्रोफ़ाइल'
  },
  pa: {
    welcome: 'ਵਾਪਸੀ ਤੇ ਸਵਾਗਤ ਹੈ',
    dashboard: 'ਮਰੀਜ਼ ਡੈਸ਼ਬੋਰਡ',
    quickActions: 'ਤੁਰੰਤ ਕਾਰਵਾਈਆਂ',
    bookConsultation: 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    checkMedicines: 'ਦਵਾਈਆਂ ਚੈੱਕ ਕਰੋ',
    healthRecords: 'ਸਿਹਤ ਰਿਕਾਰਡ',
    symptomChecker: 'ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    recentActivity: 'ਹਾਲ ਦੀ ਗਤੀਵਿਧੀ',
    nextAppointment: 'ਅਗਲੀ ਮੁਲਾਕਾਤ',
    todayAt: 'ਅੱਜ ਦੁਪਹਿਰ 2:00 ਵਜੇ',
    drSharma: 'ਡਾ. ਸ਼ਰਮਾ - ਆਮ ਡਾਕਟਰ',
    nearbyPharmacies: 'ਨੇੜਲੇ ਦਵਾਖਾਨੇ',
    available: 'ਉਪਲਬਧ',
    logout: 'ਲਾਗ ਆਉਟ',
    notifications: 'ਸੂਚਨਾਵਾਂ',
    profile: 'ਪ੍ਰੋਫਾਈਲ'
  }
};

export function PatientDashboard({ navigateTo, language, logout, isOnline }: PatientDashboardProps) {
  const t = translations[language];

  const handleNotificationClick = () => {
    toast('No new notifications', {
      icon: '🔔',
      duration: 2000,
    });
  };

  const handleProfileClick = () => {
    navigateTo('user-profile');
  };

  const quickActions = [
    {
      icon: Video,
      label: t.bookConsultation,
      screen: 'doctor-selection',
      color: 'bg-green-100 text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Pill,
      label: t.checkMedicines,
      screen: 'medicine-availability',
      color: 'bg-blue-100 text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: FileText,
      label: t.healthRecords,
      screen: 'health-records',
      color: 'bg-purple-100 text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: MessageCircle,
      label: t.symptomChecker,
      screen: 'symptom-checker',
      color: 'bg-orange-100 text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg text-gray-800">{t.welcome}</h1>
            <p className="text-sm text-gray-600">{t.dashboard}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleNotificationClick}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleProfileClick}>
              <User className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Next Appointment Card */}
        <Card className="p-4 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm opacity-90">{t.nextAppointment}</p>
              <p className="font-medium">{t.todayAt}</p>
              <p className="text-sm opacity-90">{t.drSharma}</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg text-gray-800 mb-4">{t.quickActions}</h2>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="ghost"
                className={`h-24 flex flex-col space-y-2 ${action.bgColor} hover:scale-105 transition-transform`}
                onClick={() => navigateTo(action.screen)}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${action.color}`}>
                  <action.icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Nearby Pharmacies */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg text-gray-800">{t.nearbyPharmacies}</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigateTo('medicine-availability')}
            >
              <MapPin className="w-4 h-4 mr-1" />
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {[
              { name: 'Gupta Medical Store', distance: '0.5 km', status: t.available },
              { name: 'City Pharmacy', distance: '1.2 km', status: t.available }
            ].map((pharmacy, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Pill className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{pharmacy.name}</p>
                      <p className="text-sm text-gray-600">{pharmacy.distance}</p>
                    </div>
                  </div>
                  <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                    {pharmacy.status}
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Health Tip */}
        <Card className="p-4 bg-gradient-to-r from-orange-100 to-yellow-100">
          <div className="flex items-center space-x-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1698465281093-9f09159733b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGhlYWx0aGNhcmUlMjB2aWxsYWdlJTIwZG9jdG9yfGVufDF8fHx8MTc1ODE4MDUwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Health Tip"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-gray-800">Daily Health Tip</p>
              <p className="text-sm text-gray-600">Drink at least 8 glasses of water daily for better health</p>
            </div>
          </div>
        </Card>
      </div>

    </div>
  );
}