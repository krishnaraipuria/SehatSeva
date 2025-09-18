import React from 'react';
import { Wifi, WifiOff } from 'lucide-react';
import { Language } from '../App';

interface OfflineIndicatorProps {
  isOnline: boolean;
  language: Language;
}

const translations = {
  en: { offline: 'Offline Mode', online: 'Online' },
  hi: { offline: 'ऑफ़लाइन मोड', online: 'ऑनलाइन' },
  pa: { offline: 'ਆਫਲਾਈਨ ਮੋਡ', online: 'ਆਨਲਾਈਨ' }
};

export function OfflineIndicator({ isOnline, language }: OfflineIndicatorProps) {
  const t = translations[language];
  
  return (
    <div className={`w-full px-4 py-2 text-center transition-all duration-300 ${
      isOnline 
        ? 'bg-green-100 text-green-800' 
        : 'bg-orange-100 text-orange-800'
    }`}>
      <div className="flex items-center justify-center gap-2">
        {isOnline ? (
          <Wifi className="w-4 h-4" />
        ) : (
          <WifiOff className="w-4 h-4" />
        )}
        <span className="text-sm font-medium">
          {isOnline ? t.online : t.offline}
        </span>
      </div>
    </div>
  );
}