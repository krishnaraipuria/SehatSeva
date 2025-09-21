import React, { useState } from 'react';
import { ArrowLeft, Video } from 'lucide-react';
import { Card } from './ui/card';
import { Language } from '../App';
import toast from 'react-hot-toast';

interface DoctorSelectionProps {
  navigateTo: (screen: string, patientId?: string) => void;
  language: Language;
}

const translations = {
  en: {
    title: 'Book a Consultation',
    experience: 'years of experience',
    bookAppointment: 'Book Appointment',
    emergency: 'Emergency',
    availableSlots: 'Available Slots',
    specialities: {
      gp: 'General Physician',
      ortho: 'Orthopedic Surgeon',
      cardio: 'Cardiologist',
    },
    toastSuccess: (slot: string, date: string) => `Appointment booked for ${date} at ${slot}!`,
    today: 'Today',
    tomorrow: 'Tomorrow',
  },
  hi: {
    title: 'परामर्श बुक करें',
    experience: 'साल का अनुभव',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    emergency: 'आपातकालीन',
    availableSlots: 'उपलब्ध स्लॉट',
    specialities: {
      gp: 'सामान्य चिकित्सक',
      ortho: 'हड्डी रोग सर्जन',
      cardio: 'हृदय रोग विशेषज्ञ',
    },
    toastSuccess: (slot: string, date: string) => `${date} को ${slot} के लिए अपॉइंटमेंट बुक हो गया!`,
    today: 'आज',
    tomorrow: 'कल',
  },
  pa: {
    title: 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    experience: 'ਸਾਲ ਦਾ ਤਜਰਬਾ',
    bookAppointment: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ',
    emergency: 'ਐਮਰਜੈਂਸੀ',
    availableSlots: 'ਉਪਲਬਧ ਸਲਾਟ',
    specialities: {
      gp: 'ਜਨਰਲ ਫਿਜ਼ੀਸ਼ੀਅਨ',
      ortho: 'ਆਰਥੋਪੀਡਿਕ ਸਰਜਨ',
      cardio: 'ਦਿਲ ਦਾ ਮਾਹਰ',
    },
    toastSuccess: (slot: string, date: string) => `${date} ਨੂੰ ${slot} ਲਈ ਮੁਲਾਕਾਤ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਈ!`,
    today: 'ਅੱਜ',
    tomorrow: 'ਕੱਲ',
  }
};

const doctors = [
  {
    name: 'Dr. Suresh Patil',
    specialityKey: 'gp',
    role: null,
    experience: 12,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    availableSlots: ['04:00 PM', '04:30 PM', '05:00 PM']
  },
  {
    name: 'Dr. Meena Verma',
    specialityKey: 'ortho',
    role: 'Surgeon',
    experience: 15,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    availableSlots: ['02:00 PM', '02:30 PM', '03:30 PM', '05:00 PM']
  },
  {
    name: 'Dr. Desai',
    specialityKey: 'cardio',
    role: null,
    experience: 20,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    availableSlots: ['06:00 PM', '06:30 PM', '07:00 PM']
  },
];

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', { month: 'short', day: 'numeric' });
};

const dateOptions = [
    { labelKey: 'today', value: formatDate(today) },
    { labelKey: 'tomorrow', value: formatDate(tomorrow) }
];

export function DoctorSelection({ navigateTo, language }: DoctorSelectionProps) {
  const t = translations[language];
  const [selection, setSelection] = useState<{ [key: number]: { date: string, slot: string } | null }>({});

  const handleSelect = (doctorIndex: number, date: string, slot: string) => {
    setSelection(prev => {
      const currentSelection = prev[doctorIndex];
      if (currentSelection?.date === date && currentSelection?.slot === slot) {
        return { ...prev, [doctorIndex]: null };
      }
      return { ...prev, [doctorIndex]: { date, slot } };
    });
  };

  const handleBooking = (doctorIndex: number) => {
    const currentSelection = selection[doctorIndex];
    if (!currentSelection) return;
    
    toast.success(t.toastSuccess(currentSelection.slot, currentSelection.date));
    setSelection(prev => ({ ...prev, [doctorIndex]: null }));
  };
  
  const handleEmergencyCall = () => {
    navigateTo('video-consultation'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-md hover:bg-gray-100" onClick={() => navigateTo('patient-dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-medium text-gray-800">{t.title}</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <Card className="p-4 bg-red-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-red-700">{t.emergency} Consultation</h3>
              <p className="text-sm text-red-600">Connect to a doctor instantly.</p>
            </div>
            <button 
              className="inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 bg-red-500 hover:bg-red-600 text-white"
              onClick={handleEmergencyCall}
            >
              <Video className="w-4 h-4 mr-2" />
              {t.emergency}
            </button>
          </div>
        </Card>

        {doctors.map((doctor, index) => {
            const doctorSelection = selection[index];
            return (
              <Card key={index} className="p-4 bg-white overflow-hidden">
                <div className="flex items-start space-x-4">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{doctor.name}</p>
                    <p className="text-sm text-green-600 font-medium">
                      {t.specialities[doctor.specialityKey as keyof typeof t.specialities]}
                      {doctor.role && ` - ${doctor.role}`}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{`${doctor.experience} ${t.experience}`}</p>
                  </div>
                </div>

                <div className="mt-4 border-t pt-3">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">{t.availableSlots}</h4>
                  <div className="space-y-3">
                    {dateOptions.map(dateOpt => (
                        <div key={dateOpt.value}>
                            <p className="text-sm font-medium text-gray-600 mb-2">
                                {t[dateOpt.labelKey as keyof typeof t]} - {dateOpt.value}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {doctor.availableSlots.map(slot => {
                                    const isSelected = doctorSelection?.date === dateOpt.value && doctorSelection?.slot === slot;
                                    const slotStyle = isSelected
                                      ? { backgroundColor: '#22c55e', color: 'white', borderColor: '#22c55e' }
                                      : { backgroundColor: 'white', color: '#1f2937', borderColor: '#d1d5db' };

                                    return (
                                        <button 
                                            key={slot}
                                            className="h-9 px-3 rounded-md text-sm font-medium border transition-colors"
                                            style={slotStyle}
                                            onClick={() => handleSelect(index, dateOpt.value, slot)}
                                        >
                                            {slot}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                  </div>
                </div>

                {/* ---  --- */}
                <div className="mt-4 flex justify-end border-t pt-3">
                  <button
                    disabled={!doctorSelection}
                    onClick={() => handleBooking(index)}
                    className="h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium border transition-colors"
                    style={doctorSelection
                        ? { backgroundColor: '#22c55e', color: 'white', borderColor: '#22c55e' }
                        : { backgroundColor: '#e5e7eb', color: '#9ca3af', borderColor: '#d1d5db', cursor: 'not-allowed' }
                    }
                  >
                    {t.bookAppointment}
                  </button>
                </div>
              </Card>
            );
        })}
      </div>
    </div>
  );
}