import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  Package,
  MapPin,
  CalendarCheck,
  Edit,
  Trash2,
  LogOut,
  CheckCircle,
  Clock,
  Trash,
  MessageSquare,
  Settings,
  UserPlus,
  X,
  Plus,
  ChevronRight,
  Phone,
  Mail,
  User,
  Lock,
  Compass,
  Sparkles,
  Info
} from 'lucide-react';
import { getVehicleImage } from '../../utils/imageImports';
import { useNavigate } from 'react-router-dom';
import API_BASE_URL from '../../apiConfig.js';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [toast, setToast] = useState(null);

  // Authenticate
  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn');
    if (!loggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // State Management
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [settings, setSettings] = useState({ name: '', phone: '', whatsapp: '', password: '' });
  const [whatsappStatus, setWhatsappStatus] = useState({ isConnected: false, qrCode: null });
  const [loadingWhatsapp, setLoadingWhatsapp] = useState(false);

  const [loading, setLoading] = useState(true);

  // Modal forms states
  const [carModal, setCarModal] = useState({ isOpen: false, isEdit: false, data: null });
  const [pkgModal, setPkgModal] = useState({ isOpen: false, isEdit: false, data: null });
  const [newAdmin, setNewAdmin] = useState({ name: '', phone: '', whatsapp: '', password: '' });

  // Pre-defined values for assets mapping
  const availableCarImages = [
    'sedan_cab-removebg-preview.png',
    'toyota_etios-removebg-preview.png',
    'innova_crysta-removebg-preview.png',
    'suv-removebg-preview.png',
    'tempo_traveller-removebg-preview.png'
  ];

  const availableBgs = [
    'kanyakumari_bg.png',
    'thirumalai_mahal_bg.png',
    'kodaikanal_bg.png',
    'munnar_bg.png',
    'rameswaram_bg.png'
  ];

  const availablePkgImages = [
    'meenakshi_bg.png',
    'rameswaram_bg.png',
    'kodaikanal_bg.png',
    'ooty_bg.png'
  ];

  // Fetch functions
  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/bookings`);
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading bookings.', 'error');
    }
  };

  const fetchCars = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/cars`);
      if (res.ok) {
        const data = await res.json();
        setCars(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading vehicles.', 'error');
    }
  };

  const fetchPackages = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/packages`);
      if (res.ok) {
        const data = await res.json();
        setPackages(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading packages.', 'error');
    }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/contacts`);
      if (res.ok) {
        const data = await res.json();
        setContacts(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading contact messages.', 'error');
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/settings`);
      if (res.ok) {
        const data = await res.json();
        if (data) setSettings(data);
      }
    } catch (err) {
      console.error(err);
      showToast('Error loading system settings.', 'error');
    }
  };

  const fetchWhatsappStatus = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/whatsapp-status`);
      if (res.ok) {
        const data = await res.json();
        setWhatsappStatus(data);
      }
    } catch (err) {
      console.error('Error loading WhatsApp status:', err);
    }
  };

  const handleWhatsappReconnect = async () => {
    setLoadingWhatsapp(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/whatsapp-reconnect`, {
        method: 'POST'
      });
      if (res.ok) {
        showToast('Reconnection sequence triggered.');
        await fetchWhatsappStatus();
      } else {
        showToast('Failed to trigger reconnect.', 'error');
      }
    } catch (err) {
      showToast('Connection error.', 'error');
    } finally {
      setLoadingWhatsapp(false);
    }
  };

  // Load all based on active tab
  useEffect(() => {
    setLoading(true);
    const loadData = async () => {
      if (activeTab === 'bookings') await fetchBookings();
      if (activeTab === 'cars') await fetchCars();
      if (activeTab === 'packages') await fetchPackages();
      if (activeTab === 'contacts') await fetchContacts();
      if (activeTab === 'settings') await fetchSettings();
      setLoading(false);
    };
    loadData();
  }, [activeTab]);

  useEffect(() => {
    let interval;
    if (activeTab === 'settings') {
      fetchWhatsappStatus();
      interval = setInterval(fetchWhatsappStatus, 5000);
    }
    return () => clearInterval(interval);
  }, [activeTab]);

  // Logout - redirects to home page "/"
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    navigate('/');
  };

  // Bookings Handlers
  const handleStatusUpdate = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pending' ? 'Confirmed' : currentStatus === 'Confirmed' ? 'Completed' : 'Pending';
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (response.ok) {
        setBookings(bookings.map(b => b.id === id ? { ...b, status: nextStatus } : b));
        showToast(`Booking status updated to ${nextStatus}.`);
      } else {
        showToast('Failed to update booking status.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  const handleDeleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/bookings/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setBookings(bookings.filter(b => b.id !== id));
        showToast('Booking deleted successfully.');
      } else {
        showToast('Failed to delete booking.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Cars (Fleet) CRUD
  const handleOpenCarModal = (isEdit = false, data = null) => {
    setCarModal({
      isOpen: true,
      isEdit,
      data: data ? { ...data } : { name: '', seats: '4 Seater', ac: 'AC', price: '₹12/km', desc: '', image: availableCarImages[0], bgImage: availableBgs[0] }
    });
  };

  const handleCarSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, data } = carModal;
    const url = isEdit ? `${API_BASE_URL}/api/cars/${data.id}` : `${API_BASE_URL}/api/cars`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        showToast(isEdit ? 'Vehicle updated successfully.' : 'Vehicle added successfully.');
        setCarModal({ isOpen: false, isEdit: false, data: null });
        fetchCars();
      } else {
        showToast('Failed to save vehicle details.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving vehicle details.', 'error');
    }
  };

  const handleDeleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vehicle?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/cars/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setCars(cars.filter(c => c.id !== id));
        showToast('Vehicle removed from fleet.');
      } else {
        showToast('Failed to delete vehicle.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Packages CRUD
  const handleOpenPkgModal = (isEdit = false, data = null) => {
    setPkgModal({
      isOpen: true,
      isEdit,
      data: data ? { ...data } : { name: '', duration: '', places: '', price: '', image: availablePkgImages[0] }
    });
  };

  const handlePkgSubmit = async (e) => {
    e.preventDefault();
    const { isEdit, data } = pkgModal;
    const url = isEdit ? `${API_BASE_URL}/api/packages/${data.id}` : `${API_BASE_URL}/api/packages`;
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        showToast(isEdit ? 'Package updated successfully.' : 'Package added successfully.');
        setPkgModal({ isOpen: false, isEdit: false, data: null });
        fetchPackages();
      } else {
        showToast('Failed to save package.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Error saving package.', 'error');
    }
  };

  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/packages/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setPackages(packages.filter(p => p.id !== id));
        showToast('Package deleted successfully.');
      } else {
        showToast('Failed to delete package.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Contact Us message delete
  const handleDeleteContact = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/contacts/${id}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        setContacts(contacts.filter(c => c.id !== id));
        showToast('Message deleted successfully.');
      } else {
        showToast('Failed to delete message.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Settings Handlers
  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (response.ok) {
        showToast('Admin settings saved successfully.');
      } else {
        showToast('Failed to save admin settings.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  // Add Admin Handler
  const handleAddAdminSubmit = async (e) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.password) {
      showToast('Name and password are required.', 'error');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin)
      });
      if (response.ok) {
        showToast('Additional administrator registered successfully.');
        setNewAdmin({ name: '', phone: '', whatsapp: '', password: '' });
      } else {
        showToast('Failed to register new administrator.', 'error');
      }
    } catch (err) {
      console.error(err);
      showToast('Connection error.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row font-roboto">

      {/* Sidebar navigation */}
      <div className="w-full md:w-64 bg-slate-950 flex flex-col border-r border-slate-800 shadow-2xl z-20">
        <div className="p-6 flex items-center gap-3 border-b border-slate-850">
          <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
            <Car className="text-slate-950 w-6 h-6" />
          </div>
          <div>
            <h2 className="font-bold text-lg leading-tight text-white">Madurai Taxi</h2>
            <p className="text-xs text-yellow-400 font-medium">Control Center</p>
          </div>
        </div>

        <nav className="flex-grow py-6">
          <ul className="space-y-1.5 px-3">
            <li>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'bookings'
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <CalendarCheck className="w-5 h-5" /> Manage Bookings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('cars')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'cars'
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <Car className="w-5 h-5" /> Manage Cars
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('packages')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'packages'
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <Package className="w-5 h-5" /> Manage Packages
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'contacts'
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <MessageSquare className="w-5 h-5" /> Contact Queries
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'settings'
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <Settings className="w-5 h-5" /> Admin Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab('add-admin')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'add-admin'
                  ? 'bg-yellow-400 text-slate-950 font-bold shadow-[0_0_15px_rgba(250,204,21,0.2)]'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
                  }`}
              >
                <UserPlus className="w-5 h-5" /> Add Administrator
              </button>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-850">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white rounded-xl transition-all font-bold text-sm"
          >
            <LogOut className="w-4 h-4" /> Logout Admin
          </button>
        </div>
      </div>

      {/* Toast notifications */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl font-bold flex items-center gap-3 ${toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
              }`}
          >
            {toast.type === 'error' ? <Trash2 className="w-5 h-5" /> : <CheckCircle className="w-5 h-5" />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main dashboard content view */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 text-slate-200">

        <header className="bg-slate-950 border-b border-slate-800 px-6 py-4 md:px-8 flex justify-between items-center shadow-md">
          <h1 className="text-xl md:text-2xl font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <span className="text-yellow-400">●</span> {activeTab.replace('-', ' ')}
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <span className="block text-sm font-semibold text-white">Superadmin Panel</span>
              <span className="block text-xs text-yellow-400">Madurai Tour Taxi</span>
            </div>
            <div className="w-10 h-10 bg-yellow-400 text-slate-950 rounded-full font-bold flex items-center justify-center text-lg">
              SA
            </div>
          </div>
        </header>

        <main className="flex-grow p-6 md:p-8 overflow-y-auto">
          <AnimatePresence mode="wait">

            {/* BOOKINGS VIEW */}
            {activeTab === 'bookings' && (
              <motion.div key="bookings" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400 font-medium">
                      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                      Loading bookings from database...
                    </div>
                  ) : bookings.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                      <CalendarCheck className="w-16 h-16 mb-4 text-slate-650" />
                      <p className="text-lg font-bold text-white">No Bookings Found</p>
                      <p className="text-sm text-slate-500 mt-1">Bookings submitted from the site show up automatically.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                          <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 text-xs uppercase tracking-wider">
                            <th className="px-6 py-4 font-semibold">Booking ID</th>
                            <th className="px-6 py-4 font-semibold">Customer Details</th>
                            <th className="px-6 py-4 font-semibold">Route (Start → End)</th>
                            <th className="px-6 py-4 font-semibold">Date & Time</th>
                            <th className="px-6 py-4 font-semibold">Vehicle / Package</th>
                            <th className="px-6 py-4 font-semibold">Status</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-850 text-sm">
                          {bookings.map(booking => (
                            <tr key={booking.id} className="hover:bg-slate-900/40 transition-colors">
                              <td className="px-6 py-4 font-mono font-bold text-xs text-yellow-400">
                                BKG-{String(booking.id).padStart(4, '0')}
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-bold text-white">{booking.name}</div>
                                <div className="text-xs text-slate-400">{booking.phone}</div>
                              </td>
                              <td className="px-6 py-4 max-w-[260px]">
                                <div className="text-xs truncate text-slate-200" title={booking.fromLocation}>
                                  <span className="text-emerald-500 mr-1.5 font-bold">●</span>{booking.fromLocation}
                                </div>
                                <div className="text-xs truncate text-slate-200 mt-1" title={booking.toLocation}>
                                  <span className="text-rose-500 mr-1.5 font-bold">●</span>{booking.toLocation}
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-semibold text-slate-200">{booking.date}</div>
                                <div className="text-xs text-slate-400">{booking.time || 'Not specified'}</div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-semibold text-yellow-400">{booking.vehicle || 'Not Selected'}</div>
                                <div className="text-xs text-slate-400 italic">{booking.packageType || 'Custom Trip'}</div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${booking.status === 'Completed'
                                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                  : booking.status === 'Confirmed'
                                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                                  }`}>
                                  {booking.status || 'Pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <div className="flex gap-2 justify-end">
                                  <button
                                    onClick={() => handleStatusUpdate(booking.id, booking.status || 'Pending')}
                                    className="bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400 hover:text-slate-950 font-bold text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-yellow-400/25 transition-all"
                                  >
                                    <Clock className="w-3.5 h-3.5" /> Status
                                  </button>
                                  <button
                                    onClick={() => handleDeleteBooking(booking.id)}
                                    className="bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white p-2 rounded-lg border border-red-500/20 transition-all"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* VEHICLES (FLEET) VIEW */}
            {activeTab === 'cars' && (
              <motion.div key="cars" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white">Active Fleets</h3>
                  <button
                    onClick={() => handleOpenCarModal(false)}
                    className="bg-yellow-400 text-slate-950 hover:bg-yellow-500 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Add Vehicle
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-20">
                    <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : cars.length === 0 ? (
                  <div className="bg-slate-950 rounded-2xl p-12 border border-slate-800 text-center text-slate-400">
                    <Car className="w-16 h-16 mx-auto mb-4 text-slate-700" />
                    <p className="font-bold text-white text-lg">No Vehicles Configured</p>
                    <p className="text-sm mt-1">Add a new car to display in the website show fleet.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map(car => (
                      <div key={car.id} className="bg-slate-950 rounded-2xl border border-slate-800 hover:border-yellow-400/40 overflow-hidden shadow-lg transition-all flex flex-col group">
                        <div className="h-44 bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden border-b border-slate-850">
                          {/* Ambient background */}
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent z-10" />
                          <div className="absolute bottom-2 right-4 z-20 bg-yellow-400 text-slate-950 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                            {car.price}
                          </div>
                          <img
                            src={getVehicleImage(car.image)}
                            alt={car.name}
                            className="h-28 object-contain z-20 group-hover:scale-105 transition-transform duration-500 filter drop-shadow-[0_10px_15px_rgba(0,0,0,0.6)]"
                            onError={(e) => { e.target.src = getVehicleImage('toyota_etios-removebg-preview.png'); }}
                          />
                        </div>
                        <div className="p-5 flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-white text-lg">{car.name}</h4>
                            <div className="flex gap-2.5 mt-2 mb-3">
                              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-xs font-semibold text-slate-300">
                                {car.seats}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-900 border border-slate-800 rounded text-xs font-semibold text-slate-300">
                                {car.ac}
                              </span>
                            </div>
                            <p className="text-slate-400 text-xs line-clamp-3 leading-relaxed mb-4">
                              {car.desc}
                            </p>
                          </div>
                          <div className="flex gap-3 pt-3 border-t border-slate-850">
                            <button
                              onClick={() => handleOpenCarModal(true, car)}
                              className="flex-1 bg-slate-900 hover:bg-slate-850 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1 border border-slate-800 transition-colors"
                            >
                              <Edit className="w-3.5 h-3.5 text-yellow-400" /> Edit
                            </button>
                            <button
                              onClick={() => handleDeleteCar(car.id)}
                              className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 font-bold p-2.5 rounded-xl border border-red-500/20 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {/* PACKAGES VIEW */}
            {activeTab === 'packages' && (
              <motion.div key="packages" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-white">Tour Packages</h3>
                  <button
                    onClick={() => handleOpenPkgModal(false)}
                    className="bg-yellow-400 text-slate-950 hover:bg-yellow-500 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-transform active:scale-95"
                  >
                    <Plus className="w-4 h-4" /> Create Package
                  </button>
                </div>

                {loading ? (
                  <div className="text-center py-20">
                    <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
                  </div>
                ) : packages.length === 0 ? (
                  <div className="bg-slate-950 rounded-2xl p-12 border border-slate-800 text-center text-slate-400">
                    <Package className="w-16 h-16 mx-auto mb-4 text-slate-700" />
                    <p className="font-bold text-white text-lg">No Packages Configured</p>
                    <p className="text-sm mt-1">Configure packages to display in the website packages page.</p>
                  </div>
                ) : (
                  <div className="bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-900 border-b border-slate-850 text-slate-400 text-xs uppercase tracking-wider">
                          <th className="px-6 py-4 font-semibold">Package Name</th>
                          <th className="px-6 py-4 font-semibold">Duration Details</th>
                          <th className="px-6 py-4 font-semibold">Tour Description</th>
                          <th className="px-6 py-4 font-semibold">Starting Price</th>
                          <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-850 text-sm">
                        {packages.map(pkg => (
                          <tr key={pkg.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="px-6 py-4 font-bold text-white">{pkg.name}</td>
                            <td className="px-6 py-4 text-slate-300 font-semibold">{pkg.duration}</td>
                            <td className="px-6 py-4 max-w-[320px] text-xs text-slate-400 leading-relaxed">
                              {pkg.places}
                            </td>
                            <td className="px-6 py-4 font-bold text-emerald-400">{pkg.price}</td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex gap-2 justify-end">
                                <button
                                  onClick={() => handleOpenPkgModal(true, pkg)}
                                  className="bg-slate-900 hover:bg-slate-850 p-2 rounded-lg border border-slate-800"
                                >
                                  <Edit className="w-4 h-4 text-yellow-400" />
                                </button>
                                <button
                                  onClick={() => handleDeletePackage(pkg.id)}
                                  className="bg-red-500/10 hover:bg-red-500 hover:text-white p-2 rounded-lg border border-red-500/20 transition-all text-red-400"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </motion.div>
            )}

            {/* CONTACT MESSAGES VIEW */}
            {activeTab === 'contacts' && (
              <motion.div key="contacts" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
                  {loading ? (
                    <div className="text-center py-20">
                      <div className="w-10 h-10 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto" />
                    </div>
                  ) : contacts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-450">
                      <MessageSquare className="w-16 h-16 mb-4 text-slate-700" />
                      <p className="text-lg font-bold text-white">No Message Queries</p>
                      <p className="text-sm text-slate-500 mt-1">Queries from customer Contact Us form show here.</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-850">
                      {contacts.map(c => (
                        <div key={c.id} className="p-6 hover:bg-slate-900/30 transition-colors flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="font-bold text-white text-lg">{c.name}</span>
                              <span className="text-xs text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20 font-mono">
                                {new Date(c.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-400 text-xs">
                              <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-slate-500" /> {c.phone}</span>
                              <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-500" /> {c.email}</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed pt-1 bg-slate-900/40 p-3 rounded-xl border border-slate-850 mt-2">
                              {c.message}
                            </p>
                          </div>
                          <button
                            onClick={() => handleDeleteContact(c.id)}
                            className="bg-red-500/10 hover:bg-red-500 hover:text-white text-red-400 p-2.5 rounded-xl border border-red-500/20 transition-all self-end md:self-auto cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* SETTINGS VIEW */}
            {activeTab === 'settings' && (
              <motion.div key="settings" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Settings form card */}
                  <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-slate-800 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-yellow-400" /> Superadmin Profile Configurations
                    </h3>

                    <form onSubmit={handleSettingsSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Superadmin Username</label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                          <input
                            type="text"
                            value={settings.name}
                            onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-850 text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm font-semibold"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Contact Phone</label>
                          <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                            <input
                              type="text"
                              value={settings.phone}
                              onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-850 text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm font-semibold"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">WhatsApp Dispatch Number</label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">WA</span>
                            <input
                              type="text"
                              value={settings.whatsapp}
                              onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                              className="w-full bg-slate-900 border border-slate-850 text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm font-semibold"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Change Security Passcode</label>
                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                          <input
                            type="password"
                            value={settings.password}
                            onChange={(e) => setSettings({ ...settings, password: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-850 text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm font-mono tracking-widest font-bold"
                            placeholder="••••••••"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(250,204,21,0.25)] flex items-center justify-center gap-2 cursor-pointer font-poppins text-sm uppercase tracking-wider"
                      >
                        Save Configuration Settings
                      </button>
                    </form>
                  </div>

                  {/* WhatsApp Bot Connection Manager Card */}
                  <div className="bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-slate-800 flex items-center gap-2">
                        <span className="text-yellow-400">⚡</span> WhatsApp Notification Bot Status
                      </h3>

                      <div className="bg-slate-900 rounded-2xl p-5 border border-slate-850 flex items-center justify-between mb-6">
                        <div>
                          <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Bot Status</p>
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${whatsappStatus.isConnected
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                            : 'bg-red-500/10 text-red-400 border border-red-500/30'
                            }`}>
                            <span className={`w-2 h-2 rounded-full ${whatsappStatus.isConnected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`}></span>
                            {whatsappStatus.isConnected ? 'CONNECTED' : 'DISCONNECTED'}
                          </span>
                        </div>
                        <button
                          onClick={handleWhatsappReconnect}
                          disabled={loadingWhatsapp}
                          className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-750 px-4 py-2 rounded-xl text-xs font-bold transition-all disabled:opacity-50"
                        >
                          {loadingWhatsapp ? 'Reconnecting...' : 'Reconnect Bot'}
                        </button>
                      </div>

                      {!whatsappStatus.isConnected && (
                        <div className="text-center p-4 bg-slate-900 border border-slate-850 rounded-2xl">
                          <p className="text-sm text-slate-300 font-bold mb-4">Scan QR code using WhatsApp Link a Device:</p>
                          {whatsappStatus.qrCode ? (
                            <div className="bg-white p-3 rounded-2xl inline-block shadow-lg">
                              <div className="w-48 h-48 bg-slate-100 flex flex-col items-center justify-center text-xs text-slate-500 text-center p-4">
                                <span>QR Code Generation Disabled</span>
                                <span className="mt-1">Link your device via console or wait for appeal.</span>
                              </div>
                            </div>
                          ) : (
                            <div className="py-8 flex flex-col items-center justify-center text-slate-500">
                              <div className="w-8 h-8 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin mb-3"></div>
                              <p className="text-xs">Waiting for server to generate QR code...</p>
                            </div>
                          )}
                          <p className="text-xs text-slate-400 mt-4 leading-relaxed">
                            Open WhatsApp on your phone → Tap Menu or Settings → Linked Devices → Link a Device.
                          </p>
                        </div>
                      )}

                      {whatsappStatus.isConnected && (
                        <div className="text-center p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-emerald-400">
                          <p className="text-sm font-bold">Bot is active and ready to dispatch booking and contact alerts to admin.</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 text-xs text-slate-500">
                      <p>Note: Session credentials are stored securely in SQLite and persist across restarts.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ADD ADMIN VIEW */}
            {activeTab === 'add-admin' && (
              <motion.div key="add-admin" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}>
                <div className="max-w-2xl bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl p-8">
                  <h3 className="text-xl font-bold text-white mb-6 pb-3 border-b border-slate-800 flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-yellow-400" /> Create Administrator Account
                  </h3>

                  <form onSubmit={handleAddAdminSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Account ID / Username</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <input
                          type="text"
                          value={newAdmin.name}
                          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-850 text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm font-semibold"
                          placeholder="e.g. Subadmin2"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Phone</label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                          <input
                            type="text"
                            value={newAdmin.phone}
                            onChange={(e) => setNewAdmin({ ...newAdmin, phone: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-850 text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm font-semibold"
                            placeholder="Enter phone number"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">WhatsApp Number</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xs">WA</span>
                          <input
                            type="text"
                            value={newAdmin.whatsapp}
                            onChange={(e) => setNewAdmin({ ...newAdmin, whatsapp: e.target.value })}
                            className="w-full bg-slate-900 border border-slate-850 text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm font-semibold"
                            placeholder="Enter WhatsApp alert recipient number"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Security Passcode</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
                        <input
                          type="password"
                          value={newAdmin.password}
                          onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                          className="w-full bg-slate-900 border border-slate-850 text-white pl-11 pr-4 py-3.5 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 transition-all text-sm font-semibold"
                          placeholder="Create passcode"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-[0_0_15px_rgba(250,204,21,0.25)] flex items-center justify-center gap-2 cursor-pointer font-poppins text-sm uppercase tracking-wider"
                    >
                      Register Admin Account
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>
      </div>

      {/* DYNAMIC VEHICLE MODAL */}
      <AnimatePresence>
        {carModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCarModal({ isOpen: false, isEdit: false, data: null })}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl z-10 text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setCarModal({ isOpen: false, isEdit: false, data: null })}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-850 pb-3">
                <Car className="w-5 h-5 text-yellow-400" /> {carModal.isEdit ? 'Update Vehicle Info' : 'Add New Fleet Vehicle'}
              </h3>

              <form onSubmit={handleCarSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Vehicle Name</label>
                  <input
                    type="text"
                    value={carModal.data.name}
                    onChange={(e) => setCarModal({ ...carModal, data: { ...carModal.data, name: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                    placeholder="e.g. Toyota Innova Crysta"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Seats Capacity</label>
                    <select
                      value={carModal.data.seats}
                      onChange={(e) => setCarModal({ ...carModal, data: { ...carModal.data, seats: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                    >
                      <option value="4 Seater">4 Seater</option>
                      <option value="7 Seater">7 Seater</option>
                      <option value="12 Seater">12 Seater</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Air Conditioning</label>
                    <select
                      value={carModal.data.ac}
                      onChange={(e) => setCarModal({ ...carModal, data: { ...carModal.data, ac: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                    >
                      <option value="AC">AC</option>
                      <option value="Non-AC">Non-AC</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Price / Rate Description</label>
                    <input
                      type="text"
                      value={carModal.data.price}
                      onChange={(e) => setCarModal({ ...carModal, data: { ...carModal.data, price: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                      placeholder="e.g. ₹18/km"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Scenic Background</label>
                    <select
                      value={carModal.data.bgImage}
                      onChange={(e) => setCarModal({ ...carModal, data: { ...carModal.data, bgImage: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                    >
                      {availableBgs.map(bg => (
                        <option key={bg} value={bg}>{bg.replace('_bg.png', '').replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Select Premium Vehicle Image Asset</label>
                  <select
                    value={carModal.data.image}
                    onChange={(e) => setCarModal({ ...carModal, data: { ...carModal.data, image: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                  >
                    {availableCarImages.map(img => (
                      <option key={img} value={img}>{img.replace('-removebg-preview.png', '').replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Fleet Description</label>
                  <textarea
                    value={carModal.data.desc}
                    onChange={(e) => setCarModal({ ...carModal, data: { ...carModal.data, desc: e.target.value } })}
                    rows="3"
                    className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                    placeholder="Provide details about seat availability, comfort level, luggage specs, etc."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition-all"
                >
                  Save Vehicle Details
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DYNAMIC TOUR PACKAGE MODAL */}
      <AnimatePresence>
        {pkgModal.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPkgModal({ isOpen: false, isEdit: false, data: null })}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 max-w-lg w-full shadow-2xl z-10 text-left max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setPkgModal({ isOpen: false, isEdit: false, data: null })}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 border-b border-slate-850 pb-3">
                <Package className="w-5 h-5 text-yellow-400" /> {pkgModal.isEdit ? 'Update Package Info' : 'Create New Tour Package'}
              </h3>

              <form onSubmit={handlePkgSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Package Name</label>
                  <input
                    type="text"
                    value={pkgModal.data.name}
                    onChange={(e) => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, name: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                    placeholder="e.g. Madurai Local Sightseeing"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Duration Detail</label>
                    <input
                      type="text"
                      value={pkgModal.data.duration}
                      onChange={(e) => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, duration: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                      placeholder="e.g. 8 Hours / 80 KM"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Starting Price</label>
                    <input
                      type="text"
                      value={pkgModal.data.price}
                      onChange={(e) => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, price: e.target.value } })}
                      className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                      placeholder="e.g. ₹1600"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Package Background Image</label>
                  <select
                    value={pkgModal.data.image}
                    onChange={(e) => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, image: e.target.value } })}
                    className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                  >
                    {availablePkgImages.map(img => (
                      <option key={img} value={img}>{img.replace('_bg.png', '').replace('_', ' ')}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Tour Places / Description</label>
                  <textarea
                    value={pkgModal.data.places}
                    onChange={(e) => setPkgModal({ ...pkgModal, data: { ...pkgModal.data, places: e.target.value } })}
                    rows="4"
                    className="w-full bg-slate-950 border border-slate-850 text-white px-4 py-3 rounded-xl focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 text-sm font-semibold"
                    placeholder="Mention historical structures, spots, or itinerary highlights..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-950 font-bold py-3.5 rounded-xl text-sm transition-all"
                >
                  Save Tour Package Details
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default AdminDashboard;
