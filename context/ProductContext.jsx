'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { PRODUCTS_DATA as initialProducts } from '@/lib/products-data';
import { useToast } from './ToastContext';

const ProductContext = createContext(null);
const STORAGE_KEY = 'chamxanh_custom_products';
const ORDERS_STORAGE_KEY = 'chamxanh_orders_history';

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    try {
      const rawProds = localStorage.getItem(STORAGE_KEY);
      if (rawProds) {
        setProducts(JSON.parse(rawProds));
      }

      const rawOrders = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (rawOrders) {
        setOrders(JSON.parse(rawOrders));
      } else {
        // Mẫu đơn hàng ban đầu
        const demoOrders = [
          {
            orderId: 'CX-829104',
            customer: { fullname: 'Trần Minh Anh', phone: '0903 112 233', address: '45 Lê Duẩn, Quận 1, TP. HCM' },
            items: [{ name: 'Combo Chăm Sóc Toàn Diện Xanh', quantity: 1, price: 322000 }],
            total: 322000,
            status: 'completed',
            statusText: 'Đã hoàn tất',
            createdAt: '18/10/2026, 14:20'
          },
          {
            orderId: 'CX-719382',
            customer: { fullname: 'Hoàng Yến Nhi', phone: '0938 776 554', address: '12 Hoàng Diệu, Ba Đình, Hà Nội' },
            items: [
              { name: 'Dầu Gội Bưởi Không Sulfate 300ml', quantity: 2, price: 179000 },
              { name: 'Tẩy Tế Bào Chết Cà Phê 200ml', quantity: 1, price: 169000 }
            ],
            total: 527000,
            status: 'processing',
            statusText: 'Đang xử lý',
            createdAt: '18/10/2026, 11:45'
          }
        ];
        setOrders(demoOrders);
      }
    } catch (e) {
      console.error(e);
    }
    setIsLoaded(true);
  }, []);

  const addProduct = useCallback(
    (product) => {
      const newProd = {
        ...product,
        id: product.id || 'sp-custom-' + Date.now(),
        priceFormatted: (product.price || 0).toLocaleString('vi-VN') + '₫'
      };
      setProducts((prev) => {
        const updated = [newProd, ...prev];
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      showToast(`Đã thêm sản phẩm "${newProd.name}" thành công!`);
    },
    [showToast]
  );

  const updateProduct = useCallback(
    (id, updatedFields) => {
      setProducts((prev) => {
        const updated = prev.map((p) =>
          p.id === id
            ? {
                ...p,
                ...updatedFields,
                priceFormatted: updatedFields.price
                  ? updatedFields.price.toLocaleString('vi-VN') + '₫'
                  : p.priceFormatted
              }
            : p
        );
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        return updated;
      });
      showToast('Đã lưu thay đổi sản phẩm thành công!');
    },
    [showToast]
  );

  const deleteProduct = useCallback(
    (id) => {
      setProducts((prev) => {
        const prod = prev.find((p) => p.id === id);
        const updated = prev.filter((p) => p.id !== id);
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        showToast(`Đã xóa "${prod?.name || 'sản phẩm'}" khỏi hệ thống.`);
        return updated;
      });
    },
    [showToast]
  );

  const addOrder = useCallback(
    (orderData) => {
      const newOrder = {
        ...orderData,
        orderId: 'CX-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toLocaleString('vi-VN'),
        status: 'processing',
        statusText: 'Đang xử lý'
      };
      setOrders((prev) => {
        const updated = [newOrder, ...prev];
        try {
          localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
          localStorage.setItem('chamxanh_last_order', JSON.stringify(newOrder));
        } catch (e) {}
        return updated;
      });
      return newOrder;
    },
    []
  );

  const toggleOrderStatus = useCallback(
    (orderId) => {
      setOrders((prev) => {
        const updated = prev.map((order) => {
          if (order.orderId === orderId) {
            const nextStatus = order.status === 'completed' ? 'processing' : 'completed';
            return {
              ...order,
              status: nextStatus,
              statusText: nextStatus === 'completed' ? 'Đã hoàn tất' : 'Đang xử lý'
            };
          }
          return order;
        });
        try {
          localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(updated));
        } catch (e) {}
        showToast(`Đã cập nhật trạng thái đơn ${orderId}!`);
        return updated;
      });
    },
    [showToast]
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        orders,
        addProduct,
        updateProduct,
        deleteProduct,
        addOrder,
        toggleOrderStatus
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
}
