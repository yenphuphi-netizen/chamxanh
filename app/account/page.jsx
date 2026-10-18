'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useProducts } from '@/context/ProductContext';

export default function CustomerAccountPage() {
  const router = useRouter();
  const { currentUser, logout, isLoggedIn } = useAuth();
  const { orders } = useProducts();

  const user = currentUser || {
    name: 'Nguyễn Mai Lan',
    email: 'khachhang@chamxanh.vn',
    phone: '0912 345 678',
    membership: 'Thành viên Mầm Xanh',
    greenPoints: 240,
    avatarText: 'M'
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <main>
      <section className="customer-section" style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div className="customer-layout-grid" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '32px' }}>
            {/* Sidebar */}
            <div className="customer-sidebar-card" style={{ background: '#ffffff', padding: '28px 20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#ffffff',
                  fontSize: '1.6rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 12px'
                }}
              >
                {user.avatarText || 'U'}
              </div>

              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 4px', color: 'var(--text-main)' }}>
                {user.name}
              </h2>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', margin: '0 0 12px' }}>
                {user.email}
              </p>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 12px',
                  background: 'var(--primary-light)',
                  color: 'var(--primary)',
                  borderRadius: '99px',
                  fontSize: '0.78rem',
                  fontWeight: 'bold',
                  marginBottom: '24px'
                }}
              >
                <span>🌿</span>
                <span>{user.membership || 'Thành viên Mầm Xanh'}</span>
              </div>

              <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>
                  <a href="#orders" style={{ display: 'block', padding: '10px 14px', borderRadius: '8px', background: 'var(--primary-surface)', color: 'var(--primary)', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    📦 Đơn hàng của tôi
                  </a>
                </li>
                <li>
                  <Link href="/wishlist" style={{ display: 'block', padding: '10px 14px', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.875rem' }}>
                    ❤️ Sản phẩm yêu thích
                  </Link>
                </li>
                <li>
                  <Link href="/cart" style={{ display: 'block', padding: '10px 14px', borderRadius: '8px', color: 'var(--text-main)', fontSize: '0.875rem' }}>
                    🛒 Giỏ hàng
                  </Link>
                </li>
                <li style={{ marginTop: '12px', borderTop: '1px solid var(--border-subtle)', paddingTop: '12px' }}>
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{ width: '100%', textAlign: 'left', padding: '10px 14px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 'bold' }}
                  >
                    🚪 Đăng xuất
                  </button>
                </li>
              </ul>
            </div>

            {/* Main Profile Content */}
            <div className="customer-main-content">
              {/* Stat Widgets */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
                <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Tổng đơn hàng</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--primary)', margin: '4px 0' }}>
                    {orders.length}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Đơn đã đặt tại Chạm Xanh</div>
                </div>

                <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Điểm Xanh tích lũy</div>
                  <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#e5a93c', margin: '4px 0' }}>
                    {user.greenPoints || 240}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tương đương 24.000₫ giảm giá</div>
                </div>

                <div style={{ background: '#ffffff', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hạng thành viên</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)', margin: '8px 0 4px' }}>
                    Mầm Xanh
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#16a34a' }}>Được ưu đãi Freeship từ 300k</div>
                </div>
              </div>

              {/* Orders History Card */}
              <div style={{ background: '#ffffff', padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-subtle)' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 16px', color: 'var(--text-main)' }}>
                  Lịch sử đơn hàng gần đây
                </h3>

                <div style={{ overflowX: 'auto' }}>
                  <table className="admin-data-table" style={{ fontSize: '0.85rem' }}>
                    <thead>
                      <tr>
                        <th>Mã đơn</th>
                        <th>Ngày đặt</th>
                        <th>Sản phẩm</th>
                        <th>Tổng tiền</th>
                        <th>Trạng thái</th>
                        <th style={{ textAlign: 'right' }}>Chi tiết</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const isDone = order.status === 'completed';
                        return (
                          <tr key={order.orderId}>
                            <td><strong style={{ color: 'var(--primary)' }}>{order.orderId}</strong></td>
                            <td style={{ color: 'var(--text-muted)' }}>{order.createdAt || 'Gần đây'}</td>
                            <td>
                              {(order.items || []).map((i, idx) => (
                                <div key={idx}>• {i.name} (x{i.quantity})</div>
                              ))}
                            </td>
                            <td><strong>{order.total?.toLocaleString('vi-VN')}₫</strong></td>
                            <td>
                              <span
                                style={{
                                  padding: '2px 8px',
                                  borderRadius: '4px',
                                  fontSize: '0.78rem',
                                  fontWeight: 'bold',
                                  background: isDone ? '#dcfce7' : '#fef3c7',
                                  color: isDone ? '#16a34a' : '#d97706'
                                }}
                              >
                                ● {order.statusText || 'Đang xử lý'}
                              </span>
                            </td>
                            <td style={{ textAlign: 'right' }}>
                              <Link
                                href={`/order-success?orderId=${order.orderId}`}
                                style={{ color: 'var(--primary)', fontWeight: 'bold', textDecoration: 'underline' }}
                              >
                                Xem hóa đơn
                              </Link>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
