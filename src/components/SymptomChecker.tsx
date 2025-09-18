import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Send, Bot, User, AlertTriangle, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Language } from '../App';

interface SymptomCheckerProps {
  navigateTo: (screen: string) => void;
  language: Language;
  isOnline: boolean;
}

const translations = {
  en: {
    symptomChecker: 'AI Symptom Checker',
    typeSymptoms: 'Type your symptoms here...',
    send: 'Send',
    emergency: 'Emergency',
    callDoctor: 'Call Doctor',
    bookConsultation: 'Book Consultation',
    disclaimer: 'This is not a substitute for professional medical advice',
    commonSymptoms: 'Common Symptoms',
    fever: 'Fever',
    headache: 'Headache',
    cough: 'Cough',
    bodyPain: 'Body Pain',
    nausea: 'Nausea',
    fatigue: 'Fatigue'
  },
  hi: {
    symptomChecker: 'AI लक्षण जांचकर्ता',
    typeSymptoms: 'यहाँ अपने लक्षण लिखें...',
    send: 'भेजें',
    emergency: 'आपातकाल',
    callDoctor: 'डॉक्टर को कॉल करें',
    bookConsultation: 'परामर्श बुक करें',
    disclaimer: 'यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है',
    commonSymptoms: 'आम लक्षण',
    fever: 'बुखार',
    headache: 'सिरदर्द',
    cough: 'खांसी',
    bodyPain: 'शरीर दर्द',
    nausea: 'मतली',
    fatigue: 'थकान'
  },
  pa: {
    symptomChecker: 'AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    typeSymptoms: 'ਇੱਥੇ ਆਪਣੇ ਲੱਛਣ ਲਿਖੋ...',
    send: 'ਭੇਜੋ',
    emergency: 'ਐਮਰਜੈਂਸੀ',
    callDoctor: 'ਡਾਕਟਰ ਨੂੰ ਕਾਲ ਕਰੋ',
    bookConsultation: 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    disclaimer: 'ਇਹ ਪੇਸ਼ੇਵਰ ਮੈਡੀਕਲ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ',
    commonSymptoms: 'ਆਮ ਲੱਛਣ',
    fever: 'ਬੁਖਾਰ',
    headache: 'ਸਿਰ ਦਰਦ',
    cough: 'ਖੰਘ',
    bodyPain: 'ਸਰੀਰ ਦਰਦ',
    nausea: 'ਕੱਚ',
    fatigue: 'ਥਕਾਵਟ'
  }
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

const commonSymptoms = [
  { en: 'Fever', hi: 'बुखार', pa: 'ਬੁਖਾਰ' },
  { en: 'Headache', hi: 'सिरदर्द', pa: 'ਸਿਰ ਦਰਦ' },
  { en: 'Cough', hi: 'खांसी', pa: 'ਖੰਘ' },
  { en: 'Body Pain', hi: 'शरीर दर्द', pa: 'ਸਰੀਰ ਦਰਦ' },
  { en: 'Nausea', hi: 'मतली', pa: 'ਕੱਚ' },
  { en: 'Fatigue', hi: 'थकान', pa: 'ਥਕਾਵਟ' }
];

const botResponses = {
  en: {
    greeting: "Hello! I'm your AI health assistant. Please describe your symptoms and I'll help you understand what might be causing them.",
    fever: "Fever can be a sign of infection. How long have you had the fever? Any other symptoms like chills, headache, or body aches?",
    headache: "Headaches can have various causes. Is it a dull ache or sharp pain? Any nausea or sensitivity to light?",
    cough: "A cough can be due to various reasons. Is it dry or with phlegm? Any fever or chest pain?",
    general: "Based on your symptoms, I recommend consulting with a healthcare professional for proper diagnosis and treatment.",
    emergency: "⚠️ If you're experiencing severe symptoms, chest pain, difficulty breathing, or any emergency, please call emergency services immediately!"
  },
  hi: {
    greeting: "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूँ। कृपया अपने लक्षणों का वर्णन करें और मैं आपको समझाऊंगा कि इसका कारण क्या हो सकता है।",
    fever: "बुखार संक्रमण का संकेत हो सकता है। आपको कितने समय से बुखार है? कोई अन्य लक्षण जैसे ठंड लगना, सिरदर्द, या शरीर में दर्द?",
    headache: "सिरदर्द के कई कारण हो सकते हैं। क्या यह सुस्त दर्द है या तेज दर्द? कोई मतली या प्रकाश संवेदनशीलता?",
    cough: "खांसी के कई कारण हो सकते हैं। क्या यह सूखी खांसी है या कफ के साथ? कोई बुखार या छाती में दर्द?",
    general: "आपके लक्षणों के आधार पर, मैं उचित निदान और उपचार के लिए स्वास्थ्य पेशेवर से सलाह लेने की सिफारिश करता हूं।",
    emergency: "⚠️ यदि आप गंभीर लक्षण, छाती में दर्द, सांस लेने में कठिनाई, या कोई आपातकाल का अनुभव कर रहे हैं, तो कृपया तुरंत आपातकालीन सेवाओं को कॉल करें!"
  },
  pa: {
    greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਸਿਹਤ ਸਹਾਇਕ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ ਅਤੇ ਮੈਂ ਤੁਹਾਨੂੰ ਸਮਝਾਵਾਂਗਾ ਕਿ ਇਸਦਾ ਕਾਰਨ ਕੀ ਹੋ ਸਕਦਾ ਹੈ।",
    fever: "ਬੁਖਾਰ ਇਨਫੈਕਸ਼ਨ ਦਾ ਸੰਕੇਤ ਹੋ ਸਕਦਾ ਹੈ। ਤੁਹਾਨੂੰ ਕਿੰਨੇ ਸਮੇਂ ਤੋਂ ਬੁਖਾਰ ਹੈ? ਕੋਈ ਹੋਰ ਲੱਛਣ ਜਿਵੇਂ ਠੰਡ ਲੱਗਣਾ, ਸਿਰ ਦਰਦ, ਜਾਂ ਸਰੀਰ ਵਿੱਚ ਦਰਦ?",
    headache: "ਸਿਰ ਦਰਦ ਦੇ ਕਈ ਕਾਰਨ ਹੋ ਸਕਦੇ ਹਨ। ਕੀ ਇਹ ਮੰਦਾ ਦਰਦ ਹੈ ਜਾਂ ਤਿੱਖਾ ਦਰਦ? ਕੋਈ ਕੱਚ ਜਾਂ ਰੋਸ਼ਨੀ ਪ੍ਰਤੀ ਸੰਵੇਦਨਸ਼ੀਲਤਾ?",
    cough: "ਖੰਘ ਦੇ ਕਈ ਕਾਰਨ ਹੋ ਸਕਦੇ ਹਨ। ਕੀ ਇਹ ਸੁੱਕੀ ਖੰਘ ਹੈ ਜਾਂ ਕਫ਼ ਦੇ ਨਾਲ? ਕੋਈ ਬੁਖਾਰ ਜਾਂ ਛਾਤੀ ਵਿੱਚ ਦਰਦ?",
    general: "ਤੁਹਾਡੇ ਲੱਛਣਾਂ ਦੇ ਆਧਾਰ ਤੇ, ਮੈਂ ਸਹੀ ਨਿਦਾਨ ਅਤੇ ਇਲਾਜ ਲਈ ਸਿਹਤ ਪੇਸ਼ੇਵਰ ਨਾਲ ਸਲਾਹ ਲੈਣ ਦੀ ਸਿਫਾਰਸ਼ ਕਰਦਾ ਹਾਂ।",
    emergency: "⚠️ ਜੇ ਤੁਸੀਂ ਗੰਭੀਰ ਲੱਛਣ, ਛਾਤੀ ਵਿੱਚ ਦਰਦ, ਸਾਹ ਲੈਣ ਵਿੱਚ ਮੁਸ਼ਕਲ, ਜਾਂ ਕੋਈ ਐਮਰਜੈਂਸੀ ਦਾ ਅਨੁਭਵ ਕਰ ਰਹੇ ਹੋ, ਤਾਂ ਕਿਰਪਾ ਕਰਕੇ ਤੁਰੰਤ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰੋ!"
  }
};

export function SymptomChecker({ navigateTo, language, isOnline }: SymptomCheckerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: botResponses[language].greeting,
      sender: 'bot',
      timestamp: new Date(),
      suggestions: commonSymptoms.map(s => s[language])
    }
  ]);
  const [inputText, setInputText] = useState('');
  const t = translations[language];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      let botResponse = botResponses[language].general;
      const lowerText = text.toLowerCase();
      
      if (lowerText.includes('fever') || lowerText.includes('बुखार') || lowerText.includes('ਬੁਖਾਰ')) {
        botResponse = botResponses[language].fever;
      } else if (lowerText.includes('headache') || lowerText.includes('सिरदर्द') || lowerText.includes('ਸਿਰ ਦਰਦ')) {
        botResponse = botResponses[language].headache;
      } else if (lowerText.includes('cough') || lowerText.includes('खांसी') || lowerText.includes('ਖੰਘ')) {
        botResponse = botResponses[language].cough;
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: ['Book Consultation', 'Call Doctor', 'Emergency']
      };

      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const handleSymptomClick = (symptom: string) => {
    sendMessage(symptom);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
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
            <h1 className="text-lg text-gray-800">{t.symptomChecker}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-600"
            >
              <AlertTriangle className="w-5 h-5 mr-1" />
              {t.emergency}
            </Button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
        <p className="text-yellow-800 text-sm">
          ⚠️ {t.disclaimer}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
              message.sender === 'user' 
                ? 'bg-green-600 text-white' 
                : 'bg-white text-gray-800 shadow-sm'
            }`}>
              <div className="flex items-start space-x-2">
                {message.sender === 'bot' && (
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Bot className="w-3 h-3 text-blue-600" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm">{message.text}</p>
                  {message.suggestions && (
                    <div className="mt-2 space-y-1">
                      {message.suggestions.map((suggestion, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          size="sm"
                          className="mr-2 mb-1"
                          onClick={() => handleSymptomClick(suggestion)}
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                {message.sender === 'user' && (
                  <div className="w-6 h-6 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Symptoms */}
      {messages.length === 1 && (
        <div className="p-4 space-y-3">
          <h3 className="text-sm font-medium text-gray-700">{t.commonSymptoms}</h3>
          <div className="flex flex-wrap gap-2">
            {commonSymptoms.map((symptom, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleSymptomClick(symptom[language])}
              >
                {symptom[language]}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <Input
            placeholder={t.typeSymptoms}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
            className="flex-1"
          />
          <Button 
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim()}
            className="bg-green-600 hover:bg-green-700"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 mt-3">
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
            onClick={() => navigateTo('video-consultation')}
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            {t.bookConsultation}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            className="flex-1"
          >
            <Phone className="w-4 h-4 mr-1" />
            {t.callDoctor}
          </Button>
        </div>
      </div>
    </div>
  );
}