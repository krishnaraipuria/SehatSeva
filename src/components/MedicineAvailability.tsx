import React, { useState } from 'react';
import { ArrowLeft, MapPin, Search, Pill, Clock, Phone, Navigation, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MedicineAvailabilityProps {
  navigateTo: (screen: string) => void;
  language: Language;
  isOnline: boolean;
}

const translations = {
  en: {
    medicineAvailability: 'Medicine Availability',
    searchMedicine: 'Search Medicine',
    nearbyPharmacies: 'Nearby Pharmacies',
    findNearestPharmacy: 'Find Nearest Pharmacy',
    available: 'Available',
    outOfStock: 'Out of Stock',
    limitedStock: 'Limited Stock',
    callPharmacy: 'Call Pharmacy',
    getDirections: 'Get Directions',
    openNow: 'Open Now',
    closedNow: 'Closed Now',
    opensAt: 'Opens at',
    distance: 'Distance',
    price: 'Price',
    viewMap: 'View Map',
    filter: 'Filter',
    openOnly: 'Open Only',
    withStock: 'With Stock'
  },
  hi: {
    medicineAvailability: 'दवा की उपलब्धता',
    searchMedicine: 'दवा खोजें',
    nearbyPharmacies: 'पास की फार्मेसियां',
    findNearestPharmacy: 'निकटतम फार्मेसी खोजें',
    available: 'उपलब्ध',
    outOfStock: 'स्टॉक में नहीं',
    limitedStock: 'सीमित स्टॉक',
    callPharmacy: 'फार्मेसी को कॉल करें',
    getDirections: 'दिशा निर्देश',
    openNow: 'अभी खुला',
    closedNow: 'अभी बंद',
    opensAt: 'खुलता है',
    distance: 'दूरी',
    price: 'कीमत',
    viewMap: 'मैप देखें',
    filter: 'फिल्टर',
    openOnly: 'केवल खुली',
    withStock: 'स्टॉक के साथ'
  },
  pa: {
    medicineAvailability: 'ਦਵਾਈ ਦੀ ਉਪਲਬਧਤਾ',
    searchMedicine: 'ਦਵਾਈ ਖੋਜੋ',
    nearbyPharmacies: 'ਨੇੜਲੇ ਦਵਾਖਾਨੇ',
    findNearestPharmacy: 'ਸਭ ਤੋਂ ਨੇੜਲਾ ਦਵਾਖਾਨਾ ਲੱਭੋ',
    available: 'ਉਪਲਬਧ',
    outOfStock: 'ਸਟਾਕ ਵਿੱਚ ਨਹੀਂ',
    limitedStock: 'ਸੀਮਤ ਸਟਾਕ',
    callPharmacy: 'ਦਵਾਖਾਨੇ ਨੂੰ ਕਾਲ ਕਰੋ',
    getDirections: 'ਦਿਸ਼ਾ ਨਿਰਦੇਸ਼',
    openNow: 'ਹੁਣ ਖੁੱਲ੍ਹਾ',
    closedNow: 'ਹੁਣ ਬੰਦ',
    opensAt: 'ਖੁੱਲ੍ਹਦਾ ਹੈ',
    distance: 'ਦੂਰੀ',
    price: 'ਕੀਮਤ',
    viewMap: 'ਨਕਸ਼ਾ ਦੇਖੋ',
    filter: 'ਫਿਲਟਰ',
    openOnly: 'ਸਿਰਫ਼ ਖੁੱਲ੍ਹੇ',
    withStock: 'ਸਟਾਕ ਦੇ ਨਾਲ'
  }
};

const mockPharmacies = [
  {
    id: 1,
    name: 'Gupta Medical Store',
    address: 'Main Market, Nabha',
    distance: '0.5 km',
    phone: '+91 98765 43210',
    isOpen: true,
    openTime: '8:00 AM',
    closeTime: '10:00 PM',
    medicines: [
      { name: 'Paracetamol 500mg', status: 'available', price: '₹25' },
      { name: 'Metformin 500mg', status: 'limited', price: '₹45' },
      { name: 'Vitamin D3', status: 'available', price: '₹120' }
    ]
  },
  {
    id: 2,
    name: 'City Pharmacy',
    address: 'Railway Road, Nabha',
    distance: '1.2 km',
    phone: '+91 98765 43211',
    isOpen: true,
    openTime: '9:00 AM',
    closeTime: '9:00 PM',
    medicines: [
      { name: 'Paracetamol 500mg', status: 'available', price: '₹30' },
      { name: 'Metformin 500mg', status: 'out-of-stock', price: '₹50' },
      { name: 'Vitamin D3', status: 'available', price: '₹110' }
    ]
  },
  {
    id: 3,
    name: 'New Life Pharmacy',
    address: 'Bus Stand, Nabha',
    distance: '2.0 km',
    phone: '+91 98765 43212',
    isOpen: false,
    openTime: '8:00 AM',
    closeTime: '8:00 PM',
    medicines: [
      { name: 'Paracetamol 500mg', status: 'available', price: '₹20' },
      { name: 'Metformin 500mg', status: 'available', price: '₹40' },
      { name: 'Vitamin D3', status: 'limited', price: '₹100' }
    ]
  }
];

export function MedicineAvailability({ navigateTo, language, isOnline }: MedicineAvailabilityProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const t = translations[language];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-600';
      case 'limited':
        return 'bg-yellow-100 text-yellow-600';
      case 'out-of-stock':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t.available;
      case 'limited':
        return t.limitedStock;
      case 'out-of-stock':
        return t.outOfStock;
      default:
        return status;
    }
  };

  if (showMap) {
    return (
      <div className="min-h-screen bg-gray-100">
        {/* Map Header */}
        <div className="bg-white shadow-sm p-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowMap(false)}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to List
            </Button>
            <h1 className="text-lg text-gray-800">Pharmacy Map</h1>
            <div></div>
          </div>
        </div>

        {/* Mock Map */}
        <div className="relative h-96 bg-green-100">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaGFybWFjeSUyMG1lZGljaW5lJTIwcnVyYWx8ZW58MXx8fHwxNzU4MTgwNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Map View"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <MapPin className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-center text-sm">Interactive Map View</p>
              <p className="text-center text-xs text-gray-500">Showing nearby pharmacies</p>
            </div>
          </div>
        </div>

        {/* Map Legend */}
        <div className="p-4 space-y-3">
          {mockPharmacies.slice(0, 2).map((pharmacy) => (
            <Card key={pharmacy.id} className="p-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{pharmacy.name}</h3>
                  <p className="text-sm text-gray-600">{pharmacy.distance}</p>
                </div>
                <Button size="sm" variant="outline">
                  <Navigation className="w-4 h-4 mr-1" />
                  {t.getDirections}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
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
            <h1 className="text-lg text-gray-800">{t.medicineAvailability}</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setShowMap(true)}
            >
              <MapPin className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="sm">
              <Filter className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder={t.searchMedicine}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          <Button 
            onClick={() => setShowMap(true)}
            className="flex-1 h-12 bg-green-600 hover:bg-green-700"
          >
            <MapPin className="w-5 h-5 mr-2" />
            {t.viewMap}
          </Button>
          <Button 
            variant="outline"
            className="flex-1 h-12"
          >
            <Navigation className="w-5 h-5 mr-2" />
            {t.findNearestPharmacy}
          </Button>
        </div>

        {/* Pharmacy List */}
        <div className="space-y-4">
          <h2 className="text-lg text-gray-800">{t.nearbyPharmacies}</h2>
          
          {mockPharmacies.map((pharmacy) => (
            <Card key={pharmacy.id} className="p-4">
              <div className="space-y-3">
                {/* Pharmacy Info */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{pharmacy.name}</h3>
                    <p className="text-sm text-gray-600">{pharmacy.address}</p>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-500">
                        📍 {pharmacy.distance}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        pharmacy.isOpen 
                          ? 'bg-green-100 text-green-600' 
                          : 'bg-red-100 text-red-600'
                      }`}>
                        {pharmacy.isOpen ? t.openNow : t.closedNow}
                        {!pharmacy.isOpen && ` - ${t.opensAt} ${pharmacy.openTime}`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Medicine Availability */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Medicine Stock:</h4>
                  {pharmacy.medicines.map((medicine, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span className="text-sm">{medicine.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{medicine.price}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(medicine.status)}`}>
                          {getStatusText(medicine.status)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    {t.callPharmacy}
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="flex-1"
                  >
                    <Navigation className="w-4 h-4 mr-1" />
                    {t.getDirections}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}