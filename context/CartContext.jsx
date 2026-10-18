'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext(null);
const STORAGE_KEY = 'chamxanh_cart';
const FREESHIP_THRESHOLD = 300000;
const DEFAULT_SHIPPING = 20000;
const VALID_COUPON = 'CHAMXANH';
const COUPON_DISCOUNT = 0.1; // 10%

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on mount (SSR safe)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setItems(JSON.parse(raw));
      } else {
        // Mẫu mặc định ban đầu nếu giỏ trống
        const initial = [
          {
            id: 'sp-dau-goi-buoi-300ml',
            name: 'Dầu Gội Bưởi Không Sulfate 300ml',
            price: 179000,
            priceFormatted: '179.000₫',
            image: '/assets/product/dầu gội/Gemini_Generated_Image_lf86zflf86zflf86.png',
            quantity: 1,
            volume: '300ml'
          },
          {
            id: 'sp-toner-tra-xanh-150ml',
            name: 'Toner Trà Xanh Làm Dịu Da 150ml',
            price: 159000,
            priceFormatted: '159.000₫',
            image: '/assets/product/toner/Gemini_Generated_Image_j7sigjj7sigjj7si.png',
            quantity: 1,
            volume: '150ml'
          }
        ];
        setItems(initial);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error(e);
    }
  }, [items, isLoaded]);

  const addItem = useCallback((product, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          priceFormatted: product.priceFormatted || (product.price.toLocaleString('vi-VN') + '₫'),
          image: product.image,
          quantity: quantity,
          volume: product.specs?.volume || ''
        }
      ];
    });
    showToast(`Đã thêm "${product.name}" vào giỏ hàng!`);
  }, [showToast]);

  const updateQuantity = useCallback((id, qty) => {
    if (qty <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
    );
  }, []);

  const removeItem = useCallback((id) => {
    setItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item) {
        showToast(`Đã xóa "${item.name}" khỏi giỏ hàng.`);
      }
      return prev.filter((i) => i.id !== id);
    });
  }, [showToast]);

  const clearCart = useCallback(() => {
    setItems([]);
    showToast('Đã xóa toàn bộ giỏ hàng.');
  }, [showToast]);

  const applyCoupon = useCallback((code) => {
    const clean = (code || '').trim().toUpperCase();
    if (clean === VALID_COUPON) {
      setCoupon(clean);
      showToast('Áp dụng mã giảm giá 10% thành công!');
      return { success: true };
    }
    showToast('Mã giảm giá không hợp lệ. Thử mã: CHAMXANH');
    return { success: false };
  }, [showToast]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const isFreeShip = subtotal >= FREESHIP_THRESHOLD;
  const shippingFee = items.length === 0 ? 0 : isFreeShip ? 0 : DEFAULT_SHIPPING;
  const discount = coupon === VALID_COUPON ? Math.round(subtotal * COUPON_DISCOUNT) : 0;
  const total = Math.max(0, subtotal - discount + shippingFee);
  const totalQuantity = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        totalQuantity,
        subtotal,
        shippingFee,
        discount,
        total,
        isFreeShip,
        coupon,
        isDrawerOpen,
        openDrawer: () => setIsDrawerOpen(true),
        closeDrawer: () => setIsDrawerOpen(false),
        toggleDrawer: () => setIsDrawerOpen((v) => !v),
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        applyCoupon,
        freeshipThreshold: FREESHIP_THRESHOLD
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
