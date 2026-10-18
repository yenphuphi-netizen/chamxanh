'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login, quickLogin } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = login(username, password);
    if (result.success) {
      router.push(result.redirectUrl);
    }
  };

  const handleQuick = (role) => {
    const result = quickLogin(role);
    if (result.success) {
      router.push(result.redirectUrl);
    }
  };

  return (
    <main>
      <section className="auth-section">
        <div className="auth-container">
          <div className="auth-card">
            {/* Header */}
            <div className="auth-header">
              <img src="/assets/logo.jpg" alt="Logo Chạm Xanh" className="auth-logo-img" />
              <h1 className="auth-title">Đăng nhập Chạm Xanh</h1>
              <p className="auth-subtitle">Trải nghiệm mua sắm mỹ phẩm thuần chay lành tính</p>
            </div>

            {/* Quick Demo Box */}
            <div className="quick-login-box">
              <div className="quick-login-title">
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                Chọn tài khoản thử nghiệm nhanh:
              </div>
              <div className="quick-login-btns">
                <button
                  type="button"
                  className="quick-btn"
                  onClick={() => handleQuick('customer')}
                  title="Điền tài khoản khách hàng"
                >
                  Khách hàng thường
                </button>
                <button
                  type="button"
                  className="quick-btn admin"
                  onClick={() => handleQuick('admin')}
                  title="Điền tài khoản admin"
                >
                  Quản trị viên (Admin)
                </button>
              </div>
            </div>

            {/* Nav tabs */}
            <div className="auth-nav-tabs">
              <Link href="/login" className="auth-tab-link active">
                Đăng nhập
              </Link>
              <Link href="/register" className="auth-tab-link">
                Đăng ký mới
              </Link>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Email hoặc Tên tài khoản</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="admin hoặc email khách..."
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Mật khẩu</label>
                <div className="input-wrapper">
                  <span className="input-icon">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="auth-options-row">
                <label className="remember-checkbox">
                  <input type="checkbox" defaultChecked style={{ accentColor: 'var(--primary)' }} />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <span
                  style={{ fontSize: '0.825rem', color: 'var(--primary)', cursor: 'pointer' }}
                  onClick={() => handleQuick('customer')}
                >
                  Dùng thử tài khoản mẫu
                </span>
              </div>

              <button type="submit" className="btn btn-primary auth-btn-submit">
                Đăng nhập ngay
              </button>

              <p className="auth-footer-text">
                Bạn chưa có tài khoản? <Link href="/register">Đăng ký thành viên</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
