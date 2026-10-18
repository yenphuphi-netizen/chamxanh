'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '@/context/ProductContext';
import ProductCard from '@/components/product/ProductCard';
import CategoryPills from '@/components/product/CategoryPills';
import QuickViewModal from '@/components/product/QuickViewModal';

export default function HomePage() {
  const { products } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <main>
      {/* BANNER LỚN (HERO SECTION) */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-banner-card">
            {/* Cột nội dung bên trái */}
            <div className="hero-content">
              <div className="hero-badge">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>100% Nông sản Việt thuần chay</span>
              </div>

              <h1 className="hero-title">
                Sống đẹp mỗi ngày<br />cùng Chạm Xanh
              </h1>

              <p className="hero-subtitle">
                Sản phẩm chất lượng cho vẻ đẹp tự nhiên và sức khỏe làn da của bạn. Lành tính, an toàn từ nguyên liệu thực vật hữu cơ.
              </p>

              <div className="hero-cta-group">
                <a href="#products" className="btn btn-primary btn-lg">
                  Mua sắm ngay
                </a>
                <Link href="/products" className="btn btn-outline btn-lg">
                  Khám phá bộ sưu tập
                </Link>
              </div>

              {/* 3 Khối cam kết */}
              <div className="hero-features">
                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" />
                      <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                      <circle cx="5.5" cy="18.5" r="2.5" />
                      <circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </div>
                  <div className="hero-feature-text">
                    <span className="hero-feature-title">Giao hàng nhanh</span>
                    <span className="hero-feature-desc">Toàn quốc</span>
                  </div>
                </div>

                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      <polyline points="9 12 11 14 15 10" />
                    </svg>
                  </div>
                  <div className="hero-feature-text">
                    <span className="hero-feature-title">Bảo hành chính hãng</span>
                    <span className="hero-feature-desc">7 ngày đổi trả</span>
                  </div>
                </div>

                <div className="hero-feature-item">
                  <div className="hero-feature-icon">
                    <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                      <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                    </svg>
                  </div>
                  <div className="hero-feature-text">
                    <span className="hero-feature-title">Hỗ trợ 24/7</span>
                    <span className="hero-feature-desc">Tư vấn tận tâm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cột hình ảnh bên phải */}
            <div className="hero-media">
              <img
                src="/assets/banner/hero_products_showcase.png"
                alt="Mỹ phẩm thuần chay Chạm Xanh"
                className="hero-image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* THANH PHÂN LOẠI DANH MỤC */}
      <section className="category-filter-section">
        <div className="container">
          <CategoryPills
            activeCategory={selectedCategory}
            onSelect={setSelectedCategory}
            products={products}
          />
        </div>
      </section>

      {/* LƯỚI SẢN PHẨM NỔI BẬT */}
      <section className="products-section" id="products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span>Sản phẩm nổi bật</span>
            </h2>
            <Link href="/products" className="section-link">
              <span>Xem tất cả</span>
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div className="product-grid" id="product-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={() => setQuickViewProduct(product)}
              />
            ))}
          </div>
        </div>
      </section>

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
