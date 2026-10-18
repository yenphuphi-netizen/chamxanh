'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/product/ProductCard';
import CategoryPills from '@/components/product/CategoryPills';
import QuickViewModal from '@/components/product/QuickViewModal';

function ProductsCatalog() {
  const searchParams = useSearchParams();
  const { products } = useProducts();

  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Đọc params từ URL khi vào trang
  useEffect(() => {
    const catParam = searchParams.get('category');
    const searchParam = searchParams.get('search');
    if (catParam) setCategory(catParam);
    if (searchParam) setSearchTerm(searchParam);
  }, [searchParams]);

  // Lọc và sắp xếp
  const filteredProducts = useMemo(() => {
    let result = category === 'all'
      ? [...products]
      : products.filter((p) => p.category === category);

    if (searchTerm.trim()) {
      const q = searchTerm.trim().toLowerCase();
      result = result.filter((p) => {
        const nameMatch = p.name.toLowerCase().includes(q);
        const descMatch = (p.description || '').toLowerCase().includes(q);
        const catMatch = (p.categoryName || '').toLowerCase().includes(q);
        return nameMatch || descMatch || catMatch;
      });
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, searchTerm, sortBy]);

  const handleResetFilters = () => {
    setCategory('all');
    setSearchTerm('');
    setSortBy('default');
  };

  return (
    <main className="section">
      <div className="container">
        {/* Breadcrumb */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          <Link href="/" style={{ color: 'var(--text-muted)' }}>Trang chủ</Link>
          <span>/</span>
          <span style={{ color: 'var(--primary)', fontWeight: '600' }}>Sản phẩm thuần chay</span>
        </nav>

        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.3rem)', marginBottom: '8px' }}>Tất Cả Sản Phẩm Thuần Chay</h1>
          <p className="text-muted">100% nguyên liệu thực vật tự nhiên, an toàn dịu lành cho làn da và thân thiện môi trường.</p>
        </div>

        {/* Toolbar: Tìm kiếm & Sắp xếp */}
        <div className="catalog-toolbar">
          <div className="catalog-search-wrapper">
            <span className="catalog-search-icon">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className="catalog-search-input"
              placeholder="Tìm theo tên sản phẩm, công dụng (gõ để lọc)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Tìm kiếm sản phẩm"
            />
            {searchTerm && (
              <button
                type="button"
                className="catalog-clear-btn"
                onClick={() => setSearchTerm('')}
                title="Xóa tìm kiếm"
                style={{ display: 'flex' }}
              >
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '14px', height: '14px' }}>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>

          <div className="catalog-controls-right">
            <span className="catalog-count-info">
              Hiển thị <strong className="text-primary">{filteredProducts.length}</strong> sản phẩm
            </span>
            <select
              className="catalog-sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sắp xếp sản phẩm"
            >
              <option value="default">Mới nhất / Phổ biến</option>
              <option value="price-asc">Giá: Thấp đến cao</option>
              <option value="price-desc">Giá: Cao đến thấp</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ marginBottom: '32px' }}>
          <CategoryPills
            activeCategory={category}
            onSelect={setCategory}
            products={products}
          />
        </div>

        {/* Lưới sản phẩm */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '64px 20px',
              background: '#ffffff',
              borderRadius: 'var(--radius-lg)',
              border: '1px dashed var(--border-subtle)'
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                margin: '0 auto 16px',
                borderRadius: '50%',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.5rem'
              }}
            >
              🍃
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-main)' }}>
              Không tìm thấy sản phẩm phù hợp
            </h3>
            <p className="text-muted" style={{ maxWidth: '440px', margin: '0 auto 20px', fontSize: '0.9rem' }}>
              Không có sản phẩm nào khớp với lựa chọn tìm kiếm hoặc danh mục hiện tại.
            </p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleResetFilters}
            >
              Xem tất cả sản phẩm
            </button>
          </div>
        ) : (
          <div className="product-grid" id="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={() => setQuickViewProduct(product)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Modal Quick View */}
      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>Đang nạp sản phẩm...</div>}>
      <ProductsCatalog />
    </Suspense>
  );
}
