import React, { useState } from 'react';
import { Phone, MessageSquare, User, Stethoscope, Building, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Language, UserType } from '../App';

interface PatientLoginProps {
  navigateTo: (screen: string) => void;
  language: Language;
  login: (userType: UserType) => void;
}

const translations = {
  en: {
    title: 'Login to Sehat Seva',
    phoneNumber: 'Phone Number',
    enterPhone: 'Enter your mobile number',
    otpSent: 'OTP sent to your phone',
    enterOtp: 'Enter 6-digit OTP',
    sendOtp: 'Send OTP',
    verify: 'Verify & Login',
    resendOtp: 'Resend OTP',
    demoOtp: 'Demo OTP (for testing):',
    or: 'OR',
    loginAs: 'Login as:',
    patient: 'Patient',
    doctor: 'Doctor',
    pharmacy: 'Pharmacy',
    admin: 'Admin'
  },
  hi: {
    title: 'सेहत सेवा में लॉगिन करें',
    phoneNumber: 'फोन नंबर',
    enterPhone: 'अपना मोबाइल नंबर दर्ज करें',
    otpSent: 'आपके फोन पर OTP भेजा गया',
    enterOtp: '6 अंकों का OTP दर्ज करें',
    sendOtp: 'OTP भेजें',
    verify: 'सत्यापित करें और लॉगिन करें',
    resendOtp: 'OTP फिर से भेजें',
    demoOtp: 'डेमो OTP (परीक्षण के लिए):',
    or: 'या',
    loginAs: 'इस रूप में लॉगिन करें:',
    patient: 'मरीज़',
    doctor: 'डॉक्टर',
    pharmacy: 'फार्मेसी',
    admin: 'एडमिन'
  },
  pa: {
    title: 'ਸੇਹਤ ਸੇਵਾ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ',
    phoneNumber: 'ਫੋਨ ਨੰਬਰ',
    enterPhone: 'ਆਪਣਾ ਮੋਬਾਈਲ ਨੰਬਰ ਦਰਜ ਕਰੋ',
    otpSent: 'ਤੁਹਾਡੇ ਫੋਨ ਤੇ OTP ਭੇਜਿਆ ਗਿਆ',
    enterOtp: '6 ਅੰਕਾਂ ਦਾ OTP ਦਰਜ ਕਰੋ',
    sendOtp: 'OTP ਭੇਜੋ',
    verify: 'ਪੁਸ਼ਟੀ ਕਰੋ ਅਤੇ ਲਾਗਇਨ ਕਰੋ',
    resendOtp: 'OTP ਮੁੜ ਭੇਜੋ',
    demoOtp: 'ਡੈਮੋ OTP (ਟੈਸਟਿੰਗ ਲਈ):',
    or: 'ਜਾਂ',
    loginAs: 'ਇਸ ਰੂਪ ਵਿੱਚ ਲਾਗਇਨ ਕਰੋ:',
    patient: 'ਮਰੀਜ਼',
    doctor: 'ਡਾਕਟਰ',
    pharmacy: 'ਦਵਾਖਾਨਾ',
    admin: 'ਐਡਮਿਨ'
  }
};

export function PatientLogin({ language, login }: PatientLoginProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [selectedUserType, setSelectedUserType] = useState<UserType>('patient');
  const t = translations[language];

  // Generate a random 6-digit OTP
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleSendOtp = () => {
    if (phoneNumber.length >= 10) {
      const newOtp = generateOtp();
      setGeneratedOtp(newOtp);
      setOtpSent(true);
      setCountdown(30); // 30 second countdown for resend
      
      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const handleResendOtp = () => {
    const newOtp = generateOtp();
    setGeneratedOtp(newOtp);
    setOtp('');
    setCountdown(30);
    
    // Start countdown timer
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyLogin = () => {
    if (otp.length === 6 && otp === generatedOtp) {
      login(selectedUserType);
    }
  };

  const handleOtpClick = () => {
    setOtp(generatedOtp);
  };

  const userTypes = [
    { type: 'patient' as UserType, icon: User, label: t.patient, color: 'bg-green-100 text-green-600' },
    { type: 'doctor' as UserType, icon: Stethoscope, label: t.doctor, color: 'bg-blue-100 text-blue-600' },
    { type: 'pharmacy' as UserType, icon: Building, label: t.pharmacy, color: 'bg-orange-100 text-orange-600' },
    { type: 'admin' as UserType, icon: Shield, label: t.admin, color: 'bg-purple-100 text-purple-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Phone className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl text-gray-800">
            {t.title}
          </h1>
        </div>

        {/* User Type Selection */}
        <div className="space-y-4">
          <p className="text-center text-gray-600">{t.loginAs}</p>
          <div className="grid grid-cols-2 gap-3">
            {userTypes.map((type) => (
              <Button
                key={type.type}
                variant={selectedUserType === type.type ? "default" : "outline"}
                className={`h-16 flex-col space-y-1 ${
                  selectedUserType === type.type ? type.color : ''
                }`}
                onClick={() => setSelectedUserType(type.type)}
              >
                <type.icon className="w-5 h-5" />
                <span className="text-xs">{type.label}</span>
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
          {!otpSent ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {t.phoneNumber}
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="tel"
                    placeholder={t.enterPhone}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="pl-10 h-12 text-lg"
                    maxLength={10}
                  />
                </div>
              </div>
              <Button 
                onClick={handleSendOtp}
                className="w-full h-12 bg-green-600 hover:bg-green-700"
                disabled={phoneNumber.length < 10}
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                {t.sendOtp}
              </Button>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <p className="text-sm text-green-600 text-center">
                  {t.otpSent}
                </p>
                
                {/* Demo OTP Display */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-600 mb-1">{t.demoOtp}</p>
                  <div 
                    className="flex items-center justify-center space-x-1 cursor-pointer"
                    onClick={handleOtpClick}
                    title="Click to auto-fill"
                  >
                    {generatedOtp.split('').map((digit, index) => (
                      <span 
                        key={index}
                        className="w-8 h-8 bg-blue-100 text-blue-700 rounded border flex items-center justify-center font-mono font-bold"
                      >
                        {digit}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-blue-500 text-center mt-1">↑ Tap to copy</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {t.enterOtp}
                  </label>
                  <Input
                    type="number"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                    className="text-center text-2xl tracking-widest h-12"
                    maxLength={6}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleVerifyLogin}
                  className="w-full h-12 bg-green-600 hover:bg-green-700"
                  disabled={otp.length !== 6 || otp !== generatedOtp}
                >
                  {t.verify}
                </Button>
                
                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-500">
                      {t.resendOtp} in {countdown}s
                    </p>
                  ) : (
                    <Button 
                      variant="ghost" 
                      onClick={handleResendOtp}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      {t.resendOtp}
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}