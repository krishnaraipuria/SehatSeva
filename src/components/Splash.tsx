import React, { useEffect } from 'react';
import { Heart, Stethoscope } from 'lucide-react';
import { Language } from '../App';

interface SplashProps {
  navigateTo: (screen: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
}

export function Splash({ navigateTo }: SplashProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('onboarding');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex flex-col items-center justify-center p-6">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div className="relative">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl mx-auto mb-4">
            <div className="flex items-center space-x-1">
              <Heart className="w-8 h-8 text-red-500" />
              <Stethoscope className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full animate-pulse"></div>
        </div>

        {/* App Name */}
        <div className="space-y-2">
          <h1 className="text-4xl text-white mb-2">Sehat Seva</h1>
          <p className="text-white/90 text-lg">
            Rural Healthcare for Nabha
          </p>
          <p className="text-white/80">
            ਨਾਭਾ ਦੀ ਸੇਵਾ | नाभा की सेवा
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>

        <p className="text-white/70 text-sm">
          Connecting 173 villages to healthcare
        </p>
      </div>
    </div>
  );
}