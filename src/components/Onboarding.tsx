import React, { useState } from 'react';
import { ChevronRight, Globe, Heart, Users, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Language } from '../App';

interface OnboardingProps {
  navigateTo: (screen: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

const translations = {
  en: {
    title: 'Welcome to Sehat Seva',
    subtitle: 'Healthcare for Rural Communities',
    selectLanguage: 'Choose Your Language',
    features: [
      { icon: Heart, title: 'Video Consultations', desc: 'Connect with doctors from your home' },
      { icon: Users, title: 'Community Health', desc: 'Serving 173 villages around Nabha' },
      { icon: MapPin, title: 'Local Pharmacies', desc: 'Find medicines in nearby stores' }
    ],
    continue: 'Continue',
    getStarted: 'Get Started'
  },
  hi: {
    title: 'सेहत सेवा में आपका स्वागत है',
    subtitle: 'ग्रामीण समुदायों के लिए स्वास्थ्य सेवा',
    selectLanguage: 'अपनी भाषा चुनें',
    features: [
      { icon: Heart, title: 'वीडियो परामर्श', desc: 'अपने घर से डॉक्टरों से जुड़ें' },
      { icon: Users, title: 'सामुदायिक स्वास्थ्य', desc: 'नाभा के आसपास 173 गाँवों की सेवा' },
      { icon: MapPin, title: 'स्थानीय फार्मेसियाँ', desc: 'पास की दुकानों में दवाएं खोजें' }
    ],
    continue: 'जारी रखें',
    getStarted: 'शुरू करें'
  },
  pa: {
    title: 'ਸੇਹਤ ਸੇਵਾ ਵਿੱਚ ਤੁਹਾਡਾ ਸਵਾਗਤ ਹੈ',
    subtitle: 'ਪੇਂਡੂ ਭਾਈਚਾਰਿਆਂ ਲਈ ਸਿਹਤ ਸੇਵਾ',
    selectLanguage: 'ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ',
    features: [
      { icon: Heart, title: 'ਵੀਡੀਓ ਸਲਾਹ', desc: 'ਆਪਣੇ ਘਰ ਤੋਂ ਡਾਕਟਰਾਂ ਨਾਲ ਜੁੜੋ' },
      { icon: Users, title: 'ਕਮਿਊਨਿਟੀ ਹੈਲਥ', desc: 'ਨਾਭਾ ਦੇ ਆਲੇ-ਦੁਆਲੇ 173 ਪਿੰਡਾਂ ਦੀ ਸੇਵਾ' },
      { icon: MapPin, title: 'ਸਥਾਨਕ ਦਵਾਖਾਨੇ', desc: 'ਨੇੜਲੀਆਂ ਦੁਕਾਨਾਂ ਵਿੱਚ ਦਵਾਈਆਂ ਲੱਭੋ' }
    ],
    continue: 'ਜਾਰੀ ਰੱਖੋ',
    getStarted: 'ਸ਼ੁਰੂ ਕਰੋ'
  }
};

const languages = [
  { code: 'en' as Language, name: 'English', native: 'English' },
  { code: 'hi' as Language, name: 'Hindi', native: 'हिंदी' },
  { code: 'pa' as Language, name: 'Punjabi', native: 'ਪੰਜਾਬੀ' }
];

export function Onboarding({ navigateTo, language, setLanguage }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const t = translations[language];

  if (step === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div className="text-center space-y-4">
            <Globe className="w-16 h-16 text-blue-500 mx-auto" />
            <h1 className="text-2xl text-gray-800">
              {t.selectLanguage}
            </h1>
          </div>

          <div className="space-y-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                variant={language === lang.code ? "default" : "outline"}
                className="w-full h-16 text-lg justify-between"
                onClick={() => setLanguage(lang.code)}
              >
                <span>{lang.native}</span>
                <span className="text-sm text-gray-500">{lang.name}</span>
              </Button>
            ))}
          </div>

          <Button 
            onClick={() => setStep(1)}
            className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
          >
            {t.continue}
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex flex-col justify-center">
      <div className="max-w-md mx-auto w-full space-y-8">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <Heart className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl text-gray-800">
            {t.title}
          </h1>
          <p className="text-gray-600">
            {t.subtitle}
          </p>
        </div>

        <div className="space-y-6">
          {t.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <feature.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={() => navigateTo('login')}
          className="w-full h-14 text-lg bg-green-600 hover:bg-green-700"
        >
          {t.getStarted}
          <ChevronRight className="w-5 h-5 ml-2" />
        </Button>
      </div>
    </div>
  );
}