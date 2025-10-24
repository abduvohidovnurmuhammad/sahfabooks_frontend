// Backend API URL
const API_URL = 'http://localhost:5000/api';

// Token'ni saqlash
let token = localStorage.getItem('token');

// Token'ni o'rnatish
export const setToken = (newToken) => {
  token = newToken;
  localStorage.setItem('token', newToken);
};

// Token'ni o'chirish
export const clearToken = () => {
  token = null;
  localStorage.removeItem('token');
};

// Token'ni olish
export const getToken = () => token;

// ==================== AUTH API ====================

// Login
export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  if (!response.ok) {
    throw new Error('Login xatolik');
  }
  
  const data = await response.json();
  setToken(data.token);
  return data;
};

// Register
export const register = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    throw new Error('Ro\'yxatdan o\'tish xatolik');
  }
  
  return response.json();
};

// ==================== FILES API ====================

// Barcha fayllar
export const getFiles = async () => {
  const response = await fetch(`${API_URL}/files`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Fayllarni olish xatolik');
  }
  
  return response.json();
};

// Bitta fayl
export const getFile = async (id) => {
  const response = await fetch(`${API_URL}/files/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Faylni olish xatolik');
  }
  
  return response.json();
};

// Yangi fayl
export const createFile = async (fileData) => {
  const response = await fetch(`${API_URL}/files`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(fileData)
  });
  
  if (!response.ok) {
    throw new Error('Fayl yaratish xatolik');
  }
  
  return response.json();
};

// Fayl yuklash (FormData bilan)
export const uploadFile = async (formData) => {
  const response = await fetch(`${API_URL}/files/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
      // Content-Type avtomatik o'rnatiladi FormData uchun
    },
    body: formData
  });
  
  if (!response.ok) {
    throw new Error('Fayl yuklash xatolik');
  }
  
  return response.json();
};

// Faylni yuklab olish
export const downloadFile = async (fileId, fileName) => {
  const response = await fetch(`${API_URL}/files/${fileId}/download`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Faylni yuklab olish xatolik');
  }
  
  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};

// Faylni yangilash
export const updateFile = async (id, fileData) => {
  const response = await fetch(`${API_URL}/files/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(fileData)
  });
  
  if (!response.ok) {
    throw new Error('Faylni yangilash xatolik');
  }
  
  return response.json();
};

// Narx belgilash (Admin)
export const approvePrices = async (id, priceData) => {
  const response = await fetch(`${API_URL}/files/${id}/approve`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(priceData)
  });
  
  if (!response.ok) {
    throw new Error('Narx belgilash xatolik');
  }
  
  return response.json();
};

// Faylni rad etish (Admin)
export const rejectFile = async (id, reason) => {
  const response = await fetch(`${API_URL}/files/${id}/reject`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ reason })
  });
  
  if (!response.ok) {
    throw new Error('Faylni rad etish xatolik');
  }
  
  return response.json();
};

// Faylni o'chirish
export const deleteFile = async (id) => {
  const response = await fetch(`${API_URL}/files/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Faylni o\'chirish xatolik');
  }
  
  return response.json();
};

// ==================== USERS API ====================

// Barcha foydalanuvchilar
export const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Foydalanuvchilarni olish xatolik');
  }
  
  return response.json();
};

// Bitta foydalanuvchi
export const getUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Foydalanuvchini olish xatolik');
  }
  
  return response.json();
};

// Foydalanuvchini yangilash
export const updateUser = async (id, userData) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(userData)
  });
  
  if (!response.ok) {
    throw new Error('Foydalanuvchini yangilash xatolik');
  }
  
  return response.json();
};

// Foydalanuvchini o'chirish
export const deleteUser = async (id) => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Foydalanuvchini o\'chirish xatolik');
  }
  
  return response.json();
};

// ==================== ORDERS API ====================

// Barcha buyurtmalar
export const getOrders = async () => {
  const response = await fetch(`${API_URL}/orders`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Buyurtmalarni olish xatolik');
  }
  
  return response.json();
};

// Bitta buyurtma
export const getOrder = async (id) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Buyurtmani olish xatolik');
  }
  
  return response.json();
};

// Yangi buyurtma
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  
  if (!response.ok) {
    throw new Error('Buyurtma yaratish xatolik');
  }
  
  return response.json();
};

// Buyurtma statusini o'zgartirish (Admin)
export const updateOrderStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/orders/${id}/status`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ status })
  });
  
  if (!response.ok) {
    throw new Error('Status yangilash xatolik');
  }
  
  return response.json();
};

// Buyurtmani yangilash
export const updateOrder = async (id, orderData) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  
  if (!response.ok) {
    throw new Error('Buyurtmani yangilash xatolik');
  }
  
  return response.json();
};

// Buyurtmani o'chirish
export const deleteOrder = async (id) => {
  const response = await fetch(`${API_URL}/orders/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Buyurtmani o\'chirish xatolik');
  }
  
  return response.json();
};

// Buyurtma statistikasi (Admin)
export const getOrderStats = async () => {
  const response = await fetch(`${API_URL}/orders/stats/summary`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    throw new Error('Statistika olish xatolik');
  }
  
  return response.json();
};