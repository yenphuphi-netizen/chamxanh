'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useToast } from './ToastContext';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'chamxanh_wishlist';

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setWishlist(JSON.parse(raw));
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist, isLoaded]);

  const isFavorited = useCallback(
    (id) => {
      return wishlist.some((item) => item.id === id);
    },
    [wishlist]
  );

  const toggleWishlist = useCallback(
    (product) => {
      setWishlist((prev) => {
        const exists = prev.some((i) => i.id === product.id);
        if (exists) {
          showToast(`Đã bỏ "${product.name}" khỏi danh sách yêu thích.`);
          return prev.filter((i) => i.id !== product.id);
        } else {
          showToast(`Đã thêm "${product.name}" vào danh sách yêu thích! ❤️`);
          return [...prev, product];
        }
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (id) => {
      setWishlist((prev) => {
        const item = prev.find((i) => i.id === id);
        if (item) {
          showToast(`Đã bỏ "${item.name}" khỏi yêu thích.`);
        }
        return prev.filter((i) => i.id !== id);
      });
    },
    [showToast]
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isFavorited,
        toggleWishlist,
        removeFromWishlist,
        wishlistCount: wishlist.length
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
