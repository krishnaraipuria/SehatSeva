import React, { useState } from 'react';
import { Calendar, Clock, User, Video, FileText, LogOut, Bell, Search, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import toast from 'react-hot-toast';

interface DoctorDashboardProps {
  navigateTo: (screen: string, patientId?: string) => void;
  language: Language;
  logout: () => void;
  isOnline: boolean;
}

const translations = {
  en: {
    doctorDashboard: 'Doctor Dashboard',
    welcome: 'Welcome, Dr. Sharma',
    todaysSchedule: "Today's Schedule",
    upcomingConsultations: 'Upcoming Consultations',
    patientRecords: 'Patient Records',
    consultationHistory: 'Consultation History',
    startConsultation: 'Start Consultation',
    viewRecords: 'View Records',
    reschedule: 'Reschedule',
    completed: 'Completed',
    upcoming: 'Upcoming',
    inProgress: 'In Progress',
    searchPatients: 'Search patients...',
    totalPatients: 'Total Patients',
    consultationsToday: 'Consultations Today',
    pendingReports: 'Pending Reports',
    nextPatient: 'Next Patient',
    minutes: 'minutes',
    ago: 'ago',
    noNewNotifications: 'No new notifications',
    comingSoonReschedule: 'Coming soon! Reschedule feature will be available soon.',
    type: 'Type',
    symptoms: 'Symptoms',
    age: 'Age',
    lastVisit: 'Last visit'
  },
  hi: {
    doctorDashboard: 'डॉक्टर डैशबोर्ड',
    welcome: 'स्वागत है, डॉ. शर्मा',
    todaysSchedule: 'आज का कार्यक्रम',
    upcomingConsultations: 'आने वाले परामर्श',
    patientRecords: 'मरीज़ के रिकॉर्ड',
    consultationHistory: 'परामर्श इतिहास',
    startConsultation: 'परामर्श शुरू करें',
    viewRecords: 'रिकॉर्ड देखें',
    reschedule: 'फिर से समय निर्धारित करें',
    completed: 'पूर्ण',
    upcoming: 'आगामी',
    inProgress: 'प्रगति में',
    searchPatients: 'मरीज़ खोजें...',
    totalPatients: 'कुल मरीज़',
    consultationsToday: 'आज के परामर्श',
    pendingReports: 'लंबित रिपोर्ट',
    nextPatient: 'अगला मरीज़',
    minutes: 'मिनट',
    ago: 'पहले',
    noNewNotifications: 'कोई नई सूचना नहीं',
    comingSoonReschedule: 'जल्द आ रहा है! फिर से समय निर्धारण की सुविधा जल्द ही उपलब्ध होगी।',
    type: 'प्रकार',
    symptoms: 'लक्षण',
    age: 'उम्र',
    lastVisit: 'अंतिम यात्रा'
  },
  pa: {
    doctorDashboard: 'ਡਾਕਟਰ ਡੈਸ਼ਬੋਰਡ',
    welcome: 'ਸਵਾਗਤ ਹੈ, ਡਾ. ਸ਼ਰਮਾ',
    todaysSchedule: 'ਅੱਜ ਦਾ ਕਾਰਯਕ੍ਰਮ',
    upcomingConsultations: 'ਆਉਣ ਵਾਲੀਆਂ ਸਲਾਹਾਂ',
    patientRecords: 'ਮਰੀਜ਼ ਦੇ ਰਿਕਾਰਡ',
    consultationHistory: 'ਸਲਾਹ ਇਤਿਹਾਸ',
    startConsultation: 'ਸਲਾਹ ਸ਼ੁਰੂ ਕਰੋ',
    viewRecords: 'ਰਿਕਾਰਡ ਦੇਖੋ',
    reschedule: 'ਮੁੜ ਸਮਾਂ ਨਿਰਧਾਰਿਤ ਕਰੋ',
    completed: 'ਪੂਰਾ',
    upcoming: 'ਆਉਣ ਵਾਲਾ',
    inProgress: 'ਜਾਰੀ',
    searchPatients: 'ਮਰੀਜ਼ ਖੋਜੋ...',
    totalPatients: 'ਕੁੱਲ ਮਰੀਜ਼',
    consultationsToday: 'ਅੱਜ ਦੀਆਂ ਸਲਾਹਾਂ',
    pendingReports: 'ਬਾਕੀ ਰਿਪੋਰਟਾਂ',
    nextPatient: 'ਅਗਲਾ ਮਰੀਜ਼',
    minutes: 'ਮਿੰਟ',
    ago: 'ਪਹਿਲਾਂ',
    noNewNotifications: 'ਕੋਈ ਨਵੀਂ ਸੂਚਨਾ ਨਹੀਂ',
    comingSoonReschedule: 'ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ! ਮੁੜ ਸਮਾਂ ਨਿਰਧਾਰਣ ਦੀ ਸੁਵਿਧਾ ਜਲਦੀ ਹੀ ਉਪਲਬਧ ਹੋਵੇਗੀ।',
    type: 'ਕਿਸਮ',
    symptoms: 'ਲੱਛਣ',
    age: 'ਉਮਰ',
    lastVisit: 'ਆਖਰੀ ਮੁਲਾਕਾਤ'
  }
};

const mockConsultations = [
  {
    id: 1,
    patientId: 'P001',
    patientName: 'Rajesh Kumar',
    time: '2:00 PM',
    type: 'Follow-up',
    status: 'upcoming',
    symptoms: 'Diabetes checkup',
    village: 'Bhadson'
  },
  {
    id: 2,
    patientId: 'P002',
    patientName: 'Sunita Devi',
    time: '2:30 PM',
    type: 'General Consultation',
    status: 'upcoming',
    symptoms: 'Fever, body ache',
    village: 'Amloh'
  },
  {
    id: 3,
    patientId: 'P003',
    patientName: 'Harpreet Singh',
    time: '1:30 PM',
    type: 'Prescription Review',
    status: 'completed',
    symptoms: 'Blood pressure follow-up',
    village: 'Nabha'
  }
];

const mockPatients = [
  {
    id: 1,
    patientId: 'P001',
    name: 'Rajesh Kumar',
    age: 45,
    village: 'Bhadson',
    lastVisit: '2024-01-10',
    condition: 'Diabetes Type 2'
  },
  {
    id: 2,
    patientId: 'P002',
    name: 'Sunita Devi',
    age: 38,
    village: 'Amloh',
    lastVisit: '2024-01-15',
    condition: 'Hypertension'
  },
  {
    id: 3,
    patientId: 'P003',
    name: 'Harpreet Singh',
    age: 52,
    village: 'Nabha',
    lastVisit: '2024-01-14',
    condition: 'Asthma'
  }
];

export function DoctorDashboard({ navigateTo, language, logout, isOnline }: DoctorDashboardProps) {
  const [activeTab, setActiveTab] = useState('consultations');
  const [searchTerm, setSearchTerm] = useState('');
  const t = translations[language];

  const handleNotificationClick = () => {
    toast(t.noNewNotifications, {
      icon: '🔔',
      duration: 2000,
    });
  };

  const handleViewRecord = (patientId?: string) => {
    navigateTo('patient-record', patientId);
  };

  const handleReschedule = () => {
    toast(t.comingSoonReschedule, {
      icon: '📅',
      duration: 3000,
    });
  };

  // Filter patients based on search term
  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.village.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-600';
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'in-progress':
        return 'bg-orange-100 text-orange-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'upcoming':
        return t.upcoming;
      case 'completed':
        return t.completed;
      case 'in-progress':
        return t.inProgress;
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg text-gray-800">{t.welcome}</h1>
            <p className="text-sm text-gray-600">{t.doctorDashboard}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleNotificationClick}>
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <User className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">48</p>
            <p className="text-xs text-gray-600">{t.totalPatients}</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">8</p>
            <p className="text-xs text-gray-600">{t.consultationsToday}</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <FileText className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">3</p>
            <p className="text-xs text-gray-600">{t.pendingReports}</p>
          </Card>
        </div>

        {/* Next Consultation */}
        <Card className="p-4 bg-gradient-to-r from-blue-500 to-green-500 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">{t.nextPatient}</p>
              <p className="font-medium">Rajesh Kumar</p>
              <p className="text-sm opacity-90">2:00 PM - Diabetes checkup</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-1">
                <Clock className="w-6 h-6" />
              </div>
              <p className="text-xs">15 {t.minutes}</p>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="consultations">{t.upcomingConsultations}</TabsTrigger>
            <TabsTrigger value="patients">{t.patientRecords}</TabsTrigger>
          </TabsList>

          <TabsContent value="consultations" className="space-y-4 mt-4">
            {mockConsultations.map((consultation) => (
              <Card key={consultation.id} className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-800">{consultation.patientName}</h3>
                    <p className="text-sm text-gray-600">{consultation.village} • {consultation.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(consultation.status)}`}>
                    {getStatusText(consultation.status)}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.type}:</span>
                    <span>{consultation.type}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.symptoms}:</span>
                    <span>{consultation.symptoms}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {consultation.status === 'upcoming' && (
                    <Button
                      size="sm"
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => navigateTo('video-consultation-doctor')}
                    >
                      <Video className="w-4 h-4 mr-1" />
                      {t.startConsultation}
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewRecord(consultation.patientId)}>
                    <FileText className="w-4 h-4 mr-1" />
                    {t.viewRecords}
                  </Button>
                  {consultation.status === 'upcoming' && (
                    <Button variant="outline" size="sm" onClick={handleReschedule}>
                      <Clock className="w-4 h-4 mr-1" />
                      {t.reschedule}
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="patients" className="space-y-4 mt-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t.searchPatients}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {filteredPatients.map((patient) => (
              <Card key={patient.id} className="p-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{patient.name}</h3>
                    <p className="text-sm text-gray-600">{t.age}: {patient.age} • {patient.village}</p>
                    <p className="text-xs text-gray-500">{t.lastVisit}: {patient.lastVisit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{patient.condition}</p>
                    <Button variant="ghost" size="sm" className="mt-1" onClick={() => handleViewRecord(patient.patientId)}>
                      <FileText className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}