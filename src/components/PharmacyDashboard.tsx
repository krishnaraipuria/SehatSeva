import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Package, TrendingUp, AlertTriangle, Plus, Search, Edit, LogOut, Bell, Pill, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Switch } from './ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import toast from 'react-hot-toast';
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
    addMedicineModalTitle: 'Add Medicine(Better options coming soon)',
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
    autoUpdate: 'Auto Update to Portal',
    selectMedicine: 'Select Medicine',
    enterQuantity: 'Enter Quantity',
    update: 'Update',
    cancel: 'Cancel',
    comingSoon: 'Coming Soon!',
    featureComingSoon: 'This feature will be available soon.',
    markAvailable: 'Mark Available',
    callCustomer: 'Call Customer',
    marked: 'Marked',
    restockQuantity: 'Restock Quantity',
    addQuantity: 'Add Quantity',
    editMedicine: 'Edit Medicine',
    medicineName: 'Medicine Name',
    category: 'Category',
    minStock: 'Minimum Stock',
    save: 'Save Changes'
  },
  hi: {
    pharmacyDashboard: 'फार्मेसी डैशबोर्ड',
    welcome: 'गुप्ता मेडिकल स्टोर',
    inventory: 'इन्वेंटरी प्रबंधन',
    stockStatus: 'स्टॉक स्थिति',
    addMedicine: 'दवा जोड़ें',
    addMedicineModalTitle: 'दवा जोड़ें(बेहतर विकल्प जल्द ही आ रहे हैं)',
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
    autoUpdate: 'पोर्टल पर ऑटो अपडेट',
    selectMedicine: 'दवा चुनें',
    enterQuantity: 'मात्रा दर्ज करें',
    update: 'अपडेट',
    cancel: 'रद्द करें',
    comingSoon: 'जल्द आ रहा है!',
    featureComingSoon: 'यह सुविधा जल्द ही उपलब्ध होगी।',
    markAvailable: 'उपलब्ध चिह्नित करें',
    callCustomer: 'ग्राहक को कॉल करें',
    marked: 'चिह्नित',
    restockQuantity: 'रीस्टॉक मात्रा',
    addQuantity: 'मात्रा जोड़ें',
    editMedicine: 'दवा संपादित करें',
    medicineName: 'दवा का नाम',
    category: 'श्रेणी',
    minStock: 'न्यूनतम स्टॉक',
    save: 'परिवर्तन सहेजें'
  },
  pa: {
    pharmacyDashboard: 'ਦਵਾਖਾਨਾ ਡੈਸ਼ਬੋਰਡ',
    welcome: 'ਗੁਪਤਾ ਮੈਡੀਕਲ ਸਟੋਰ',
    inventory: 'ਇਨਵੈਂਟਰੀ ਪ੍ਰਬੰਧਨ',
    stockStatus: 'ਸਟਾਕ ਸਥਿਤੀ',
    addMedicine: 'ਦਵਾਈ ਜੋੜੋ',
    addMedicineModalTitle: 'ਦਵਾਈ ਸ਼ਾਮਲ ਕਰੋ(ਬਿਹਤਰ ਵਿਕਲਪ ਜਲਦੀ ਆ ਰਹੇ ਹਨ)',
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
    autoUpdate: 'ਪੋਰਟਲ ਤੇ ਆਟੋ ਅਪਡੇਟ',
    selectMedicine: 'ਦਵਾਈ ਚੁਣੋ',
    enterQuantity: 'ਮਾਤਰਾ ਦਰਜ ਕਰੋ',
    update: 'ਅਪਡੇਟ',
    cancel: 'ਰੱਦ ਕਰੋ',
    comingSoon: 'ਜਲਦੀ ਆ ਰਿਹਾ ਹੈ!',
    featureComingSoon: 'ਇਹ ਸੁਵਿਧਾ ਜਲਦੀ ਹੀ ਉਪਲਬਧ ਹੋਵੇਗੀ।',
    markAvailable: 'ਉਪਲਬਧ ਚਿੰਨ੍ਹਿਤ ਕਰੋ',
    callCustomer: 'ਗਾਹਕ ਨੂੰ ਕਾਲ ਕਰੋ',
    marked: 'ਚਿੰਨ੍ਹਿਤ',
    restockQuantity: 'ਰੀਸਟਾਕ ਮਾਤਰਾ',
    addQuantity: 'ਮਾਤਰਾ ਜੋੜੋ',
    editMedicine: 'ਦਵਾਈ ਸੰਪਾਦਿਤ ਕਰੋ',
    medicineName: 'ਦਵਾਈ ਦਾ ਨਾਮ',
    category: 'ਸ਼੍ਰੇਣੀ',
    minStock: 'ਘੱਟੋ-ਘੱਟ ਸਟਾਕ',
    save: 'ਤਬਦੀਲੀਆਂ ਸੇਵ ਕਰੋ'
  }
};

const mockMedicines = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Painkillers',
    quantity: 150,
    price: '₹25',
    status: 'in-stock' as const,
    lastUpdated: '2024-01-15',
    minStock: 20
  },
  {
    id: 2,
    name: 'Metformin 500mg',
    category: 'Diabetes',
    quantity: 15,
    price: '₹45',
    status: 'low-stock' as const,
    lastUpdated: '2024-01-14',
    minStock: 20
  },
  {
    id: 3,
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    quantity: 0,
    price: '₹80',
    status: 'out-of-stock' as const,
    lastUpdated: '2024-01-10',
    minStock: 10
  },
  {
    id: 4,
    name: 'Vitamin D3',
    category: 'Vitamins',
    quantity: 25,
    price: '₹120',
    status: 'low-stock' as const,
    lastUpdated: '2024-01-15',
    minStock: 30
  },
  {
    id: 5,
    name: 'Aspirin 75mg',
    category: 'Cardiovascular',
    quantity: 80,
    price: '₹35',
    status: 'in-stock' as const,
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
    status: 'pending' as const
  },
  {
    id: 2,
    medicine: 'Vitamin D3',
    customer: 'Sunita Devi',
    village: 'Amloh',
    quantity: 1,
    phone: '+91 98765 43211',
    status: 'available' as const
  }
];

// Simple Modal Component - moved outside to prevent re-creation on every render
const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 10000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          width: '100%',
          maxWidth: '420px',
          maxHeight: '85vh',
          overflowY: 'visible',
          margin: '20px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

export function PharmacyDashboard({ navigateTo, language, logout, isOnline }: PharmacyDashboardProps) {
  const [activeTab, setActiveTab] = useState('inventory');
  const [searchTerm, setSearchTerm] = useState('');
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [medicines, setMedicines] = useState(mockMedicines);
  const [requests, setRequests] = useState(mockRequests);

  // Modal states
  const [updateStockOpen, setUpdateStockOpen] = useState(false);
  const [restockOpen, setRestockOpen] = useState(false);
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const [editMedicineOpen, setEditMedicineOpen] = useState(false);
  const [addMedicineOpen, setAddMedicineOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState('');
  const [restockQuantity, setRestockQuantity] = useState('');
  const [restockMedicineId, setRestockMedicineId] = useState<number | null>(null);

  // Edit medicine states
  const [editMedicineId, setEditMedicineId] = useState<number | null>(null);
  const [editMedicineName, setEditMedicineName] = useState('');
  const [editMedicineCategory, setEditMedicineCategory] = useState('');
  const [editMedicinePrice, setEditMedicinePrice] = useState('');
  const [editMedicineQuantity, setEditMedicineQuantity] = useState('');
  const [editMedicineMinStock, setEditMedicineMinStock] = useState('');

  // Add medicine states
  const [addMedicineName, setAddMedicineName] = useState('');
  const [addMedicineCategory, setAddMedicineCategory] = useState('');
  const [addMedicinePrice, setAddMedicinePrice] = useState('');
  const [addMedicineQuantity, setAddMedicineQuantity] = useState('');
  const [addMedicineMinStock, setAddMedicineMinStock] = useState('');

  const t = translations[language];

  // Stable callback functions to prevent re-renders
  const closeUpdateStock = useCallback(() => setUpdateStockOpen(false), []);
  const closeRestock = useCallback(() => setRestockOpen(false), []);
  const closeComingSoon = useCallback(() => setComingSoonOpen(false), []);
  const closeEditMedicine = useCallback(() => setEditMedicineOpen(false), []);
  const closeAddMedicine = useCallback(() => setAddMedicineOpen(false), []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    const isAnyModalOpen = updateStockOpen || restockOpen || comingSoonOpen || editMedicineOpen || addMedicineOpen;
    if (isAnyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [updateStockOpen, restockOpen, comingSoonOpen, editMedicineOpen, addMedicineOpen]);

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



  // Handler functions
  const handleUpdateStock = () => {
    console.log('Update Stock clicked', { selectedMedicine, updateQuantity });
    if (!selectedMedicine || !updateQuantity) {
      toast.error('Please select medicine and enter quantity');
      return;
    }

    const medicineToUpdate = medicines.find(m => m.name === selectedMedicine);
    if (!medicineToUpdate) {
      toast.error('Medicine not found');
      return;
    }

    const newQuantity = parseInt(updateQuantity);
    const updatedMedicines = medicines.map(medicine => {
      if (medicine.name === selectedMedicine) {
        let newStatus = 'in-stock';
        if (newQuantity === 0) newStatus = 'out-of-stock';
        else if (newQuantity <= medicine.minStock) newStatus = 'low-stock';

        return {
          ...medicine,
          quantity: newQuantity,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return medicine;
    });

    setMedicines(updatedMedicines);
    setUpdateStockOpen(false);
    setSelectedMedicine('');
    setUpdateQuantity('');
    toast.success('Stock updated successfully!');
  };

  const handleRestock = () => {
    if (!restockQuantity || restockMedicineId === null) return;

    const addQuantity = parseInt(restockQuantity);
    const updatedMedicines = medicines.map(medicine => {
      if (medicine.id === restockMedicineId) {
        const newQuantity = medicine.quantity + addQuantity;
        let newStatus = 'in-stock';
        if (newQuantity === 0) newStatus = 'out-of-stock';
        else if (newQuantity <= medicine.minStock) newStatus = 'low-stock';

        return {
          ...medicine,
          quantity: newQuantity,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return medicine;
    });

    setMedicines(updatedMedicines);
    setRestockOpen(false);
    setRestockQuantity('');
    setRestockMedicineId(null);
    toast.success(`Restocked ${addQuantity} units successfully!`);
  };

  const handleMarkAvailable = (requestId: number) => {
    console.log('Mark Available clicked for request:', requestId);
    const updatedRequests = requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: 'available' };
      }
      return request;
    });
    setRequests(updatedRequests);
    toast.success('Marked as available!');
  };

  const handleCallCustomer = (phone: string) => {
    console.log('Call Customer clicked for phone:', phone);
    toast.success(`Calling ${phone}...`);
  };

  const handleAddMedicine = () => {
    console.log('Add Medicine clicked');
    setAddMedicineOpen(true);
  };

  const handleSaveAddMedicine = () => {
    if (!addMedicineName || !addMedicineCategory || !addMedicinePrice || !addMedicineQuantity || !addMedicineMinStock) {
      toast.error('Please fill all fields');
      return;
    }

    const quantity = parseInt(addMedicineQuantity);
    const minStock = parseInt(addMedicineMinStock);
    const price = parseFloat(addMedicinePrice);

    if (isNaN(quantity) || isNaN(minStock) || isNaN(price)) {
      toast.error('Please enter valid numbers');
      return;
    }

    // Generate new ID
    const newId = Math.max(...medicines.map(m => m.id)) + 1;

    // Determine status based on quantity and minStock
    let status = 'in-stock';
    if (quantity === 0) status = 'out-of-stock';
    else if (quantity <= minStock) status = 'low-stock';

    const newMedicine = {
      id: newId,
      name: addMedicineName,
      category: addMedicineCategory,
      price: `₹${price}`,
      quantity: quantity,
      minStock: minStock,
      status: status as 'in-stock' | 'low-stock' | 'out-of-stock',
      lastUpdated: new Date().toISOString().split('T')[0]
    };

    setMedicines([...medicines, newMedicine]);
    setAddMedicineOpen(false);

    // Reset form
    setAddMedicineName('');
    setAddMedicineCategory('');
    setAddMedicinePrice('');
    setAddMedicineQuantity('');
    setAddMedicineMinStock('');

    toast.success('Medicine added successfully!');
  };

  const handleNotificationClick = () => {
    console.log('Notification button clicked');
    // Simulate checking for notifications
    const hasNotifications = Math.random() > 0.5; // Random for demo

    if (hasNotifications) {
      toast('You have 2 new medicine requests!', {
        icon: '🔔',
        duration: 3000,
      });
    } else {
      toast('No new notifications', {
        icon: '✅',
        duration: 2000,
      });
    }
  };

  const handleEditMedicine = (medicineId: number) => {
    const medicine = medicines.find(m => m.id === medicineId);
    if (!medicine) return;

    setEditMedicineId(medicineId);
    setEditMedicineName(medicine.name);
    setEditMedicineCategory(medicine.category);
    setEditMedicinePrice(medicine.price.replace('₹', ''));
    setEditMedicineQuantity(medicine.quantity.toString());
    setEditMedicineMinStock(medicine.minStock.toString());
    setEditMedicineOpen(true);
  };

  const handleSaveEditMedicine = () => {
    if (!editMedicineId || !editMedicineName || !editMedicineCategory || !editMedicinePrice || !editMedicineQuantity || !editMedicineMinStock) {
      toast.error('Please fill all fields');
      return;
    }

    const quantity = parseInt(editMedicineQuantity);
    const minStock = parseInt(editMedicineMinStock);
    const price = parseFloat(editMedicinePrice);

    if (isNaN(quantity) || isNaN(minStock) || isNaN(price)) {
      toast.error('Please enter valid numbers');
      return;
    }

    const updatedMedicines = medicines.map(medicine => {
      if (medicine.id === editMedicineId) {
        let newStatus = 'in-stock';
        if (quantity === 0) newStatus = 'out-of-stock';
        else if (quantity <= minStock) newStatus = 'low-stock';

        return {
          ...medicine,
          name: editMedicineName,
          category: editMedicineCategory,
          price: `₹${price}`,
          quantity: quantity,
          minStock: minStock,
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return medicine;
    });

    setMedicines(updatedMedicines);
    setEditMedicineOpen(false);

    // Reset form
    setEditMedicineId(null);
    setEditMedicineName('');
    setEditMedicineCategory('');
    setEditMedicinePrice('');
    setEditMedicineQuantity('');
    setEditMedicineMinStock('');

    toast.success('Medicine updated successfully!');
  };

  const filteredMedicines = medicines.filter(medicine =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const statsData = {
    total: medicines.length,
    lowStock: medicines.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock').length,
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
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log('Notification button clicked');
                toast('No new notifications', {
                  icon: '🔔',
                  duration: 2000,
                });
              }}
              className="hover:bg-gray-100"
            >
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
          <Button
            className="flex-1 h-12 bg-green-600 hover:bg-green-700"
            onClick={handleAddMedicine}
          >
            <Plus className="w-5 h-5 mr-2" />
            {t.addMedicine}
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-12"
            onClick={() => {
              console.log('Update Stock button clicked');
              setUpdateStockOpen(true);
            }}
          >
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
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleEditMedicine(medicine.id)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      {t.edit}
                    </Button>
                    {(medicine.status === 'low-stock' || medicine.status === 'out-of-stock') && (
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => {
                          console.log('Restock clicked for medicine:', medicine.id);
                          setRestockMedicineId(medicine.id);
                          setRestockOpen(true);
                        }}
                      >
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
            {requests.map((request) => (
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
                      <span className={`text-xs px-2 py-1 rounded-full ${request.status === 'available'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                        }`}>
                        {request.status === 'available' ? t.available : 'Pending'}
                      </span>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {request.status === 'available' ? (
                      <Button
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700"
                        disabled
                      >
                        {t.marked}
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-600 hover:bg-orange-700"
                        onClick={() => handleMarkAvailable(request.id)}
                      >
                        {t.markAvailable}
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => handleCallCustomer(request.phone)}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      {t.callCustomer}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Update Stock Modal */}
      <Modal isOpen={updateStockOpen} onClose={closeUpdateStock}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-3">{t.updateStock}</h2>
          <div className="space-y-3 mb-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.selectMedicine}</label>
              <select
                value={selectedMedicine}
                onChange={(e) => setSelectedMedicine(e.target.value)}
                className="w-full h-8 px-2 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">{t.selectMedicine}</option>
                {medicines.map((medicine) => (
                  <option key={medicine.id} value={medicine.name}>
                    {medicine.name} (Current: {medicine.quantity})
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.quantity}</label>
              <Input
                type="number"
                placeholder={t.enterQuantity}
                value={updateQuantity}
                onChange={(e) => setUpdateQuantity(e.target.value)}
                className="w-full h-10"
                min="0"
              />
            </div>
          </div>
          <div className="flex space-x-3 pt-3 border-t border-gray-200">
            <Button variant="outline" onClick={closeUpdateStock} className="flex-1 h-10">
              {t.cancel}
            </Button>
            <Button
              onClick={handleUpdateStock}
              className="bg-green-600 hover:bg-green-700 flex-1 h-10"
              disabled={!selectedMedicine || !updateQuantity}
            >
              {t.update}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Restock Modal */}
      <Modal isOpen={restockOpen} onClose={closeRestock}>
        <div className="p-4 flex flex-col min-h-0">
          <h2 className="text-lg font-semibold mb-3">{t.restock}</h2>
          <div className="space-y-3 flex-1 min-h-0">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.addQuantity}</label>
              <Input
                type="number"
                placeholder={t.enterQuantity}
                value={restockQuantity}
                onChange={(e) => {
                  console.log('Restock quantity changed:', e.target.value);
                  setRestockQuantity(e.target.value);
                }}
                className="w-full h-10"
                min="1"
              />
            </div>
          </div>
          <div className="flex space-x-3 pt-6 mt-4 border-t border-gray-200">
            <Button variant="outline" onClick={closeRestock} className="flex-1 h-10">
              {t.cancel}
            </Button>
            <Button
              onClick={handleRestock}
              className="bg-orange-600 hover:bg-orange-700 flex-1 h-10"
              disabled={!restockQuantity}
            >
              {t.restock}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Edit Medicine Modal */}
      <Modal isOpen={editMedicineOpen} onClose={closeEditMedicine}>
        <div className="p-4" style={{ maxHeight: '80vh' }}>
          <h2 className="text-lg font-semibold mb-3">{t.editMedicine}</h2>
          <div className="space-y-3 mb-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.medicineName}</label>
              <input
                type="text"
                placeholder={t.medicineName}
                value={editMedicineName}
                onChange={(e) => setEditMedicineName(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.category}</label>
              <select
                value={editMedicineCategory}
                onChange={(e) => setEditMedicineCategory(e.target.value)}
                className="w-full h-8 px-2 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Category</option>
                <option value="Painkillers">Painkillers</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t.price} (₹)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={editMedicinePrice}
                  onChange={(e) => setEditMedicinePrice(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t.quantity}</label>
                <input
                  type="number"
                  placeholder="0"
                  value={editMedicineQuantity}
                  onChange={(e) => setEditMedicineQuantity(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.minStock}</label>
              <input
                type="number"
                placeholder="0"
                value={editMedicineMinStock}
                onChange={(e) => setEditMedicineMinStock(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                min="0"
              />
            </div>
          </div>
          <div className="flex space-x-3 pt-3 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={closeEditMedicine}
              className="flex-1 h-10 border border-gray-300"
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleSaveEditMedicine}
              className="flex-1 h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium border-0"
              style={{
                backgroundColor: '#2563eb',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {t.save}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add Medicine Modal */}
      <Modal isOpen={addMedicineOpen} onClose={closeAddMedicine}>
        <div className="p-4" style={{ maxHeight: '80vh' }}>
          <h2 className="text-lg font-semibold mb-3">{t.addMedicineModalTitle}</h2>
          <div className="space-y-3 mb-4 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 120px)' }}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.medicineName}</label>
              <input
                type="text"
                placeholder={t.medicineName}
                value={addMedicineName}
                onChange={(e) => setAddMedicineName(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.category}</label>
              <select
                value={addMedicineCategory}
                onChange={(e) => setAddMedicineCategory(e.target.value)}
                className="w-full h-8 px-2 py-1 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select Category</option>
                <option value="Painkillers">Painkillers</option>
                <option value="Antibiotics">Antibiotics</option>
                <option value="Diabetes">Diabetes</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Cardiovascular">Cardiovascular</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t.price} (₹)</label>
                <input
                  type="number"
                  placeholder="0"
                  value={addMedicinePrice}
                  onChange={(e) => setAddMedicinePrice(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t.quantity}</label>
                <input
                  type="number"
                  placeholder="0"
                  value={addMedicineQuantity}
                  onChange={(e) => setAddMedicineQuantity(e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  min="0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">{t.minStock}</label>
              <input
                type="number"
                placeholder="0"
                value={addMedicineMinStock}
                onChange={(e) => setAddMedicineMinStock(e.target.value)}
                className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                min="0"
              />
            </div>
          </div>
          <div className="flex space-x-3 pt-3 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={closeAddMedicine}
              className="flex-1 h-10 border border-gray-300"
            >
              {t.cancel}
            </Button>
            <Button
              onClick={handleSaveAddMedicine}
              className="flex-1 h-10 bg-green-600 hover:bg-green-700 text-white font-medium border-0"
            >
              {t.addMedicine}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Coming Soon Modal */}
      <Modal isOpen={comingSoonOpen} onClose={closeComingSoon}>
        <div className="p-4">
          <h2 className="text-lg font-semibold text-center mb-3">{t.comingSoon}</h2>
          <div className="text-center py-3">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Edit className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-600 text-sm">{t.featureComingSoon}</p>
          </div>
          <div className="flex justify-center mt-4">
            <Button onClick={closeComingSoon} className="bg-blue-600 hover:bg-blue-700 h-10 px-8">
              OK
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}