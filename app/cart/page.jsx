'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    totalQuantity,
    subtotal,
    shippingFee,
    discount,
    total,
    isFreeShip,
    freeshipThreshold,
    coupon,
    updateQuantity,
    removeItem,
    clearCart,
    applyCoupon
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  const percent = Math.min(100, Math.round((subtotal / freeshipThreshold) * 100));
  const remaining = freeshipThreshold - subtotal;

  const handleApply = (e) => {
    e.preventDefault();
    applyCoupon(couponCode);
  };

  return (
    <main>
      <section className="cart-section">
        <div className="container">
          <div className="page-header-block">
            <h1 className="page-main-title">Giỏ hàng</h1>
            <p className="text-muted" id="cart-item-summary">
              {items.length > 0 ? `${totalQuantity} sản phẩm trong giỏ` : 'Giỏ hàng trống'}
            </p>
          </div>

          {items.length === 0 ? (
            /* Empty state */
            <div id="cart-empty-state" className="empty-state-box">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h2 className="empty-state-title">Giỏ hàng của bạn đang trống</h2>
              <p className="empty-state-desc">Hãy khám phá các sản phẩm mỹ phẩm thuần chay lành tính của Chạm Xanh và chọn cho mình sản phẩm ưng ý nhé.</p>
              <Link href="/products" className="btn btn-primary">
                Khám phá sản phẩm ngay
              </Link>
            </div>
          ) : (
            /* Main layout */
            <div className="cart-layout-grid" id="cart-main-layout">
              {/* Cột trái: Bảng món */}
              <div className="cart-left-col">
                {/* Thanh Freeship */}
                <div className="freeship-progress-box">
                  <div>
                    {isFreeShip ? (
                      <strong style={{ color: 'var(--primary)' }}>
                        🎉 Bạn đã đủ điều kiện được Miễn phí vận chuyển toàn quốc!
                      </strong>
                    ) : (
                      <span>
                        Mua thêm <strong>{remaining.toLocaleString('vi-VN')}₫</strong> để nhận <strong>Miễn phí vận chuyển</strong>
                      </span>
                    )}
                  </div>
                  <div className="freeship-progress-bar">
                    <div className="freeship-progress-fill" style={{ width: `${percent}%` }} />
                  </div>
                </div>

                <div className="cart-table-card">
                  <div className="cart-table-header">
                    <span>Sản phẩm</span>
                    <span>Đơn giá</span>
                    <span>Số lượng</span>
                    <span>Thành tiền</span>
                    <span></span>
                  </div>

                  <div className="cart-table-body">
                    {items.map((item) => {
                      const lineTotal = item.price * item.quantity;
                      return (
                        <div key={item.id} className="cart-row" data-cart-row={item.id}>
                          <div className="cart-row-prod">
                            <img src={item.image} alt={item.name} className="cart-thumb" />
                            <div>
                              <Link href={`/products/${item.id}`} className="cart-prod-title">
                                {item.name}
                              </Link>
                              <div className="cart-prod-vol">{item.volume}</div>
                            </div>
                          </div>

                          <div className="cart-row-price">
                            {item.priceFormatted || `${item.price.toLocaleString('vi-VN')}₫`}
                          </div>

                          <div className="cart-row-qty">
                            <div className="cart-qty-counter">
                              <button
                                type="button"
                                className="qty-step-btn"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="qty-number">{item.quantity}</span>
                              <button
                                type="button"
                                className="qty-step-btn"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="cart-row-total">
                            {lineTotal.toLocaleString('vi-VN')}₫
                          </div>

                          <div className="cart-row-del">
                            <button
                              type="button"
                              className="btn-remove-item"
                              onClick={() => removeItem(item.id)}
                              title="Xóa sản phẩm"
                            >
                              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="cart-actions-bar">
                  <Link href="/products" className="btn btn-outline btn-sm">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
                    </svg>
                    Tiếp tục mua sắm
                  </Link>
                  <button type="button" className="btn btn-subtle btn-sm" onClick={clearCart}>
                    Xóa toàn bộ
                  </button>
                </div>
              </div>

              {/* Cột phải: Tóm tắt đơn hàng */}
              <div className="cart-summary-card">
                <h2 className="summary-title">Tóm tắt đơn hàng</h2>

                <div className="summary-row">
                  <span>Tạm tính</span>
                  <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                </div>

                {discount > 0 && (
                  <div className="summary-row" style={{ color: '#16a34a' }}>
                    <span>Giảm giá ({coupon})</span>
                    <span>-{discount.toLocaleString('vi-VN')}₫</span>
                  </div>
                )}

                <div className="summary-row">
                  <span>Phí vận chuyển</span>
                  <span>{shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}</span>
                </div>

                <form onSubmit={handleApply} className="coupon-box">
                  <input
                    type="text"
                    className="coupon-input"
                    placeholder="Mã giảm giá (CHAMXANH)..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    maxLength={20}
                  />
                  <button type="submit" className="btn btn-outline btn-sm">
                    Áp dụng
                  </button>
                </form>

                <div className="summary-row total">
                  <span>Tổng cộng</span>
                  <span className="summary-total-val">{total.toLocaleString('vi-VN')}₫</span>
                </div>

                <button
                  type="button"
                  className="btn btn-primary btn-full"
                  onClick={() => router.push('/checkout')}
                  style={{ marginTop: '18px', padding: '14px', fontSize: '1rem' }}
                >
                  Tiến hành thanh toán
                </button>

                <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '12px' }}>
                  Thanh toán an toàn · VNPAY · MOMO · COD
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
