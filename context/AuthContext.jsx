'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext(null);
const STORAGE_KEY = 'chamxanh_current_user';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setCurrentUser(JSON.parse(raw));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  const login = useCallback(
    (identifier, password) => {
      const id = (identifier || '').trim().toLowerCase();

      // Quyền Admin
      if (id === 'admin' || id === 'admin@chamxanh.vn' || id.startsWith('admin')) {
        const adminUser = {
          name: 'Quản trị viên Chạm Xanh',
          email: 'admin@chamxanh.vn',
          role: 'admin',
          avatarText: 'AD',
          loginAt: new Date().toISOString()
        };
        setCurrentUser(adminUser);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
        } catch (e) {}
        showToast('Đăng nhập thành công với quyền Quản trị viên!');
        return { success: true, role: 'admin', redirectUrl: '/admin' };
      }

      // Khách hàng
      let customerName = 'Nguyễn Mai Lan';
      if (identifier.includes('@')) {
        const part = identifier.split('@')[0];
        if (part && part.length > 2) {
          customerName = part.charAt(0).toUpperCase() + part.slice(1);
        }
      }

      const customerUser = {
        name: customerName,
        email: identifier || 'khachhang@chamxanh.vn',
        phone: '0912 345 678',
        role: 'customer',
        membership: 'Thành viên Mầm Xanh',
        greenPoints: 240,
        avatarText: customerName.charAt(0).toUpperCase(),
        loginAt: new Date().toISOString()
      };

      setCurrentUser(customerUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(customerUser));
      } catch (e) {}
      showToast(`Chào mừng trở lại, ${customerUser.name}!`);
      return { success: true, role: 'customer', redirectUrl: '/account' };
    },
    [showToast]
  );

  const quickLogin = useCallback(
    (role = 'customer') => {
      if (role === 'admin') {
        return login('admin@chamxanh.vn', '123456');
      } else {
        return login('lan.nguyen@chamxanh.vn', '123456');
      }
    },
    [login]
  );

  const register = useCallback(
    (fullname, phone, email, password) => {
      const name = (fullname || '').trim() || 'Khách hàng mới';
      const newUser = {
        name: name,
        email: email || 'thanhvien@chamxanh.vn',
        phone: phone || '0987 654 321',
        role: 'customer',
        membership: 'Thành viên Mới',
        greenPoints: 50,
        avatarText: name.charAt(0).toUpperCase(),
        loginAt: new Date().toISOString()
      };

      setCurrentUser(newUser);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      } catch (e) {}
      showToast(`Đăng ký tài khoản thành công! Tặng bạn 50 Điểm Xanh.`);
      return { success: true, redirectUrl: '/account' };
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    showToast('Đã đăng xuất thành công.');
  }, [showToast]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn: !!currentUser,
        isAdmin: currentUser?.role === 'admin',
        login,
        quickLogin,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
