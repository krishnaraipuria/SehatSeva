import React, { useState } from 'react';
import { ArrowLeft, MapPin, Search, Pill, Clock, Phone, Navigation, Filter } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Language } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import toast from 'react-hot-toast';

interface MedicineAvailabilityProps {
  navigateTo: (screen: string, patientId?: string) => void;
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
      { name: 'Vitamin D3', status: 'available', price: '₹120' },
      { name: 'Aspirin 75mg', status: 'available', price: '₹35' },
      { name: 'Omeprazole 20mg', status: 'available', price: '₹65' },
      { name: 'Cetirizine 10mg', status: 'limited', price: '₹15' }
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
      { name: 'Vitamin D3', status: 'available', price: '₹110' },
      { name: 'Ibuprofen 400mg', status: 'available', price: '₹40' },
      { name: 'Amoxicillin 250mg', status: 'available', price: '₹80' },
      { name: 'Losartan 50mg', status: 'limited', price: '₹95' }
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
      { name: 'Vitamin D3', status: 'limited', price: '₹100' },
      { name: 'Atorvastatin 10mg', status: 'available', price: '₹85' },
      { name: 'Pantoprazole 40mg', status: 'available', price: '₹55' }
    ]
  },
  {
    id: 4,
    name: 'Sharma Medicos',
    address: 'Civil Hospital Road, Nabha',
    distance: '1.8 km',
    phone: '+91 98765 43213',
    isOpen: true,
    openTime: '7:00 AM',
    closeTime: '11:00 PM',
    medicines: [
      { name: 'Insulin Glargine', status: 'available', price: '₹450' },
      { name: 'Salbutamol Inhaler', status: 'available', price: '₹180' },
      { name: 'Amlodipine 5mg', status: 'available', price: '₹25' },
      { name: 'Clopidogrel 75mg', status: 'limited', price: '₹120' },
      { name: 'Montelukast 10mg', status: 'available', price: '₹95' },
      { name: 'Levothyroxine 50mcg', status: 'available', price: '₹35' }
    ]
  },
  {
    id: 5,
    name: 'Apollo Pharmacy',
    address: 'GT Road, Nabha',
    distance: '2.5 km',
    phone: '+91 98765 43214',
    isOpen: true,
    openTime: '24 Hours',
    closeTime: '24 Hours',
    medicines: [
      { name: 'Paracetamol 500mg', status: 'available', price: '₹28' },
      { name: 'Azithromycin 500mg', status: 'available', price: '₹150' },
      { name: 'Prednisolone 5mg', status: 'available', price: '₹45' },
      { name: 'Diclofenac 50mg', status: 'available', price: '₹30' },
      { name: 'Ranitidine 150mg', status: 'limited', price: '₹25' },
      { name: 'Calcium Carbonate', status: 'available', price: '₹60' },
      { name: 'Multivitamin Tablets', status: 'available', price: '₹140' }
    ]
  },
  {
    id: 6,
    name: 'Bhatia Medical Hall',
    address: 'Patiala Road, Nabha',
    distance: '3.2 km',
    phone: '+91 98765 43215',
    isOpen: true,
    openTime: '8:30 AM',
    closeTime: '9:30 PM',
    medicines: [
      { name: 'Ciprofloxacin 500mg', status: 'available', price: '₹75' },
      { name: 'Doxycycline 100mg', status: 'available', price: '₹65' },
      { name: 'Folic Acid 5mg', status: 'available', price: '₹20' },
      { name: 'Iron Tablets', status: 'limited', price: '₹35' },
      { name: 'Vitamin B12', status: 'available', price: '₹85' },
      { name: 'Domperidone 10mg', status: 'available', price: '₹40' }
    ]
  },
  {
    id: 7,
    name: 'Mediplus Pharmacy',
    address: 'Sangrur Road, Nabha',
    distance: '1.7 km',
    phone: '+91 98765 43216',
    isOpen: true,
    openTime: '9:00 AM',
    closeTime: '10:00 PM',
    medicines: [
      { name: 'Glimepiride 2mg', status: 'available', price: '₹55' },
      { name: 'Telmisartan 40mg', status: 'available', price: '₹110' },
      { name: 'Rosuvastatin 10mg', status: 'limited', price: '₹125' },
      { name: 'Gabapentin 300mg', status: 'available', price: '₹95' },
      { name: 'Tramadol 50mg', status: 'available', price: '₹45' },
      { name: 'Sertraline 50mg', status: 'out-of-stock', price: '₹180' }
    ]
  },
  {
    id: 8,
    name: 'Health First Pharmacy',
    address: 'Model Town, Nabha',
    distance: '2.8 km',
    phone: '+91 98765 43217',
    isOpen: false,
    openTime: '10:00 AM',
    closeTime: '8:00 PM',
    medicines: [
      { name: 'Warfarin 5mg', status: 'available', price: '₹65' },
      { name: 'Digoxin 0.25mg', status: 'limited', price: '₹35' },
      { name: 'Furosemide 40mg', status: 'available', price: '₹25' },
      { name: 'Spironolactone 25mg', status: 'available', price: '₹45' },
      { name: 'Bisoprolol 5mg', status: 'available', price: '₹75' }
    ]
  },
  {
    id: 9,
    name: 'Care Pharmacy',
    address: 'Fountain Chowk, Nabha',
    distance: '1.5 km',
    phone: '+91 98765 43218',
    isOpen: true,
    openTime: '8:00 AM',
    closeTime: '10:30 PM',
    medicines: [
      { name: 'Paracetamol 500mg', status: 'available', price: '₹22' },
      { name: 'Loperamide 2mg', status: 'available', price: '₹30' },
      { name: 'ORS Sachets', status: 'available', price: '₹15' },
      { name: 'Zinc Tablets', status: 'available', price: '₹25' },
      { name: 'Probiotics Capsules', status: 'limited', price: '₹180' },
      { name: 'Antacid Syrup', status: 'available', price: '₹45' }
    ]
  },
  {
    id: 10,
    name: 'Wellness Pharmacy',
    address: 'Grain Market, Nabha',
    distance: '3.5 km',
    phone: '+91 98765 43219',
    isOpen: true,
    openTime: '9:00 AM',
    closeTime: '9:00 PM',
    medicines: [
      { name: 'Hydroxychloroquine 200mg', status: 'limited', price: '₹95' },
      { name: 'Chloroquine 250mg', status: 'available', price: '₹35' },
      { name: 'Artemether Injection', status: 'available', price: '₹250' },
      { name: 'Quinine Tablets', status: 'out-of-stock', price: '₹85' },
      { name: 'Doxycycline 100mg', status: 'available', price: '₹70' }
    ]
  }
];

export function MedicineAvailability({ navigateTo, language, isOnline }: MedicineAvailabilityProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('distance'); // 'distance', 'price-low', 'price-high', 'availability'
  const [showOpenOnly, setShowOpenOnly] = useState(false);
  const t = translations[language];

  const handleGetDirections = () => {
    toast('Coming soon! Navigation feature will be available soon.', {
      icon: '🗺️',
      duration: 3000,
    });
  };

  const handleCallPharmacy = () => {
    toast('Coming soon! Direct calling feature will be available soon.', {
      icon: '📞',
      duration: 3000,
    });
  };

  const handleFindNearest = () => {
    toast('Coming soon! Find nearest pharmacy feature will be available soon.', {
      icon: '📍',
      duration: 3000,
    });
  };

  // Filter and sort pharmacies based on search and filter options
  const filteredPharmacies = mockPharmacies
    .filter(pharmacy => {
      // Filter by open status if showOpenOnly is true
      if (showOpenOnly && !pharmacy.isOpen) return false;

      // Search filter
      if (!searchQuery.trim()) return true;

      // Search in medicine names (primary search)
      const hasMedicine = pharmacy.medicines.some(medicine =>
        medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      // Also search in pharmacy name and address as secondary
      const hasPharmacyMatch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase());

      return hasMedicine || hasPharmacyMatch;
    })
    .sort((a, b) => {
      // Get the relevant medicine for price comparison when searching
      let aMedicine: { name: string; status: string; price: string; } | undefined = undefined;
      let bMedicine: { name: string; status: string; price: string; } | undefined = undefined;

      if (searchQuery.trim()) {
        aMedicine = a.medicines.find(m =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        bMedicine = b.medicines.find(m =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }

      // Sort based on selected option
      switch (sortBy) {
        case 'price-low':
          if (aMedicine && bMedicine) {
            const aPrice = parseFloat(aMedicine.price.replace('₹', ''));
            const bPrice = parseFloat(bMedicine.price.replace('₹', ''));
            return aPrice - bPrice;
          }
          // If no specific medicine, sort by average price of first medicine
          const aAvgPrice = parseFloat(a.medicines[0]?.price.replace('₹', '') || '0');
          const bAvgPrice = parseFloat(b.medicines[0]?.price.replace('₹', '') || '0');
          return aAvgPrice - bAvgPrice;

        case 'price-high':
          if (aMedicine && bMedicine) {
            const aPrice = parseFloat(aMedicine.price.replace('₹', ''));
            const bPrice = parseFloat(bMedicine.price.replace('₹', ''));
            return bPrice - aPrice;
          }
          // If no specific medicine, sort by average price of first medicine
          const aAvgPriceHigh = parseFloat(a.medicines[0]?.price.replace('₹', '') || '0');
          const bAvgPriceHigh = parseFloat(b.medicines[0]?.price.replace('₹', '') || '0');
          return bAvgPriceHigh - aAvgPriceHigh;

        case 'availability':
          // Prioritize available medicines over out-of-stock
          if (aMedicine && bMedicine) {
            if (aMedicine.status === 'available' && bMedicine.status !== 'available') return -1;
            if (bMedicine.status === 'available' && aMedicine.status !== 'available') return 1;
            if (aMedicine.status === 'limited' && bMedicine.status === 'out-of-stock') return -1;
            if (bMedicine.status === 'limited' && aMedicine.status === 'out-of-stock') return 1;
          }
          // Then sort by distance
          const aDistanceAvail = parseFloat(a.distance.replace(' km', ''));
          const bDistanceAvail = parseFloat(b.distance.replace(' km', ''));
          return aDistanceAvail - bDistanceAvail;

        case 'distance':
        default:
          // If searching for a specific medicine, prioritize pharmacies that have it available
          if (searchQuery.trim() && aMedicine && bMedicine) {
            if (aMedicine.status === 'available' && bMedicine.status !== 'available') return -1;
            if (bMedicine.status === 'available' && aMedicine.status !== 'available') return 1;
          }

          // Sort by distance (ascending)
          const aDistance = parseFloat(a.distance.replace(' km', ''));
          const bDistance = parseFloat(b.distance.replace(' km', ''));
          return aDistance - bDistance;
      }
    });

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
                <Button size="sm" variant="outline" onClick={handleGetDirections}>
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
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilterOpen(!filterOpen)}
            >
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
            onClick={handleFindNearest}
          >
            <Navigation className="w-5 h-5 mr-2" />
            {t.findNearestPharmacy}
          </Button>
        </div>

        {/* Filter Dropdown */}
        {filterOpen && (
          <Card className="p-4 bg-white shadow-lg">
            <h3 className="font-medium text-gray-800 mb-3">Filter & Sort</h3>

            {/* Sort Options */}
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sortBy"
                      value="distance"
                      checked={sortBy === 'distance'}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-green-600"
                    />
                    <span className="text-sm">Distance (Nearest First)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sortBy"
                      value="price-low"
                      checked={sortBy === 'price-low'}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-green-600"
                    />
                    <span className="text-sm">Price (Low to High)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sortBy"
                      value="price-high"
                      checked={sortBy === 'price-high'}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-green-600"
                    />
                    <span className="text-sm">Price (High to Low)</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="sortBy"
                      value="availability"
                      checked={sortBy === 'availability'}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="text-green-600"
                    />
                    <span className="text-sm">Availability</span>
                  </label>
                </div>
              </div>

              {/* Filter Options */}
              <div className="border-t pt-3">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Filter Options</label>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={showOpenOnly}
                    onChange={(e) => setShowOpenOnly(e.target.checked)}
                    className="text-green-600"
                  />
                  <span className="text-sm">Show Open Pharmacies Only</span>
                </label>
              </div>

              {/* Apply/Clear Buttons */}
              <div className="flex space-x-2 pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setSortBy('distance');
                    setShowOpenOnly(false);
                  }}
                >
                  Clear Filters
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => setFilterOpen(false)}
                >
                  Apply
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Pharmacy List */}
        <div className="space-y-4">
          <h2 className="text-lg text-gray-800">{t.nearbyPharmacies}</h2>

          {filteredPharmacies.map((pharmacy) => (
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
                      <span className={`text-xs px-2 py-1 rounded-full ${pharmacy.isOpen
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
                    onClick={handleCallPharmacy}
                  >
                    <Phone className="w-4 h-4 mr-1" />
                    {t.callPharmacy}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={handleGetDirections}
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