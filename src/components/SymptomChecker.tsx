import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, MessageSquare, Send, Bot, User, Phone } from 'lucide-react';
import { Language } from '../App';


interface SymptomCheckerProps {
  navigateTo: (screen: string, patientId?: string) => void;
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

  // const sendMessage = async (text: string) => { //
  //   if (!text.trim() || isLoading) return;

  //   const userMessage: Message = {
  //     id: Date.now().toString(),
  //     text,
  //     sender: 'user',
  //     timestamp: new Date()
  //   };
    
  //   const updatedMessages = [...messages, userMessage];
  //   setMessages(updatedMessages);
  //   setInputText('');
  //   setIsLoading(true);

  //   const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  //   const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    
  //   const systemInstruction = {
  //     role: 'user',
  //     parts: [{ 
  //       text: `You are a helpful and empathetic AI health assistant named 'Sehat Saathi'. Your primary goal is to provide preliminary information based on user's symptoms. ALWAYS include this disclaimer in every response: 'This is not medical advice. Please consult a doctor for a proper diagnosis.' Keep responses concise (2-3 sentences). Respond ONLY in the language code: '${language}'.`
  //     }]
  //   };

  //   const modelResponsePriming = {
  //       role: 'model',
  //       parts: [{
  //           text: `Okay, I understand. I will act as Sehat Saathi and follow all instructions. I will reply in language code '${language}'.`
  //       }]
  //   }

  //   const conversationHistory = updatedMessages.map(msg => ({
  //     role: msg.sender === 'bot' ? 'model' : 'user',
  //     parts: [{ text: msg.text }]
  //   }));

  //   try {
  //     const response = await fetch(API_URL, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({
  //         contents: [
  //           systemInstruction,
  //           modelResponsePriming,
  //           ...conversationHistory
  //         ]
  //       })
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Network response was not ok. Status: ${response.status}`);
  //     }

  //     const data = await response.json();
      
  //     if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
  //         throw new Error('Invalid response structure from API');
  //     }
      
  //     const botResponseText = data.candidates[0].content.parts[0].text;

  //     const botMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       text: botResponseText,
  //       sender: 'bot',
  //       timestamp: new Date()
  //     };
  //     setMessages(prev => [...prev, botMessage]);

  //   } catch (error) {
  //     console.error("Error fetching from Gemini API:", error);
  //     const errorMessage: Message = {
  //       id: (Date.now() + 1).toString(),
  //       text: t.apiError,
  //       sender: 'bot',
  //       timestamp: new Date()
  //     };
  //     setMessages(prev => [...prev, errorMessage]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };//
const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
        id: Date.now().toString(),
        text,
        sender: 'user',
        timestamp: new Date()
    };
    
    const updatedMessages = [...messages, userMessage];
    
    setMessages(updatedMessages);
    setInputText('');
    setIsLoading(true);

    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    console.log("Using OpenRouter API Key:", API_KEY ? "Loaded" : "NOT LOADED OR UNDEFINED");

    const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
    
    const systemInstruction = `You are a helpful and empathetic AI health assistant... Respond ONLY in the language code: '${language}'.`;

    const apiMessages = updatedMessages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
    }));

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                model: 'google/gemini-flash-1.5',
                messages: [
                    { role: 'system', content: systemInstruction },
                    ...apiMessages
                ]
            })
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error("API Error Details:", errorData);
            throw new Error(`Network response was not ok. Status: ${response.status}`);
        }

        const data = await response.json();
        const botResponseText = data.choices[0].message.content;

        const botMessage: Message = {
            id: (Date.now() + 1).toString(),
            text: botResponseText,
            sender: 'bot',
            timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);

    } catch (error) {
        console.error("Error fetching from OpenRouter API:", error);
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
            <button className="p-2 rounded-md hover:bg-gray-100" onClick={() => navigateTo('patient-dashboard')}>
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg text-gray-800">{t.symptomChecker}</h1>
          </div>

        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 p-3 border-l-4 border-yellow-400">
        <p className="text-yellow-800 text-sm">⚠️ {t.disclaimer}</p>
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
              <button
                key={idx}
                className="px-3 py-1.5 text-sm border border-gray-300 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleSymptomClick(symptom[language])}
                disabled={isLoading} 
              >
                {symptom[language]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <input
            placeholder={t.typeSymptoms}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(inputText)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
            disabled={isLoading} 
          />
          <button 
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isLoading} 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 mt-3">
          <button 
            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            onClick={() => navigateTo('doctor-selection')}
            disabled={isLoading}
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            {t.bookConsultation}
          </button>
          <button 
            className="flex-1 px-3 py-1.5 text-sm border border-gray-300 bg-white rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            disabled={isLoading}
          >
            <Phone className="w-4 h-4 mr-1" />
            {t.callDoctor}
          </button>
        </div>
      </div>
    </div>
  );
}