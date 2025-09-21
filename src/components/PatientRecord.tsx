import React from 'react';
import { ArrowLeft, FileText, Calendar, Pill, Activity, User, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Language } from '../App';

interface PatientRecordProps {
  navigateTo: (screen: string, patientId?: string) => void;
  language: Language;
  patientId?: string;
}

const translations = {
  en: {
    patientRecord: 'Patient Record',
    personalInfo: 'Personal Data',
    medicalHistory: 'Medical History',
    prescriptions: 'Prescriptions',
    labReports: 'Lab Reports',
    vitals: 'Vitals',
    consultations: 'Consultations',
    download: 'Download',
    print: 'Print',
    edit: 'Edit',
    name: 'Name',
    age: 'Age',
    gender: 'Gender',
    bloodGroup: 'Blood Group',
    phone: 'Phone',
    address: 'Address',
    emergencyContact: 'Emergency Contact',
    allergies: 'Allergies',
    chronicConditions: 'Chronic Conditions',
    lastVisit: 'Last Visit',
    nextAppointment: 'Next Appointment'
  },
  hi: {
    patientRecord: 'मरीज़ का रिकॉर्ड',
    personalInfo: 'व्यक्तिगत डेटा',
    medicalHistory: 'चिकित्सा इतिहास',
    prescriptions: 'नुस्खे',
    labReports: 'लैब रिपोर्ट',
    vitals: 'महत्वपूर्ण संकेत',
    consultations: 'परामर्श',
    download: 'डाउनलोड',
    print: 'प्रिंट',
    edit: 'संपादित करें',
    name: 'नाम',
    age: 'उम्र',
    gender: 'लिंग',
    bloodGroup: 'रक्त समूह',
    phone: 'फोन',
    address: 'पता',
    emergencyContact: 'आपातकालीन संपर्क',
    allergies: 'एलर्जी',
    chronicConditions: 'पुरानी बीमारियां',
    lastVisit: 'अंतिम मुलाकात',
    nextAppointment: 'अगली अपॉइंटमेंट'
  },
  pa: {
    patientRecord: 'ਮਰੀਜ਼ ਦਾ ਰਿਕਾਰਡ',
    personalInfo: 'ਨਿੱਜੀ ਡੇਟਾ',
    medicalHistory: 'ਮੈਡੀਕਲ ਇਤਿਹਾਸ',
    prescriptions: 'ਨੁਸਖੇ',
    labReports: 'ਲੈਬ ਰਿਪੋਰਟਾਂ',
    vitals: 'ਮਹੱਤਵਪੂਰਨ ਸੰਕੇਤ',
    consultations: 'ਸਲਾਹਾਂ',
    download: 'ਡਾਉਨਲੋਡ',
    print: 'ਪ੍ਰਿੰਟ',
    edit: 'ਸੰਪਾਦਿਤ ਕਰੋ',
    name: 'ਨਾਮ',
    age: 'ਉਮਰ',
    gender: 'ਲਿੰਗ',
    bloodGroup: 'ਬਲੱਡ ਗਰੁੱਪ',
    phone: 'ਫੋਨ',
    address: 'ਪਤਾ',
    emergencyContact: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    allergies: 'ਐਲਰਜੀ',
    chronicConditions: 'ਪੁਰਾਣੀਆਂ ਬੀਮਾਰੀਆਂ',
    lastVisit: 'ਆਖਰੀ ਮੁਲਾਕਾਤ',
    nextAppointment: 'ਅਗਲੀ ਮੁਲਾਕਾਤ'
  }
};

const mockPatientsData = {
  'P001': {
    id: 'P001',
    name: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    bloodGroup: 'B+',
    phone: '+91 98765 43210',
    address: 'Village Bhadson, Nabha, Punjab',
    emergencyContact: 'Sunita Kumar (Wife) - +91 98765 43211',
    allergies: 'None',
    chronicConditions: 'Diabetes Type 2',
    lastVisit: '2024-01-15',
    nextAppointment: '2024-02-15',
    vitals: [
      { type: 'Blood Pressure', value: '120/80', unit: 'mmHg', date: '2024-01-15', status: 'normal' },
      { type: 'Heart Rate', value: '72', unit: 'bpm', date: '2024-01-15', status: 'normal' },
      { type: 'Weight', value: '68', unit: 'kg', date: '2024-01-15', status: 'normal' },
      { type: 'Temperature', value: '98.6', unit: '°F', date: '2024-01-15', status: 'normal' }
    ],
    consultations: [
      {
        date: '2024-01-15',
        doctor: 'Dr. Sharma',
        type: 'General Checkup',
        diagnosis: 'Routine checkup - all normal',
        notes: 'Patient in good health. Continue current medications.',
        prescription: 'Metformin 500mg - Twice daily'
      },
      {
        date: '2024-01-01',
        doctor: 'Dr. Patel',
        type: 'Follow-up',
        diagnosis: 'Hypertension management',
        notes: 'Blood pressure under control.',
        prescription: 'Continue current medication'
      }
    ],
    prescriptions: [
      {
        date: '2024-01-15',
        medicine: 'Metformin 500mg',
        dosage: 'Twice daily after meals',
        duration: '30 days',
        doctor: 'Dr. Sharma'
      },
      {
        date: '2024-01-15',
        medicine: 'Vitamin D3',
        dosage: 'Once daily',
        duration: '60 days',
        doctor: 'Dr. Sharma'
      }
    ]
  },
  'P002': {
    id: 'P002',
    name: 'Sunita Devi',
    age: 38,
    gender: 'Female',
    bloodGroup: 'A+',
    phone: '+91 98765 43211',
    address: 'Village Amloh, Fatehgarh Sahib, Punjab',
    emergencyContact: 'Rajesh Kumar (Husband) - +91 98765 43210',
    allergies: 'Penicillin',
    chronicConditions: 'Hypertension',
    lastVisit: '2024-01-12',
    nextAppointment: '2024-02-12',
    vitals: [
      { type: 'Blood Pressure', value: '140/90', unit: 'mmHg', date: '2024-01-12', status: 'high' },
      { type: 'Heart Rate', value: '78', unit: 'bpm', date: '2024-01-12', status: 'normal' },
      { type: 'Weight', value: '62', unit: 'kg', date: '2024-01-12', status: 'normal' },
      { type: 'Temperature', value: '98.4', unit: '°F', date: '2024-01-12', status: 'normal' }
    ],
    consultations: [
      {
        date: '2024-01-12',
        doctor: 'Dr. Sharma',
        type: 'Hypertension Follow-up',
        diagnosis: 'Elevated blood pressure',
        notes: 'Blood pressure slightly elevated. Medication adjustment needed.',
        prescription: 'Amlodipine 5mg - Once daily'
      },
      {
        date: '2023-12-15',
        doctor: 'Dr. Patel',
        type: 'General Consultation',
        diagnosis: 'Hypertension diagnosis',
        notes: 'Initial diagnosis of hypertension. Lifestyle changes recommended.',
        prescription: 'Amlodipine 2.5mg - Once daily'
      }
    ],
    prescriptions: [
      {
        date: '2024-01-12',
        medicine: 'Amlodipine 5mg',
        dosage: 'Once daily in morning',
        duration: '30 days',
        doctor: 'Dr. Sharma'
      },
      {
        date: '2024-01-12',
        medicine: 'Calcium supplement',
        dosage: 'Twice daily with meals',
        duration: '60 days',
        doctor: 'Dr. Sharma'
      }
    ]
  },
  'P003': {
    id: 'P003',
    name: 'Harpreet Singh',
    age: 52,
    gender: 'Male',
    bloodGroup: 'O+',
    phone: '+91 98765 43212',
    address: 'Village Nabha, Patiala, Punjab',
    emergencyContact: 'Manpreet Kaur (Wife) - +91 98765 43213',
    allergies: 'Dust, Pollen',
    chronicConditions: 'Asthma',
    lastVisit: '2024-01-10',
    nextAppointment: '2024-02-10',
    vitals: [
      { type: 'Blood Pressure', value: '118/75', unit: 'mmHg', date: '2024-01-10', status: 'normal' },
      { type: 'Heart Rate', value: '68', unit: 'bpm', date: '2024-01-10', status: 'normal' },
      { type: 'Weight', value: '75', unit: 'kg', date: '2024-01-10', status: 'normal' },
      { type: 'Temperature', value: '98.2', unit: '°F', date: '2024-01-10', status: 'normal' }
    ],
    consultations: [
      {
        date: '2024-01-10',
        doctor: 'Dr. Sharma',
        type: 'Asthma Review',
        diagnosis: 'Well-controlled asthma',
        notes: 'Asthma symptoms well controlled with current medication. Continue treatment.',
        prescription: 'Salbutamol inhaler - As needed'
      },
      {
        date: '2023-12-10',
        doctor: 'Dr. Singh',
        type: 'Respiratory Consultation',
        diagnosis: 'Asthma management',
        notes: 'Seasonal asthma symptoms. Preventive medication prescribed.',
        prescription: 'Budesonide inhaler - Twice daily'
      }
    ],
    prescriptions: [
      {
        date: '2024-01-10',
        medicine: 'Salbutamol inhaler',
        dosage: 'As needed for symptoms',
        duration: '90 days',
        doctor: 'Dr. Sharma'
      },
      {
        date: '2024-01-10',
        medicine: 'Budesonide inhaler',
        dosage: 'Twice daily',
        duration: '30 days',
        doctor: 'Dr. Sharma'
      }
    ]
  }
};

export function PatientRecord({ navigateTo, language, patientId }: PatientRecordProps) {
  const t = translations[language];
  
  // Get patient data based on patientId, default to P001 if not provided
  const currentPatientId = patientId || 'P001';
  const mockPatientData = mockPatientsData[currentPatientId as keyof typeof mockPatientsData] || mockPatientsData['P001'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateTo('doctor-dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg text-gray-800">{t.patientRecord}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Patient Header */}
        <Card className="p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-medium text-gray-800">{mockPatientData.name}</h2>
              <p className="text-sm text-gray-600">Patient ID: {mockPatientData.id}</p>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-gray-600">{mockPatientData.age} years</span>
                <span className="text-sm text-gray-600">{mockPatientData.gender}</span>
                <span className="text-sm text-gray-600">{mockPatientData.bloodGroup}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="personal" className="text-xs px-2">{t.personalInfo}</TabsTrigger>
            <TabsTrigger value="history" className="text-xs px-2">History</TabsTrigger>
            <TabsTrigger value="vitals" className="text-xs px-2">{t.vitals}</TabsTrigger>
            <TabsTrigger value="prescriptions" className="text-xs px-2">Meds</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <Card className="p-4">
              <h3 className="font-medium text-gray-800 mb-3">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.phone}:</span>
                  <span className="text-sm">{mockPatientData.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.address}:</span>
                  <span className="text-sm text-right">{mockPatientData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.emergencyContact}:</span>
                  <span className="text-sm text-right">{mockPatientData.emergencyContact}</span>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-medium text-gray-800 mb-3">Medical Information</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.allergies}:</span>
                  <span className="text-sm">{mockPatientData.allergies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.chronicConditions}:</span>
                  <span className="text-sm">{mockPatientData.chronicConditions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.lastVisit}:</span>
                  <span className="text-sm">{mockPatientData.lastVisit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">{t.nextAppointment}:</span>
                  <span className="text-sm">{mockPatientData.nextAppointment}</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {mockPatientData.consultations.map((consultation, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{consultation.type}</h3>
                    <p className="text-sm text-gray-600">{consultation.doctor} - {consultation.date}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Diagnosis:</p>
                    <p className="text-sm text-gray-600">{consultation.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Notes:</p>
                    <p className="text-sm text-gray-600">{consultation.notes}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Prescription:</p>
                    <p className="text-sm text-gray-600">{consultation.prescription}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4">
            {mockPatientData.vitals.map((vital, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-800">{vital.type}</h3>
                      <p className="text-sm text-gray-600">{vital.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-lg">{vital.value}</p>
                    <p className="text-xs text-gray-500">{vital.unit}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4">
            {mockPatientData.prescriptions.map((prescription, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Pill className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{prescription.medicine}</h3>
                    <p className="text-sm text-gray-600">{prescription.doctor} - {prescription.date}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Dosage:</span>
                    <span className="text-sm">{prescription.dosage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Duration:</span>
                    <span className="text-sm">{prescription.duration}</span>
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