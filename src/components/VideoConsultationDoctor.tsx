import React from 'react';
import { Video, VideoOff, Mic, MicOff, Phone, Settings, ArrowLeft, Wifi, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VideoConsultationProps {
  navigateTo: (screen: string) => void;
  language: Language;
  isOnline: boolean;
}

const translations = {
  en: {
    videoConsultation: 'Video Consultation',
    connectingTo: 'Connecting to',
    patientName: 'Patient', // Changed from Dr. Sharma
    details: 'Awaiting patient details...', // Changed
    connecting: 'Connecting...',
    connected: 'Connected',
    lowDataMode: 'Low Data Mode',
    audioOnly: 'Audio Only',
    endCall: 'End Call',
    chat: 'Chat',
    mute: 'Mute',
    unmute: 'Unmute',
    videoOn: 'Video On',
    videoOff: 'Video Off',
    connectionPoor: 'Poor Connection - Switch to Audio Only?'
  },
  hi: {
    videoConsultation: 'वीडियो परामर्श',
    connectingTo: 'से कनेक्ट हो रहे हैं',
    patientName: 'मरीज़', // Changed
    details: 'मरीज के विवरण की प्रतीक्षा है...', // Changed
    connecting: 'कनेक्ट हो रहा है...',
    connected: 'कनेक्ट हो गया',
    lowDataMode: 'कम डेटा मोड',
    audioOnly: 'केवल ऑडियो',
    endCall: 'कॉल समाप्त करें',
    chat: 'चैट',
    mute: 'म्यूट',
    unmute: 'अनम्यूट',
    videoOn: 'वीडियो चालू',
    videoOff: 'वीडियो बंद',
    connectionPoor: 'कमजोर कनेक्शन - केवल ऑडियो पर स्विच करें?'
  },
  pa: {
    videoConsultation: 'ਵੀਡੀਓ ਸਲਾਹ',
    connectingTo: 'ਨਾਲ ਜੁੜ ਰਹੇ ਹਾਂ',
    patientName: 'ਮਰੀਜ਼', // Changed
    details: 'ਮਰੀਜ਼ ਦੇ ਵੇਰਵਿਆਂ ਦੀ ਉਡੀਕ ਹੈ...', // Changed
    connecting: 'ਜੁੜ ਰਿਹਾ ਹੈ...',
    connected: 'ਜੁੜ ਗਿਆ',
    lowDataMode: 'ਘੱਟ ਡੇਟਾ ਮੋਡ',
    audioOnly: 'ਸਿਰਫ਼ ਆਡੀਓ',
    endCall: 'ਕਾਲ ਖਤਮ ਕਰੋ',
    chat: 'ਚੈਟ',
    mute: 'ਮਿਊਟ',
    unmute: 'ਅਨਮਿਊਟ',
    videoOn: 'ਵੀਡੀਓ ਚਾਲੂ',
    videoOff: 'ਵੀਡੀਓ ਬੰਦ',
    connectionPoor: 'ਕਮਜ਼ੋਰ ਕਨੈਕਸ਼ਨ - ਸਿਰਫ਼ ਆਡੀਓ ਤੇ ਸਵਿੱਚ ਕਰੋ?'
  }
};

export function VideoConsultationDoctor({ navigateTo, language, isOnline }: VideoConsultationProps) {
  const [isVideoOn, setIsVideoOn] = React.useState(true);
  const [isMuted, setIsMuted] = React.useState(false);
  const [isConnected, setIsConnected] = React.useState(false);
  const [lowDataMode, setLowDataMode] = React.useState(false);
  const t = translations[language];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleEndCall = () => {
    // Navigates to the DOCTOR dashboard
    navigateTo('doctor-dashboard');
  };

  return (
    <div className="min-h-screen bg-black relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/50 to-transparent p-4">
        <div className="flex items-center justify-between text-white">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
            onClick={() => navigateTo('doctor-dashboard')}
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t.videoConsultation}
          </Button>
          <div className="flex items-center space-x-2">
            <Wifi className={`w-4 h-4 ${isOnline ? 'text-green-400' : 'text-red-400'}`} />
            <span className="text-sm">{isConnected ? t.connected : t.connecting}</span>
          </div>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="relative w-full h-screen">
        {/* Patient's Video */}
        <div className="w-full h-full bg-gray-900 flex items-center justify-center">
          {isConnected ? (
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1542884748-2b87b36c4b93?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGluZGlhbiUyMHBlcnNvbnxlbnwwfHx8fDE2NzU4MTg0NTA&ixlib=rb-4.0.3&q=80&w=1080"
              alt="Patient"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-center text-white space-y-4">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                <Video className="w-10 h-10" />
              </div>
              <div>
                <p className="text-lg">{t.connectingTo}</p>
                <p className="text-xl font-medium">{t.patientName}</p>
                <p className="text-sm text-gray-300">{t.details}</p>
              </div>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Doctor's Video (Picture-in-Picture) */}
        {isVideoOn && (
          <div className="absolute top-20 right-4 w-24 h-32 bg-gray-800 rounded-lg overflow-hidden border-2 border-white/20">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
              <span className="text-white text-lg">You</span>
            </div>
          </div>
        )}

        {/* Connection Quality Warning */}
        {!isOnline && (
          <div className="absolute top-1/2 left-4 right-4 transform -translate-y-1/2">
            <Card className="p-4 bg-orange-100 border-orange-200">
              <p className="text-orange-800 text-center">
                {t.connectionPoor}
              </p>
              <Button
                onClick={() => setLowDataMode(true)}
                className="w-full mt-2 bg-orange-600 hover:bg-orange-700"
              >
                {t.audioOnly}
              </Button>
            </Card>
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <div className="flex items-center justify-center space-x-4">
          <Button
            size="lg"
            variant="ghost"
            className={`w-14 h-14 rounded-full ${isMuted ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} text-white`}
            onClick={() => setIsMuted(!isMuted)}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className={`w-14 h-14 rounded-full ${!isVideoOn ? 'bg-red-500 hover:bg-red-600' : 'bg-white/20 hover:bg-white/30'} text-white`}
            onClick={() => setIsVideoOn(!isVideoOn)}
          >
            {isVideoOn ? <Video className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </Button>

          <Button
            size="lg"
            className="w-14 h-14 rounded-full bg-red-500 hover:bg-red-600 text-white"
            onClick={handleEndCall}
          >
            <Phone className="w-6 h-6" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <MessageSquare className="w-6 h-6" />
          </Button>

          <Button
            size="lg"
            variant="ghost"
            className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/30 text-white"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Low Data Mode Toggle */}
        <div className="flex items-center justify-center mt-4">
          <Button
            variant="ghost"
            size="sm"
            className={`text-white ${lowDataMode ? 'bg-green-500/20' : 'bg-white/10'}`}
            onClick={() => setLowDataMode(!lowDataMode)}
          >
            <Wifi className="w-4 h-4 mr-2" />
            {t.lowDataMode}
          </Button>
        </div>
      </div>
    </div>
  );
}

