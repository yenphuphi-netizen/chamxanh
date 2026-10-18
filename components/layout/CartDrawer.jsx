'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const {
    items,
    totalQuantity,
    subtotal,
    isFreeShip,
    freeshipThreshold,
    isDrawerOpen,
    closeDrawer,
    updateQuantity,
    removeItem
  } = useCart();

  if (!isDrawerOpen) return null;

  const percent = Math.min(100, Math.round((subtotal / freeshipThreshold) * 100));
  const remaining = freeshipThreshold - subtotal;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.5)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={closeDrawer}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '420px',
          background: '#ffffff',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 25px rgba(0,0,0,0.15)',
          animation: 'slideInRight 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div
          style={{
            padding: '20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: '800', margin: 0, color: 'var(--text-main)' }}>
              Giỏ hàng của bạn
            </h3>
            <span
              style={{
                fontSize: '0.8rem',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                fontWeight: 'bold',
                padding: '2px 8px',
                borderRadius: '99px'
              }}
            >
              {totalQuantity} món
            </span>
          </div>

          <button
            type="button"
            onClick={closeDrawer}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#64748b'
            }}
            title="Đóng giỏ hàng"
          >
            ×
          </button>
        </div>

        {/* Freeship Progress bar */}
        <div
          style={{
            padding: '12px 20px',
            background: 'var(--primary-surface, #f0fdf4)',
            borderBottom: '1px solid var(--border-subtle)'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '6px' }}>
            {isFreeShip ? (
              <span style={{ color: 'var(--primary)', fontWeight: '700' }}>
                🎉 Chúc mừng! Đơn hàng của bạn được FREESHIP toàn quốc!
              </span>
            ) : (
              <span>
                Mua thêm <strong>{remaining.toLocaleString('vi-VN')}₫</strong> để được <strong>FREESHIP</strong>
              </span>
            )}
          </div>
          <div style={{ height: '6px', background: '#e2e8f0', borderRadius: '99px', overflow: 'hidden' }}>
            <div
              style={{
                height: '100%',
                width: `${percent}%`,
                background: 'var(--primary)',
                transition: 'width 0.3s ease'
              }}
            />
          </div>
        </div>

        {/* Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🍃</div>
              <p style={{ fontWeight: '600', marginBottom: '16px' }}>Giỏ hàng của bạn đang trống</p>
              <Link
                href="/products"
                onClick={closeDrawer}
                className="btn btn-primary btn-sm"
              >
                Khám phá sản phẩm ngay
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    paddingBottom: '14px',
                    borderBottom: '1px solid var(--border-subtle)',
                    alignItems: 'center'
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      objectFit: 'cover',
                      border: '1px solid var(--border-subtle)'
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h4
                      style={{
                        fontSize: '0.875rem',
                        fontWeight: '700',
                        color: 'var(--text-main)',
                        margin: '0 0 4px',
                        lineHeight: 1.3
                      }}
                    >
                      {item.name}
                    </h4>
                    <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 'bold' }}>
                      {item.priceFormatted || `${item.price.toLocaleString('vi-VN')}₫`}
                    </div>

                    {/* Quantity controls */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        marginTop: '8px'
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                          background: '#ffffff',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem'
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.85rem', fontWeight: 'bold', minWidth: '18px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '4px',
                          border: '1px solid var(--border-subtle)',
                          background: '#ffffff',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.9rem'
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      padding: '4px',
                      fontSize: '1.2rem'
                    }}
                    title="Xóa món này"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px',
              borderTop: '1px solid var(--border-subtle)',
              background: '#ffffff'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
                fontSize: '1.05rem',
                fontWeight: 'bold'
              }}
            >
              <span>Tạm tính:</span>
              <span style={{ color: 'var(--primary)' }}>{subtotal.toLocaleString('vi-VN')}₫</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <Link
                href="/checkout"
                onClick={closeDrawer}
                className="btn btn-primary btn-full"
                style={{ textAlign: 'center', padding: '12px' }}
              >
                Tiến hành thanh toán
              </Link>
              <Link
                href="/cart"
                onClick={closeDrawer}
                className="btn btn-outline btn-full"
                style={{ textAlign: 'center', padding: '10px' }}
              >
                Xem chi tiết giỏ hàng
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
