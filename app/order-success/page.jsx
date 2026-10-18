'use client';

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') || 'CX-829104';
  const { orders } = useProducts();

  const currentOrder = orders.find((o) => o.orderId === orderId) || orders[0];

  return (
    <main>
      <section className="checkout-section">
        <div className="container">
          {/* Hero thông báo */}
          <div className="success-hero-box">
            <div className="success-icon-badge">
              <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="success-title">Đặt hàng thành công!</h1>
            <p className="success-subtitle">
              Cảm ơn bạn đã lựa chọn lối sống thuần chay và đồng hành cùng Chạm Xanh. Kiện hàng sinh thái của bạn đang được đội ngũ chuẩn bị tỉ mỉ.
            </p>

            <div className="order-code-tag">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
              </svg>
              <span>Mã đơn hàng: <strong>{orderId}</strong></span>
            </div>

            {/* Hướng dẫn thanh toán */}
            <div
              style={{
                marginBottom: '24px',
                padding: '14px 18px',
                background: 'var(--primary-surface)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.88rem',
                textAlign: 'left'
              }}
            >
              {currentOrder?.paymentMethod === 'bank' ? (
                <div>
                  <strong>Thông tin chuyển khoản ngân hàng:</strong>
                  <div>Ngân hàng: <strong>MBBank</strong> - STK: <strong>0388 668 999</strong></div>
                  <div>Chủ TK: <strong>CHAM XANH BOTANICALS</strong></div>
                  <div>Nội dung CK: <strong style={{ color: 'var(--primary)' }}>{orderId}</strong></div>
                </div>
              ) : (
                <div>
                  <strong>Phương thức thanh toán:</strong> Bạn đã chọn thanh toán khi nhận hàng (COD). Vui lòng chuẩn bị số tiền tương ứng khi shipper giao hàng nhé.
                </div>
              )}
            </div>
          </div>

          {/* Hóa đơn chi tiết */}
          {currentOrder && (
            <div className="order-receipt-card" style={{ maxWidth: '680px', margin: '0 auto 40px' }}>
              <div className="receipt-header-row">
                <div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 4px' }}>
                    Chi tiết đơn hàng
                  </h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Ngày đặt: {currentOrder.createdAt || 'Hôm nay'}
                  </span>
                </div>
                <span className="badge" style={{ background: '#eaf4ed', color: '#237446', padding: '4px 12px', borderRadius: '99px', fontSize: '0.825rem', fontWeight: 700 }}>
                  {currentOrder.statusText || 'Đang xử lý'}
                </span>
              </div>

              {/* Thông tin người nhận */}
              <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border-subtle)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                <div><strong>Người nhận:</strong> {currentOrder.customer?.fullname}</div>
                <div><strong>Số điện thoại:</strong> {currentOrder.customer?.phone}</div>
                <div><strong>Địa chỉ:</strong> {currentOrder.customer?.address}</div>
              </div>

              {/* Danh sách món */}
              <div style={{ padding: '16px 0', borderBottom: '1px solid var(--border-subtle)' }}>
                {(currentOrder.items || []).map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '10px',
                      fontSize: '0.875rem'
                    }}
                  >
                    <span>
                      {item.name} <strong style={{ color: 'var(--text-muted)' }}>(x{item.quantity})</strong>
                    </span>
                    <strong style={{ color: 'var(--primary)' }}>
                      {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                    </strong>
                  </div>
                ))}
              </div>

              {/* Tổng tiền */}
              <div style={{ paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 'bold' }}>Tổng thanh toán:</span>
                <span style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--primary)' }}>
                  {currentOrder.total?.toLocaleString('vi-VN')}₫
                </span>
              </div>
            </div>
          )}

          {/* CTA Buttons */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', marginBottom: '60px' }}>
            <Link href="/products" className="btn btn-outline">
              Tiếp tục mua sắm
            </Link>
            <Link href="/account" className="btn btn-primary">
              Xem đơn hàng của tôi
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>Đang tải hóa đơn...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
