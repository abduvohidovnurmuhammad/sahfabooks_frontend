import React, { useState, useEffect } from 'react';
import { X, Eye, FileText, LogOut, Users, Package, User, Trash2, Download, Menu } from 'lucide-react';
import * as api from './api';

// Tarjimalar
const translations = {
  en: {
    username: 'Username',
    password: 'Password',
    login: 'Login',
    logout: 'Logout',
    clients: 'Clients',
    orders: 'Orders',
    myFiles: 'My Files',
    myOrders: 'My Orders',
    profile: 'Profile',
    schoolName: 'School Name',
    phone: 'Phone',
    address: 'Address',
    status: 'Status',
    active: 'Active',
    actions: 'Actions',
    view: 'View',
    format: 'Format',
    cashPrice: 'Cash Price',
    bankPrice: 'Bank Price',
    colorPrinting: 'Color',
    blackWhite: 'B&W',
    orderNow: 'Order Now',
    placeOrder: 'Place Order',
    selectFiles: 'Select Files',
    quantity: 'Quantity',
    totalPrice: 'Total Price',
    cancel: 'Cancel',
    submitOrder: 'Submit Order',
    orderId: 'Order ID',
    orderDate: 'Order Date',
    changePassword: 'Change Password',
    pendingFiles: 'Price Approval',
    approvePrices: 'Set Prices',
    clientName: 'Client',
    uploadedFile: 'Uploaded File',
    requestedQty: 'Requested Qty',
    setCashPrice: 'Cash Price',
    setBankPrice: 'Bank Price',
    approve: 'Approve',
    reject: 'Reject',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  },
  uz: {
    username: 'Foydalanuvchi nomi',
    password: 'Parol',
    login: 'Kirish',
    logout: 'Chiqish',
    clients: 'Mijozlar',
    orders: 'Buyurtmalar',
    myFiles: 'Mening fayllarim',
    myOrders: 'Mening buyurtmalarim',
    profile: 'Profil',
    schoolName: 'Maktab nomi',
    phone: 'Telefon',
    address: 'Manzil',
    status: 'Holat',
    active: 'Faol',
    actions: 'Harakatlar',
    view: 'Ko\'rish',
    format: 'Format',
    cashPrice: 'Naqd narx',
    bankPrice: 'Bank narx',
    colorPrinting: 'Rangli',
    blackWhite: 'Oq-Qora',
    orderNow: 'Buyurtma berish',
    placeOrder: 'Buyurtma berish',
    selectFiles: 'Fayllarni tanlash',
    quantity: 'Miqdor',
    totalPrice: 'Jami narx',
    cancel: 'Bekor qilish',
    submitOrder: 'Buyurtma yuborish',
    orderId: 'Buyurtma ID',
    orderDate: 'Buyurtma sanasi',
    changePassword: 'Parolni o\'zgartirish',
    pendingFiles: 'Narx Belgilash',
    approvePrices: 'Narx Qo\'yish',
    clientName: 'Mijoz',
    uploadedFile: 'Yuklangan Fayl',
    requestedQty: 'So\'ralgan Miqdor',
    setCashPrice: 'Naqd Narx',
    setBankPrice: 'Bank Narx',
    approve: 'Tasdiqlash',
    reject: 'Rad Etish',
    pending: 'Kutilmoqda',
    approved: 'Tasdiqlangan',
    rejected: 'Rad Etilgan',
  }
};

export default function App() {
  const [lang, setLang] = useState('uz');
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('clients');
  const [selectedClient, setSelectedClient] = useState(null);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showClientUploadModal, setShowClientUploadModal] = useState(false);
  
  const [newFile, setNewFile] = useState({
    client_id: '',
    title: '',
    description: '',
    file: null,
    cash_price: '',
    bank_price: '',
    show_price: true,
    stock: 0,
    page_size: 'A4',
    color_type: 'B&W',
    file_format: 'PDF'
  });

  const [clientFile, setClientFile] = useState({
    title: '',
    description: '',
    cover_file: null,  // Muqova fayli
    content_file: null,  // Ichki content fayli
    quantity: 1,
    page_size: 'A4',
    color_type: 'B&W',
    file_format: 'PDF'
  });

  useEffect(() => {
    const loadOrders = async () => {
      if (user && (section === 'orders' || section === 'myOrders')) {
        try {
          console.log('📦 Orders yuklanmoqda...');
          const ordersData = await api.getOrders();
          if (ordersData.success) {
            console.log('✅ Orders yuklandi:', ordersData.orders.length);
            setOrders(ordersData.orders);
          }
        } catch (err) {
          console.error('❌ Orders yuklash xatolik:', err);
        }
      }
    };
    
    loadOrders();
  }, [user, section]);

  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      try {
        if (user.type === 'admin') {
          const usersData = await api.getUsers();
          console.log('Users yuklandi:', usersData);
          
          const filesData = await api.getFiles();
          console.log('Files yuklandi:', filesData);
          
          if (usersData.users) {
            const clientUsers = usersData.users
              .filter(u => u.role === 'client')
              .map(u => ({
                id: u.id,
                schoolName: u.organization_name || u.full_name || u.username,
                phone1: u.phone || 'N/A',
                phone2: '',
                address: u.address || 'N/A',
                status: 'active',
                files: filesData.files ? filesData.files
                  .filter(f => f.client_id === u.id)
                  .map(f => ({
                    id: f.id,
                    name: f.title,
                    format: f.file_format || 'N/A',
                    cashPrice: f.cash_price || 0,
                    bankPrice: f.bank_price || 0,
                    color: f.color_type === 'Color',
                    priceVisibility: f.show_price ? 'both' : 'none'
                  })) : []
              }));
            
            setClients(clientUsers);
            console.log('Clients yangilandi:', clientUsers);
          }
          
          const ordersData = await api.getOrders();
          console.log('Orders yuklandi:', ordersData);
          
          if (filesData.files) {
            const pending = filesData.files.filter(f => f.status === 'pending');
            setPendingFiles(pending);
            console.log('Pending files:', pending.length);
          }
          
        } else if (user.type === 'client') {
          const filesData = await api.getFiles();
          console.log('Files yuklandi (mijoz):', filesData);
          
          const clientFiles = filesData.files ? filesData.files.map(f => ({
            id: f.id,
            name: f.title,
            format: f.file_format || 'N/A',
            cashPrice: f.cash_price || 0,
            bankPrice: f.bank_price || 0,
            color: f.color_type === 'Color',
            priceVisibility: f.show_price ? 'both' : 'none',
            status: f.status || 'approved'  
          })) : [];
          
          setClients([{
            id: user.id || 1,
            schoolName: user.fullName || user.username,
            phone1: user.phone1 || 'N/A',
            phone2: user.phone2 || '',
            address: user.address || 'N/A',
            status: 'active',
            files: clientFiles
          }]);
          
          console.log('Mijoz fayllari yuklandi:', clientFiles);
          
          const ordersData = await api.getOrders();
          console.log('Orders yuklandi:', ordersData);
        }
      } catch (error) {
        console.error('Ma\'lumotlarni yuklashda xatolik:', error);
      }
    };
    
    loadData();
  }, [user]);

  const t = translations[lang];

  // Login funksiyasi
  const handleLogin = async (e) => {
    e.preventDefault();
    
    const un = e.target.username.value.trim();
    const pw = e.target.password.value.trim();
    
    try {
      console.log('Login urinishi:', un);
      const data = await api.login(un, pw);
      console.log('Backend javobi:', data);
      
      setUser({ 
        type: data.user.role, 
        username: data.user.username, 
        fullName: data.user.full_name,
        id: data.user.id  
      });
      setSection(data.user.role === 'admin' ? 'clients' : 'myFiles');
      alert(t.login === 'Kirish' ? 'Xush kelibsiz, ' + data.user.full_name : 'Welcome, ' + data.user.full_name);
    } catch (error) {
      console.error('Login xatolik:', error);
      alert(t.login === 'Kirish' ? 'Noto\'g\'ri ma\'lumotlar!' : 'Invalid credentials!');
    }
  };

  // Registration funksiyasi
  const handleRegister = async (e) => {
    e.preventDefault();
    
    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();
    const organizationName = e.target.organization_name.value.trim();
    const fullName = e.target.full_name.value.trim();
    const phone = e.target.phone.value.trim();
    const address = e.target.address.value.trim();
    
    try {
      console.log('Registration urinishi:', username);
      
      const response = await fetch('http://45.93.138.91:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password,
          organization_name: organizationName,
          full_name: fullName,
          phone,
          address
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Registration xatolik');
      }

      const data = await response.json();
      console.log('Registration muvaffaqiyatli:', data);
      
      alert('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi login qilishingiz mumkin.');
      setShowRegister(false);
      
    } catch (error) {
      console.error('Registration xatolik:', error);
      alert(error.message || 'Ro\'yxatdan o\'tishda xatolik!');
    }
  };

  // Yangi fayl qo'shish
  const handleAddFile = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('file', newFile.file);
      formData.append('client_id', newFile.client_id);
      formData.append('title', newFile.title);
      formData.append('description', newFile.description);
      formData.append('cash_price', newFile.cash_price);
      formData.append('bank_price', newFile.bank_price);
      formData.append('show_price', newFile.show_price);
      formData.append('stock', newFile.stock);
      formData.append('page_size', newFile.page_size);
      formData.append('color_type', newFile.color_type);
      formData.append('file_format', newFile.file_format);

      const response = await fetch('http://45.93.138.91:5000/api/files', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${api.getToken()}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Fayl qo\'shishda xatolik');

      const data = await response.json();
      console.log('Fayl qo\'shildi:', data);
      
      alert('Fayl muvaffaqiyatli qo\'shildi!');
      setShowAddFileModal(false);
      
      setNewFile({
        client_id: '',
        title: '',
        description: '',
        file: null,
        cash_price: '',
        bank_price: '',
        show_price: true,
        stock: 0,
        page_size: 'A4',
        color_type: 'B&W',
        file_format: 'PDF'
      });
      
      window.location.reload();
      
    } catch (error) {
      console.error('Xatolik:', error);
      alert('Fayl qo\'shishda xatolik!');
    }
  };

  // Faylni yuklab olish - cover yoki content
// Faylni yuklab olish - cover yoki content
const handleDownloadFile = async (fileId, fileName, fileType = 'content') => {
  try {
    // LOCAL uchun localhost ishlatamiz
    const endpoint = `http://45.93.138.91:5000/api/files/${fileId}/download/${fileType}`;
    
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${api.getToken()}`
      }
    });

    if (!response.ok) {
      throw new Error('Yuklab olishda xatolik');
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileType === 'cover' ? 'Muqova_' : 'Ichki_'}${fileName}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    console.log(`✅ ${fileType} fayl yuklab olindi!`);
    
  } catch (error) {
    console.error('Download xatolik:', error);
    alert(`${fileType === 'cover' ? 'Muqova' : 'Ichki'} faylni yuklab olishda xatolik!`);
  }
};

  // Mijoz fayl yuklash - 2 ta fayl (muqova + content)
  const handleClientFileUpload = async (e) => {
    e.preventDefault();
    
    try {
      // Validation: 2 ta fayl bo'lishi shart
      if (!clientFile.cover_file || !clientFile.content_file) {
        alert('Iltimos, ikkala faylni ham yuklang! (Muqova + Ichki content)');
        return;
      }

      const formData = new FormData();
      formData.append('cover_file', clientFile.cover_file);  // Muqova fayli
      formData.append('content_file', clientFile.content_file);  // Ichki content fayli
      formData.append('title', clientFile.title);
      formData.append('description', clientFile.description);
      formData.append('quantity', clientFile.quantity);
      formData.append('page_size', clientFile.page_size);
      formData.append('color_type', clientFile.color_type);
      formData.append('file_format', clientFile.file_format);
      formData.append('uploaded_by', 'client');
      formData.append('status', 'pending');

      const response = await fetch('http://45.93.138.91:5000/api/files/client-upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${api.getToken()}`
        },
        body: formData
      });

      if (!response.ok) throw new Error('Fayl yuklashda xatolik');

      const data = await response.json();
      console.log('Fayllar yuklandi:', data);
      
      alert('Muqova va ichki fayllar muvaffaqiyatli yuklandi! Admin narx belgilashini kuting.');
      setShowClientUploadModal(false);
      
      setClientFile({
        title: '',
        description: '',
        cover_file: null,
        content_file: null,
        quantity: 1,
        page_size: 'A4',
        color_type: 'B&W',
        file_format: 'PDF'
      });
      
      const filesData = await api.getFiles();
      if (filesData.files) {
        const clientFiles = filesData.files.map(f => ({
          id: f.id,
          name: f.title,
          format: f.file_format || 'N/A',
          cashPrice: f.cash_price || 0,
          bankPrice: f.bank_price || 0,
          color: f.color_type === 'Color',
          priceVisibility: f.show_price ? 'both' : 'none',
          cover_path: f.cover_path || null,  // Muqova path
          content_path: f.content_path || null  // Content path
        }));
        
        setClients([{
          id: user.id,
          schoolName: user.fullName || user.username,
          phone1: user.phone1 || 'N/A',
          phone2: user.phone2 || '',
          address: user.address || 'N/A',
          status: 'active',
          files: clientFiles
        }]);
      }
      
    } catch (error) {
      console.error('Upload xatolik:', error);
      alert('Fayllarni yuklashda xatolik!');
    }
  };

  // Admin: Faylni tasdiqlash
  const handleApproveFile = async (fileId, cashPrice, bankPrice) => {
    try {
      if (!cashPrice || !bankPrice) {
        alert('Iltimos, ikkala narxni kiriting!');
        return;
      }

      const response = await fetch(`http://45.93.138.91:5000/api/files/${fileId}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${api.getToken()}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          cash_price: parseFloat(cashPrice),
          bank_price: parseFloat(bankPrice)
        })
      });

      if (!response.ok) throw new Error('Tasdiqlashda xatolik');

      const data = await response.json();
      console.log('Fayl tasdiqlandi:', data);

      alert('Fayl muvaffaqiyatli tasdiqlandi! Mijoz endi buyurtma berishi mumkin.');
      setPendingFiles(pendingFiles.filter(f => f.id !== fileId));

    } catch (error) {
      console.error('Approve xatolik:', error);
      alert('Faylni tasdiqlashda xatolik!');
    }
  };

  // Admin: Faylni rad etish
  const handleRejectFile = async (fileId) => {
    try {
      if (!window.confirm('Faylni rad etmoqchimisiz?')) {
        return;
      }

      const response = await fetch(`http://45.93.138.91:5000/api/files/${fileId}/reject`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${api.getToken()}`
        }
      });

      if (!response.ok) throw new Error('Rad etishda xatolik');

      const data = await response.json();
      console.log('Fayl rad etildi:', data);

      alert('Fayl rad etildi!');
      setPendingFiles(pendingFiles.filter(f => f.id !== fileId));

    } catch (error) {
      console.error('Reject xatolik:', error);
      alert('Faylni rad etishda xatolik!');
    }
  };

  // Savatga qo'shish
  const addToCart = (file) => {
    const existing = cart.find(item => item.fileId === file.id);
    if (existing) {
      setCart(cart.map(item =>
        item.fileId === file.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, {
        fileId: file.id,
        fileName: file.name,
        quantity: 1,
        cashPrice: file.cashPrice
      }]);
    }
  };

  // Buyurtma yuborish
  const submitOrder = async () => {
    try {
      console.log('=== BUYURTMA YUBORISH ===');
      console.log('Cart:', cart);

      const orderData = {
        items: cart.map(item => ({
          file_id: item.fileId,
          quantity: item.quantity,
          price: item.cashPrice
        })),
        delivery_address: '',
        notes: ''
      };

      console.log('Order data:', orderData);

      const response = await api.createOrder(orderData);
      console.log('Backend javobi:', response);

      if (response.success) {
        alert('Buyurtma muvaffaqiyatli yaratildi! ✅');
        
        setCart([]);
        setShowModal(false);
        
        const ordersData = await api.getOrders();
        if (ordersData.success) {
          setOrders(ordersData.orders);
        }
        
        setSection('myOrders');
      } else {
        alert('Xatolik yuz berdi: ' + (response.message || 'Unknown error'));
      }

    } catch (err) {
      console.error('Buyurtma yuborish xatolik:', err);
      alert('Buyurtma yuborishda xatolik yuz berdi: ' + err.message);
    }
  };

  const currentClient = clients.find(c => c.id === user?.id) || clients[0];

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return '🔵 Qabul qilindi';
      case 'processing': return '🟡 Tayyorlanmoqda';
      case 'completed': return '🟢 Tayyor';
      case 'cancelled': return '🔴 Bekor qilindi';
      default: return status;
    }
  };

  // Registration sahifasi
  if (!user && showRegister) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          >
            {lang === 'en' ? 'UZB' : 'ENG'}
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl md:text-2xl font-bold mr-3">
              SB
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800">SAHFA BOOKS</div>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 text-center">
            Ro'yxatdan o'tish
          </h2>
          
          <form onSubmit={handleRegister} className="space-y-3 md:space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                Foydalanuvchi nomi *
              </label>
              <input
                type="text"
                name="username"
                required
                placeholder="masalan: newschool"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                Parol *
              </label>
              <input
                type="password"
                name="password"
                required
                minLength="6"
                placeholder="Kamida 6 ta belgi"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                Tashkilot nomi *
              </label>
              <input
                type="text"
                name="organization_name"
                required
                placeholder="masalan: Westminster School"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                To'liq ism *
              </label>
              <input
                type="text"
                name="full_name"
                required
                placeholder="masalan: Alisher Navoiy"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                Telefon *
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+998901234567"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                Manzil
              </label>
              <input
                type="text"
                name="address"
                placeholder="masalan: Toshkent, Chilonzor tumani"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 text-sm md:text-base"
            >
              Ro'yxatdan o'tish
            </button>
            
            <div className="text-center mt-3 md:mt-4">
              <button
                type="button"
                onClick={() => setShowRegister(false)}
                className="text-blue-600 font-semibold hover:text-blue-800 underline text-sm md:text-base"
              >
                ← Kirish sahifasiga qaytish
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Login sahifasi
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
            className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
          > 
            {lang === 'en' ? 'UZB' : 'ENG'}
          </button>
        </div>
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 w-full max-w-md">
          <div className="flex items-center justify-center mb-6 md:mb-8">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-xl md:text-2xl font-bold mr-3">
              SB
            </div>
            <div className="text-2xl md:text-3xl font-bold text-gray-800">SAHFA BOOKS</div>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.username}
              </label>
              <input
                type="text"
                name="username"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {t.password}
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-3 md:px-4 py-2 md:py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2.5 md:py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 text-sm md:text-base"
            >
              {t.login}
            </button>
            <div className="mt-4 md:mt-6 text-center">
              <p className="text-gray-600 text-sm md:text-base">
                Ro'yxatdan o'tmaganmisiz?{' '}
                <button
                  type="button"
                  onClick={() => setShowRegister(true)}
                  className="text-blue-600 font-semibold hover:text-blue-800 underline"
                >
                  Ro'yxatdan o'tish
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Asosiy sahifa
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile hamburger button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 text-white p-3 rounded-lg shadow-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col fixed md:static inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-4 md:p-6 border-b border-blue-500">
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-lg md:text-xl font-bold">
              SB
            </div>
            <div className="ml-3 text-base md:text-lg font-bold">SAHFA BOOKS</div>
          </div>
          <button
            onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
            className="bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm w-full"
          >
            {lang === 'en' ? 'O\'zbekcha' : 'English'}
          </button>
        </div>

        <nav className="flex-1 p-3 md:p-4">
          {user.type === 'admin' ? (
            <>
              <button
                onClick={() => {
                  setSection('clients');
                  setSelectedClient(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg mb-2 text-sm md:text-base ${
                  section === 'clients' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                <Users className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <span className="font-semibold">{t.clients}</span>
              </button>
              <button
                onClick={() => {
                  setSection('pendingFiles');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg mb-2 text-sm md:text-base ${
                  section === 'pendingFiles' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <span className="font-semibold">{t.pendingFiles}</span>
              </button>
              <button
                onClick={() => {
                  setSection('orders');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg mb-2 text-sm md:text-base ${
                  section === 'orders' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                <Package className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <span className="font-semibold">{t.orders}</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setSection('myFiles');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg mb-2 text-sm md:text-base ${
                  section === 'myFiles' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                <FileText className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <span className="font-semibold">{t.myFiles}</span>
              </button>
              <button
                onClick={() => {
                  setSection('myOrders');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg mb-2 text-sm md:text-base ${
                  section === 'myOrders' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                <Package className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <span className="font-semibold">{t.myOrders}</span>
              </button>
              <button
                onClick={() => {
                  setSection('profile');
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg mb-2 text-sm md:text-base ${
                  section === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-700'
                }`}
              >
                <User className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
                <span className="font-semibold">{t.profile}</span>
              </button>
            </>
          )}
        </nav>

        <div className="p-3 md:p-4 border-t border-blue-500">
          <button
            onClick={() => setUser(null)}
            className="w-full flex items-center px-3 md:px-4 py-2.5 md:py-3 rounded-lg hover:bg-blue-700 text-sm md:text-base"
          >
            <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3" />
            <span className="font-semibold">{t.logout}</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4 md:p-8 pt-20 md:pt-8">
        
        {/* Admin - Mijozlar ro'yxati */}
        {user.type === 'admin' && section === 'clients' && !selectedClient && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t.clients}</h1>
              <button
                onClick={() => setShowAddFileModal(true)}
                className="px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 text-sm md:text-base"
              >
                + Yangi Fayl Qo'shish
              </button>
            </div>
            
            {/* Desktop Table */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      {t.schoolName}
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      {t.phone}
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      {t.status}
                    </th>
                    <th className="px-6 py-4 text-left font-semibold text-gray-700">
                      {t.actions}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {clients.map((client, idx) => (
                    <tr
                      key={client.id}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {client.schoolName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">{client.phone1}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                          {t.active}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedClient(client)}
                          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          {t.view}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {clients.map((client) => (
                <div key={client.id} className="bg-white rounded-lg shadow p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-gray-800 text-base">{client.schoolName}</h3>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                      {t.active}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{client.phone1}</p>
                  <button
                    onClick={() => setSelectedClient(client)}
                    className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {t.view}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin - Mijoz tafsilotlari */}
        {user.type === 'admin' && section === 'clients' && selectedClient && (
          <div>
            <button
              onClick={() => setSelectedClient(null)}
              className="mb-4 md:mb-6 text-blue-600 hover:text-blue-800 font-semibold text-sm md:text-base"
            >
              ← {t.clients}
            </button>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 md:mb-4">
                {selectedClient.schoolName}
              </h2>
              <div className="text-gray-600 text-sm md:text-base">
                <p className="mb-1">
                  <strong>{t.phone}:</strong> {selectedClient.phone1}
                  {selectedClient.phone2 && `, ${selectedClient.phone2}`}
                </p>
                <p>
                  <strong>{t.address}:</strong> {selectedClient.address}
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">Fayllar</h3>
              <div className="space-y-3">
                {selectedClient.files.map(file => (
                  <div
                    key={file.id}
                    className="border border-gray-200 rounded-lg p-3 md:p-4"
                  >
                    <div className="font-semibold text-gray-800 mb-2 text-sm md:text-base">{file.name}</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs md:text-sm text-gray-600">
                      <div>
                        <strong>{t.format}:</strong> {file.format}
                      </div>
                      <div>
                        <strong>{t.cashPrice}:</strong> {file.cashPrice} UZS
                      </div>
                      <div>
                        <strong>{t.bankPrice}:</strong> {file.bankPrice} UZS
                      </div>
                      <div>
                        <strong>Rang:</strong> {file.color ? 'Ha' : 'Yo\'q'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Admin/Client - Buyurtmalar */}
        {section === 'orders' && (
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 md:p-6 border-b">
              <h2 className="text-xl md:text-2xl font-bold">
                {user.type === 'admin' ? 'Barcha Buyurtmalar' : t.myOrders}
              </h2>
            </div>
            
            {orders.length === 0 ? (
              <div className="p-8 md:p-12 text-center text-gray-500">
                <p className="text-base md:text-lg">Buyurtmalar yo'q</p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                        {user.type === 'admin' && (
                          <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mijoz</th>
                        )}
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fayl</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Format</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Miqdor</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Narx</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jami</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sana</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Holat</th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amallar</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {orders.map(order => (
                        <tr key={order.id} className="hover:bg-gray-50">
                          <td className="px-4 py-4 text-sm font-medium text-gray-900">
                            #{order.id}
                          </td>
                          {user.type === 'admin' && (
                            <td className="px-4 py-4 text-sm">
                              <div className="font-medium text-gray-900">
                                {order.organization_name || order.client_username}
                              </div>
                              {order.client_phone && (
                                <div className="text-xs text-gray-500">{order.client_phone}</div>
                              )}
                            </td>
                          )}
                          <td className="px-4 py-4 text-sm">
                            {order.items && order.items.length > 0 ? (
                              <div>
                                <div className="font-medium text-gray-900">
                                  {order.items[0].file_title}
                                </div>
                                {order.items.length > 1 && (
                                  <div className="text-xs text-gray-500">
                                    +{order.items.length - 1} boshqa
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            {order.items && order.items.length > 0 ? (
                              <div className="text-xs">
                                <div>{order.items[0].page_size || 'A4'}</div>
                                <div className="text-gray-500">
                                  {order.items[0].color_type === 'Color' ? 'Rangli' : 'Oq-Qora'}
                                </div>
                              </div>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {order.items && order.items.length > 0 ? (
                              <span className="font-medium">{order.items[0].quantity} dona</span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-900">
                            {order.items && order.items.length > 0 ? (
                              <span>{parseInt(order.items[0].price).toLocaleString()} UZS</span>
                            ) : (
                              <span className="text-gray-400">N/A</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-sm font-bold text-gray-900">
                            {parseInt(order.total_amount).toLocaleString()} UZS
                          </td>
                          <td className="px-4 py-4 text-sm text-gray-500">
                            {new Date(order.created_at).toLocaleDateString('uz-UZ')}
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {getStatusText(order.status)}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-sm">
                            <div className="flex items-center gap-2">
                              {order.items && order.items.length > 0 && order.items[0].file_id && (
  <div className="flex gap-1">
    {/* Muqova yuklab olish */}
    <button
      onClick={() => handleDownloadFile(order.items[0].file_id, order.items[0].file_title, 'cover')}
      className="p-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors"
      title="Muqova"
    >
      <Download className="w-4 h-4" />
    </button>
    
    {/* Ichki yuklab olish */}
    <button
      onClick={() => handleDownloadFile(order.items[0].file_id, order.items[0].file_title, 'content')}
      className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors"
      title="Ichki"
    >
      <Download className="w-4 h-4" />
    </button>
  </div>
)}
                              
                              {user.type === 'admin' && (
                                <select
                                  value={order.status}
                                  onChange={async (e) => {
                                    try {
                                      await api.updateOrderStatus(order.id, e.target.value);
                                      const ordersData = await api.getOrders();
                                      setOrders(ordersData.orders);
                                      alert('Status muvaffaqiyatli yangilandi!');
                                    } catch (err) {
                                      console.error('Status yangilash xatolik:', err);
                                      alert('Xatolik yuz berdi!');
                                    }
                                  }}
                                  className="text-xs px-2 py-1 border rounded hover:border-blue-500 focus:outline-none focus:border-blue-500"
                                >
                                  <option value="pending">Qabul qilindi</option>
                                  <option value="processing">Tayyorlanmoqda</option>
                                  <option value="completed">Tayyor</option>
                                  <option value="cancelled">Bekor qilindi</option>
                                </select>
                              )}
                              
                              <button
                                onClick={() => {
                                  alert(`Buyurtma #${order.id} tafsilotlari`);
                                }}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                title="Batafsil"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Mobile Cards */}
        <div className="md:hidden px-4 pb-4 space-y-4">
  {orders.map((order) => (
    <div key={order.id} className="bg-white border rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <div className="font-bold text-gray-800">Buyurtma #{order.id}</div>
          {user.type === 'admin' && (
            <div className="text-sm text-gray-600 mt-1">
              {order.organization_name || order.client_username}
            </div>
          )}
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {getStatusText(order.status)}
        </span>
      </div>
      
      {order.items && order.items.length > 0 && (
        <div className="text-sm text-gray-600 mb-3">
          <div className="font-semibold text-gray-800">{order.items[0].file_title}</div>
          <div className="flex justify-between mt-1">
            <span>{order.items[0].quantity} dona</span>
            <span>{parseInt(order.items[0].price).toLocaleString()} UZS</span>
          </div>
        </div>
      )}
      
      <div className="border-t pt-3 flex justify-between items-center">
        <div>
          <div className="text-sm text-gray-500">
            {new Date(order.created_at).toLocaleDateString('uz-UZ')}
          </div>
          <div className="font-bold text-gray-900">
            {parseInt(order.total_amount).toLocaleString()} UZS
          </div>
        </div>
        <div className="flex gap-2">
          {/* ✅ 2 TA DOWNLOAD TUGMASI */}
          {order.items && order.items[0] && order.items[0].file_id && (
            <>
              {/* Muqova yuklab olish */}
              <button
                onClick={() => handleDownloadFile(order.items[0].file_id, order.items[0].file_title, 'cover')}
                className="p-2 text-white bg-orange-500 hover:bg-orange-600 rounded-lg"
                title="Muqova"
              >
                <Download className="w-4 h-4" />
              </button>
              
              {/* Ichki yuklab olish */}
              <button
                onClick={() => handleDownloadFile(order.items[0].file_id, order.items[0].file_title, 'content')}
                className="p-2 text-white bg-green-500 hover:bg-green-600 rounded-lg"
                title="Ichki"
              >
                <Download className="w-4 h-4" />
              </button>
            </>
          )}
          <button
            onClick={() => alert(`Buyurtma #${order.id} tafsilotlari`)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  ))}
</div>
                
                <div className="p-4 md:p-6 border-t bg-gray-50">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                    <span className="text-base md:text-lg font-semibold text-gray-700">
                      Jami buyurtmalar: {orders.length} ta
                    </span>
                    <span className="text-lg md:text-xl font-bold text-gray-900">
                      Umumiy summa: {orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0).toLocaleString()} UZS
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Admin - Narx Belgilash */}
        {user.type === 'admin' && section === 'pendingFiles' && (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{t.pendingFiles}</h1>
            
            {pendingFiles.length === 0 ? (
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
                <p className="text-gray-500 text-base md:text-lg">Narx kutayotgan fayllar yo'q</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingFiles.map(file => {
                  const client = clients.find(c => c.id === file.client_id);
                  
                  return (
                    <div key={file.id} className="bg-white rounded-xl shadow-lg p-4 md:p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start mb-4">
                        <div className="flex-1 mb-4 md:mb-0">
                          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{file.title}</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 text-xs md:text-sm text-gray-600">
                            <div>
                              <strong>{t.clientName}:</strong> {client?.schoolName || 'N/A'}
                            </div>
                            <div>
                              <strong>{t.format}:</strong> {file.file_format}
                            </div>
                            <div>
                              <strong>Sahifa:</strong> {file.page_size}
                            </div>
                            <div>
                              <strong>Rang:</strong> {file.color_type}
                            </div>
                            <div>
                              <strong>{t.requestedQty}:</strong> {file.stock} dona
                            </div>
                            <div>
                              <strong>Status:</strong> 
                              <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                                {t.pending}
                              </span>
                            </div>
                          </div>
                          {file.description && (
                            <div className="mt-3 text-xs md:text-sm text-gray-600">
                              <strong>Tavsif:</strong> {file.description}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-2">
{(file.cover_file_path || file.content_file_path || file.file_path) && (
  <>
    <button
      onClick={() => handleDownloadFile(file.id, file.title, 'cover')}
      className="w-full md:w-auto px-4 py-2 bg-orange-100 hover:bg-orange-200 text-orange-700 rounded-lg flex items-center justify-center gap-2 text-sm"
    >
      <Download className="w-4 h-4" />
      Muqova
    </button>
    <button
      onClick={() => handleDownloadFile(file.id, file.title, 'content')}
      className="w-full md:w-auto px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2 text-sm"
    >
      <Download className="w-4 h-4" />
      Ichki
    </button>
  </>
)}
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <h4 className="font-semibold mb-3 text-sm md:text-base">{t.approvePrices}</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4">
                          <div>
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                              {t.setCashPrice} (UZS)
                            </label>
                            <input
                              type="number"
                              min="0"
                              id={`cash-${file.id}`}
                              placeholder="15000"
                              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                            />
                          </div>
                          <div>
                            <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                              {t.setBankPrice} (UZS)
                            </label>
                            <input
                              type="number"
                              min="0"
                              id={`bank-${file.id}`}
                              placeholder="14000"
                              className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                            />
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              const cashPrice = document.getElementById(`cash-${file.id}`).value;
                              const bankPrice = document.getElementById(`bank-${file.id}`).value;
                              handleApproveFile(file.id, cashPrice, bankPrice);
                            }}
                            className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 text-sm md:text-base"
                          >
                            {t.approve}
                          </button>
                          <button
                            onClick={() => handleRejectFile(file.id)}
                            className="px-4 md:px-6 py-2.5 md:py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 text-sm md:text-base"
                          >
                            {t.reject}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        
        {/* Mijoz - Fayllar */}
        {user.type === 'client' && section === 'myFiles' && currentClient && (
          <div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t.myFiles}</h1>
              <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                <button
                  onClick={() => setShowClientUploadModal(true)}
                  className="flex-1 md:flex-initial px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 text-sm md:text-base"
                >
                  + Yangi Fayl Yuklash
                </button>
                {cart.length > 0 && (
                  <button
                    onClick={() => setShowModal(true)}
                    className="flex-1 md:flex-initial px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold text-sm md:text-base"
                  >
                    {t.orderNow} ({cart.length})
                  </button>
                )}
              </div>
            </div>
            
            {currentClient.files.map(file => {
              const fileStatus = file.status || (file.priceVisibility === 'none' ? 'pending' : 'approved');
              const isRejected = fileStatus === 'rejected';
              const isPending = fileStatus === 'pending';
              const isApproved = fileStatus === 'approved' || file.priceVisibility !== 'none';
              
              return (
                <div key={file.id} className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4">
                  <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-2 md:gap-3 mb-2">
                        <h3 className="text-lg md:text-xl font-bold text-gray-800">{file.name}</h3>
                        {isPending && (
                          <span className="px-2 md:px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs md:text-sm font-semibold">
                            Narx kutilmoqda
                          </span>
                        )}
                        {isRejected && (
                          <span className="px-2 md:px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs md:text-sm font-semibold">
                            Rad etildi
                          </span>
                        )}
                      </div>
                      
                      <div className="text-xs md:text-sm text-gray-600 mb-3 md:mb-4">
                        <span className="mr-3 md:mr-4">
                          <strong>{t.format}:</strong> {file.format}
                        </span>
                        <span>
                          <strong>Rang:</strong>{' '}
                          {file.color ? t.colorPrinting : t.blackWhite}
                        </span>
                      </div>
                      
                      {isRejected && (
                        <div className="p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg mb-3">
                          <p className="text-red-800 font-semibold text-sm md:text-base">
                            ❌ Bu fayl admin tomonidan rad etildi
                          </p>
                          <p className="text-xs md:text-sm text-red-600 mt-1">
                            Agar savol bo'lsa, admin bilan bog'laning.
                          </p>
                        </div>
                      )}
                      
                      {isPending && (
                        <div className="p-3 md:p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-3">
                          <p className="text-yellow-800 font-semibold text-sm md:text-base">
                            ⏳ Admin narx belgilashini kutmoqda
                          </p>
                          <p className="text-xs md:text-sm text-yellow-600 mt-1">
                            Narx belgilangandan keyin buyurtma berishingiz mumkin.
                          </p>
                        </div>
                      )}
                      
                      {isApproved && file.priceVisibility !== 'none' && (
                        <div className="flex gap-3 md:gap-4">
                          {(file.priceVisibility === 'cash' || file.priceVisibility === 'both') && (
                            <div className="bg-green-50 px-3 md:px-4 py-2 rounded-lg">
                              <div className="text-xs md:text-sm text-gray-600">{t.cashPrice}</div>
                              <div className="text-lg md:text-xl font-bold text-green-700">
                                {file.cashPrice.toLocaleString()} UZS
                              </div>
                            </div>
                          )}
                          {(file.priceVisibility === 'bank' || file.priceVisibility === 'both') && (
                            <div className="bg-blue-50 px-3 md:px-4 py-2 rounded-lg">
                              <div className="text-xs md:text-sm text-gray-600">{t.bankPrice}</div>
                              <div className="text-lg md:text-xl font-bold text-blue-700">
                                {file.bankPrice.toLocaleString()} UZS
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto">
                      {isApproved && file.priceVisibility !== 'none' && (
                        <button
                          onClick={() => addToCart(file)}
                          className="flex-1 md:flex-initial px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm md:text-base"
                        >
                          {t.placeOrder}
                        </button>
                      )}
                      <button
                        onClick={() => handleDownloadFile(file.id, file.name, 'cover')}
                        className="flex-1 md:flex-initial px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-lg font-semibold hover:from-orange-600 hover:to-amber-700 flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <Download className="w-4 h-4 md:w-5 md:h-5" />
                        Muqova
                      </button>
                      <button
                        onClick={() => handleDownloadFile(file.id, file.name, 'content')}
                        className="flex-1 md:flex-initial px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 flex items-center justify-center gap-2 text-sm md:text-base"
                      >
                        <Download className="w-4 h-4 md:w-5 md:h-5" />
                        Ichki
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Mijoz - Buyurtmalarim */}
{user.type === 'client' && section === 'myOrders' && (
  <div>
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{t.myOrders}</h1>
    {orders.filter(o => o.client_id === user.id).length === 0 ? (
      //                  ↑ client_id (underscore!)
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
        <p className="text-gray-500 text-base md:text-lg">Buyurtmalar yo'q</p>
      </div>
    ) : (
      orders.filter(o => o.client_id === user.id).map(order => {
        //              ↑ client_id (underscore!)
        
        // ✅ order.items ishlatish (order.files emas!)
        const total = order.items && order.items.length > 0
          ? order.items.reduce((sum, item) => sum + (parseFloat(item.price) * parseInt(item.quantity)), 0)
          : parseFloat(order.total_amount);
        
        return (
          <div key={order.id} className="bg-white rounded-xl shadow-lg p-4 md:p-6 mb-4">
            <div className="flex justify-between items-start mb-3 md:mb-4">
              <div>
                <h3 className="text-lg md:text-xl font-bold">Buyurtma #{order.id}</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  {new Date(order.created_at).toLocaleDateString('uz-UZ')}
                </p>
              </div>
              <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-xs md:text-sm ${getStatusColor(order.status)}`}>
                {getStatusText(order.status)}
              </span>
            </div>
            
            {/* Fayllar ro'yxati */}
            {order.items && order.items.length > 0 && (
              <div className="mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">{item.file_title}</span>
                    {' - '}
                    <span>{item.quantity} dona × {parseInt(item.price).toLocaleString()} UZS</span>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-lg md:text-xl font-bold text-gray-900">
              Jami: {total.toLocaleString()} UZS
            </p>
            
            {/* Download tugmalari */}
            {order.items && order.items[0] && order.items[0].file_id && (
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleDownloadFile(order.items[0].file_id, order.items[0].file_title, 'cover')}
                  className="flex-1 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Muqova
                </button>
                <button
                  onClick={() => handleDownloadFile(order.items[0].file_id, order.items[0].file_title, 'content')}
                  className="flex-1 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Ichki
                </button>
              </div>
            )}
          </div>
        );
      })
    )}
  </div>
)}

        {/* Mijoz - Profil */}
        {user.type === 'client' && section === 'profile' && currentClient && (
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6">{t.profile}</h1>
            <div className="bg-white rounded-xl shadow-lg p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    {t.schoolName}
                  </label>
                  <input
                    type="text"
                    value={currentClient.schoolName || ''}
                    readOnly
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg bg-gray-50 text-sm md:text-base"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      {t.phone} 1
                    </label>
                    <input
                      type="text"
                      value={currentClient.phone1 || ''}
                      readOnly
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg bg-gray-50 text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      {t.phone} 2
                    </label>
                    <input
                      type="text"
                      value={currentClient.phone2 || ''}
                      readOnly
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg bg-gray-50 text-sm md:text-base"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    {t.address}
                  </label>
                  <input
                    type="text"
                    value={currentClient.address || ''}
                    readOnly
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg bg-gray-50 text-sm md:text-base"
                  />
                </div>
                <button className="px-4 md:px-6 py-2.5 md:py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 text-sm md:text-base">
                  {t.changePassword}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      {/* Admin - Yangi Fayl Qo'shish Modal */}
      {user?.type === 'admin' && showAddFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl md:text-2xl font-bold">Yangi Fayl Qo'shish</h2>
              <button onClick={() => setShowAddFileModal(false)}>
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            
            <form onSubmit={handleAddFile} className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Mijoz *
                  </label>
                  <select
                    required
                    value={newFile.client_id}
                    onChange={(e) => setNewFile({...newFile, client_id: e.target.value})}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                  >
                    <option value="">Mijozni tanlang</option>
                    {clients.map(client => (
                      <option key={client.id} value={client.id}>
                        {client.schoolName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Fayl (PDF, DOC, DOCX, JPG, PNG - Max 500MB) *
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => setNewFile({...newFile, file: e.target.files[0]})}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Sarlavha *
                  </label>
                  <input
                    type="text"
                    required
                    value={newFile.title}
                    onChange={(e) => setNewFile({...newFile, title: e.target.value})}
                    placeholder="Masalan: Matematika Darslik - 5-sinf"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Tavsif
                  </label>
                  <textarea
                    value={newFile.description}
                    onChange={(e) => setNewFile({...newFile, description: e.target.value})}
                    placeholder="Fayl haqida qisqacha ma'lumot"
                    rows="3"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Naqd Narx (UZS) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newFile.cash_price}
                      onChange={(e) => setNewFile({...newFile, cash_price: e.target.value})}
                      placeholder="15000"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Bank Narx (UZS) *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      value={newFile.bank_price}
                      onChange={(e) => setNewFile({...newFile, bank_price: e.target.value})}
                      placeholder="14000"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Format
                    </label>
                    <select
                      value={newFile.file_format}
                      onChange={(e) => setNewFile({...newFile, file_format: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOC">DOC</option>
                      <option value="DOCX">DOCX</option>
                      <option value="JPG">JPG</option>
                      <option value="PNG">PNG</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Sahifa O'lchami
                    </label>
                    <select
                      value={newFile.page_size}
                      onChange={(e) => setNewFile({...newFile, page_size: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    >
                      <option value="A4">A4</option>
                      <option value="A5">A5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Rang
                    </label>
                    <select
                      value={newFile.color_type}
                      onChange={(e) => setNewFile({...newFile, color_type: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    >
                      <option value="B&W">Oq-Qora</option>
                      <option value="Color">Rangli</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Stock (dona)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={newFile.stock}
                      onChange={(e) => setNewFile({...newFile, stock: e.target.value})}
                      placeholder="50"
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    />
                  </div>
                  <div className="flex items-center pt-6 md:pt-8">
                    <input
                      type="checkbox"
                      checked={newFile.show_price}
                      onChange={(e) => setNewFile({...newFile, show_price: e.target.checked})}
                      className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3"
                    />
                    <label className="text-xs md:text-sm font-semibold text-gray-700">
                      Narxlarni mijozga ko'rsatish
                    </label>
                  </div>
                </div>

                <div className="flex gap-3 md:gap-4 pt-3 md:pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setShowAddFileModal(false)}
                    className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 text-sm md:text-base"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 text-sm md:text-base"
                  >
                    Fayl Qo'shish
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Buyurtma Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl md:text-2xl font-bold">{t.selectFiles}</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            <div className="p-4 md:p-6">
              {cart.map(item => (
                <div
                  key={item.fileId}
                  className="border rounded-lg p-3 md:p-4 mb-3 md:mb-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base">{item.fileName}</h3>
                      <p className="text-xs md:text-sm text-gray-600">
                        {item.cashPrice.toLocaleString()} UZS bittasi
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        setCart(cart.filter(i => i.fileId !== item.fileId))
                      }
                    >
                      <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-500" />
                    </button>
                  </div>
                  <div className="flex items-center gap-3 md:gap-4">
                    <label className="text-xs md:text-sm font-semibold">
                      {t.quantity}:
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e =>
                        setCart(
                          cart.map(i =>
                            i.fileId === item.fileId
                              ? { ...i, quantity: parseInt(e.target.value) || 1 }
                              : i
                          )
                        )
                      }
                      className="w-20 md:w-24 px-2 md:px-3 py-1.5 md:py-2 border rounded-lg text-sm md:text-base"
                    />
                    <div className="ml-auto font-bold text-sm md:text-base">
                      {(item.cashPrice * item.quantity).toLocaleString()} UZS
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 md:p-6 border-t bg-gray-50">
              <div className="flex justify-between mb-3 md:mb-4">
                <span className="text-lg md:text-xl font-bold">{t.totalPrice}:</span>
                <span className="text-xl md:text-2xl font-bold text-blue-600">
                  {cart
                    .reduce((sum, item) => sum + item.cashPrice * item.quantity, 0)
                    .toLocaleString()}{' '}
                  UZS
                </span>
              </div>
              <div className="flex gap-3 md:gap-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 rounded-lg font-semibold text-sm md:text-base"
                >
                  {t.cancel}
                </button>
                <button
                  onClick={submitOrder}
                  className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-sm md:text-base"
                >
                  {t.submitOrder}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Client Upload Modal */}
      {showClientUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-xl md:text-2xl font-bold">Yangi Fayl Yuklash</h2>
              <button onClick={() => setShowClientUploadModal(false)}>
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
            
            <form onSubmit={handleClientFileUpload} className="p-4 md:p-6">
              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    📷 Muqova Fayli (Kitob ustki qismi) *
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => setClientFile({...clientFile, cover_file: e.target.files[0]})}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                  />
                  <p className="text-xs text-gray-500 mt-1">Kitobning muqovasi (ustki ko'rinishi) uchun</p>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    📄 Ichki Content Fayli (Asosiy matn) *
                  </label>
                  <input
                    type="file"
                    required
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setClientFile({...clientFile, content_file: e.target.files[0]})}
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                  />
                  <p className="text-xs text-gray-500 mt-1">Kitobning ichki sahifalari (matn) uchun</p>
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Sarlavha *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientFile.title}
                    onChange={(e) => setClientFile({...clientFile, title: e.target.value})}
                    placeholder="Masalan: Imtihon Savollari 2025"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                    Tavsif
                  </label>
                  <textarea
                    value={clientFile.description}
                    onChange={(e) => setClientFile({...clientFile, description: e.target.value})}
                    placeholder="Qo'shimcha ma'lumot"
                    rows="3"
                    className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Format
                    </label>
                    <select
                      value={clientFile.file_format}
                      onChange={(e) => setClientFile({...clientFile, file_format: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    >
                      <option value="PDF">PDF</option>
                      <option value="DOC">DOC</option>
                      <option value="DOCX">DOCX</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Sahifa O'lchami
                    </label>
                    <select
                      value={clientFile.page_size}
                      onChange={(e) => setClientFile({...clientFile, page_size: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    >
                      <option value="A4">A4</option>
                      <option value="A5">A5</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs md:text-sm font-semibold text-gray-700 mb-1 md:mb-2">
                      Rang
                    </label>
                    <select
                      value={clientFile.color_type}
                      onChange={(e) => setClientFile({...clientFile, color_type: e.target.value})}
                      className="w-full px-3 md:px-4 py-2 md:py-3 border rounded-lg focus:border-blue-500 focus:outline-none text-sm md:text-base"
                    >
                      <option value="B&W">Oq-Qora</option>
                      <option value="Color">Rangli</option>
                    </select>
                  </div>
                </div>

                <div className="p-3 md:p-4 bg-blue-50 rounded-lg">
                  <p className="text-xs md:text-sm text-blue-800">
                    <strong>Eslatma:</strong> Fayl yuklangandan keyin admin narx belgilaydi. 
                    Narx tasdiqlangandan keyin buyurtma berishingiz mumkin.
                  </p>
                </div>

                <div className="flex gap-3 md:gap-4">
                  <button
                    type="button"
                    onClick={() => setShowClientUploadModal(false)}
                    className="flex-1 px-4 md:px-6 py-2.5 md:py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 text-sm md:text-base"
                  >
                    Bekor qilish
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700 text-sm md:text-base"
                  >
                    Fayl Yuklash
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}