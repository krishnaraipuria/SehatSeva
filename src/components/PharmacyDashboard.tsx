import React, { useState } from 'react';
import { Package, TrendingUp, AlertTriangle, Plus, Search, Edit, LogOut, Bell, Pill } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Language } from '../App';

interface PharmacyDashboardProps {
  navigateTo: (screen: string) => void;
  language: Language;
  logout: () => void;
  isOnline: boolean;
}

const translations = {
  en: {
    pharmacyDashboard: 'Pharmacy Dashboard',
    welcome: 'Gupta Medical Store',
    inventory: 'Inventory Management',
    stockStatus: 'Stock Status',
    addMedicine: 'Add Medicine',
    updateStock: 'Update Stock',
    searchMedicine: 'Search medicines...',
    inStock: 'In Stock',
    lowStock: 'Low Stock',
    outOfStock: 'Out of Stock',
    totalMedicines: 'Total Medicines',
    lowStockItems: 'Low Stock Items',
    todaysSales: "Today's Sales",
    medicineRequests: 'Medicine Requests',
    available: 'Available',
    quantity: 'Quantity',
    price: 'Price',
    status: 'Status',
    lastUpdated: 'Last Updated',
    edit: 'Edit',
    restock: 'Restock',
    autoUpdate: 'Auto Update to Portal'
  },
  hi: {
    pharmacyDashboard: 'फार्मेसी डैशबोर्ड',
    welcome: 'गुप्ता मेडिकल स्टोर',
    inventory: 'इन्वेंटरी प्रबंधन',
    stockStatus: 'स्टॉक स्थिति',
    addMedicine: 'दवा जोड़ें',
    updateStock: 'स्टॉक अपडेट करें',
    searchMedicine: 'दवाएं खोजें...',
    inStock: 'स्टॉक में',
    lowStock: 'कम स्टॉक',
    outOfStock: 'स्टॉक में नहीं',
    totalMedicines: 'कुल दवाएं',
    lowStockItems: 'कम स्टॉक आइटम',
    todaysSales: 'आज की बिक्री',
    medicineRequests: 'दवा अनुरोध',
    available: 'उपलब्ध',
    quantity: 'मात्रा',
    price: 'कीमत',
    status: 'स्थिति',
    lastUpdated: 'अंतिम अपडेट',
    edit: 'संपादित करें',
    restock: 'रीस्टॉक',
    autoUpdate: 'पोर्टल पर ऑटो अपडेट'
  },
  pa: {
    pharmacyDashboard: 'ਦਵਾਖਾਨਾ ਡੈਸ਼ਬੋਰਡ',
    welcome: 'ਗੁਪਤਾ ਮੈਡੀਕਲ ਸਟੋਰ',
    inventory: 'ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਨ',
    stockStatus: 'ਸਟਾਕ ਸਥਿਤੀ',
    addMedicine: 'ਦਵਾਈ ਜੋੜੋ',
    updateStock: 'ਸਟਾਕ ਅਪਡੇਟ ਕਰੋ',
    searchMedicine: 'ਦਵਾਈਆਂ ਖੋਜੋ...',
    inStock: 'ਸਟਾਕ ਵਿੱਚ',
    lowStock: 'ਘੱਟ ਸਟਾਕ',
    outOfStock: 'ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ',
    totalMedicines: 'ਕੁੱਲ ਦਵਾਈਆਂ',
    lowStockItems: 'ਘੱਟ ਸਟਾਕ ਆਈਟਮ',
    todaysSales: 'ਅੱਜ ਦੀ ਵਿਕਰੀ',
    medicineRequests: 'ਦਵਾਈ ਬੇਨਤੀਆਂ',
    available: 'ਉਪਲਬਧ',
    quantity: 'ਮਾਤਰਾ',
    price: 'ਕੀਮਤ',
    status: 'ਸਥਿਤੀ',
    lastUpdated: 'ਅੰਤਿਮ ਅਪਡੇਟ',
    edit: 'ਸੰਪਾਦਿਤ ਕਰੋ',
    restock: 'ਰੀਸਟਾਕ',
    autoUpdate: 'ਪੋਰਟਲ ਤੇ ਆਟੋ ਅਪਡੇਟ'
  }
};

const mockMedicines = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Painkillers',
    quantity: 150,
    price: '₹25',
    status: 'in-stock',
    lastUpdated: '2024-01-15',
    minStock: 20
  },
  {
    id: 2,
    name: 'Metformin 500mg',
    category: 'Diabetes',
    quantity: 15,
    price: '₹45',
    status: 'low-stock',
    lastUpdated: '2024-01-14',
    minStock: 20
  },
  {
    id: 3,
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    quantity: 0,
    price: '₹80',
    status: 'out-of-stock',
    lastUpdated: '2024-01-10',
    minStock: 10
  },
  {
    id: 4,
    name: 'Vitamin D3',
    category: 'Vitamins',
    quantity: 25,
    price: '₹120',
    status: 'low-stock',
    lastUpdated: '2024-01-15',
    minStock: 30
  },
  {
    id: 5,
    name: 'Aspirin 75mg',
    category: 'Cardiovascular',
    quantity: 80,
    price: '₹35',
    status: 'in-stock',
    lastUpdated: '2024-01-15',
    minStock: 15
  }
];

const mockRequests = [
  {
    id: 1,
    medicine: 'Metformin 500mg',
    customer: 'Rajesh Kumar',
    village: 'Bhadson',
    quantity: 30,
    phone: '+91 98765 43210',
    status: 'pending'
  },
  {
    id: 2,
    medicine: 'Vitamin D3',
    customer: 'Sunita Devi',
    village: 'Amloh',
    quantity: 1,
    phone: '+91 98765 43211',
    status: 'available'
  }
];

export function PharmacyDashboard({ navigateTo, language, logout, isOnline }: PharmacyDashboardProps) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(true);
  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-600';
      case 'low-stock':
        return 'bg-yellow-100 text-yellow-600';
      case 'out-of-stock':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-stock':
        return t.inStock;
      case 'low-stock':
        return t.lowStock;
      case 'out-of-stock':
        return t.outOfStock;
      default:
        return status;
    }
  };

  const filteredMedicines = mockMedicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statsData = {
    total: mockMedicines.length,
    lowStock: mockMedicines.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock').length,
    sales: '₹2,450'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm p-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg text-gray-800">{t.welcome}</h1>
            <p className="text-sm text-gray-600">{t.pharmacyDashboard}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2">
              <Switch checked={autoUpdate} onCheckedChange={setAutoUpdate} />
              <span className="text-xs text-gray-600">{t.autoUpdate}</span>
            </div>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{statsData.total}</p>
            <p className="text-xs text-gray-600">{t.totalMedicines}</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{statsData.lowStock}</p>
            <p className="text-xs text-gray-600">{t.lowStockItems}</p>
          </Card>
          <Card className="p-4 text-center">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <p className="text-2xl font-medium text-gray-800">{statsData.sales}</p>
            <p className="text-xs text-gray-600">{t.todaysSales}</p>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <Button className="flex-1 h-12 bg-green-600 hover:bg-green-700">
            <Plus className="w-5 h-5 mr-2" />
            {t.addMedicine}
          </Button>
          <Button variant="outline" className="flex-1 h-12">
            <Package className="w-5 h-5 mr-2" />
            {t.updateStock}
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="inventory">{t.inventory}</TabsTrigger>
            <TabsTrigger value="requests">{t.medicineRequests}</TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4 mt-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder={t.searchMedicine}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Medicine List */}
            <div className="space-y-3">
              {filteredMedicines.map((medicine) => (
                <Card key={medicine.id} className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Pill className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{medicine.name}</h3>
                        <p className="text-sm text-gray-600">{medicine.category}</p>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(medicine.status)}`}>
                      {getStatusText(medicine.status)}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-3">
                    <div>
                      <p className="text-xs text-gray-600">{t.quantity}</p>
                      <p className="font-medium">{medicine.quantity}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t.price}</p>
                      <p className="font-medium">{medicine.price}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">{t.lastUpdated}</p>
                      <p className="text-sm">{medicine.lastUpdated}</p>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-4 h-4 mr-1" />
                      {t.edit}
                    </Button>
                    {(medicine.status === 'low-stock' || medicine.status === 'out-of-stock') && (
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                        <Package className="w-4 h-4 mr-1" />
                        {t.restock}
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4 mt-4">
            {mockRequests.map((request) => (
              <Card key={request.id} className="p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">{request.medicine}</h3>
                      <p className="text-sm text-gray-600">{request.customer} • {request.village}</p>
                      <p className="text-sm text-gray-600">📞 {request.phone}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">Qty: {request.quantity}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        request.status === 'available' 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {request.status === 'available' ? t.available : 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {request.status === 'available' ? (
                      <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700">
                        Notify Customer
                      </Button>
                    ) : (
                      <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                        Mark Available
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="flex-1">
                      Call Customer
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}