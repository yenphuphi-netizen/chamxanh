'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();

  // Ẩn Footer ở trang Admin Panel
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="site-footer" id="site-footer">
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Cột 1: Thương hiệu */}
          <div className="footer-brand">
            <Link href="/" className="footer-logo">
              <img src="/assets/logo.jpg" alt="Logo Chạm Xanh" className="footer-logo-img" />
              <span className="brand-title" style={{ fontSize: '1.25rem' }}>Chạm Xanh</span>
            </Link>
            <p className="footer-bio">
              Mỹ phẩm thuần chay và giải pháp làm đẹp lành tính từ nông sản Việt Nam. Đồng hành cùng lối sống xanh, an lành cho da và thân thiện cùng môi trường.
            </p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="Facebook">
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="Instagram">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="YouTube">
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="#ffffff"/>
                </svg>
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-btn" title="TikTok">
                <svg className="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5v3a8 8 0 0 1-5-2v6a7 7 0 1 1-7-7c.34 0 .68.03 1 .08V12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Cột 2: Thông tin */}
          <div className="footer-col">
            <h4 className="footer-col-title">Thông tin</h4>
            <ul className="footer-links">
              <li><Link href="/about" className="footer-link">Về chúng tôi</Link></li>
              <li><Link href="/about#story" className="footer-link">Câu chuyện thương hiệu</Link></li>
              <li><Link href="/about#vegan" className="footer-link">Tiêu chuẩn thuần chay</Link></li>
              <li><Link href="/products" className="footer-link">Danh mục mỹ phẩm</Link></li>
            </ul>
          </div>

          {/* Cột 3: Hỗ trợ khách hàng */}
          <div className="footer-col">
            <h4 className="footer-col-title">Hỗ trợ khách hàng</h4>
            <ul className="footer-links">
              <li><Link href="/cart" className="footer-link">Kiểm tra giỏ hàng</Link></li>
              <li><Link href="/checkout" className="footer-link">Thanh toán & Giao hàng</Link></li>
              <li><Link href="/account" className="footer-link">Tài khoản thành viên</Link></li>
              <li><Link href="/contact" className="footer-link">Liên hệ & Phản hồi</Link></li>
            </ul>
          </div>

          {/* Cột 4: Liên hệ */}
          <div className="footer-col">
            <h4 className="footer-col-title">Liên hệ</h4>
            <div className="footer-contact-list">
              <div className="footer-contact-item">
                <span>123 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</span>
              </div>
              <div className="footer-contact-item">
                <span>Hotline: 1900 6868</span>
              </div>
              <div className="footer-contact-item">
                <span>Email: contact@chamxanh.vn</span>
              </div>
              <div className="footer-contact-item">
                <span>Mở cửa: 08:00 - 21:00 (T2 - CN)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-container">
          <p className="footer-copyright">&copy; 2026 Chạm Xanh. All rights reserved.</p>
          <div className="payment-methods">
            <span className="payment-tag">VNPAY</span>
            <span className="payment-tag">MOMO</span>
            <span className="payment-tag">VIETQR</span>
            <span className="payment-tag">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
