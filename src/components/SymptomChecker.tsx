import React, { useState, useEffect, useRef } from 'react'; 
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
    disclaimer: 'This is not a substitute for professional medical advice. Always consult a doctor.',
    commonSymptoms: 'Common Symptoms',
    fever: 'Fever',
    headache: 'Headache',
    cough: 'Cough',
    bodyPain: 'Body Pain',
    nausea: 'Nausea',
    fatigue: 'Fatigue',
    botTyping: 'Bot is typing...', 
    apiError: 'Sorry, I am unable to respond at the moment. Please try again later.'
  },
  hi: {
    symptomChecker: 'AI लक्षण जांचकर्ता',
    typeSymptoms: 'यहाँ अपने लक्षण लिखें...',
    send: 'भेजें',
    emergency: 'आपातकाल',
    callDoctor: 'डॉक्टर को कॉल करें',
    bookConsultation: 'परामर्श बुक करें',
    disclaimer: 'यह पेशेवर चिकित्सा सलाह का विकल्प नहीं है। हमेशा डॉक्टर से सलाह लें।',
    commonSymptoms: 'आम लक्षण',
    fever: 'बुखार',
    headache: 'सिरदर्द',
    cough: 'खांसी',
    bodyPain: 'शरीर दर्द',
    nausea: 'मतली',
    fatigue: 'थकान',
    botTyping: 'बॉट लिख रहा है...',
    apiError: 'क्षमा करें, मैं इस समय जवाब देने में असमर्थ हूं। कृपया बाद में दोबारा प्रयास करें।'
  },
  pa: {
    symptomChecker: 'AI ਲੱਛਣ ਜਾਂਚਕਰਤਾ',
    typeSymptoms: 'ਇੱਥੇ ਆਪਣੇ ਲੱਛਣ ਲਿਖੋ...',
    send: 'ਭੇਜੋ',
    emergency: 'ਐਮਰਜੈਂਸੀ',
    callDoctor: 'ਡਾਕਟਰ ਨੂੰ ਕਾਲ ਕਰੋ',
    bookConsultation: 'ਸਲਾਹ ਬੁੱਕ ਕਰੋ',
    disclaimer: 'ਇਹ ਪੇਸ਼ੇਵਰ ਮੈਡੀਕਲ ਸਲਾਹ ਦਾ ਬਦਲ ਨਹੀਂ ਹੈ। ਹਮੇਸ਼ਾ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।',
    commonSymptoms: 'ਆਮ ਲੱਛਣ',
    fever: 'ਬੁਖਾਰ',
    headache: 'ਸਿਰ ਦਰਦ',
    cough: 'ਖੰਘ',
    bodyPain: 'ਸਰੀਰ ਦਰਦ',
    nausea: 'ਕੱਚ',
    fatigue: 'ਥਕਾਵਟ',
    botTyping: 'ਬੋਟ ਟਾਈਪ ਕਰ ਰਿਹਾ ਹੈ...',
    apiError: 'ਮੁਆਫ ਕਰਨਾ, ਮੈਂ ਇਸ ਸਮੇਂ ਜਵਾਬ ਦੇਣ ਤੋਂ ਅਸਮਰੱਥ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।'
  }
};

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const commonSymptoms = [
  { en: 'Fever', hi: 'बुखार', pa: 'ਬੁਖਾਰ' },
  { en: 'Headache', hi: 'सिरदर्द', pa: 'ਸਿਰ ਦਰਦ' },
  { en: 'Cough', hi: 'खांसी', pa: 'ਖੰਘ' },
  { en: 'Body Pain', hi: 'शरीर दर्द', pa: 'ਸਰੀਰ ਦਰਦ' },
  { en: 'Nausea', hi: 'मतली', pa: 'ਕੱਚ' },
  { en: 'Fatigue', hi: 'थकान', pa: 'ਥਕਾਵਟ' }
];


const getGreeting = (lang: Language) => ({
    en: "Hello! I'm your AI health assistant. Please describe your symptoms. Remember, this is for informational purposes only. Always consult a doctor for medical advice.",
    hi: "नमस्ते! मैं आपका AI स्वास्थ्य सहायक हूँ। कृपया अपने लक्षणों का वर्णन करें। याद रखें, यह केवल सूचना के उद्देश्यों के लिए है। चिकित्सीय सलाह के लिए हमेशा डॉक्टर से सलाह लें।",
    pa: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਸਿਹਤ ਸਹਾਇਕ ਹਾਂ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਲੱਛਣਾਂ ਦਾ ਵਰਣਨ ਕਰੋ। ਯਾਦ ਰੱਖੋ, ਇਹ ਸਿਰਫ ਜਾਣਕਾਰੀ ਦੇ ਉਦੇਸ਼ਾਂ ਲਈ ਹੈ। ਡਾਕਟਰੀ ਸਲਾਹ ਲਈ ਹਮੇਸ਼ਾ ਡਾਕਟਰ ਨਾਲ ਸਲਾਹ ਕਰੋ।"
}[lang]);

export function SymptomChecker({ navigateTo, language, isOnline }: SymptomCheckerProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: getGreeting(language),
      sender: 'bot',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false); 
  const t = translations[language];
  const messagesEndRef = useRef<HTMLDivElement>(null);


  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    setMessages([{
      id: '1',
      text: getGreeting(language),
      sender: 'bot',
      timestamp: new Date(),
    }]);
  }, [language]);


  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    
    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${API_KEY}`;
    
    const conversationHistory = messages.map(msg => ({
      role: msg.sender === 'bot' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const prompt = `You are a helpful and empathetic AI health assistant. Your name is 'Sehat Saathi'. 
    Your primary goal is to listen to the user's symptoms and provide preliminary information.
    You must always include the following disclaimer in every response: 'This is not medical advice. Please consult a doctor for a proper diagnosis.'
    Keep your responses concise, easy to understand, and limited to 2-3 sentences. 
    Respond in the language code: '${language}'.
    Current user query is: "${text}"`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
              ...conversationHistory,
              {
                role: 'user',
                parts: [{ text: prompt }] 
              }
          ]
        })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      

      const botResponseText = data.candidates[0].content.parts[0].text;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponseText,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error("Error fetching from Gemini API:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: t.apiError,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
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
          {/* <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-red-600"
            >
              <AlertTriangle className="w-5 h-5 mr-1" />
              {t.emergency}
            </Button>
          </div> */}
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
                  <p className="text-sm" style={{ whiteSpace: 'pre-wrap' }}>{message.text}</p>
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

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-start">
             <div className="max-w-xs lg:max-w-md p-3 rounded-lg bg-white text-gray-800 shadow-sm">
                 <div className="flex items-center space-x-2">
                     <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                         <Bot className="w-3 h-3 text-blue-600" />
                     </div>
                     <p className="text-sm italic">{t.botTyping}</p>
                 </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Symptoms */}
      {messages.length <= 2 && (
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

      {/* Inpu */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <Input
            placeholder={t.typeSymptoms}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
            className="flex-1"
            disabled={isLoading} 
          />
          <Button 
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isLoading} 
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
            onClick={() => navigateTo('doctor-selection')}
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