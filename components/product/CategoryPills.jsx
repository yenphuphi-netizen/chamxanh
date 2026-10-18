'use client';

import React from 'react';

const CATEGORIES = [
  {
    id: 'all',
    name: 'Tất cả',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>
    )
  },
  {
    id: 'dau-goi',
    name: 'Dầu gội bưởi',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    )
  },
  {
    id: 'toner',
    name: 'Toner trà xanh',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    )
  },
  {
    id: 'tay-da-chet',
    name: 'Tẩy tế bào chết cà phê',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    )
  },
  {
    id: 'combo',
    name: 'Combo chăm sóc',
    icon: (
      <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="20 12 20 22 4 22 4 12" />
        <rect x="2" y="7" width="20" height="5" />
        <line x1="12" y1="22" x2="12" y2="7" />
        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
      </svg>
    )
  }
];

export default function CategoryPills({ activeCategory, onSelect, products = [] }) {
  const getCount = (catId) => {
    if (!products.length) return 0;
    if (catId === 'all') return products.length;
    return products.filter((p) => p.category === catId).length;
  };

  return (
    <div className="category-pills" role="tablist" aria-label="Phân loại sản phẩm">
      {CATEGORIES.map((cat) => {
        const count = getCount(cat.id);
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            className={`category-pill ${isActive ? 'active' : ''}`}
            onClick={() => onSelect(cat.id)}
            role="tab"
            aria-selected={isActive}
          >
            {cat.icon}
            <span>{cat.name}</span>
            {products.length > 0 && <span className="category-pill-count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
