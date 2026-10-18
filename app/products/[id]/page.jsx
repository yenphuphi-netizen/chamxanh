'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/product/ProductCard';

export default function ProductDetailPage({ params }) {
  // Unwrap params (Next.js 15+ promise unwrap)
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const router = useRouter();
  const { products } = useProducts();
  const { addItem } = useCart();
  const { isFavorited, toggleWishlist } = useWishlist();

  const product = products.find((p) => p.id === productId) || products[0];
  const [selectedImage, setSelectedImage] = useState(product?.image);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Không tìm thấy sản phẩm</h2>
        <Link href="/products" className="btn btn-primary" style={{ marginTop: '16px' }}>
          Quay lại danh mục
        </Link>
      </div>
    );
  }

  const isFav = isFavorited(product.id);
  const currentImg = selectedImage || product.image;

  // Thumbnails gallery (dùng ảnh chính + các góc nhìn liên quan)
  const galleryImages = [
    product.image,
    '/assets/product/dầu gội/Gemini_Generated_Image_bpq0kkbpq0kkbpq0.png',
    '/assets/product/toner/Gemini_Generated_Image_j7sigjj7sigjj7si.png',
    '/assets/product/tẩy tê bào chết/Gemini_Generated_Image_10pgst10pgst10pg.png'
  ];

  // Sản phẩm liên quan
  const relatedProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push('/checkout');
  };

  return (
    <main className="product-detail-section">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="detail-breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Trang chủ</Link>
          <span className="separator">/</span>
          <Link href="/products">Sản phẩm thuần chay</Link>
          <span className="separator">/</span>
          <span className="current-page">{product.name}</span>
        </nav>

        {/* 3 Columns Grid */}
        <div className="product-detail-grid">
          {/* Cột 1: Gallery */}
          <div className="detail-gallery">
            <div className="gallery-thumbs" id="gallery-thumbs">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`gallery-thumb-btn ${currentImg === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`${product.name} góc ${idx + 1}`} />
                </button>
              ))}
            </div>
            <div className="gallery-main-frame">
              <img src={currentImg} alt={product.name} className="gallery-main-img" />
            </div>
          </div>

          {/* Cột 2: Thông tin chính */}
          <div className="detail-info">
            <div className="detail-header-badges">
              {product.badge && <span className="product-tag">{product.badge}</span>}
              <span className="category-label">{product.categoryName}</span>
            </div>

            <h1 className="detail-title">{product.name}</h1>

            {/* Rating */}
            <div className="detail-rating-row">
              <div className="star-rating">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} viewBox="0 0 24 24" width="16" height="16" fill="#f59e0b">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <span className="rating-score">5.0</span>
              <span className="rating-divider">•</span>
              <span className="reviews-count">{product.reviewsCount || 142} đánh giá đã mua</span>
            </div>

            {/* Price */}
            <div className="detail-price-box">
              <span className="detail-price">{product.priceFormatted || `${product.price.toLocaleString('vi-VN')}₫`}</span>
              {product.originalPriceFormatted && (
                <span className="detail-original-price">{product.originalPriceFormatted}</span>
              )}
            </div>

            <p className="detail-short-desc">{product.fullDesc || product.description}</p>

            {/* Quantity & Actions */}
            <div className="detail-actions-section">
              <div className="quantity-selector-group">
                <span className="qty-label">Số lượng:</span>
                <div className="qty-counter-box">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    -
                  </button>
                  <span className="qty-val">{quantity}</span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="detail-buttons-row">
                <button
                  type="button"
                  className="btn btn-primary btn-add-to-cart"
                  onClick={handleAddToCart}
                >
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  <span>Thêm vào giỏ</span>
                </button>

                <button
                  type="button"
                  className="btn btn-dark btn-buy-now"
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>

                <button
                  type="button"
                  className={`btn-fav-detail ${isFav ? 'active' : ''}`}
                  onClick={() => toggleWishlist(product)}
                  title={isFav ? 'Bỏ yêu thích' : 'Lưu vào yêu thích'}
                  aria-label="Yêu thích"
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
              </div>
            </div>
          </div>

          {/* Cột 3: Sidebar Thông số & Chính sách */}
          <div className="detail-sidebar">
            <div className="sidebar-card">
              <h3 className="sidebar-card-title">Thông số sản phẩm</h3>
              <div className="specs-list">
                <div className="spec-item">
                  <span className="spec-label">Dung tích:</span>
                  <span className="spec-value">{product.specs?.volume || '300ml'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Xuất xứ:</span>
                  <span className="spec-value">{product.specs?.origin || 'Việt Nam'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Hạn sử dụng:</span>
                  <span className="spec-value">{product.specs?.shelfLife || '24 tháng'}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Chứng nhận:</span>
                  <span className="spec-value" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                    {product.specs?.cert || '100% Thuần chay'}
                  </span>
                </div>
              </div>
            </div>

            <div className="sidebar-card policy-card">
              <div className="policy-item">
                <div className="policy-icon">🚚</div>
                <div className="policy-text">
                  <strong>Miễn phí vận chuyển</strong>
                  <span>Cho đơn hàng từ 300.000₫ toàn quốc</span>
                </div>
              </div>
              <div className="policy-item">
                <div className="policy-icon">🌿</div>
                <div className="policy-text">
                  <strong>100% Nông sản Việt</strong>
                  <span>Lành tính, không paraben, không sulfate</span>
                </div>
              </div>
              <div className="policy-item">
                <div className="policy-icon">🛡️</div>
                <div className="policy-text">
                  <strong>Đổi trả trong 7 ngày</strong>
                  <span>Hoàn tiền 100% nếu phát hiện kích ứng da</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        <section className="related-products-section">
          <div className="related-header">
            <h3 className="related-title">Sản phẩm liên quan</h3>
            <Link href="/products" className="section-link">
              Xem tất cả &rarr;
            </Link>
          </div>
          <div className="related-grid" id="related-products-grid">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
