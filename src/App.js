// import React, { useState, useEffect } from 'react';
// import { X, Eye, FileText, LogOut, Users, Package, User, Trash2, Download } from 'lucide-react';
// import * as api from './api';
// // Tarjimalar
// const translations = {
//   en: {
//     username: 'Username',
//     password: 'Password',
//     login: 'Login',
//     logout: 'Logout',
//     clients: 'Clients',
//     orders: 'Orders',
//     myFiles: 'My Files',
//     myOrders: 'My Orders',
//     profile: 'Profile',
//     schoolName: 'School Name',
//     phone: 'Phone',
//     address: 'Address',
//     status: 'Status',
//     active: 'Active',
//     actions: 'Actions',
//     view: 'View',
//     format: 'Format',
//     cashPrice: 'Cash Price',
//     bankPrice: 'Bank Price',
//     colorPrinting: 'Color',
//     blackWhite: 'B&W',
//     orderNow: 'Order Now',
//     placeOrder: 'Place Order',
//     selectFiles: 'Select Files',
//     quantity: 'Quantity',
//     totalPrice: 'Total Price',
//     cancel: 'Cancel',
//     submitOrder: 'Submit Order',
//     orderId: 'Order ID',
//     orderDate: 'Order Date',
//     changePassword: 'Change Password',
//     pendingFiles: 'Price Approval',
//     approvePrices: 'Set Prices',
//     clientName: 'Client',
//     uploadedFile: 'Uploaded File',
//     requestedQty: 'Requested Qty',
//     setCashPrice: 'Cash Price',
//     setBankPrice: 'Bank Price',
//     approve: 'Approve',
//     reject: 'Reject',
//     pending: 'Pending',
//     approved: 'Approved',
//     rejected: 'Rejected',
//   },
//   uz: {
//     username: 'Foydalanuvchi nomi',
//     password: 'Parol',
//     login: 'Kirish',
//     logout: 'Chiqish',
//     clients: 'Mijozlar',
//     orders: 'Buyurtmalar',
//     myFiles: 'Mening fayllarim',
//     myOrders: 'Mening buyurtmalarim',
//     profile: 'Profil',
//     schoolName: 'Maktab nomi',
//     phone: 'Telefon',
//     address: 'Manzil',
//     status: 'Holat',
//     active: 'Faol',
//     actions: 'Harakatlar',
//     view: 'Korish',
//     format: 'Format',
//     cashPrice: 'Naqd narx',
//     bankPrice: 'Bank narx',
//     colorPrinting: 'Rangli',
//     blackWhite: 'Oq-Qora',
//     orderNow: 'Buyurtma berish',
//     placeOrder: 'Buyurtma berish',
//     selectFiles: 'Fayllarni tanlash',
//     quantity: 'Miqdor',
//     totalPrice: 'Jami narx',
//     cancel: 'Bekor qilish',
//     submitOrder: 'Buyurtma yuborish',
//     orderId: 'Buyurtma ID',
//     orderDate: 'Buyurtma sanasi',
//     changePassword: 'Parolni ozgartirish',
//     pendingFiles: 'Narx Belgilash',
//     approvePrices: 'Narx Qo\'yish',
//     clientName: 'Mijoz',
//     uploadedFile: 'Yuklangan Fayl',
//     requestedQty: 'So\'ralgan Miqdor',
//     setCashPrice: 'Naqd Narx',
//     setBankPrice: 'Bank Narx',
//     approve: 'Tasdiqlash',
//     reject: 'Rad Etish',
//     pending: 'Kutilmoqda',
//     approved: 'Tasdiqlangan',
//     rejected: 'Rad Etilgan',
//   }
// };

// // Mijozlar ma'lumotlari


// // Buyurtmalar


// export default function App() {
//   const [lang, setLang] = useState('uz');
//   const [user, setUser] = useState(null);
//   const [section, setSection] = useState('clients');
//   const [selectedClient, setSelectedClient] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [showModal, setShowModal] = useState(false);
// const [orders, setOrders] = useState([]);
//  useEffect(() => {
//     const loadOrders = async () => {
//       if (user && (section === 'orders' || section === 'myOrders')) {
//         try {
//           console.log('📦 Orders yuklanmoqda...');
//           const ordersData = await api.getOrders();
//           if (ordersData.success) {
//             console.log('✅ Orders yuklandi:', ordersData.orders.length);
//             setOrders(ordersData.orders);
//           }
//         } catch (err) {
//           console.error('❌ Orders yuklash xatolik:', err);
//         }
//       }
//     };
    
//     loadOrders();
//   }, [user, section]);
//   const [clients, setClients] = useState([]);
//   const [showAddFileModal, setShowAddFileModal] = useState(false);
//   const [pendingFiles, setPendingFiles] = useState([]);
//   const [showRegister, setShowRegister] = useState(false);
// const [newFile, setNewFile] = useState({
//   client_id: '',
//   title: '',
//   description: '',
//   file: null,
//   cash_price: '',
//   bank_price: '',
//   show_price: true,
//   stock: 0,
//   page_size: 'A4',
//   color_type: 'B&W',
//   file_format: 'PDF'
// });
// const [showClientUploadModal, setShowClientUploadModal] = useState(false);
// const [clientFile, setClientFile] = useState({
//   title: '',
//   description: '',
//   file: null,
//   quantity: 1,
//   page_size: 'A4',
//   color_type: 'B&W',
//   file_format: 'PDF'
// });
// useEffect(() => {
//   if (!user) return;
  
//   const loadData = async () => {
//     try {
//       if (user.type === 'admin') {
//         // 1. Userlarni yuklash
//         const usersData = await api.getUsers();
//         console.log('Users yuklandi:', usersData);
        
//         // 2. Fayllarni yuklash
//         const filesData = await api.getFiles();
//         console.log('Files yuklandi:', filesData);
        
//         // 3. REAL ma'lumotlarni clients state'ga yuklash
//         if (usersData.users) {
//           const clientUsers = usersData.users
//             .filter(u => u.role === 'client')
//             .map(u => ({
//               id: u.id,
//               schoolName: u.organization_name || u.full_name || u.username,
//               phone1: u.phone || 'N/A',
//               phone2: '',
//               address: u.address || 'N/A',
//               status: 'active',
//               files: filesData.files ? filesData.files
//                 .filter(f => f.client_id === u.id)
//                 .map(f => ({
//                   id: f.id,
//                   name: f.title,
//                   format: f.file_format || 'N/A',
//                   cashPrice: f.cash_price || 0,
//                   bankPrice: f.bank_price || 0,
//                   color: f.color_type === 'Color',
//                   priceVisibility: f.show_price ? 'both' : 'none'
//                 })) : []
//             }));
          
//           setClients(clientUsers);
//           console.log('Clients yangilandi:', clientUsers);
//         }
        
//         const ordersData = await api.getOrders();
//         console.log('Orders yuklandi:', ordersData);
        
//         // ↓ SHU YERDA PENDING FILES! ↓
//         if (filesData.files) {
//           const pending = filesData.files.filter(f => f.status === 'pending');
//           setPendingFiles(pending);
//           console.log('Pending files:', pending.length);
//         }
        
//       } else if (user.type === 'client') {
//  const filesData = await api.getFiles();
//   console.log('Files yuklandi (mijoz):', filesData);
  
//   // Mijozning o'z fayllarini clients state'ga yuklash
//   const clientFiles = filesData.files ? filesData.files.map(f => ({
//     id: f.id,
//     name: f.title,
//     format: f.file_format || 'N/A',
//     cashPrice: f.cash_price || 0,
//     bankPrice: f.bank_price || 0,
//     color: f.color_type === 'Color',
//     priceVisibility: f.show_price ? 'both' : 'none',
//     status: f.status || 'approved'  
//         })) : [];
        
//         setClients([{
//           id: user.id || 1,
//           schoolName: user.fullName || user.username,
//           phone1: user.phone1 || 'N/A',
//           phone2: user.phone2 || '',
//           address: user.address || 'N/A',
//           status: 'active',
//           files: clientFiles
//         }]);
        
//         console.log('Mijoz fayllari yuklandi:', clientFiles);
        
//         const ordersData = await api.getOrders();
//         console.log('Orders yuklandi:', ordersData);
//       }
//     } catch (error) {
//       console.error('Ma\'lumotlarni yuklashda xatolik:', error);
//     }
//   };
  
//   loadData();
// }, [user]);
//   const t = translations[lang];

//   // Login funksiyasi
// const handleLogin = async (e) => {
//   e.preventDefault();
  
//   const un = e.target.username.value.trim();
//   const pw = e.target.password.value.trim();
  
//   try {
//     console.log('Login urinishi:', un);
//     const data = await api.login(un, pw);
//     console.log('Backend javobi:', data);
    
// setUser({ 
//   type: data.user.role, 
//   username: data.user.username, 
//   fullName: data.user.full_name,
//   id: data.user.id  
// });
//     setSection(data.user.role === 'admin' ? 'clients' : 'myFiles');
//     alert(t.login === 'Kirish' ? 'Xush kelibsiz, ' + data.user.full_name : 'Welcome, ' + data.user.full_name);
//   } catch (error) {
//     console.error('Login xatolik:', error);
//     alert(t.login === 'Kirish' ? 'Noto\'g\'ri ma\'lumotlar!' : 'Invalid credentials!');
//   }
// };
// // Registration funksiyasi
// const handleRegister = async (e) => {
//   e.preventDefault();
  
//   const username = e.target.username.value.trim();
//   const password = e.target.password.value.trim();
//   const organizationName = e.target.organization_name.value.trim();
//   const fullName = e.target.full_name.value.trim();
//   const phone = e.target.phone.value.trim();
//   const address = e.target.address.value.trim();
  
//   try {
//     console.log('Registration urinishi:', username);
    
//     const response = await fetch('http://45.93.138.91:5000/api/auth/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username,
//         password,
//         organization_name: organizationName,
//         full_name: fullName,
//         phone,
//         address
//       })
//     });

//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.error || 'Registration xatolik');
//     }

//     const data = await response.json();
//     console.log('Registration muvaffaqiyatli:', data);
    
//     alert('Ro\'yxatdan o\'tish muvaffaqiyatli! Endi login qilishingiz mumkin.');
//     setShowRegister(false);
    
//   } catch (error) {
//     console.error('Registration xatolik:', error);
//     alert(error.message || 'Ro\'yxatdan o\'tishda xatolik!');
//   }
// };
// // Yangi fayl qo'shish
// const handleAddFile = async (e) => {
//   e.preventDefault();
  
//   try {
//     const formData = new FormData();
//     formData.append('file', newFile.file);
//     formData.append('client_id', newFile.client_id);
//     formData.append('title', newFile.title);
//     formData.append('description', newFile.description);
//     formData.append('cash_price', newFile.cash_price);
//     formData.append('bank_price', newFile.bank_price);
//     formData.append('show_price', newFile.show_price);
//     formData.append('stock', newFile.stock);
//     formData.append('page_size', newFile.page_size);
//     formData.append('color_type', newFile.color_type);
//     formData.append('file_format', newFile.file_format);

//     const response = await fetch('http://45.93.138.91:5000/api/files', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${api.getToken()}`
//       },
//       body: formData
//     });

//     if (!response.ok) throw new Error('Fayl qo\'shishda xatolik');

//     const data = await response.json();
//     console.log('Fayl qo\'shildi:', data);
    
//     alert('Fayl muvaffaqiyatli qo\'shildi!');
//     setShowAddFileModal(false);
    
//     // Reset form
//     setNewFile({
//       client_id: '',
//       title: '',
//       description: '',
//       file: null,
//       cash_price: '',
//       bank_price: '',
//       show_price: true,
//       stock: 0,
//       page_size: 'A4',
//       color_type: 'B&W',
//       file_format: 'PDF'
//     });
    
//     // Reload data
//     window.location.reload();
    
//   } catch (error) {
//     console.error('Xatolik:', error);
//     alert('Fayl qo\'shishda xatolik!');
//   }
// };
// // Faylni yuklab olish
// const handleDownloadFile = async (fileId, fileName) => {
//   try {
//     const response = await fetch(`http://45.93.138.91:5000/api/files/${fileId}/download`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${api.getToken()}`
//       }
//     });

//     if (!response.ok) throw new Error('Yuklab olishda xatolik');

//     // Blob yaratish
//     const blob = await response.blob();
    
//     // Download link yaratish
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = fileName;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     window.URL.revokeObjectURL(url);
    
//   } catch (error) {
//     console.error('Download xatolik:', error);
//     alert('Faylni yuklab olishda xatolik!');
//   }
// };
// // Mijoz fayl yuklash
// const handleClientFileUpload = async (e) => {
//   e.preventDefault();
  
//   try {
//     const formData = new FormData();
//     formData.append('file', clientFile.file);
//     formData.append('title', clientFile.title);
//     formData.append('description', clientFile.description);
//     formData.append('quantity', clientFile.quantity);
//     formData.append('page_size', clientFile.page_size);
//     formData.append('color_type', clientFile.color_type);
//     formData.append('file_format', clientFile.file_format);
//     formData.append('uploaded_by', 'client');
//     formData.append('status', 'pending');

//     const response = await fetch('http://45.93.138.91:5000/api/files/client-upload', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${api.getToken()}`
//       },
//       body: formData
//     });

//     if (!response.ok) throw new Error('Fayl yuklashda xatolik');

//     const data = await response.json();
//     console.log('Fayl yuklandi:', data);
    
//     alert('Fayl muvaffaqiyatli yuklandi! Admin narx belgilashini kuting.');
//     setShowClientUploadModal(false);
    
//     // Reset form
//     setClientFile({
//       title: '',
//       description: '',
//       file: null,
//       quantity: 1,
//       page_size: 'A4',
//       color_type: 'B&W',
//       file_format: 'PDF'
//     });
    
//     // Fayllarni qayta yuklash
//     const filesData = await api.getFiles();
//     if (filesData.files) {
//       const clientFiles = filesData.files.map(f => ({
//         id: f.id,
//         name: f.title,
//         format: f.file_format || 'N/A',
//         cashPrice: f.cash_price || 0,
//         bankPrice: f.bank_price || 0,
//         color: f.color_type === 'Color',
//         priceVisibility: f.show_price ? 'both' : 'none'
//       }));
      
//       setClients([{
//         id: user.id,
//         schoolName: user.fullName || user.username,
//         phone1: user.phone1 || 'N/A',
//         phone2: user.phone2 || '',
//         address: user.address || 'N/A',
//         status: 'active',
//         files: clientFiles
//       }]);
//     }
    
//   } catch (error) {
//     console.error('Upload xatolik:', error);
//     alert('Fayl yuklashda xatolik!');
//   }
// };
// // Admin: Faylni tasdiqlash
// const handleApproveFile = async (fileId, cashPrice, bankPrice) => {
//   try {
//     if (!cashPrice || !bankPrice) {
//       alert('Iltimos, ikkala narxni kiriting!');
//       return;
//     }

//     const response = await fetch(`http://45.93.138.91:5000/api/files/${fileId}/approve`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${api.getToken()}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         cash_price: parseFloat(cashPrice),
//         bank_price: parseFloat(bankPrice)
//       })
//     });

//     if (!response.ok) throw new Error('Tasdiqlashda xatolik');

//     const data = await response.json();
//     console.log('Fayl tasdiqlandi:', data);

//     alert('Fayl muvaffaqiyatli tasdiqlandi! Mijoz endi buyurtma berishi mumkin.');

//     // Pending fayllarni yangilash
//     setPendingFiles(pendingFiles.filter(f => f.id !== fileId));

//   } catch (error) {
//     console.error('Approve xatolik:', error);
//     alert('Faylni tasdiqlashda xatolik!');
//   }
// };

// // Admin: Faylni rad etish
// const handleRejectFile = async (fileId) => {
//   try {
//     if (!window.confirm('Faylni rad etmoqchimisiz?')) {
//       return;
//     }

//     const response = await fetch(`http://45.93.138.91:5000/api/files/${fileId}/reject`, {
//       method: 'PUT',
//       headers: {
//         'Authorization': `Bearer ${api.getToken()}`
//       }
//     });

//     if (!response.ok) throw new Error('Rad etishda xatolik');

//     const data = await response.json();
//     console.log('Fayl rad etildi:', data);

//     alert('Fayl rad etildi!');

//     // Pending fayllarni yangilash
//     setPendingFiles(pendingFiles.filter(f => f.id !== fileId));

//   } catch (error) {
//     console.error('Reject xatolik:', error);
//     alert('Faylni rad etishda xatolik!');
//   }
// };
//   // Savatga qo'shish
//   const addToCart = (file) => {
//     const existing = cart.find(item => item.fileId === file.id);
//     if (existing) {
//       setCart(cart.map(item =>
//         item.fileId === file.id ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//     } else {
//       setCart([...cart, {
//         fileId: file.id,
//         fileName: file.name,
//         quantity: 1,
//         cashPrice: file.cashPrice
//       }]);
//     }
//   };

//   // Buyurtma yuborish
// // Buyurtma yuborish
//   const submitOrder = async () => {
//     try {
//       console.log('=== BUYURTMA YUBORISH ===');
//       console.log('Cart:', cart);

//       // Buyurtma ma'lumotlarini tayyorlash
//       const orderData = {
//         items: cart.map(item => ({
//           file_id: item.fileId,
//           quantity: item.quantity,
//           price: item.cashPrice  // ← USER TANLAGAN NARX!
//         })),
//         delivery_address: '',
//         notes: ''
//       };

//       console.log('Order data:', orderData);

//       // Backend'ga yuborish
//       const response = await api.createOrder(orderData);

//       console.log('Backend javobi:', response);

//       if (response.success) {
//         alert('Buyurtma muvaffaqiyatli yaratildi! ✅');
        
//         // Cart'ni tozalash
//         setCart([]);
//         setShowModal(false);
        
//         // Buyurtmalarni yangilash
//         const ordersData = await api.getOrders();
//         if (ordersData.success) {
//           setOrders(ordersData.orders);
//         }
        
//         // Buyurtmalar sahifasiga o'tish
//         setSection('myOrders');
//       } else {
//         alert('Xatolik yuz berdi: ' + (response.message || 'Unknown error'));
//       }

//     } catch (err) {
//       console.error('Buyurtma yuborish xatolik:', err);
//       alert('Buyurtma yuborishda xatolik yuz berdi: ' + err.message);
//     }
//   };
//   if (!user && showRegister) {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
//       <div className="absolute top-4 right-4">
//         <button
//           onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
//           className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
//         >
//           {lang === 'en' ? 'UZB' : 'ENG'}
//         </button>
//       </div>
//       <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//         <div className="flex items-center justify-center mb-8">
//           <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-3">
//             SB
//           </div>
//           <div className="text-3xl font-bold text-gray-800">SAHFA BOOKS</div>
//         </div>
        
//         <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
//           Ro'yxatdan o'tish
//         </h2>
        
//         <form onSubmit={handleRegister} className="space-y-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Foydalanuvchi nomi *
//             </label>
//             <input
//               type="text"
//               name="username"
//               required
//               placeholder="masalan: newschool"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Parol *
//             </label>
//             <input
//               type="password"
//               name="password"
//               required
//               minLength="6"
//               placeholder="Kamida 6 ta belgi"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Tashkilot nomi *
//             </label>
//             <input
//               type="text"
//               name="organization_name"
//               required
//               placeholder="masalan: Westminster School"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               To'liq ism *
//             </label>
//             <input
//               type="text"
//               name="full_name"
//               required
//               placeholder="masalan: Alisher Navoiy"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Telefon *
//             </label>
//             <input
//               type="tel"
//               name="phone"
//               required
//               placeholder="+998901234567"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
          
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Manzil
//             </label>
//             <input
//               type="text"
//               name="address"
//               placeholder="masalan: Toshkent, Chilonzor tumani"
//               className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
          
//           <button
//             type="submit"
//             className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700"
//           >
//             Ro'yxatdan o'tish
//           </button>
          
//           <div className="text-center mt-4">
//             <button
//               type="button"
//               onClick={() => setShowRegister(false)}
//               className="text-blue-600 font-semibold hover:text-blue-800 underline"
//             >
//               ← Kirish sahifasiga qaytish
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }
//   // Login sahifasi
//   if (!user) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
//         <div className="absolute top-4 right-4">
//           <button
//             onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
//             className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold"
//           > 
//             {lang === 'en' ? 'UZB' : 'ENG'}
//           </button>
//         </div>
//         <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
//           <div className="flex items-center justify-center mb-8">
//             <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-pink-500 rounded-xl flex items-center justify-center text-white text-2xl font-bold mr-3">
//               SB
//             </div>
//             <div className="text-3xl font-bold text-gray-800">SAHFA BOOKS</div>
//           </div>
//           <form onSubmit={handleLogin} className="space-y-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 {t.username}
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 {t.password}
//               </label>
//               <input
//                 type="password"
//                 name="password"
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700"
//             >
//               {t.login}
//             </button>
//             {/* ↓ SHU QISMNI QO'SHING ↓ */}
// <div className="mt-6 text-center">
//   <p className="text-gray-600">
//     Ro'yxatdan o'tmaganmisiz?{' '}
//     <button
//       type="button"
//       onClick={() => {
//   console.log('Ro\'yxatdan o\'tish bosildi!');
//   console.log('showRegister:', true);
//   setShowRegister(true);
// }}
//       className="text-blue-600 font-semibold hover:text-blue-800 underline"
//     >
//       Ro'yxatdan o'tish
//     </button>
//   </p>
// </div>


//           </form>

        
//         </div>
//       </div>
//     );
//   }



// const currentClient = clients.find(c => c.id === user.id) || clients[0];



// // Asosiy sahifa
//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className="w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white flex flex-col">
//         <div className="p-6 border-b border-blue-500">
//           <div className="flex items-center mb-4">
//             <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-pink-500 rounded-lg flex items-center justify-center text-xl font-bold">
//               SB
//             </div>
//             <div className="ml-3 text-lg font-bold">SAHFA BOOKS</div>
//           </div>
//           <button
//             onClick={() => setLang(lang === 'en' ? 'uz' : 'en')}
//             className="bg-blue-700 px-4 py-2 rounded-lg font-semibold text-sm w-full"
//           >
//             {lang === 'en' ? 'Ozbekcha' : 'English'}
//           </button>
//         </div>

//         <nav className="flex-1 p-4">
//           {user.type === 'admin' ? (
//             <>
//               <button
//                 onClick={() => {
//                   setSection('clients');
//                   setSelectedClient(null);
//                 }}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${
//                   section === 'clients' ? 'bg-blue-700' : 'hover:bg-blue-700'
//                 }`}
//               >
//                 <Users className="w-5 h-5 mr-3" />
//                 <span className="font-semibold">{t.clients}</span>
//               </button>
//               <button
//                 onClick={() => setSection('pendingFiles')}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${
//                   section === 'pendingFiles' ? 'bg-blue-700' : 'hover:bg-blue-700'
//                 }`}
//               >
//                 <FileText className="w-5 h-5 mr-3" />
//                 <span className="font-semibold">{t.pendingFiles}</span>
//               </button>
//               <button
//                 onClick={() => setSection('orders')}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${
//                   section === 'orders' ? 'bg-blue-700' : 'hover:bg-blue-700'
//                 }`}
//               >
//                 <Package className="w-5 h-5 mr-3" />
//                 <span className="font-semibold">{t.orders}</span>
//               </button>
//             </>
//           ) : (
//             <>
//               <button
//                 onClick={() => setSection('myFiles')}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${
//                   section === 'myFiles' ? 'bg-blue-700' : 'hover:bg-blue-700'
//                 }`}
//               >
//                 <FileText className="w-5 h-5 mr-3" />
//                 <span className="font-semibold">{t.myFiles}</span>
//               </button>
//               <button
//                 onClick={() => setSection('myOrders')}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${
//                   section === 'myOrders' ? 'bg-blue-700' : 'hover:bg-blue-700'
//                 }`}
//               >
//                 <Package className="w-5 h-5 mr-3" />
//                 <span className="font-semibold">{t.myOrders}</span>
//               </button>
//               <button
//                 onClick={() => setSection('profile')}
//                 className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 ${
//                   section === 'profile' ? 'bg-blue-700' : 'hover:bg-blue-700'
//                 }`}
//               >
//                 <User className="w-5 h-5 mr-3" />
//                 <span className="font-semibold">{t.profile}</span>
//               </button>
//             </>
//           )}
//         </nav>

//         <div className="p-4 border-t border-blue-500">
//           <button
//             onClick={() => setUser(null)}
//             className="w-full flex items-center px-4 py-3 rounded-lg hover:bg-blue-700"
//           >
//             <LogOut className="w-5 h-5 mr-3" />
//             <span className="font-semibold">{t.logout}</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto p-8">
//         {/* Admin - Mijozlar ro'yxati */}
//         {user.type === 'admin' && section === 'clients' && !selectedClient && (
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800">{t.clients}</h1>
//       <button
//         onClick={() => setShowAddFileModal(true)}
//         className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700"
//       >
//         + Yangi Fayl Qo'shish
//       </button>
            
//             <div className="bg-white rounded-xl shadow-lg overflow-hidden">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                       {t.schoolName}
//                     </th>
//                     <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                       {t.phone}
//                     </th>
//                     <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                       {t.status}
//                     </th>
//                     <th className="px-6 py-4 text-left font-semibold text-gray-700">
//                       {t.actions}
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {clients.map((client, idx) => (
//                     <tr
//                       key={client.id}
//                       className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
//                     >
//                       <td className="px-6 py-4 font-medium text-gray-900">
//                         {client.schoolName}
//                       </td>
//                       <td className="px-6 py-4 text-gray-600">{client.phone1}</td>
//                       <td className="px-6 py-4">
//                         <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
//                           {t.active}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4">
//                         <button
//                           onClick={() => setSelectedClient(client)}
//                           className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//                         >
//                           <Eye className="w-4 h-4 mr-2" />
//                           {t.view}
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {/* Admin - Mijoz tafsilotlari */}
//         {user.type === 'admin' && section === 'clients' && selectedClient && (
//           <div>
//             <button
//               onClick={() => setSelectedClient(null)}
//               className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
//             >
//               ← {t.clients}
//             </button>
//             <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
//               <h2 className="text-2xl font-bold text-gray-800 mb-4">
//                 {selectedClient.schoolName}
//               </h2>
//               <div className="text-gray-600">
//                 <p>
//                   <strong>{t.phone}:</strong> {selectedClient.phone1}, {selectedClient.phone2}
//                 </p>
//                 <p>
//                   <strong>{t.address}:</strong> {selectedClient.address}
//                 </p>
//               </div>
//             </div>
//             <div className="bg-white rounded-xl shadow-lg p-6">
//               <h3 className="text-xl font-bold text-gray-800 mb-4">Fayllar</h3>
//               {selectedClient.files.map(file => (
//                 <div
//                   key={file.id}
//                   className="border border-gray-200 rounded-lg p-4 mb-4"
//                 >
//                   <div className="font-semibold text-gray-800 mb-2">{file.name}</div>
//                   <div className="grid grid-cols-4 gap-2 text-sm text-gray-600">
//                     <div>
//                       <strong>{t.format}:</strong> {file.format}
//                     </div>
//                     <div>
//                       <strong>{t.cashPrice}:</strong> {file.cashPrice} UZS
//                     </div>
//                     <div>
//                       <strong>{t.bankPrice}:</strong> {file.bankPrice} UZS
//                     </div>
//                     <div>
//                       <strong>Rang:</strong> {file.color ? 'Ha' : 'Yoq'}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Admin - Buyurtmalar */}
//      {/* BUYURTMALAR BO'LIMI - TO'LIQ PROFESSIONAL */}
//         {section === 'orders' && (
//           <div className="bg-white rounded-lg shadow">
//             <div className="p-6 border-b">
//               <h2 className="text-2xl font-bold">
//                 {user.type === 'admin' ? 'Barcha Buyurtmalar' : t.myOrders}
//               </h2>
//             </div>
            
//             {orders.length === 0 ? (
//               <div className="p-12 text-center text-gray-500">
//                 <p className="text-lg">Buyurtmalar yo'q</p>
//               </div>
//             ) : (
//               <>
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
//                         {user.type === 'admin' && (
//                           <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mijoz</th>
//                         )}
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fayl</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Format</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Miqdor</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Narx</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Jami</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sana</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Holat</th>
//                         <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amallar</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-200">
//                       {orders.map(order => {
//                         const getStatusColor = (status) => {
//                           switch(status) {
//                             case 'pending': return 'bg-blue-100 text-blue-800';
//                             case 'processing': return 'bg-yellow-100 text-yellow-800';
//                             case 'completed': return 'bg-green-100 text-green-800';
//                             case 'cancelled': return 'bg-red-100 text-red-800';
//                             default: return 'bg-gray-100 text-gray-800';
//                           }
//                         };
                        
//                         const getStatusText = (status) => {
//                           switch(status) {
//                             case 'pending': return '🔵 Qabul qilindi';
//                             case 'processing': return '🟡 Tayyorlanmoqda';
//                             case 'completed': return '🟢 Tayyor';
//                             case 'cancelled': return '🔴 Bekor qilindi';
//                             default: return status;
//                           }
//                         };
                        
//                         return (
//                           <tr key={order.id} className="hover:bg-gray-50">
//                             <td className="px-4 py-4 text-sm font-medium text-gray-900">
//                               #{order.id}
//                             </td>
//                             {user.type === 'admin' && (
//                               <td className="px-4 py-4 text-sm">
//                                 <div className="font-medium text-gray-900">
//                                   {order.organization_name || order.client_username}
//                                 </div>
//                                 {order.client_phone && (
//                                   <div className="text-xs text-gray-500">{order.client_phone}</div>
//                                 )}
//                               </td>
//                             )}
//                             <td className="px-4 py-4 text-sm">
//                               {order.items && order.items.length > 0 ? (
//                                 <div>
//                                   <div className="font-medium text-gray-900">
//                                     {order.items[0].file_title}
//                                   </div>
//                                   {order.items.length > 1 && (
//                                     <div className="text-xs text-gray-500">
//                                       +{order.items.length - 1} boshqa
//                                     </div>
//                                   )}
//                                 </div>
//                               ) : (
//                                 <span className="text-gray-400">N/A</span>
//                               )}
//                             </td>
//                             <td className="px-4 py-4 text-sm">
//                               {order.items && order.items.length > 0 ? (
//                                 <div className="text-xs">
//                                   <div>{order.items[0].page_size || 'A4'}</div>
//                                   <div className="text-gray-500">
//                                     {order.items[0].color_type === 'Color' ? 'Rangli' : 'Oq-Qora'}
//                                   </div>
//                                 </div>
//                               ) : (
//                                 <span className="text-gray-400">N/A</span>
//                               )}
//                             </td>
//                             <td className="px-4 py-4 text-sm text-gray-900">
//                               {order.items && order.items.length > 0 ? (
//                                 <span className="font-medium">{order.items[0].quantity} dona</span>
//                               ) : (
//                                 <span className="text-gray-400">N/A</span>
//                               )}
//                             </td>
//                             <td className="px-4 py-4 text-sm text-gray-900">
//                               {order.items && order.items.length > 0 ? (
//                                 <span>{parseInt(order.items[0].price).toLocaleString()} UZS</span>
//                               ) : (
//                                 <span className="text-gray-400">N/A</span>
//                               )}
//                             </td>
//                             <td className="px-4 py-4 text-sm font-bold text-gray-900">
//                               {parseInt(order.total_amount).toLocaleString()} UZS
//                             </td>
//                             <td className="px-4 py-4 text-sm text-gray-500">
//                               {new Date(order.created_at).toLocaleDateString('uz-UZ')}
//                             </td>
//                             <td className="px-4 py-4 text-sm">
//                               <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
//                                 {getStatusText(order.status)}
//                               </span>
//                             </td>
//                             <td className="px-4 py-4 text-sm">
//                               <div className="flex items-center gap-2">
//                                 {order.items && order.items.length > 0 && order.items[0].file_path && (
//                                   <button
//                                     onClick={() => {
//                                       if (order.items[0].file_id) {
//                                         api.downloadFile(order.items[0].file_id, order.items[0].file_title);
//                                       }
//                                     }}
//                                     className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                                     title="Yuklab olish"
//                                   >
//                                     <Download className="w-4 h-4" />
//                                   </button>
//                                 )}
                                
//                                 {user.type === 'admin' && (
//                                   <select
//                                     value={order.status}
//                                     onChange={async (e) => {
//                                       try {
//                                         await api.updateOrderStatus(order.id, e.target.value);
//                                         const ordersData = await api.getOrders();
//                                         setOrders(ordersData.orders);
//                                         alert('Status muvaffaqiyatli yangilandi!');
//                                       } catch (err) {
//                                         console.error('Status yangilash xatolik:', err);
//                                         alert('Xatolik yuz berdi!');
//                                       }
//                                     }}
//                                     className="text-xs px-2 py-1 border rounded hover:border-blue-500 focus:outline-none focus:border-blue-500"
//                                   >
//                                     <option value="pending">Qabul qilindi</option>
//                                     <option value="processing">Tayyorlanmoqda</option>
//                                     <option value="completed">Tayyor</option>
//                                     <option value="cancelled">Bekor qilindi</option>
//                                   </select>
//                                 )}
                                
//                                 <button
//                                   onClick={() => {
//                                     alert(`Buyurtma #${order.id} tafsilotlari`);
//                                   }}
//                                   className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//                                   title="Batafsil"
//                                 >
//                                   <Eye className="w-4 h-4" />
//                                 </button>
//                               </div>
//                             </td>
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
                
//                 <div className="p-6 border-t bg-gray-50">
//                   <div className="flex justify-between items-center">
//                     <span className="text-lg font-semibold text-gray-700">
//                       Jami buyurtmalar: {orders.length} ta
//                     </span>
//                     <span className="text-xl font-bold text-gray-900">
//                       Umumiy summa: {orders.reduce((sum, order) => sum + parseFloat(order.total_amount), 0).toLocaleString()} UZS
//                     </span>
//                   </div>
//                 </div>
//               </>
//             )}
//           </div>
//         )}
//         {/* Admin - Narx Belgilash */}
//         {user.type === 'admin' && section === 'pendingFiles' && (
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">{t.pendingFiles}</h1>
            
//             {pendingFiles.length === 0 ? (
//               <div className="bg-white rounded-xl shadow-lg p-8 text-center">
//                 <p className="text-gray-500 text-lg">Narx kutayotgan fayllar yo'q</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {pendingFiles.map(file => {
//                   const client = clients.find(c => c.id === file.client_id);
                  
//                   return (
//                     <div key={file.id} className="bg-white rounded-xl shadow-lg p-6">
//                       <div className="flex justify-between items-start mb-4">
//                         <div className="flex-1">
//                           <h3 className="text-xl font-bold text-gray-800 mb-2">{file.title}</h3>
//                           <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
//                             <div>
//                               <strong>{t.clientName}:</strong> {client?.schoolName || 'N/A'}
//                             </div>
//                             <div>
//                               <strong>{t.format}:</strong> {file.file_format}
//                             </div>
//                             <div>
//                               <strong>Sahifa:</strong> {file.page_size}
//                             </div>
//                             <div>
//                               <strong>Rang:</strong> {file.color_type}
//                             </div>
//                             <div>
//                               <strong>{t.requestedQty}:</strong> {file.stock} dona
//                             </div>
//                             <div>
//                               <strong>Status:</strong> 
//                               <span className="ml-2 px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
//                                 {t.pending}
//                               </span>
//                             </div>
//                           </div>
//                           {file.description && (
//                             <div className="mt-3 text-sm text-gray-600">
//                               <strong>Tavsif:</strong> {file.description}
//                             </div>
//                           )}
//                         </div>
                        
//                         {file.file_path && (
//                           <button
//                             onClick={() => handleDownloadFile(file.id, file.title)}
//                             className="ml-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg flex items-center gap-2"
//                           >
//                             <Download className="w-4 h-4" />
//                             Ko'rib chiqish
//                           </button>
//                         )}
//                       </div>
                      
//                       <div className="border-t pt-4">
//                         <h4 className="font-semibold mb-3">{t.approvePrices}</h4>
//                         <div className="grid grid-cols-2 gap-4 mb-4">
//                           <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                               {t.setCashPrice} (UZS)
//                             </label>
//                             <input
//                               type="number"
//                               min="0"
//                               id={`cash-${file.id}`}
//                               placeholder="15000"
//                               className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-semibold text-gray-700 mb-2">
//                               {t.setBankPrice} (UZS)
//                             </label>
//                             <input
//                               type="number"
//                               min="0"
//                               id={`bank-${file.id}`}
//                               placeholder="14000"
//                               className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//                             />
//                           </div>
//                         </div>
                        
//                       <div className="flex gap-3">
//   <button
//     onClick={() => {
//       const cashPrice = document.getElementById(`cash-${file.id}`).value;
//       const bankPrice = document.getElementById(`bank-${file.id}`).value;
//       handleApproveFile(file.id, cashPrice, bankPrice);
//     }}
//     className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700"
//   >
//     {t.approve}
//   </button>
//   <button
//     onClick={() => handleRejectFile(file.id)}
//     className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
//   >
//     {t.reject}
//   </button>
// </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         )}
        
        
//         {/* Admin - Yangi Fayl Qo'shish Modal */}
// {user.type === 'admin' && showAddFileModal && (
//   <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//     <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
//       <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
//         <h2 className="text-2xl font-bold">Yangi Fayl Qo'shish</h2>
//         <button onClick={() => setShowAddFileModal(false)}>
//           <X className="w-6 h-6" />
//         </button>
//       </div>
      
//       <form onSubmit={handleAddFile} className="p-6">
//         {/* Mijozni tanlash */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Mijoz *
//           </label>
//           <select
//             required
//             value={newFile.client_id}
//             onChange={(e) => setNewFile({...newFile, client_id: e.target.value})}
//             className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//           >
//             <option value="">Mijozni tanlang</option>
//             {clients.map(client => (
//               <option key={client.id} value={client.id}>
//                 {client.schoolName}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Fayl yuklash */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Fayl (PDF, DOC, DOCX, JPG, PNG - Max 500MB) *
//           </label>
//           <input
//             type="file"
//             required
//             accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//             onChange={(e) => setNewFile({...newFile, file: e.target.files[0]})}
//             className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//           />
//         </div>

//         {/* Sarlavha */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Sarlavha *
//           </label>
//           <input
//             type="text"
//             required
//             value={newFile.title}
//             onChange={(e) => setNewFile({...newFile, title: e.target.value})}
//             placeholder="Masalan: Matematika Darslik - 5-sinf"
//             className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//           />
//         </div>

//         {/* Tavsif */}
//         <div className="mb-4">
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             Tavsif
//           </label>
//           <textarea
//             value={newFile.description}
//             onChange={(e) => setNewFile({...newFile, description: e.target.value})}
//             placeholder="Fayl haqida qisqacha ma'lumot"
//             rows="3"
//             className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//           />
//         </div>

//         {/* Narxlar */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Naqd Narx (UZS) *
//             </label>
//             <input
//               type="number"
//               required
//               min="0"
//               value={newFile.cash_price}
//               onChange={(e) => setNewFile({...newFile, cash_price: e.target.value})}
//               placeholder="15000"
//               className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Bank Narx (UZS) *
//             </label>
//             <input
//               type="number"
//               required
//               min="0"
//               value={newFile.bank_price}
//               onChange={(e) => setNewFile({...newFile, bank_price: e.target.value})}
//               placeholder="14000"
//               className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
//         </div>

//         {/* Format va Rang */}
//         <div className="grid grid-cols-3 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Format
//             </label>
//             <select
//               value={newFile.file_format}
//               onChange={(e) => setNewFile({...newFile, file_format: e.target.value})}
//               className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//             >
//               <option value="PDF">PDF</option>
//               <option value="DOC">DOC</option>
//               <option value="DOCX">DOCX</option>
//               <option value="JPG">JPG</option>
//               <option value="PNG">PNG</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Sahifa O'lchami
//             </label>
//             <select
//               value={newFile.page_size}
//               onChange={(e) => setNewFile({...newFile, page_size: e.target.value})}
//               className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//             >
//               <option value="A4">A4</option>
//               <option value="A5">A5</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Rang
//             </label>
//             <select
//               value={newFile.color_type}
//               onChange={(e) => setNewFile({...newFile, color_type: e.target.value})}
//               className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//             >
//               <option value="B&W">Oq-Qora</option>
//               <option value="Color">Rangli</option>
//             </select>
//           </div>
//         </div>

//         {/* Stock va Show Price */}
//         <div className="grid grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Stock (dona)
//             </label>
//             <input
//               type="number"
//               min="0"
//               value={newFile.stock}
//               onChange={(e) => setNewFile({...newFile, stock: e.target.value})}
//               placeholder="50"
//               className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//             />
//           </div>
//           <div className="flex items-center pt-8">
//             <input
//               type="checkbox"
//               checked={newFile.show_price}
//               onChange={(e) => setNewFile({...newFile, show_price: e.target.checked})}
//               className="w-5 h-5 mr-3"
//             />
//             <label className="text-sm font-semibold text-gray-700">
//               Narxlarni mijozga ko'rsatish
//             </label>
//           </div>
//         </div>

//         {/* Tugmalar */}
//         <div className="flex gap-4 pt-4 border-t">
//           <button
//             type="button"
//             onClick={() => setShowAddFileModal(false)}
//             className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
//           >
//             Bekor qilish
//           </button>
//           <button
//             type="submit"
//             className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700"
//           >
//             Fayl Qo'shish
//           </button>
//         </div>
//       </form>
//     </div>
//   </div>
// )}

//         {/* Mijoz - Fayllar */}
// {/* Mijoz - Fayllar */}
//         {user.type === 'client' && section === 'myFiles' && currentClient && (
//           <div>
//             <div className="flex justify-between items-center mb-6">
//               <h1 className="text-3xl font-bold text-gray-800">{t.myFiles}</h1>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowClientUploadModal(true)}
//                   className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700"
//                 >
//                   + Yangi Fayl Yuklash
//                 </button>
//                 {cart.length > 0 && (
//                   <button
//                     onClick={() => setShowModal(true)}
//                     className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold"
//                   >
//                     {t.orderNow} ({cart.length})
//                   </button>
//                 )}
//               </div>
//             </div>
            
// {currentClient.files.map(file => {
//   // File status aniqlash
//   const fileStatus = file.status || (file.priceVisibility === 'none' ? 'pending' : 'approved');
//   const isRejected = fileStatus === 'rejected';
//   const isPending = fileStatus === 'pending';
//   const isApproved = fileStatus === 'approved' || file.priceVisibility !== 'none';
  
//   return (
//     <div key={file.id} className="bg-white rounded-xl shadow-lg p-6 mb-4">
//       <div className="flex justify-between items-start">
//         <div className="flex-1">
//           <div className="flex items-center gap-3 mb-2">
//             <h3 className="text-xl font-bold text-gray-800">{file.name}</h3>
//             {isPending && (
//               <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
//                 Narx kutilmoqda
//               </span>
//             )}
//             {isRejected && (
//               <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
//                 Rad etildi
//               </span>
//             )}
//           </div>
          
//           <div className="text-sm text-gray-600 mb-4">
//             <span className="mr-4">
//               <strong>{t.format}:</strong> {file.format}
//             </span>
//             <span>
//               <strong>Rang:</strong>{' '}
//               {file.color ? t.colorPrinting : t.blackWhite}
//             </span>
//           </div>
          
//           {isRejected && (
//             <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
//               <p className="text-red-800 font-semibold">
//                 ❌ Bu fayl admin tomonidan rad etildi
//               </p>
//               <p className="text-sm text-red-600 mt-1">
//                 Agar savol bo'lsa, admin bilan bog'laning.
//               </p>
//             </div>
//           )}
          
//           {isPending && (
//             <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
//               <p className="text-yellow-800 font-semibold">
//                 ⏳ Admin narx belgilashini kutmoqda
//               </p>
//               <p className="text-sm text-yellow-600 mt-1">
//                 Narx belgilangandan keyin buyurtma berishingiz mumkin.
//               </p>
//             </div>
//           )}
          
//           {isApproved && file.priceVisibility !== 'none' && (
//             <div className="flex gap-4">
//               {(file.priceVisibility === 'cash' || file.priceVisibility === 'both') && (
//                 <div className="bg-green-50 px-4 py-2 rounded-lg">
//                   <div className="text-sm text-gray-600">{t.cashPrice}</div>
//                   <div className="text-xl font-bold text-green-700">
//                     {file.cashPrice.toLocaleString()} UZS
//                   </div>
//                 </div>
//               )}
//               {(file.priceVisibility === 'bank' || file.priceVisibility === 'both') && (
//                 <div className="bg-blue-50 px-4 py-2 rounded-lg">
//                   <div className="text-sm text-gray-600">{t.bankPrice}</div>
//                   <div className="text-xl font-bold text-blue-700">
//                     {file.bankPrice.toLocaleString()} UZS
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
        
//         <div className="flex flex-col gap-2">
//           {isApproved && file.priceVisibility !== 'none' && (
//             <button
//               onClick={() => addToCart(file)}
//               className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold"
//             >
//               {t.placeOrder}
//             </button>
//           )}
//           <button
//             onClick={() => handleDownloadFile(file.id, file.name)}
//             className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700 flex items-center justify-center gap-2"
//           >
//             <Download className="w-5 h-5" />
//             Yuklab olish
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// })}

//             {/* Buyurtma Modal */}
//             {showModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
//                   <div className="p-6 border-b flex justify-between items-center">
//                     <h2 className="text-2xl font-bold">{t.selectFiles}</h2>
//                     <button onClick={() => setShowModal(false)}>
//                       <X className="w-6 h-6" />
//                     </button>
//                   </div>
//                   <div className="p-6">
//                     {cart.map(item => (
//                       <div
//                         key={item.fileId}
//                         className="border rounded-lg p-4 mb-4"
//                       >
//                         <div className="flex justify-between items-start mb-2">
//                           <div>
//                             <h3 className="font-semibold">{item.fileName}</h3>
//                             <p className="text-sm text-gray-600">
//                               {item.cashPrice.toLocaleString()} UZS bittasi
//                             </p>
//                           </div>
//                           <button
//                             onClick={() =>
//                               setCart(cart.filter(i => i.fileId !== item.fileId))
//                             }
//                           >
//                             <Trash2 className="w-5 h-5 text-red-500" />
//                           </button>
//                         </div>
//                         <div className="flex items-center gap-4">
//                           <label className="text-sm font-semibold">
//                             {t.quantity}:
//                           </label>
//                           <input
//                             type="number"
//                             min="1"
//                             value={item.quantity}
//                             onChange={e =>
//                               setCart(
//                                 cart.map(i =>
//                                   i.fileId === item.fileId
//                                     ? { ...i, quantity: parseInt(e.target.value) || 1 }
//                                     : i
//                                 )
//                               )
//                             }
//                             className="w-24 px-3 py-2 border rounded-lg"
//                           />
//                           <div className="ml-auto font-bold">
//                             {(item.cashPrice * item.quantity).toLocaleString()} UZS
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="p-6 border-t bg-gray-50">
//                     <div className="flex justify-between mb-4">
//                       <span className="text-xl font-bold">{t.totalPrice}:</span>
//                       <span className="text-2xl font-bold text-blue-600">
//                         {cart
//                           .reduce((sum, item) => sum + item.cashPrice * item.quantity, 0)
//                           .toLocaleString()}{' '}
//                         UZS
//                       </span>
//                     </div>
//                     <div className="flex gap-4">
//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold"
//                       >
//                         {t.cancel}
//                       </button>
//                       <button
//                         onClick={submitOrder}
//                         className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold"
//                       >
//                         {t.submitOrder}
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Client Upload Modal */}
//             {showClientUploadModal && (
//               <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//                 <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                   <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
//                     <h2 className="text-2xl font-bold">Yangi Fayl Yuklash</h2>
//                     <button onClick={() => setShowClientUploadModal(false)}>
//                       <X className="w-6 h-6" />
//                     </button>
//                   </div>
                  
//                   <form onSubmit={handleClientFileUpload} className="p-6">
//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Fayl (PDF, DOC, DOCX - Max 500MB) *
//                       </label>
//                       <input
//                         type="file"
//                         required
//                         accept=".pdf,.doc,.docx"
//                         onChange={(e) => setClientFile({...clientFile, file: e.target.files[0]})}
//                         className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Sarlavha *
//                       </label>
//                       <input
//                         type="text"
//                         required
//                         value={clientFile.title}
//                         onChange={(e) => setClientFile({...clientFile, title: e.target.value})}
//                         placeholder="Masalan: Imtihon Savollari 2025"
//                         className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//                       />
//                     </div>

//                     <div className="mb-4">
//                       <label className="block text-sm font-semibold text-gray-700 mb-2">
//                         Tavsif
//                       </label>
//                       <textarea
//                         value={clientFile.description}
//                         onChange={(e) => setClientFile({...clientFile, description: e.target.value})}
//                         placeholder="Qo'shimcha ma'lumot"
//                         rows="3"
//                         className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//                       />
//                     </div>

//                     <div className="grid grid-cols-3 gap-4 mb-4">
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Format
//                         </label>
//                         <select
//                           value={clientFile.file_format}
//                           onChange={(e) => setClientFile({...clientFile, file_format: e.target.value})}
//                           className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//                         >
//                           <option value="PDF">PDF</option>
//                           <option value="DOC">DOC</option>
//                           <option value="DOCX">DOCX</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Sahifa O'lchami
//                         </label>
//                         <select
//                           value={clientFile.page_size}
//                           onChange={(e) => setClientFile({...clientFile, page_size: e.target.value})}
//                           className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//                         >
//                           <option value="A4">A4</option>
//                           <option value="A5">A5</option>
//                         </select>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-2">
//                           Rang
//                         </label>
//                         <select
//                           value={clientFile.color_type}
//                           onChange={(e) => setClientFile({...clientFile, color_type: e.target.value})}
//                           className="w-full px-4 py-3 border rounded-lg focus:border-blue-500 focus:outline-none"
//                         >
//                           <option value="B&W">Oq-Qora</option>
//                           <option value="Color">Rangli</option>
//                         </select>
//                       </div>
//                     </div>

                

//                     <div className="p-4 bg-blue-50 rounded-lg mb-4">
//                       <p className="text-sm text-blue-800">
//                         <strong>Eslatma:</strong> Fayl yuklangandan keyin admin narx belgilaydi. 
//                         Narx tasdiqlangandan keyin buyurtma berishingiz mumkin.
//                       </p>
//                     </div>

//                     <div className="flex gap-4">
//                       <button
//                         type="button"
//                         onClick={() => setShowClientUploadModal(false)}
//                         className="flex-1 px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50"
//                       >
//                         Bekor qilish
//                       </button>
//                       <button
//                         type="submit"
//                         className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-indigo-700"
//                       >
//                         Fayl Yuklash
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {/* Mijoz - Buyurtmalarim */}
//         {user.type === 'client' && section === 'myOrders' && (
//           <div>
//             <h1 className="text-3xl font-bold text-gray-800 mb-6">{t.myOrders}</h1>
//             {orders.filter(o => o.clientId === user.id).map(order => {
//               const total = order.files.reduce(
//                 (sum, f) => sum + f.price * f.quantity,
//                 0
//               );
//               return (
//                 <div key={order.id} className="bg-white rounded-xl shadow-lg p-6 mb-4">
//                   <div className="flex justify-between items-start mb-4">
//                     <div>
//                       <h3 className="text-xl font-bold">Buyurtma #{order.id}</h3>
//                       <p className="text-gray-600">{order.orderDate}</p>
//                     </div>
//                     <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
//                       {order.status}
//                     </span>
//                   </div>
//                   <p className="text-xl font-bold text-gray-900">
//                     {total.toLocaleString()} UZS
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         )}

//         {/* Mijoz - Profil */}
// {/* Mijoz - Profil */}
// {user.type === 'client' && section === 'profile' && currentClient && (
//   <div>
//     <h1 className="text-3xl font-bold text-gray-800 mb-6">{t.profile}</h1>
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <div className="space-y-4">
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             {t.schoolName}
//           </label>
//           <input
//             type="text"
//             value={currentClient.schoolName || ''}
//             readOnly
//             className="w-full px-4 py-3 border rounded-lg bg-gray-50"
//           />
//         </div>
//         <div className="grid grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               {t.phone} 1
//             </label>
//             <input
//               type="text"
//               value={currentClient.phone1 || ''}
//               readOnly
//               className="w-full px-4 py-3 border rounded-lg bg-gray-50"
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               {t.phone} 2
//             </label>
//             <input
//               type="text"
//               value={currentClient.phone2 || ''}
//               readOnly
//               className="w-full px-4 py-3 border rounded-lg bg-gray-50"
//             />
//           </div>
//         </div>
//         <div>
//           <label className="block text-sm font-semibold text-gray-700 mb-2">
//             {t.address}
//           </label>
//           <input
//             type="text"
//             value={currentClient.address || ''}
//             readOnly
//             className="w-full px-4 py-3 border rounded-lg bg-gray-50"
//           />
//         </div>
//         <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
//           {t.changePassword}
//         </button>
//       </div>
//     </div>
//   </div>
// )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { X, Eye, FileText, LogOut, Users, Package, User, Trash2, Download, Menu, ChevronDown } from 'lucide-react';
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
    view: 'Korish',
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
    changePassword: 'Parolni ozgartirish',
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clients, setClients] = useState([]);
  const [showAddFileModal, setShowAddFileModal] = useState(false);
  const [pendingFiles, setPendingFiles] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
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
    file: null,
    quantity: 1,
    page_size: 'A4',
    color_type: 'B&W',
    file_format: 'PDF'
  });

  const t = translations[lang];

  // Load orders
  useEffect(() => {
    const loadOrders = async () => {
      if (user && (section === 'orders' || section === 'myOrders')) {
        try {
          const ordersData = await api.getOrders();
          if (ordersData.success) {
            setOrders(ordersData.orders);
          }
        } catch (err) {
          console.error('Orders error:', err);
        }
      }
    };
    loadOrders();
  }, [user, section]);

  // Load data
  useEffect(() => {
    if (!user) return;
    
    const loadData = async () => {
      try {
        if (user.type === 'admin') {
          const usersData = await api.getUsers();
          const filesData = await api.getFiles();
          
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
          }
          
          if (filesData.files) {
            const pending = filesData.files.filter(f => f.status === 'pending');
            setPendingFiles(pending);
          }
          
        } else if (user.type === 'client') {
          const filesData = await api.getFiles();
          const clientFiles = filesData.files ? filesData.files.map(f => ({
            id: f.id,
            name: f.title,
            format: f.file_format || 'N/A',
            cashPrice: f.cash_price || 0,
            bankPrice: f.bank_price || 0,
            color: f.color_type === 'Color',
            priceVisibility: f.show_price ? 'both' : 'none'
          })) : [];

          setClients([{
            id: user.id,
            schoolName: user.organization_name || user.full_name || user.username,
            phone1: user.phone || 'N/A',
            phone2: '',
            address: user.address || 'N/A',
            status: 'active',
            files: clientFiles
          }]);
        }
      } catch (err) {
        console.error('Data load error:', err);
      }
    };

    loadData();
  }, [user]);

  const currentClient = clients[0];

  // Login handler
  const handleLogin = async (username, password) => {
    try {
      const response = await api.login(username, password);
      if (response.user) {
        setUser(response.user);
        setSidebarOpen(false);
      }
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    api.clearToken();
    setSidebarOpen(false);
  };

  // ======================== RENDER ========================

  if (!user) {
    return <LoginPage handleLogin={handleLogin} showRegister={showRegister} setShowRegister={setShowRegister} lang={lang} setLang={setLang} t={t} />;
  }

  return (
    <div className="flex h-screen bg-gray-50 flex-col md:flex-row">
      {/* ==================== MOBILE MENU OVERLAY ==================== */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ==================== SIDEBAR ==================== */}
      <div className={`fixed md:static inset-y-0 left-0 w-64 bg-gradient-to-b from-blue-600 to-blue-800 text-white p-4 transform transition-transform duration-300 z-40 md:z-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center font-bold">SB</div>
          <h1 className="font-bold text-lg hidden sm:block">SAHFA BOOKS</h1>
        </div>

        {/* Language Toggle */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setLang('uz')}
            className={`px-3 py-2 rounded font-semibold text-sm ${lang === 'uz' ? 'bg-blue-400' : 'bg-blue-700'}`}
          >
            UZ
          </button>
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-2 rounded font-semibold text-sm ${lang === 'en' ? 'bg-blue-400' : 'bg-blue-700'}`}
          >
            EN
          </button>
        </div>

        {/* Menu Items - Admin */}
        {user.type === 'admin' && (
          <div className="space-y-2">
            <MenuItem icon={<Users />} label={t.clients} onClick={() => { setSection('clients'); setSidebarOpen(false); }} active={section === 'clients'} />
            <MenuItem icon={<Package />} label={t.orders} onClick={() => { setSection('orders'); setSidebarOpen(false); }} active={section === 'orders'} />
            <MenuItem icon={<FileText />} label={t.pendingFiles} onClick={() => { setSection('pendingFiles'); setSidebarOpen(false); }} active={section === 'pendingFiles'} />
            <MenuItem icon={<User />} label={t.profile} onClick={() => { setSection('profile'); setSidebarOpen(false); }} active={section === 'profile'} />
          </div>
        )}

        {/* Menu Items - Client */}
        {user.type === 'client' && (
          <div className="space-y-2">
            <MenuItem icon={<FileText />} label={t.myFiles} onClick={() => { setSection('myFiles'); setSidebarOpen(false); }} active={section === 'myFiles'} />
            <MenuItem icon={<Package />} label={t.myOrders} onClick={() => { setSection('myOrders'); setSidebarOpen(false); }} active={section === 'myOrders'} />
            <MenuItem icon={<User />} label={t.profile} onClick={() => { setSection('profile'); setSidebarOpen(false); }} active={section === 'profile'} />
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full mt-6 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center gap-2 justify-center"
        >
          <LogOut size={20} /> {t.logout}
        </button>
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="bg-white border-b p-4 flex items-center justify-between md:justify-end gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={24} />
          </button>
          <div className="text-right">
            <p className="font-semibold text-gray-800">{user.username}</p>
            <p className="text-sm text-gray-600">{user.type === 'admin' ? 'Admin' : 'Mijoz'}</p>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
            {/* ==================== ADMIN - CLIENTS ==================== */}
            {user.type === 'admin' && section === 'clients' && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t.clients}</h1>
                <div className="space-y-4">
                  {clients.map(client => (
                    <ClientCard key={client.id} client={client} t={t} />
                  ))}
                </div>
              </div>
            )}

            {/* ==================== ADMIN - ORDERS ==================== */}
            {user.type === 'admin' && section === 'orders' && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t.orders}</h1>
                <div className="space-y-4">
                  {/* MOBILE: Card View */}
                  <div className="md:hidden space-y-4">
                    {orders.map(order => (
                      <OrderCard key={order.id} order={order} t={t} />
                    ))}
                  </div>
                  
                  {/* DESKTOP: Table View */}
                  <div className="hidden md:block bg-white rounded-lg overflow-hidden shadow">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-semibold">ID</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">{t.clientName}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">{t.quantity}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">{t.totalPrice}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">{t.status}</th>
                            <th className="px-4 py-3 text-left text-sm font-semibold">{t.actions}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(order => (
                            <tr key={order.id} className="border-t hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm">#{order.id}</td>
                              <td className="px-4 py-3 text-sm">{order.clientName || 'N/A'}</td>
                              <td className="px-4 py-3 text-sm">{order.quantity || 0}</td>
                              <td className="px-4 py-3 text-sm font-semibold">{order.totalPrice?.toLocaleString() || 0} UZS</td>
                              <td className="px-4 py-3 text-sm">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  order.status === 'Tayyor' ? 'bg-green-100 text-green-800' :
                                  order.status === 'Tayyorlanmoqda' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {order.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <button className="text-blue-600 hover:text-blue-800">
                                  <Eye size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ==================== ADMIN - PENDING FILES ==================== */}
            {user.type === 'admin' && section === 'pendingFiles' && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t.pendingFiles}</h1>
                <div className="space-y-4">
                  {pendingFiles.length === 0 ? (
                    <p className="text-gray-600">{t.pending} fayllar yo'q</p>
                  ) : (
                    pendingFiles.map(file => (
                      <PendingFileCard key={file.id} file={file} t={t} />
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ==================== CLIENT - MY FILES ==================== */}
            {user.type === 'client' && section === 'myFiles' && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{t.myFiles}</h1>
                  <button
                    onClick={() => setShowClientUploadModal(true)}
                    className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-emerald-700"
                  >
                    + {t.myFiles}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentClient?.files?.map(file => (
                    <FileCard key={file.id} file={file} t={t} />
                  ))}
                </div>
              </div>
            )}

            {/* ==================== CLIENT - MY ORDERS ==================== */}
            {user.type === 'client' && section === 'myOrders' && (
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{t.myOrders}</h1>
                <div className="space-y-4">
                  {orders.filter(o => o.clientId === user.id).length === 0 ? (
                    <p className="text-gray-600">Buyurtmalar yo'q</p>
                  ) : (
                    orders.filter(o => o.clientId === user.id).map(order => (
                      <div key={order.id} className="bg-white rounded-lg shadow p-4 md:p-6">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold">Buyurtma #{order.id}</h3>
                            <p className="text-gray-600 text-sm">{order.orderDate}</p>
                          </div>
                          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold text-sm">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-xl md:text-2xl font-bold text-gray-900 mt-4">
                          {order.totalPrice?.toLocaleString() || 0} UZS
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {showClientUploadModal && (
        <ClientFileUploadModal 
          show={showClientUploadModal} 
          onClose={() => setShowClientUploadModal(false)} 
          t={t} 
        />
      )}
    </div>
  );
}

// ======================== COMPONENTS ========================

function MenuItem({ icon, label, onClick, active }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition ${
        active ? 'bg-blue-500 text-white' : 'text-blue-100 hover:bg-blue-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function ClientCard({ client, t }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 md:p-6">
      <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{client.schoolName}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div><span className="text-gray-600">Telefon:</span> <span className="font-semibold">{client.phone1}</span></div>
        <div><span className="text-gray-600">Manzil:</span> <span className="font-semibold">{client.address}</span></div>
      </div>
      {client.files && client.files.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-700 mb-2">Fayllar ({client.files.length}):</p>
          <div className="space-y-2">
            {client.files.map(file => (
              <div key={file.id} className="text-sm bg-gray-50 p-2 rounded">
                {file.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function OrderCard({ order, t }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-800">#{order.id}</h3>
          <p className="text-xs text-gray-600">{order.clientName}</p>
        </div>
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          order.status === 'Tayyor' ? 'bg-green-100 text-green-800' :
          order.status === 'Tayyorlanmoqda' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {order.status}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">Miqdor: {order.quantity}</p>
      <p className="text-lg font-bold text-gray-900">{order.totalPrice?.toLocaleString() || 0} UZS</p>
    </div>
  );
}

function FileCard({ file, t }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition">
      <h4 className="font-bold text-gray-800 mb-2 line-clamp-2">{file.name}</h4>
      <div className="space-y-1 text-sm text-gray-600 mb-4">
        <p>Format: {file.format}</p>
        <p>Narx: {file.cashPrice} UZS</p>
      </div>
      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center justify-center gap-2">
        <Download size={16} /> Download
      </button>
    </div>
  );
}

function PendingFileCard({ file, t }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h4 className="font-bold text-gray-800 mb-3">{file.title}</h4>
      <div className="space-y-3">
        <input type="number" placeholder="Naqd narx" className="w-full px-3 py-2 border rounded text-sm" />
        <input type="number" placeholder="Bank narx" className="w-full px-3 py-2 border rounded text-sm" />
        <div className="flex gap-2">
          <button className="flex-1 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">✓ Tasdiqlash</button>
          <button className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm">✕ Rad Etish</button>
        </div>
      </div>
    </div>
  );
}

function ClientFileUploadModal({ show, onClose, t }) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 md:p-6 border-b sticky top-0 bg-white">
          <h2 className="text-xl md:text-2xl font-bold">Yangi Fayl Yuklash</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X size={24} />
          </button>
        </div>

        <form className="p-4 md:p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Fayl (PDF, DOC, DOCX)</label>
            <input type="file" accept=".pdf,.doc,.docx" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Sarlavha</label>
            <input type="text" placeholder="Fayl nomi" className="w-full px-4 py-2 border rounded-lg" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            <select className="px-3 py-2 border rounded-lg text-sm">
              <option>A4</option>
              <option>A5</option>
            </select>
            <select className="px-3 py-2 border rounded-lg text-sm">
              <option>Oq-Qora</option>
              <option>Rangli</option>
            </select>
            <select className="px-3 py-2 border rounded-lg text-sm">
              <option>PDF</option>
              <option>DOC</option>
              <option>DOCX</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg font-semibold">
              Bekor qilish
            </button>
            <button type="submit" className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-semibold">
              Yuklash
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function LoginPage({ handleLogin, showRegister, setShowRegister, lang, setLang, t }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-md w-full">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-2xl">SB</span>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-2">SAHFA BOOKS</h1>

        {/* Language Toggle */}
        <div className="flex justify-center gap-2 mb-6">
          <button onClick={() => setLang('uz')} className={`px-4 py-2 rounded font-semibold ${lang === 'uz' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            УЗ
          </button>
          <button onClick={() => setLang('en')} className={`px-4 py-2 rounded font-semibold ${lang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>
            EN
          </button>
        </div>

        {!showRegister ? (
          <>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(username, password); }} className="space-y-4">
              <input
                type="text"
                placeholder={t.username}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <input
                type="password"
                placeholder={t.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
              <button type="submit" className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700">
                {t.login}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center text-gray-600">Register coming soon</div>
        )}

        <p className="text-center text-gray-600 mt-6">
          {!showRegister && <button onClick={() => setShowRegister(true)} className="text-blue-600 hover:underline">Register</button>}
        </p>
      </div>
    </div>
  );
}