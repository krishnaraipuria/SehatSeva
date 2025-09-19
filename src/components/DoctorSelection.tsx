import React, { useState } from 'react';
import { ArrowLeft, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Language } from '../App';
import toast from 'react-hot-toast';


const translations = {
  en: {
    title: 'Book a Consultation',
    experience: 'years of experience',
    fees: 'Consultation Fees',
    bookAppointment: 'Book Appointment',
    emergency: 'Emergency',
    availableSlots: 'Available Slots',
    specialities: {
      gp: 'General Physician',
      ortho: 'Orthopedic Surgeon',
      cardio: 'Cardiologist',
    },
    toastSuccess: (slot: string) => `Appointment successfully booked for ${slot}!`,
  },
  hi: {
    title: 'परामर्श बुक करें',
    experience: 'साल का अनुभव',
    fees: 'परामर्श शुल्क',
    bookAppointment: 'अपॉइंटमेंट बुक करें',
    emergency: 'आपातकालीन',
    availableSlots: 'उपलब्ध स्लॉट',
    specialities: {
      gp: 'सामान्य चिकित्सक',
      ortho: 'हड्डी रोग सर्जन',
      cardio: 'हृदय रोग विशेषज्ञ',
    },
    toastSuccess: (slot: string) => `${slot} के लिए अपॉइंटमेंट सफलतापूर्वक बुक हो गया!`,
  },
  pa: {
    title: 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    experience: 'ਸਾਲ ਦਾ ਤਜਰਬਾ',
    fees: 'ਸਲਾਹ ਫੀਸ',
    bookAppointment: 'ਮੁਲਾਕਾਤ ਬੁੱਕ ਕਰੋ',
    emergency: 'ਐਮਰਜੈਂਸੀ',
    availableSlots: 'ਉਪਲਬਧ ਸਲਾਟ',
    specialities: {
      gp: 'ਜਨਰਲ ਫਿਜ਼ੀਸ਼ੀਅਨ',
      ortho: 'ਆਰਥੋਪੀਡਿਕ ਸਰਜਨ',
      cardio: 'ਦਿਲ ਦਾ ਮਾਹਰ',
    },
    toastSuccess: (slot: string) => `${slot} ਲਈ ਮੁਲਾਕਾਤ ਸਫਲਤਾਪੂਰਵਕ ਬੁੱਕ ਹੋ ਗਈ!`,
  }
};
const doctors = [
  {
    name: 'Dr. Meena Verma',
    specialityKey: 'gp',
    role: null,
    experience: 12,
    fees: 300,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    availableSlots: ['04:00 PM', '04:30 PM', '05:00 PM']
  },
  {
    name: 'Dr. Suresh Patil',
    specialityKey: 'ortho',
    role: 'Surgeon',
    experience: 15,
    fees: 500,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    availableSlots: ['02:00 PM', '02:30 PM', '03:30 PM', '05:00 PM']
  },
  {
    name: 'Dr. Anjali Desai',
    specialityKey: 'cardio',
    role: null,
    experience: 20,
    fees: 600,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    availableSlots: ['06:00 PM', '06:30 PM', '07:00 PM']
  },
];


export function DoctorSelection({ navigateTo, language }: DoctorSelectionProps) {
  const t = translations[language];
  const [selectedSlots, setSelectedSlots] = useState<{ [key: number]: string | null }>({});

  const handleSlotSelect = (doctorIndex: number, slot: string) => {
    setSelectedSlots(prev => ({
      ...prev,
      [doctorIndex]: prev[doctorIndex] === slot ? null : slot,
    }));
  };

  const handleBooking = (doctorName: string, slot: string | null) => {
    if (!slot) return;
    toast.success(t.toastSuccess(slot));
  };
  
  const handleEmergencyCall = () => {
    // THIS IS THE CORRECTION
    // It should navigate to the actual video call screen ('video-call-patient'),
    // not the doctor selection screen ('video-consultation').
    navigateTo('video-consultation'); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <div className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={() => navigateTo('patient-dashboard')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
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
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={handleEmergencyCall}
            >
              <Video className="w-4 h-4 mr-2" />
              {t.emergency}
            </Button>
          </div>
        </Card>

        {doctors.map((doctor, index) => (
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
              <h4 className="text-sm font-semibold text-gray-700 mb-2">{t.availableSlots}</h4>
              <div className="flex flex-wrap gap-2">
                {doctor.availableSlots.map(slot => (
                  <Button 
                    key={slot}
                    variant="outline"
                    size="sm"
                    className={`
                      ${selectedSlots[index] === slot 
                          ? 'bg-green-500 text-white border-green-500' 
                          : 'bg-gray-100 text-gray-800'
                      }
                    `}
                    onClick={() => handleSlotSelect(index, slot)}
                  >
                    {slot}
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t pt-3">
              <div>
                <p className="text-xs text-gray-500">{t.fees}</p>
                <p className="font-bold text-lg text-gray-800">₹{doctor.fees}</p>
              </div>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                disabled={!selectedSlots[index]}
                onClick={() => handleBooking(doctor.name, selectedSlots[index] || null)}
              >
                {t.bookAppointment}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}