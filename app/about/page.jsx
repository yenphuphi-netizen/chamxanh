'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="section">
      <div className="container" style={{ maxWidth: '860px' }}>
        <nav style={{ display: 'flex', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
          <Link href="/">Trang chủ</Link> <span>/</span> <span style={{ color: 'var(--primary)' }}>Giới thiệu</span>
        </nav>

        <h1 style={{ fontSize: '2.25rem', marginBottom: '16px' }}>Câu Chuyện Chạm Xanh</h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '32px' }}>
          Chạm Xanh được sinh ra từ niềm tin rằng: vẻ đẹp thuần khiết nhất bắt nguồn từ thiên nhiên, và việc chăm sóc bản thân luôn có thể song hành cùng sự trân quý Mẹ Trái Đất.
        </p>

        <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', marginBottom: '36px', border: '1px solid var(--border-subtle)' }}>
          <img
            src="/assets/banner/hero_products_showcase.png"
            alt="Câu chuyện Chạm Xanh"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', lineHeight: 1.8, color: 'var(--text-body)' }}>
          <p>
            Chúng tôi lựa chọn những nguyên liệu nông sản mộc mạc và gần gũi nhất của người Việt: tinh dầu từ những tép bưởi ngọt lành, búp chè xanh tươi mát trên cao nguyên sương mờ, và từng hạt bã cà phê Đắk Lắk đậm đà sau mỗi mẻ ủ.
          </p>
          <p>
            Tại Chạm Xanh, 100% công thức đều đạt chuẩn <strong>Thuần Chay (Vegan)</strong>: hoàn toàn không thử nghiệm trên động vật, không chứa sulfate gây khô rát, không paraben và không hạt vi nhựa gây hại đại dương.
          </p>
        </div>

        <div style={{ marginTop: '40px', padding: '24px', background: 'var(--primary-surface)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary-border)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '8px' }}>
            Triết lý "Chạm vào Xanh - Lành làn da"
          </h3>
          <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', margin: 0, lineHeight: 1.6 }}>
            Mỗi lần bạn sử dụng sản phẩm của Chạm Xanh không chỉ là một khoảnh khắc thư giãn cho bản thân, mà còn là một lựa chọn tiêu dùng có trách nhiệm, hỗ trợ nông dân địa phương và giảm thiểu rác thải nhựa ra môi trường.
          </p>
        </div>
      </div>
    </main>
  );
}
