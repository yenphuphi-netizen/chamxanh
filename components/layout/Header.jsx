'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { totalQuantity, openDrawer } = useCart();
  const { currentUser, isLoggedIn, isAdmin, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // Ẩn Header mặc định khi đang ở trang Admin Panel để dùng layout Admin riêng biệt
  if (pathname && pathname.startsWith('/admin')) {
    return null;
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <>
      <header className="site-header" id="site-header">
        <div className="container header-container">
          {/* Brand Logo */}
          <Link href="/" className="brand-logo" title="Chạm Xanh - Mỹ phẩm thuần chay">
            <img src="/assets/logo.jpg" alt="Logo Chạm Xanh" className="brand-logo-img" />
            <div className="brand-text">
              <span className="brand-title">Chạm Xanh</span>
              <span className="brand-tagline">Mỹ phẩm thuần chay</span>
            </div>
          </Link>

          {/* Desktop Nav Menu */}
          <nav className="nav-menu" aria-label="Điều hướng chính">
            <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>
              Trang chủ
            </Link>
            <Link href="/products" className={`nav-link ${pathname.startsWith('/products') ? 'active' : ''}`}>
              Sản phẩm
            </Link>
            <Link href="/about" className={`nav-link ${pathname === '/about' ? 'active' : ''}`}>
              Giới thiệu
            </Link>
            <Link href="/contact" className={`nav-link ${pathname === '/contact' ? 'active' : ''}`}>
              Liên hệ
            </Link>
          </nav>

          {/* Header Search */}
          <div className="header-search">
            <form onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-input"
                placeholder="Tìm kiếm sản phẩm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoComplete="off"
                aria-label="Tìm kiếm sản phẩm"
              />
              <button type="submit" className="search-btn" title="Tìm kiếm">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
            </form>
          </div>

          {/* Header Actions */}
          <div className="header-actions">
            {/* Nút Yêu thích */}
            <Link href="/wishlist" className="cart-btn" title="Danh sách yêu thích">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </Link>

            {/* Nút Giỏ hàng mở Drawer */}
            <button
              type="button"
              className="cart-btn"
              onClick={openDrawer}
              title="Giỏ hàng"
              aria-label="Mở giỏ hàng"
            >
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalQuantity > 0 && <span className="cart-badge">{totalQuantity}</span>}
            </button>

            {/* Auth Buttons / User Pill */}
            {isLoggedIn ? (
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className="btn btn-outline btn-sm"
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <span
                    style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      color: '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: 'bold'
                    }}
                  >
                    {currentUser?.avatarText || 'U'}
                  </span>
                  <span>{currentUser?.name?.split(' ').slice(-1)[0] || 'Tài khoản'}</span>
                </button>

                {userDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      marginTop: '8px',
                      background: '#ffffff',
                      boxShadow: 'var(--shadow-lg)',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      padding: '8px 0',
                      minWidth: '160px',
                      zIndex: 1000
                    }}
                  >
                    <Link
                      href="/account"
                      className="nav-link"
                      style={{ display: 'block', padding: '8px 16px', color: 'var(--text-main)', fontSize: '0.875rem' }}
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      Tài khoản của tôi
                    </Link>
                    {isAdmin && (
                      <Link
                        href="/admin"
                        className="nav-link"
                        style={{ display: 'block', padding: '8px 16px', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.875rem' }}
                        onClick={() => setUserDropdownOpen(false)}
                      >
                        Vào trang Admin
                      </Link>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        padding: '8px 16px',
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '0.875rem'
                      }}
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="btn btn-outline btn-sm">
                  Đăng nhập
                </Link>
                <Link href="/register" className="btn btn-primary btn-sm">
                  Đăng ký
                </Link>
              </>
            )}

            {/* Nút Admin */}
            <Link href="/admin" className="admin-badge-btn" title="Khu vực quản trị Admin">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              Admin
            </Link>

            {/* Hamburger Mobile Menu Toggle */}
            <button
              type="button"
              className="hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Mở menu di động"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 9998
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              width: '280px',
              background: '#ffffff',
              padding: '24px 20px',
              boxShadow: '-4px 0 20px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>Menu Chạm Xanh</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
              >
                ×
              </button>
            </div>

            <Link href="/" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', fontWeight: '600' }}>
              Trang chủ
            </Link>
            <Link href="/products" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', fontWeight: '600' }}>
              Sản phẩm
            </Link>
            <Link href="/wishlist" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', fontWeight: '600' }}>
              Yêu thích
            </Link>
            <Link href="/cart" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', fontWeight: '600' }}>
              Giỏ hàng ({totalQuantity})
            </Link>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', fontWeight: '600' }}>
              Giới thiệu
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', fontWeight: '600' }}>
              Liên hệ
            </Link>
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)} style={{ padding: '8px 0', fontWeight: '600', color: 'var(--primary)' }}>
              Khu vực Admin
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
