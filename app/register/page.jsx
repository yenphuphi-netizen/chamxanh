'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [fullname, setFullname] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(fullname, phone, email, password);
    if (result.success) {
      router.push(result.redirectUrl);
    }
  };

  return (
    <main>
      <section className="auth-section">
        <div className="auth-container">
          <div className="auth-card">
            <div className="auth-header">
              <img src="/assets/logo.jpg" alt="Logo Chạm Xanh" className="auth-logo-img" />
              <h1 className="auth-title">Đăng ký thành viên</h1>
              <p className="auth-subtitle">Nhận ngay 50 Điểm Xanh và ưu đãi thành viên mới</p>
            </div>

            <div className="auth-nav-tabs">
              <Link href="/login" className="auth-tab-link">
                Đăng nhập
              </Link>
              <Link href="/register" className="auth-tab-link active">
                Đăng ký mới
              </Link>
            </div>

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label className="form-label">Họ và tên</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ví dụ: Nguyễn Mai Lan"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Số điện thoại</label>
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Ví dụ: 0912 345 678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Mật khẩu</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Tối thiểu 6 ký tự"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary auth-btn-submit">
                Đăng ký thành viên ngay
              </button>

              <p className="auth-footer-text">
                Bạn đã có tài khoản? <Link href="/login">Đăng nhập</Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
