'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductCard({ product, onQuickView }) {
  const { addItem } = useCart();
  const { isFavorited, toggleWishlist } = useWishlist();

  if (!product) return null;

  const isFav = isFavorited(product.id);
  const detailUrl = `/products/${product.id}`;

  return (
    <article className="product-card" data-id={product.id}>
      <div className="product-thumb-wrapper">
        {product.badge && <span className="product-tag">{product.badge}</span>}

        {/* Favorite button */}
        <button
          type="button"
          className={`product-favorite-btn ${isFav ? 'favorited' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          title={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
          aria-label="Yêu thích sản phẩm"
        >
          <svg
            className="icon"
            viewBox="0 0 24 24"
            fill={isFav ? '#e53e3e' : 'none'}
            stroke={isFav ? '#e53e3e' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Image link */}
        <Link href={detailUrl} className="product-thumb-link" title={`Xem chi tiết ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
            loading="lazy"
          />
        </Link>
      </div>

      <div className="product-info">
        <h3 className="product-title">
          <Link href={detailUrl} title={product.name}>
            {product.name}
          </Link>
        </h3>

        <div className="product-price-row">
          <span className="product-price">{product.priceFormatted || `${product.price?.toLocaleString('vi-VN')}₫`}</span>
          {product.originalPriceFormatted && (
            <span className="product-original-price">{product.originalPriceFormatted}</span>
          )}
        </div>

        <p className="product-desc">{product.description}</p>

        <div className="product-action-row">
          <Link href={detailUrl} className="btn-detail" title={`Xem chi tiết ${product.name}`}>
            <span>Xem chi tiết</span>
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </Link>

          <button
            type="button"
            className="btn-quick-cart"
            onClick={() => addItem(product, 1)}
            title="Thêm nhanh vào giỏ hàng"
            aria-label="Thêm vào giỏ"
          >
            <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}
