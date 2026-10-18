'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function QuickViewModal({ product, onClose }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const handleAdd = () => {
    addItem(product, qty);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '720px',
          background: '#ffffff',
          borderRadius: 'var(--radius-lg, 16px)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-xl)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          position: 'relative',
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.85)',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.2rem',
            zIndex: 10
          }}
        >
          ×
        </button>

        <div style={{ background: '#f8faf9', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', maxHeight: '320px', objectFit: 'contain' }}
          />
        </div>

        <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase' }}>
            {product.categoryName}
          </span>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '6px 0 12px', color: 'var(--text-main)', lineHeight: 1.35 }}>
            {product.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary)' }}>
              {product.priceFormatted || `${product.price?.toLocaleString('vi-VN')}₫`}
            </span>
            {product.originalPriceFormatted && (
              <span style={{ fontSize: '0.95rem', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                {product.originalPriceFormatted}
              </span>
            )}
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '20px', lineHeight: 1.6 }}>
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border-subtle)', borderRadius: '6px' }}>
              <button
                type="button"
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ width: '32px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                -
              </button>
              <span style={{ width: '36px', textAlign: 'center', fontWeight: 'bold' }}>{qty}</span>
              <button
                type="button"
                onClick={() => setQty(qty + 1)}
                style={{ width: '32px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              style={{ flex: 1, padding: '10px 16px' }}
              onClick={handleAdd}
            >
              Thêm vào giỏ
            </button>
          </div>

          <Link
            href={`/products/${product.id}`}
            onClick={onClose}
            style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: '600', textDecoration: 'underline' }}
          >
            Xem đầy đủ trang chi tiết & thành phần &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
