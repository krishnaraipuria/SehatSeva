import React, { useState } from 'react';
import { ArrowLeft, FileText, Download, Upload, Calendar, Activity, Pill, TestTube, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Language } from '../App';
import toast from 'react-hot-toast';

interface HealthRecordsProps {
  navigateTo: (screen: string, patientId?: string) => void;
  language: Language;
  isOnline: boolean;
}

const translations = {
  en: {
    healthRecords: 'Health Records',
    overview: 'Overview',
    consultations: 'Consultations',
    prescriptions: 'Prescriptions',
    labReports: 'Lab Reports',
    vitals: 'Vitals',
    bloodPressure: 'Blood Pressure',
    heartRate: 'Heart Rate',
    weight: 'Weight',
    temperature: 'Temperature',
    lastUpdated: 'Last Updated',
    download: 'Download',
    upload: 'Upload',
    offlineAvailable: 'Available Offline',
    syncWhenOnline: 'Will sync when online',
    noRecords: 'No records found',
    recentConsultation: 'Recent Consultation',
    currentMedication: 'Current Medication'
  },
  hi: {
    healthRecords: 'स्वास्थ्य रिकॉर्ड',
    overview: 'अवलोकन',
    consultations: 'परामर्श',
    prescriptions: 'नुस्खे',
    labReports: 'लैब रिपोर्ट',
    vitals: 'महत्वपूर्ण संकेत',
    bloodPressure: 'रक्तचाप',
    heartRate: 'हृदय गति',
    weight: 'वजन',
    temperature: 'तापमान',
    lastUpdated: 'अंतिम अपडेट',
    download: 'डाउनलोड',
    upload: 'अपलोड',
    offlineAvailable: 'ऑफलाइन उपलब्ध',
    syncWhenOnline: 'ऑनलाइन होने पर सिंक होगा',
    noRecords: 'कोई रिकॉर्ड नहीं मिला',
    recentConsultation: 'हाल का परामर्श',
    currentMedication: 'वर्तमान दवा'
  },
  pa: {
    healthRecords: 'ਸਿਹਤ ਰਿਕਾਰਡ',
    overview: 'ਸੰਖੇਪ',
    consultations: 'ਸਲਾਹ',
    prescriptions: 'ਨੁਸਖੇ',
    labReports: 'ਲੈਬ ਰਿਪੋਰਟਾਂ',
    vitals: 'ਮਹੱਤਵਪੂਰਨ ਸੰਕੇਤ',
    bloodPressure: 'ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ',
    heartRate: 'ਦਿਲ ਦੀ ਗਤੀ',
    weight: 'ਭਾਰ',
    temperature: 'ਤਾਪਮਾਨ',
    lastUpdated: 'ਅੰਤਿਮ ਅਪਡੇਟ',
    download: 'ਡਾਉਨਲੋਡ',
    upload: 'ਅਪਲੋਡ',
    offlineAvailable: 'ਆਫਲਾਈਨ ਉਪਲਬਧ',
    syncWhenOnline: 'ਆਨਲਾਈਨ ਹੋਣ ਤੇ ਸਿੰਕ ਹੋਵੇਗਾ',
    noRecords: 'ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਮਿਲਿਆ',
    recentConsultation: 'ਹਾਲ ਦੀ ਸਲਾਹ',
    currentMedication: 'ਮੌਜੂਦਾ ਦਵਾਈ'
  }
};

const mockData = {
  vitals: [
    { type: 'Blood Pressure', value: '120/80', unit: 'mmHg', date: '2024-01-15', status: 'normal' },
    { type: 'Heart Rate', value: '72', unit: 'bpm', date: '2024-01-15', status: 'normal' },
    { type: 'Weight', value: '68', unit: 'kg', date: '2024-01-10', status: 'normal' },
    { type: 'Temperature', value: '98.6', unit: '°F', date: '2024-01-15', status: 'normal' }
  ],
  consultations: [
    {
      date: '2024-01-15',
      doctor: 'Dr. Sharma',
      type: 'General Checkup',
      notes: 'Patient in good health. Continue current medications.',
      diagnosis: 'Routine checkup - all normal'
    },
    {
      date: '2024-01-01',
      doctor: 'Dr. Patel',
      type: 'Follow-up',
      notes: 'Blood pressure under control.',
      diagnosis: 'Hypertension management'
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
};

export function HealthRecords({ navigateTo, language, isOnline }: HealthRecordsProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const t = translations[language];

  const handleDownload = () => {
    // Create a sample text file content
    const content = `HEALTH RECORDS SUMMARY
Patient: Rajesh Kumar
Patient ID: P001
Date: ${new Date().toLocaleDateString()}

RECENT CONSULTATION:
Date: 2024-01-15
Doctor: Dr. Sharma
Diagnosis: Routine checkup - all normal
Notes: Patient in good health. Continue current medications.

CURRENT VITALS:
Blood Pressure: 120/80 mmHg
Heart Rate: 72 bpm
Weight: 68 kg
Temperature: 98.6°F

CURRENT MEDICATIONS:
1. Metformin 500mg - Twice daily after meals
2. Vitamin D3 - Once daily

MEDICAL HISTORY:
- Diabetes Type 2 (managed)
- Regular checkups every 3 months

This is a computer-generated summary.
For detailed records, please consult your healthcare provider.`;

    // Create and download the file
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `health-records-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    toast.success('Health records downloaded successfully!');
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const handleUploadClick = () => {
    setShowUploadModal(false);
    toast('Coming soon! File upload feature will be available soon.', {
      icon: '📁',
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => navigateTo('patient-dashboard')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg text-gray-800">{t.healthRecords}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={handleUpload}>
              <Upload className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={handleDownload}>
              <Download className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Offline Status */}
      {!isOnline && (
        <div className="bg-orange-100 p-3 text-center">
          <p className="text-orange-800 text-sm">
            📱 {t.offlineAvailable} | {t.syncWhenOnline}
          </p>
        </div>
      )}

      <div className="p-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">{t.overview}</TabsTrigger>
            <TabsTrigger value="vitals" className="text-xs">{t.vitals}</TabsTrigger>
            <TabsTrigger value="consultations" className="text-xs">{t.consultations}</TabsTrigger>
            <TabsTrigger value="prescriptions" className="text-xs">{t.prescriptions}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Recent Consultation */}
            <Card className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{t.recentConsultation}</h3>
                  <p className="text-sm text-gray-600">Dr. Sharma - Jan 15, 2024</p>
                </div>
              </div>
              <p className="text-sm text-gray-700">Routine checkup - all normal</p>
            </Card>

            {/* Current Vitals */}
            <Card className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{t.vitals}</h3>
                  <p className="text-sm text-gray-600">{t.lastUpdated}: Jan 15, 2024</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Heart className="w-5 h-5 text-red-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{t.bloodPressure}</p>
                  <p className="font-medium">120/80</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <Activity className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-xs text-gray-600">{t.heartRate}</p>
                  <p className="font-medium">72 bpm</p>
                </div>
              </div>
            </Card>

            {/* Current Medications */}
            <Card className="p-4">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Pill className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{t.currentMedication}</h3>
                  <p className="text-sm text-gray-600">2 active prescriptions</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Metformin 500mg</span>
                  <span className="text-xs text-gray-500">Twice daily</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Vitamin D3</span>
                  <span className="text-xs text-gray-500">Once daily</span>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="vitals" className="space-y-4 mt-4">
            {mockData.vitals.map((vital, index) => (
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

          <TabsContent value="consultations" className="space-y-4 mt-4">
            {mockData.consultations.map((consultation, index) => (
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
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="prescriptions" className="space-y-4 mt-4">
            {mockData.prescriptions.map((prescription, index) => (
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

      {/* Upload Modal */}
      <Dialog open={showUploadModal} onOpenChange={setShowUploadModal}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Upload Health Records</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload files</p>
              <p className="text-sm text-gray-500">Supported formats: PDF, JPG, PNG</p>
              <Button 
                className="mt-4" 
                onClick={handleUploadClick}
              >
                Choose Files
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}