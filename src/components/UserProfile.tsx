import React from 'react';
import { ArrowLeft, User, Edit, Phone, Mail, MapPin, Heart, AlertTriangle, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Language } from '../App';

interface UserProfileProps {
  navigateTo: (screen: string, patientId?: string) => void;
  language: Language;
}

const translations = {
  en: {
    userProfile: 'User Profile',
    personalInfo: 'Personal Information',
    contactInfo: 'Contact Information',
    medicalInfo: 'Medical Information',
    emergencyContact: 'Emergency Contact',
    edit: 'Edit Profile',
    name: 'Name',
    patientId: 'Patient ID',
    age: 'Age',
    gender: 'Gender',
    bloodGroup: 'Blood Group',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    allergies: 'Allergies',
    chronicConditions: 'Chronic Conditions',
    emergencyContactName: 'Emergency Contact',
    relationship: 'Relationship',
    emergencyPhone: 'Emergency Phone'
  },
  hi: {
    userProfile: 'उपयोगकर्ता प्रोफ़ाइल',
    personalInfo: 'व्यक्तिगत जानकारी',
    contactInfo: 'संपर्क जानकारी',
    medicalInfo: 'चिकित्सा जानकारी',
    emergencyContact: 'आपातकालीन संपर्क',
    edit: 'प्रोफ़ाइल संपादित करें',
    name: 'नाम',
    patientId: 'मरीज़ आईडी',
    age: 'उम्र',
    gender: 'लिंग',
    bloodGroup: 'रक्त समूह',
    phone: 'फोन',
    email: 'ईमेल',
    address: 'पता',
    allergies: 'एलर्जी',
    chronicConditions: 'पुरानी बीमारियां',
    emergencyContactName: 'आपातकालीन संपर्क',
    relationship: 'रिश्ता',
    emergencyPhone: 'आपातकालीन फोन'
  },
  pa: {
    userProfile: 'ਉਪਭੋਗਤਾ ਪ੍ਰੋਫਾਈਲ',
    personalInfo: 'ਨਿੱਜੀ ਜਾਣਕਾਰੀ',
    contactInfo: 'ਸੰਪਰਕ ਜਾਣਕਾਰੀ',
    medicalInfo: 'ਮੈਡੀਕਲ ਜਾਣਕਾਰੀ',
    emergencyContact: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    edit: 'ਪ੍ਰੋਫਾਈਲ ਸੰਪਾਦਿਤ ਕਰੋ',
    name: 'ਨਾਮ',
    patientId: 'ਮਰੀਜ਼ ਆਈਡੀ',
    age: 'ਉਮਰ',
    gender: 'ਲਿੰਗ',
    bloodGroup: 'ਬਲੱਡ ਗਰੁੱਪ',
    phone: 'ਫੋਨ',
    email: 'ਈਮੇਲ',
    address: 'ਪਤਾ',
    allergies: 'ਐਲਰਜੀ',
    chronicConditions: 'ਪੁਰਾਣੀਆਂ ਬੀਮਾਰੀਆਂ',
    emergencyContactName: 'ਐਮਰਜੈਂਸੀ ਸੰਪਰਕ',
    relationship: 'ਰਿਸ਼ਤਾ',
    emergencyPhone: 'ਐਮਰਜੈਂਸੀ ਫੋਨ'
  }
};

const userData = {
  name: 'Rajesh Kumar',
  patientId: 'P001',
  age: 45,
  gender: 'Male',
  bloodGroup: 'B+',
  phone: '+91 98765 43210',
  email: 'rajesh.kumar@email.com',
  address: 'Village Bhadson, Nabha, Punjab, India',
  allergies: 'None',
  chronicConditions: 'Diabetes Type 2',
  emergencyContact: {
    name: 'Sunita Kumar',
    relationship: 'Wife',
    phone: '+91 98765 43211'
  }
};

export function UserProfile({ navigateTo, language }: UserProfileProps) {
  const t = translations[language];

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
            <h1 className="text-lg text-gray-800">{t.userProfile}</h1>
          </div>
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            {t.edit}
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-blue-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-medium text-gray-800">{userData.name}</h2>
              <p className="text-gray-600">{t.patientId}: {userData.patientId}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className="text-sm text-gray-600">{userData.age} years</span>
                <span className="text-sm text-gray-600">{userData.gender}</span>
                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  {userData.bloodGroup}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <User className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-800">{t.personalInfo}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.name}:</span>
              <span className="text-sm font-medium">{userData.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.age}:</span>
              <span className="text-sm font-medium">{userData.age} years</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.gender}:</span>
              <span className="text-sm font-medium">{userData.gender}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.bloodGroup}:</span>
              <span className="text-sm font-medium">{userData.bloodGroup}</span>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Phone className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-800">{t.contactInfo}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Phone className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">{t.phone}</p>
                <p className="text-sm font-medium">{userData.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-sm text-gray-600">{t.email}</p>
                <p className="text-sm font-medium">{userData.email}</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-4 h-4 text-gray-500 mt-1" />
              <div>
                <p className="text-sm text-gray-600">{t.address}</p>
                <p className="text-sm font-medium">{userData.address}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Medical Information */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-800">{t.medicalInfo}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-4 h-4 text-orange-500" />
              <div>
                <p className="text-sm text-gray-600">{t.allergies}</p>
                <p className="text-sm font-medium">{userData.allergies}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Heart className="w-4 h-4 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">{t.chronicConditions}</p>
                <p className="text-sm font-medium">{userData.chronicConditions}</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Emergency Contact */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Users className="w-5 h-5 text-gray-600" />
            <h3 className="font-medium text-gray-800">{t.emergencyContact}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.emergencyContactName}:</span>
              <span className="text-sm font-medium">{userData.emergencyContact.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.relationship}:</span>
              <span className="text-sm font-medium">{userData.emergencyContact.relationship}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">{t.emergencyPhone}:</span>
              <span className="text-sm font-medium">{userData.emergencyContact.phone}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}