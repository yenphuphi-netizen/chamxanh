'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/context/ToastContext';

export default function ContactPage() {
  const { showToast } = useToast();
  const [fullname, setFullname] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast('Tin nhắn đã được gửi! Chạm Xanh sẽ liên hệ với bạn trong thời gian sớm nhất.');
    setFullname('');
    setContactInfo('');
    setMessage('');
  };

  return (
    <main className="section">
      <div className="container" style={{ maxWidth: '960px' }}>
        <nav style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          <Link href="/">Trang chủ</Link> <span>/</span> <span style={{ color: 'var(--primary)' }}>Liên hệ</span>
        </nav>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2rem', marginBottom: '12px' }}>Liên Hệ Với Chúng Tôi</h1>
            <p className="text-muted" style={{ marginBottom: '24px', lineHeight: 1.6 }}>
              Bạn có câu hỏi về làn da, sản phẩm hoặc chính sách mua hàng? Đội ngũ Chạm Xanh luôn sẵn sàng lắng nghe và tư vấn tận tâm.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div className="hero-feature-icon" style={{ background: 'var(--primary-light)' }}>
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <strong>Showroom & Trụ sở:</strong>
                  <p className="text-muted" style={{ fontSize: '0.88rem' }}>123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div className="hero-feature-icon" style={{ background: 'var(--primary-light)' }}>
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <strong>Tổng đài hỗ trợ:</strong>
                  <p className="text-muted" style={{ fontSize: '0.88rem' }}>1900 6868 (08:00 - 21:00 hàng ngày)</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div className="hero-feature-icon" style={{ background: 'var(--primary-light)' }}>
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  </svg>
                </div>
                <div>
                  <strong>Email hỗ trợ:</strong>
                  <p className="text-muted" style={{ fontSize: '0.88rem' }}>contact@chamxanh.vn</p>
                </div>
              </div>
            </div>
          </div>

          <div style={{ background: '#ffffff', padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Gửi tin nhắn cho chúng tôi</h3>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Họ và tên</label>
                <input
                  type="text"
                  required
                  className="search-input"
                  placeholder="Nguyễn Văn A"
                  style={{ width: '100%' }}
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Email hoặc Số điện thoại</label>
                <input
                  type="text"
                  required
                  className="search-input"
                  placeholder="email@domain.com"
                  style={{ width: '100%' }}
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>Nội dung lời nhắn</label>
                <textarea
                  required
                  rows={4}
                  className="search-input"
                  placeholder="Chia sẻ với chúng tôi nhu cầu của bạn..."
                  style={{ width: '100%', borderRadius: '8px', resize: 'vertical' }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary btn-full">
                Gửi tin nhắn
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
