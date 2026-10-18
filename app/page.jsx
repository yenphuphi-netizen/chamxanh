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

      {/* BLOCK 6: CÂU CHUYỆN THƯƠNG HIỆU & NÔNG SẢN VIỆT THUẦN CHAY */}
      <section className="story-section" id="story">
        <div className="container">
          <div className="story-header">
            <div className="story-badge">
              <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>Nguồn Cội Tự Nhiên</span>
            </div>
            <h2 className="story-title">Nông sản Việt thuần chay - Trái tim của Chạm Xanh</h2>
            <p className="story-desc">
              Chúng tôi khai phóng sức mạnh chữa lành từ những nông sản thân thuộc của đất Việt, chưng cất thành các giải pháp chăm sóc tóc và làn da thuần khiết, an toàn và bền vững.
            </p>
          </div>

          <div className="ingredients-grid">
            {/* Nguyên liệu 1: Vỏ bưởi da xanh */}
            <article className="ingredient-card">
              <div className="ingredient-thumb">
                <img src="/assets/banner/buoi-ben-tre.jpg" alt="Vỏ bưởi da xanh Bến Tre" loading="lazy" />
                <span className="ingredient-origin">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Bến Tre
                </span>
              </div>
              <div className="ingredient-body">
                <h3 className="ingredient-name">Vỏ Bưởi Da Xanh Ép Lạnh</h3>
                <p className="ingredient-text">
                  Chiết xuất tinh dầu bưởi đậm đặc giàu limonene tự nhiên giúp phục hồi nang tóc, kích thích mọc tóc con và giảm gãy rụng tới 85% sau 3 tuần.
                </p>
                <div className="ingredient-benefit">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Dày tóc & Giảm gãy rụng</span>
                </div>
              </div>
            </article>

            {/* Nguyên liệu 2: Trà xanh hữu cơ */}
            <article className="ingredient-card">
              <div className="ingredient-thumb">
                <img src="/assets/banner/tra-bao-loc.jpg" alt="Trà xanh hữu cơ Bảo Lộc" loading="lazy" />
                <span className="ingredient-origin">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Bảo Lộc, Lâm Đồng
                </span>
              </div>
              <div className="ingredient-body">
                <h3 className="ingredient-name">Trà Xanh Cổ Thụ Hữu Cơ</h3>
                <p className="ingredient-text">
                  Chứa hàm lượng EGCG chống oxy hóa cực cao, cân bằng độ pH tự nhiên cho da, kháng khuẩn ngừa mụn và thu nhỏ lỗ chân lông tức thì.
                </p>
                <div className="ingredient-benefit">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Kiềm dầu & Ngừa mụn</span>
                </div>
              </div>
            </article>

            {/* Nguyên liệu 3: Bã cà phê nguyên chất */}
            <article className="ingredient-card">
              <div className="ingredient-thumb">
                <img src="/assets/product/tẩy tế bào chết/Gemini_Generated_Image_r4nc8kr4nc8kr4nc.png" alt="Bã cà phê Robusta Đắk Lắk" loading="lazy" />
                <span className="ingredient-origin">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  Đắk Lắk
                </span>
              </div>
              <div className="ingredient-body">
                <h3 className="ingredient-name">Cà Phê Robusta Nguyên Chất</h3>
                <p className="ingredient-text">
                  Hạt cà phê xay mịn êm ái quét sạch lớp sừng sần sùi mà không gây rát da. Kết hợp bơ cacao dưỡng ẩm cho làn da sáng mịn, đều màu.
                </p>
                <div className="ingredient-benefit">
                  <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Mịn màng & Sáng da</span>
                </div>
              </div>
            </article>
          </div>

          {/* Cam kết 4 Không */}
          <div className="clean-commitments">
            <div className="commitment-item">
              <div className="commitment-icon">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className="commitment-text">
                <h4>100% Thuần Chay</h4>
                <p>Không chứa thành phần từ động vật</p>
              </div>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                </svg>
              </div>
              <div className="commitment-text">
                <h4>Không Sulfate & Paraben</h4>
                <p>Dịu nhẹ cho da nhạy cảm nhất</p>
              </div>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <div className="commitment-text">
                <h4>Không Thử Nghiệm Trên Động Vật</h4>
                <p>Chuẩn Cruelty-free quốc tế</p>
              </div>
            </div>
            <div className="commitment-item">
              <div className="commitment-icon">
                <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="23 4 23 10 17 10" />
                  <polyline points="1 20 1 14 7 14" />
                  <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                </svg>
              </div>
              <div className="commitment-text">
                <h4>Bao Bì Thân Thiện</h4>
                <p>Nhựa tái sinh & giấy kraft tự phân hủy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BLOCK 7: CẢM NHẬN KHÁCH HÀNG (TESTIMONIALS / SOCIAL PROOF) */}
      <section className="testimonials-section" id="reviews">
        <div className="container">
          <div className="testimonials-header">
            <div className="testimonials-title-wrap">
              <h2>Khách hàng nói gì về Chạm Xanh?</h2>
              <p>Hơn 15.000 khách hàng đã chọn lối sống xanh và có sự thay đổi tích cực trên mái tóc, làn da.</p>
            </div>
            <div className="testimonials-stat-box">
              <div className="stat-score">4.9</div>
              <div>
                <div className="stat-stars">
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <svg className="icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </div>
                <div className="stat-label">Dựa trên 1.250+ đánh giá xác thực</div>
              </div>
            </div>
          </div>

          <div className="testimonials-grid">
            {/* Đánh giá 1 */}
            <article className="testimonial-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-quote">
                &ldquo;Tóc mình sau sinh rụng kinh khủng, mỗi lần gội là cả búi tóc. Chuyển sang Dầu Gội Bưởi Chạm Xanh được 3 tuần thì tóc con bắt đầu đâm tua tủa, mùi bưởi thơm thanh dễ chịu vô cùng!&rdquo;
              </p>
              <div className="review-author">
                <div className="author-avatar">NM</div>
                <div className="author-info">
                  <h4>Ngọc Mai (26 tuổi)</h4>
                  <p>Đã mua: Dầu gội bưởi không Sulfate 300ml</p>
                </div>
              </div>
            </article>

            {/* Đánh giá 2 */}
            <article className="testimonial-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-quote">
                &ldquo;Da mình thuộc nhóm dầu nhạy cảm rất dễ lên mụn ẩn. Toner trà xanh này dùng êm ru, thoa lên mát lịm, kiềm dầu vùng mũi cực tốt mà không làm khô da. Sẽ trung thành dài dài!&rdquo;
              </p>
              <div className="review-author">
                <div className="author-avatar">HY</div>
                <div className="author-info">
                  <h4>Hoàng Yến (24 tuổi)</h4>
                  <p>Đã mua: Toner trà xanh cân bằng da 150ml</p>
                </div>
              </div>
            </article>

            {/* Đánh giá 3 */}
            <article className="testimonial-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-quote">
                &ldquo;Mua trọn combo vừa tiết kiệm vừa đồng bộ. Tẩy da chết cà phê hạt mịn như nhung, tắm xong sờ da trơn láng mềm mượt. Rất tự hào vì mỹ phẩm thuần chay Việt làm chỉn chu đến vậy!&rdquo;
              </p>
              <div className="review-author">
                <div className="author-avatar">TT</div>
                <div className="author-info">
                  <h4>Thanh Thảo (29 tuổi)</h4>
                  <p>Đã mua: Combo Chăm sóc toàn diện 3 món</p>
                </div>
              </div>
            </article>
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
