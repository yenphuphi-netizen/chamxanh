'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function AdminPage() {
  const router = useRouter();
  const { products, orders, addProduct, updateProduct, deleteProduct, toggleOrderStatus } = useProducts();
  const { logout } = useAuth();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('products'); // 'dashboard' | 'products' | 'orders'
  const [searchTerm, setSearchTerm] = useState('');
  const [editingId, setEditingId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    category: 'dau-goi',
    price: 179000,
    status: 'active',
    description: '',
    image: '/assets/product/dầu gội/Gemini_Generated_Image_lf86zflf86zflf86.png'
  });

  const categories = [
    { id: 'dau-goi', name: 'Dầu gội bưởi' },
    { id: 'toner', name: 'Toner trà xanh' },
    { id: 'tay-da-chet', name: 'Tẩy tế bào chết' },
    { id: 'combo', name: 'Combo chăm sóc' },
    { id: 'thu-cong', name: 'Đồ thủ công' }
  ];

  const sampleImages = [
    '/assets/product/dầu gội/Gemini_Generated_Image_lf86zflf86zflf86.png',
    '/assets/product/dầu gội/Gemini_Generated_Image_bpq0kkbpq0kkbpq0.png',
    '/assets/product/toner/Gemini_Generated_Image_j7sigjj7sigjj7si.png',
    '/assets/product/tẩy tê bào chết/tẩy tế bào chết.png',
    '/assets/product/tẩy tê bào chết/Gemini_Generated_Image_r4nc8kr4nc8kr4nc.png',
    '/assets/product/toner/dầu gội &.png'
  ];

  const handleEditClick = (prod) => {
    setEditingId(prod.id);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      status: prod.status || 'active',
      description: prod.description || '',
      image: prod.image
    });
    showToast(`Đang chỉnh sửa: "${prod.name}"`);
  };

  const handleResetForm = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'dau-goi',
      price: 179000,
      status: 'active',
      description: '',
      image: '/assets/product/dầu gội/Gemini_Generated_Image_lf86zflf86zflf86.png'
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      showToast('Vui lòng nhập tên sản phẩm.');
      return;
    }

    const catObj = categories.find((c) => c.id === formData.category) || categories[0];

    if (editingId) {
      updateProduct(editingId, {
        name: formData.name.trim(),
        category: formData.category,
        categoryName: catObj.name,
        price: Number(formData.price),
        status: formData.status,
        description: formData.description.trim(),
        image: formData.image
      });
    } else {
      addProduct({
        name: formData.name.trim(),
        category: formData.category,
        categoryName: catObj.name,
        price: Number(formData.price),
        status: formData.status,
        description: formData.description.trim(),
        image: formData.image,
        badge: 'Mới thêm',
        stock: 30
      });
    }

    handleResetForm();
  };

  const cycleImage = () => {
    const curIdx = sampleImages.indexOf(formData.image);
    const nextIdx = (curIdx + 1) % sampleImages.length;
    setFormData((prev) => ({ ...prev, image: sampleImages[nextIdx] }));
    showToast('Đã đổi ảnh mẫu từ kho assets!');
  };

  // Lọc sản phẩm theo search bar
  const filteredProducts = products.filter((p) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return p.name.toLowerCase().includes(q) || (p.categoryName || '').toLowerCase().includes(q);
  });

  return (
    <div className="admin-body" style={{ minHeight: '100vh', display: 'flex', background: 'var(--admin-bg, #f8faf9)' }}>
      {/* SIDEBAR */}
      <aside className="admin-sidebar" id="admin-sidebar">
        <Link href="/" className="admin-sidebar-brand" title="Về trang bán hàng">
          <img src="/assets/logo.jpg" alt="Logo Chạm Xanh" className="admin-sidebar-logo" />
          <div>
            <div className="admin-sidebar-title">Chạm Xanh</div>
            <div className="admin-sidebar-subtitle">Admin Panel</div>
          </div>
        </Link>

        {/* Menu Điều hướng */}
        <ul className="admin-nav-menu">
          <li className="admin-nav-item">
            <button
              type="button"
              className={`admin-nav-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
              onClick={() => setActiveTab('dashboard')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Dashboard</span>
            </button>
          </li>
          <li className="admin-nav-item">
            <button
              type="button"
              className={`admin-nav-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
              <span>Products</span>
            </button>
          </li>
          <li className="admin-nav-item">
            <button
              type="button"
              className={`admin-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Orders</span>
            </button>
          </li>
        </ul>

        {/* Quick Summary Box */}
        <div className="admin-quick-summary">
          <div className="summary-heading">Quick Summary</div>
          <div className="summary-item-row">
            <div className="summary-item-left">
              <span>Products</span>
            </div>
            <span className="summary-count-badge">{products.length}</span>
          </div>
          <div className="summary-item-row">
            <div className="summary-item-left">
              <span>Categories</span>
            </div>
            <span className="summary-count-badge">5</span>
          </div>
          <div className="summary-item-row">
            <div className="summary-item-left">
              <span>Orders</span>
            </div>
            <span className="summary-count-badge">{orders.length}</span>
          </div>
        </div>

        {/* Logout */}
        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="admin-logout-btn"
            onClick={() => {
              logout();
              router.push('/login');
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Đăng xuất</span>
          </button>
        </div>
      </aside>

      {/* MAIN WRAPPER */}
      <div className="admin-main-wrapper" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <h1 className="topbar-page-title">
              {activeTab === 'dashboard' && 'Tổng quan Dashboard'}
              {activeTab === 'products' && 'Quản lý Sản phẩm & Danh mục'}
              {activeTab === 'orders' && 'Quản lý Đơn hàng'}
            </h1>
          </div>

          <div className="topbar-right">
            <div className="topbar-search-box">
              <svg className="topbar-search-icon" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                className="topbar-search-input"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Link href="/" className="btn-view-store" target="_blank" title="Xem giao diện khách">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              <span>Xem Cửa Hàng</span>
            </Link>

            <div className="topbar-admin-profile">
              <span className="topbar-admin-avatar">AD</span>
              <span className="topbar-admin-name">Admin</span>
            </div>
          </div>
        </header>

        {/* CONTENT AREA */}
        <main className="admin-content-area" style={{ flex: 1, padding: '24px 28px' }}>
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <section className="admin-view-tab active">
              {/* 4 Metric Cards */}
              <div className="dashboard-metrics-grid">
                <div className="stat-card-widget">
                  <div>
                    <div className="stat-card-title">Total products</div>
                    <div className="stat-card-value">{products.length}</div>
                    <div className="stat-card-desc">All products in store</div>
                  </div>
                  <div className="stat-card-icon blue">🛍️</div>
                </div>

                <div className="stat-card-widget">
                  <div>
                    <div className="stat-card-title">Categories</div>
                    <div className="stat-card-value">5</div>
                    <div className="stat-card-desc">Product categories</div>
                  </div>
                  <div className="stat-card-icon green">📂</div>
                </div>

                <div className="stat-card-widget">
                  <div>
                    <div className="stat-card-title">Visible products</div>
                    <div className="stat-card-value">{products.filter((p) => p.status !== 'inactive').length}</div>
                    <div className="stat-card-desc">Currently visible</div>
                  </div>
                  <div className="stat-card-icon amber">👁️</div>
                </div>

                <div className="stat-card-widget">
                  <div>
                    <div className="stat-card-title">Total Orders</div>
                    <div className="stat-card-value">{orders.length}</div>
                    <div className="stat-card-desc">Active orders in system</div>
                  </div>
                  <div className="stat-card-icon green">📦</div>
                </div>
              </div>

              {/* Middle Row: SVG Line Chart + Recent Products */}
              <div className="dashboard-row-middle" style={{ marginTop: '24px' }}>
                <div className="chart-card-box">
                  <div className="chart-card-header">
                    <h2 className="chart-card-title">Sales overview (Doanh số bán hàng)</h2>
                    <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold' }}>7 ngày qua</span>
                  </div>

                  <div className="svg-chart-wrapper" style={{ height: '180px' }}>
                    <svg viewBox="0 0 540 180" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#15803d" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#15803d" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <line x1="40" y1="20" x2="520" y2="20" stroke="#f1f5f2" strokeWidth="1" />
                      <line x1="40" y1="60" x2="520" y2="60" stroke="#f1f5f2" strokeWidth="1" />
                      <line x1="40" y1="100" x2="520" y2="100" stroke="#f1f5f2" strokeWidth="1" />
                      <line x1="40" y1="140" x2="520" y2="140" stroke="#f1f5f2" strokeWidth="1" />

                      <path d="M 60,110 Q 120,70 180,95 T 300,50 T 420,80 T 500,45 L 500,150 L 60,150 Z" fill="url(#chartGradient)" />
                      <path d="M 60,110 Q 120,70 180,95 T 300,50 T 420,80 T 500,45" fill="none" stroke="#15803d" strokeWidth="3" strokeLinecap="round" />

                      <circle cx="60" cy="110" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
                      <circle cx="140" cy="80" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
                      <circle cx="220" cy="95" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
                      <circle cx="300" cy="50" r="5" fill="#15803d" stroke="#ffffff" strokeWidth="2" />
                      <circle cx="380" cy="72" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
                      <circle cx="450" cy="68" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />
                      <circle cx="500" cy="45" r="4" fill="#ffffff" stroke="#15803d" strokeWidth="2.5" />

                      <text x="60" y="165" fontSize="10" fill="#94a3b8" textAnchor="middle">12/10</text>
                      <text x="140" y="165" fontSize="10" fill="#94a3b8" textAnchor="middle">13/10</text>
                      <text x="220" y="165" fontSize="10" fill="#94a3b8" textAnchor="middle">14/10</text>
                      <text x="300" y="165" fontSize="10" fontWeight="700" fill="#15803d" textAnchor="middle">15/10</text>
                      <text x="380" y="165" fontSize="10" fill="#94a3b8" textAnchor="middle">16/10</text>
                      <text x="450" y="165" fontSize="10" fill="#94a3b8" textAnchor="middle">17/10</text>
                      <text x="500" y="165" fontSize="10" fill="#94a3b8" textAnchor="middle">18/10</text>
                    </svg>
                  </div>

                  <div className="chart-stats-row">
                    <div className="chart-mini-stat">
                      <div>Total sales</div>
                      <div className="chart-mini-val">42.580.000₫ <span className="trend-up">↑ 18.6%</span></div>
                    </div>
                    <div className="chart-mini-stat">
                      <div>Orders</div>
                      <div className="chart-mini-val">128 <span className="trend-up">↑ 12.4%</span></div>
                    </div>
                  </div>
                </div>

                {/* Recent Products */}
                <div className="chart-card-box">
                  <div className="chart-card-header">
                    <h2 className="chart-card-title">Recent products</h2>
                    <button type="button" className="btn-admin-action primary" onClick={() => setActiveTab('products')}>
                      + Add product
                    </button>
                  </div>

                  <table className="admin-data-table" style={{ fontSize: '0.825rem' }}>
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.slice(0, 5).map((p) => (
                        <tr key={p.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <img src={p.image} style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover' }} alt={p.name} />
                              <div>
                                <strong>{p.name}</strong>
                                <div style={{ fontSize: '0.725rem', color: 'var(--admin-text-muted)' }}>{p.categoryName}</div>
                              </div>
                            </div>
                          </td>
                          <td><strong style={{ color: 'var(--admin-primary)' }}>{p.priceFormatted || `${p.price?.toLocaleString('vi-VN')}₫`}</strong></td>
                          <td>
                            <button
                              type="button"
                              className="btn-tbl-action edit"
                              onClick={() => {
                                setActiveTab('products');
                                handleEditClick(p);
                              }}
                            >
                              Sửa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* TAB 2: PRODUCTS CRUD & FORM */}
          {activeTab === 'products' && (
            <section className="admin-view-tab active">
              <div className="products-mgmt-layout">
                {/* Cột trái: Bảng danh sách */}
                <div className="products-left-col">
                  <div className="admin-panel-card">
                    <div className="panel-header-row">
                      <h2 className="panel-title">Products ({filteredProducts.length})</h2>
                      <button
                        type="button"
                        className="btn-admin-action primary"
                        onClick={handleResetForm}
                      >
                        + Add Product
                      </button>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                      <table className="admin-data-table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredProducts.map((p) => {
                            const isAct = p.status !== 'inactive';
                            return (
                              <tr key={p.id}>
                                <td>
                                  <img src={p.image} alt={p.name} className="table-prod-img" />
                                </td>
                                <td>
                                  <div style={{ fontWeight: 700, color: 'var(--admin-text-main)' }}>{p.name}</div>
                                  <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>
                                    {p.description ? p.description.substring(0, 45) + '...' : ''}
                                  </div>
                                </td>
                                <td>
                                  <span className="table-cat-badge">{p.categoryName}</span>
                                </td>
                                <td>
                                  <strong style={{ color: 'var(--admin-primary)' }}>
                                    {p.priceFormatted || `${p.price?.toLocaleString('vi-VN')}₫`}
                                  </strong>
                                </td>
                                <td>
                                  <span className={`status-pill ${isAct ? 'active' : 'inactive'}`}>
                                    ● {isAct ? 'Hoạt động' : 'Tạm ẩn'}
                                  </span>
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                  <div className="table-action-btns" style={{ justifyContent: 'flex-end' }}>
                                    <button
                                      type="button"
                                      className="btn-tbl-action edit"
                                      onClick={() => handleEditClick(p)}
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-tbl-action delete"
                                      onClick={() => {
                                        if (confirm(`Bạn có chắc muốn xóa "${p.name}"?`)) {
                                          deleteProduct(p.id);
                                        }
                                      }}
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Cột phải: Form Thêm / Sửa */}
                <div className="products-right-col">
                  <div className="product-form-card">
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: '0 0 18px', color: 'var(--admin-text-main)' }}>
                      {editingId ? 'Chỉnh sửa sản phẩm' : 'Thêm sản phẩm mới'}
                    </h3>

                    <form onSubmit={handleFormSubmit}>
                      <div className="form-field-group">
                        <label className="form-field-label">Tên sản phẩm</label>
                        <input
                          type="text"
                          className="form-field-input"
                          placeholder="Nhập tên sản phẩm..."
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Danh mục</label>
                        <select
                          className="form-field-select"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Đơn giá (₫)</label>
                        <input
                          type="number"
                          className="form-field-input"
                          placeholder="179000"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          min="1000"
                          step="1000"
                          required
                        />
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Ảnh sản phẩm (Bấm để đổi mẫu)</label>
                        <div
                          className="image-upload-dropzone"
                          onClick={cycleImage}
                          title="Bấm để đổi ảnh mẫu từ kho assets"
                        >
                          <img
                            src={formData.image}
                            alt="Preview"
                            style={{ width: '80px', height: '80px', objectFit: 'cover', margin: '0 auto 8px', borderRadius: '6px' }}
                          />
                          <div style={{ fontWeight: 700, fontSize: '0.8rem', color: 'var(--admin-primary)' }}>
                            Click để đổi ảnh mẫu assets
                          </div>
                        </div>
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Trạng thái</label>
                        <select
                          className="form-field-select"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="active">Active (Hoạt động)</option>
                          <option value="inactive">Inactive (Tạm ẩn)</option>
                        </select>
                      </div>

                      <div className="form-field-group">
                        <label className="form-field-label">Mô tả ngắn</label>
                        <textarea
                          className="form-field-textarea"
                          rows={3}
                          placeholder="Nhập mô tả sản phẩm..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                      </div>

                      <div className="form-actions-row">
                        <button type="submit" className="btn-form-save">
                          {editingId ? 'Lưu thay đổi' : 'Thêm sản phẩm'}
                        </button>
                        <button type="button" className="btn-form-cancel" onClick={handleResetForm}>
                          Hủy
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === 'orders' && (
            <section className="admin-view-tab active">
              <div className="admin-panel-card">
                <div className="orders-filter-row">
                  <div>
                    <h2 className="panel-title">Quản Lý Đơn Hàng ({orders.length})</h2>
                    <p style={{ fontSize: '0.825rem', color: 'var(--admin-text-muted)', margin: '4px 0 0' }}>
                      Danh sách đơn hàng đồng bộ thời gian thực từ giỏ hàng và thanh toán.
                    </p>
                  </div>
                </div>

                <div style={{ overflowX: 'auto', marginTop: '16px' }}>
                  <table className="admin-data-table">
                    <thead>
                      <tr>
                        <th>Mã Đơn</th>
                        <th>Khách Hàng</th>
                        <th>Địa Chỉ Giao Hàng</th>
                        <th>Chi Tiết Món</th>
                        <th>Tổng Tiền</th>
                        <th>Ngày Đặt</th>
                        <th>Trạng Thái</th>
                        <th style={{ textAlign: 'right' }}>Thao Tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => {
                        const isDone = order.status === 'completed';
                        return (
                          <tr key={order.orderId}>
                            <td><strong style={{ color: 'var(--admin-primary)' }}>{order.orderId}</strong></td>
                            <td>
                              <strong>{order.customer?.fullname || 'Khách hàng'}</strong><br />
                              <span style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{order.customer?.phone}</span>
                            </td>
                            <td>
                              <div style={{ fontSize: '0.775rem', color: 'var(--admin-text-muted)', maxWidth: '200px' }}>
                                {order.customer?.address || 'Việt Nam'}
                              </div>
                            </td>
                            <td style={{ fontSize: '0.8rem', lineHeight: 1.45 }}>
                              {(order.items || []).map((i, idx) => (
                                <div key={idx}>• {i.name} (x{i.quantity})</div>
                              ))}
                            </td>
                            <td><strong style={{ color: 'var(--admin-primary)' }}>{order.total?.toLocaleString('vi-VN')}₫</strong></td>
                            <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{order.createdAt}</td>
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
                              <button
                                type="button"
                                className="btn-tbl-action edit"
                                onClick={() => toggleOrderStatus(order.orderId)}
                              >
                                {isDone ? 'Đặt lại Đang xử lý' : 'Đánh dấu Hoàn tất'}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
