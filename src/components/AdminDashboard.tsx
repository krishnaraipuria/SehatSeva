import React, { useState } from 'react';
import { BarChart3, Users, MapPin, Activity, TrendingUp, AlertTriangle, LogOut, Bell, Download } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Language } from '../App';

interface AdminDashboardProps {
  navigateTo: (screen: string) => void;
  language: Language;
  logout: () => void;
  isOnline: boolean;
}

const translations = {
  en: {
    adminDashboard: 'Health Department Dashboard',
    welcome: 'Welcome, Health Admin',
    overview: 'Overview',
    analytics: 'Analytics',
    villages: 'Villages',
    alerts: 'Alerts',
    totalUsers: 'Total Users',
    activeConsultations: 'Active Consultations',
    pharmacies: 'Registered Pharmacies',
    consultationsToday: 'Consultations Today',
    villagesCovered: 'Villages Covered',
    activeDoctors: 'Active Doctors',
    medicineShortages: 'Medicine Shortages',
    systemAlerts: 'System Alerts',
    downloadReport: 'Download Report',
    viewDetails: 'View Details',
    criticalShortage: 'Critical Shortage',
    lowConnectivity: 'Low Connectivity',
    highDemand: 'High Demand Area'
  },
  hi: {
    adminDashboard: 'स्वास्थ्य विभाग डैशबोर्ड',
    welcome: 'स्वागत है, स्वास्थ्य एडमिन',
    overview: 'अवलोकन',
    analytics: 'विश्लेषण',
    villages: 'गांव',
    alerts: 'अलर्ट',
    totalUsers: 'कुल उपयोगकर्ता',
    activeConsultations: 'सक्रिय परामर्श',
    pharmacies: 'पंजीकृत फार्मेसियां',
    consultationsToday: 'आज के परामर्श',
    villagesCovered: 'कवर किए गए गांव',
    activeDoctors: 'सक्रिय डॉक्टर',
    medicineShortages: 'दवा की कमी',
    systemAlerts: 'सिस्टम अलर्ट',
    downloadReport: 'रिपोर्ट डाउनलोड करें',
    viewDetails: 'विवरण देखें',
    criticalShortage: 'गंभीर कमी',
    lowConnectivity: 'कम कनेक्टिविटी',
    highDemand: 'उच्च मांग क्षेत्र'
  },
  pa: {
    adminDashboard: 'ਸਿਹਤ ਵਿਭਾਗ ਡੈਸ਼ਬੋਰਡ',
    welcome: 'ਸਵਾਗਤ ਹੈ, ਸਿਹਤ ਐਡਮਿਨ',
    overview: 'ਸੰਖੇਪ',
    analytics: 'ਵਿਸ਼ਲੇਸ਼ਣ',
    villages: 'ਪਿੰਡ',
    alerts: 'ਚੇਤਾਵਨੀਆਂ',
    totalUsers: 'ਕੁੱਲ ਉਪਭੋਗਤਾ',
    activeConsultations: 'ਸਰਗਰਮ ਸਲਾਹਾਂ',
    pharmacies: 'ਰਜਿਸਟਰਡ ਦਵਾਖਾਨੇ',
    consultationsToday: 'ਅੱਜ ਦੀਆਂ ਸਲਾਹਾਂ',
    villagesCovered: 'ਕਵਰ ਕੀਤੇ ਪਿੰਡ',
    activeDoctors: 'ਸਰਗਰਮ ਡਾਕਟਰ',
    medicineShortages: 'ਦਵਾਈ ਦੀ ਕਮੀ',
    systemAlerts: 'ਸਿਸਟਮ ਚੇਤਾਵਨੀਆਂ',
    downloadReport: 'ਰਿਪੋਰਟ ਡਾਉਨਲੋਡ ਕਰੋ',
    viewDetails: 'ਵੇਰਵੇ ਦੇਖੋ',
    criticalShortage: 'ਗੰਭੀਰ ਕਮੀ',
    lowConnectivity: 'ਘੱਟ ਕਨੈਕਟੀਵਿਟੀ',
    highDemand: 'ਉੱਚ ਮੰਗ ਖੇਤਰ'
  }
};

const mockStats = {
  totalUsers: 15847,
  activeConsultations: 23,
  pharmacies: 45,
  consultationsToday: 187,
  villagesCovered: 173,
  activeDoctors: 28
};

const mockVillages = [
  { name: 'Nabha', users: 2450, consultations: 45, status: 'good' },
  { name: 'Bhadson', users: 1890, consultations: 32, status: 'good' },
  { name: 'Amloh', users: 1560, consultations: 28, status: 'warning' },
  { name: 'Malerkotla', users: 3200, consultations: 67, status: 'good' },
  { name: 'Dhuri', users: 1240, consultations: 15, status: 'warning' }
];

const mockAlerts = [
  {
    id: 1,
    type: 'medicine-shortage',
    title: 'Critical Medicine Shortage',
    description: 'Metformin running low in 12 pharmacies',
    severity: 'high',
    time: '2 hours ago'
  },
  {
    id: 2,
    type: 'connectivity',
    title: 'Low Connectivity Alert',
    description: 'Poor network in Dhuri affecting video consultations',
    severity: 'medium',
    time: '4 hours ago'
  },
  {
    id: 3,
    type: 'demand',
    title: 'High Demand Area',
    description: 'Malerkotla shows 40% increase in consultations',
    severity: 'low',
    time: '6 hours ago'
  }
];

const chartData = [
  { month: 'Jan', consultations: 1200, users: 8500 },
  { month: 'Feb', consultations: 1400, users: 9200 },
  { month: 'Mar', consultations: 1600, users: 10100 },
  { month: 'Apr', consultations: 1850, users: 11300 },
  { month: 'May', consultations: 2100, users: 12800 },
  { month: 'Jun', consultations: 2400, users: 14200 },
  { month: 'Jul', consultations: 2650, users: 15847 }
];

export function AdminDashboard({ navigateTo, language, logout, isOnline }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const t = translations[language];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-600 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-600 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-600 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      case 'critical':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg text-gray-800">{t.welcome}</h1>
            <p className="text-sm text-gray-600">{t.adminDashboard}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Download className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Bell className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{mockStats.totalUsers.toLocaleString()}</p>
            <p className="text-xs text-gray-600">{t.totalUsers}</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{mockStats.consultationsToday}</p>
            <p className="text-xs text-gray-600">{t.consultationsToday}</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{mockStats.villagesCovered}</p>
            <p className="text-xs text-gray-600">{t.villagesCovered}</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Activity className="w-4 h-4 text-orange-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{mockStats.activeConsultations}</p>
            <p className="text-xs text-gray-600">{t.activeConsultations}</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Users className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{mockStats.activeDoctors}</p>
            <p className="text-xs text-gray-600">{t.activeDoctors}</p>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <MapPin className="w-4 h-4 text-indigo-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{mockStats.pharmacies}</p>
            <p className="text-xs text-gray-600">{t.pharmacies}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="text-xs">{t.overview}</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">{t.analytics}</TabsTrigger>
            <TabsTrigger value="villages" className="text-xs">{t.villages}</TabsTrigger>
            <TabsTrigger value="alerts" className="text-xs">{t.alerts}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Usage Trend */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Monthly Growth</h3>
              <div className="space-y-3">
                {chartData.slice(-3).map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{data.month}</span>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm">
                        <span className="text-green-600">{data.consultations}</span> consultations
                      </div>
                      <div className="text-sm">
                        <span className="text-blue-600">{data.users.toLocaleString()}</span> users
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Top Performing Villages */}
            <Card className="p-4">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Top Villages by Usage</h3>
              <div className="space-y-3">
                {mockVillages.slice(0, 3).map((village, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <span className="font-medium text-gray-800">{village.name}</span>
                      <p className="text-sm text-gray-600">{village.users} users</p>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-medium text-green-600">{village.consultations}</span>
                      <p className="text-xs text-gray-500">consultations</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4 mt-4">
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">System Analytics</h3>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  {t.downloadReport}
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                      <span className="text-sm text-green-700">User Growth: +18%</span>
                    </div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      <span className="text-sm text-blue-700">Avg. Session: 12 min</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium text-gray-800 mb-2">Usage by Time</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Morning (6-12)</span>
                      <span>35%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Afternoon (12-18)</span>
                      <span>42%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Evening (18-24)</span>
                      <span>23%</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="villages" className="space-y-4 mt-4">
            {mockVillages.map((village, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{village.name}</h3>
                    <p className="text-sm text-gray-600">{village.users} registered users</p>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(village.status)}`}>
                      {village.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">{village.consultations} consultations</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  {t.viewDetails}
                </Button>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4 mt-4">
            {mockAlerts.map((alert) => (
              <Card key={alert.id} className={`p-4 border ${getSeverityColor(alert.severity)}`}>
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="text-sm mt-1">{alert.description}</p>
                    <p className="text-xs mt-2 opacity-75">{alert.time}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-3">
                  {t.viewDetails}
                </Button>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}