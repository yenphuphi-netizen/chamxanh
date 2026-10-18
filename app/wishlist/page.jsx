'use client';

import React from 'react';
import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  return (
    <main>
      <section className="wishlist-section">
        <div className="container">
          <div className="page-header-block">
            <h1 className="page-main-title">Danh sách yêu thích</h1>
            <p className="text-muted">
              {wishlist.length > 0 ? `${wishlist.length} sản phẩm đã lưu` : 'Chưa có sản phẩm yêu thích'}
            </p>
          </div>

          {wishlist.length === 0 ? (
            <div id="wishlist-empty-state" className="empty-state-box">
              <div className="empty-state-icon heart">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h2 className="empty-state-title">Chưa có sản phẩm yêu thích</h2>
              <p className="empty-state-desc">
                Bấm vào biểu tượng trái tim trên mỗi sản phẩm để lưu vào danh sách yêu thích của bạn.
              </p>
              <Link href="/products" className="btn btn-primary">
                Khám phá sản phẩm ngay
              </Link>
            </div>
          ) : (
            <div className="wishlist-grid" id="wishlist-grid">
              {wishlist.map((item) => (
                <article key={item.id} className="wishlist-card">
                  {/* Nút xóa */}
                  <button
                    type="button"
                    className="wishlist-remove-btn"
                    onClick={() => removeFromWishlist(item.id)}
                    title="Xóa khỏi yêu thích"
                    aria-label="Xóa khỏi yêu thích"
                  >
                    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                      <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4h6v2" />
                    </svg>
                  </button>

                  {/* Ảnh */}
                  <Link href={`/products/${item.id}`} className="product-thumb-link" style={{ display: 'block' }}>
                    <div className="product-thumb-wrapper" style={{ borderRadius: 0, height: '220px' }}>
                      <img src={item.image} alt={item.name} className="product-image" />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="product-info" style={{ padding: '16px' }}>
                    <h3 className="product-title" style={{ minHeight: '44px' }}>
                      <Link href={`/products/${item.id}`}>{item.name}</Link>
                    </h3>

                    <div className="product-price-row" style={{ margin: '8px 0 14px' }}>
                      <span className="product-price">{item.priceFormatted || `${item.price?.toLocaleString('vi-VN')}₫`}</span>
                      {item.originalPriceFormatted && (
                        <span className="product-original-price">{item.originalPriceFormatted}</span>
                      )}
                    </div>

                    <div className="wishlist-action-row" style={{ display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        className="btn btn-primary btn-sm btn-full"
                        onClick={() => addItem(item, 1)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                      >
                        <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                        </svg>
                        Thêm vào giỏ
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
