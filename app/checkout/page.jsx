'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useProducts } from '@/context/ProductContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalQuantity, subtotal, shippingFee, discount, total, clearCart } = useCart();
  const { addOrder } = useProducts();
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    fullname: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    city: 'TP. Hồ Chí Minh',
    district: 'Quận 1',
    ward: 'Phường Bến Nghé',
    address: '',
    note: ''
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullname.trim()) {
      showToast('Vui lòng nhập họ và tên người nhận.');
      return;
    }
    if (!formData.phone.trim()) {
      showToast('Vui lòng nhập số điện thoại người nhận.');
      return;
    }
    if (!formData.address.trim()) {
      showToast('Vui lòng nhập địa chỉ cụ thể giao hàng.');
      return;
    }

    setIsSubmitting(true);

    const fullAddress = `${formData.address}, ${formData.ward}, ${formData.district}, ${formData.city}`;

    const orderData = {
      customer: {
        fullname: formData.fullname.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: fullAddress,
        note: formData.note.trim()
      },
      items: items.map((i) => ({
        id: i.id,
        name: i.name,
        price: i.price,
        quantity: i.quantity,
        image: i.image
      })),
      subtotal,
      shippingFee,
      discount,
      total,
      paymentMethod
    };

    const createdOrder = addOrder(orderData);
    clearCart();

    showToast('Đặt hàng thành công! Đang chuyển hướng...');
    setTimeout(() => {
      router.push(`/order-success?orderId=${createdOrder.orderId}`);
    }, 600);
  };

  if (items.length === 0) {
    return (
      <main>
        <section className="checkout-section">
          <div className="container">
            <div className="checkout-empty-state">
              <div className="empty-state-icon">
                <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '8px' }}>
                Giỏ hàng của bạn đang trống
              </h2>
              <p className="text-muted" style={{ marginBottom: '24px', fontSize: '0.925rem' }}>
                Vui lòng chọn sản phẩm vào giỏ trước khi tiến hành thanh toán nhé.
              </p>
              <Link href="/products" className="btn btn-primary">
                Khám phá sản phẩm ngay
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="checkout-section">
        <div className="container">
          {/* Breadcrumb */}
          <nav className="checkout-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Trang chủ</Link>
            <span className="separator">/</span>
            <Link href="/cart">Giỏ hàng</Link>
            <span className="separator">/</span>
            <span className="active-step">Thanh toán & Đặt hàng</span>
          </nav>

          <form onSubmit={handleSubmit} noValidate>
            <div className="checkout-grid" id="checkout-main-grid">
              {/* Cột trái: Form thông tin & Phương thức */}
              <div className="checkout-main-content">
                {/* Khối 1: Thông tin người nhận */}
                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <span className="checkout-step-num">1</span>
                    <h2 className="checkout-card-title">Thông tin giao hàng</h2>
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">
                        Họ và tên <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullname"
                        className="form-control"
                        placeholder="Ví dụ: Nguyễn Thị Mai Lan"
                        value={formData.fullname}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Số điện thoại <span className="required">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        placeholder="Ví dụ: 0912 345 678"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email (nhận hóa đơn điện tử & tra cứu đơn)</label>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-row-2">
                    <div className="form-group">
                      <label className="form-label">
                        Tỉnh / Thành phố <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="city"
                        className="form-control"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        Quận / Huyện <span className="required">*</span>
                      </label>
                      <input
                        type="text"
                        name="district"
                        className="form-control"
                        value={formData.district}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phường / Xã <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="ward"
                      className="form-control"
                      value={formData.ward}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Địa chỉ chi tiết (Số nhà, tên đường, căn hộ) <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="Ví dụ: 123 Nguyễn Huệ, Căn hộ 4B"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Ghi chú giao hàng (Tùy chọn)</label>
                    <textarea
                      name="note"
                      className="form-control"
                      rows={2}
                      placeholder="Ví dụ: Giao giờ hành chính, gọi trước khi đến..."
                      value={formData.note}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                {/* Khối 2: Phương thức vận chuyển */}
                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <span className="checkout-step-num">2</span>
                    <h2 className="checkout-card-title">Phương thức vận chuyển</h2>
                  </div>

                  <div className="radio-cards-group">
                    <label className="radio-card active">
                      <input type="radio" name="shipping_method" value="standard" checked readOnly />
                      <div className="radio-card-content">
                        <div className="radio-card-title-row">
                          <span className="radio-card-title">Giao hàng tiêu chuẩn Xanh (2 - 3 ngày)</span>
                          <span className="radio-card-extra">
                            {shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}
                          </span>
                        </div>
                        <p className="radio-card-desc">
                          Đóng gói chuẩn sinh thái bằng hộp carton tái chế 100%, lót rơm giấy và băng dính kraft không rác thải nhựa.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Khối 3: Phương thức thanh toán */}
                <div className="checkout-card">
                  <div className="checkout-card-header">
                    <span className="checkout-step-num">3</span>
                    <h2 className="checkout-card-title">Phương thức thanh toán</h2>
                  </div>

                  <div className="radio-cards-group">
                    {/* COD */}
                    <label
                      className={`radio-card ${paymentMethod === 'cod' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('cod')}
                    >
                      <input type="radio" name="payment_method" value="cod" checked={paymentMethod === 'cod'} readOnly />
                      <div className="radio-card-content">
                        <div className="radio-card-title-row">
                          <span className="radio-card-title">Thanh toán khi nhận hàng (COD)</span>
                          <span className="badge" style={{ background: '#eaf4ed', color: '#237446', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '4px' }}>
                            Phổ biến
                          </span>
                        </div>
                        <p className="radio-card-desc">
                          Bạn chỉ thanh toán tiền mặt cho nhân viên giao hàng sau khi đã kiểm tra kiện hàng.
                        </p>
                      </div>
                    </label>

                    {/* Chuyển khoản VietQR */}
                    <label
                      className={`radio-card ${paymentMethod === 'bank' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('bank')}
                    >
                      <input type="radio" name="payment_method" value="bank" checked={paymentMethod === 'bank'} readOnly />
                      <div className="radio-card-content">
                        <div className="radio-card-title-row">
                          <span className="radio-card-title">Chuyển khoản VietQR 24/7 (Miễn phí)</span>
                        </div>
                        <p className="radio-card-desc">
                          Quét mã QR qua app ngân hàng bất kỳ, xác nhận đơn tự động tức thì.
                        </p>
                        {paymentMethod === 'bank' && (
                          <div className="payment-subinfo">
                            <div style={{ fontSize: '0.8rem', lineHeight: 1.6 }}>
                              <div>Ngân hàng: <strong>MBBank (Ngân hàng Quân Đội)</strong></div>
                              <div>Số tài khoản: <strong>0388 668 999</strong></div>
                              <div>Chủ tài khoản: <strong>CHAM XANH BOTANICALS</strong></div>
                              <div>Nội dung CK: <strong style={{ color: 'var(--primary)' }}>CX {formData.phone || 'SĐT'}</strong></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Ví điện tử */}
                    <label
                      className={`radio-card ${paymentMethod === 'ewallet' ? 'active' : ''}`}
                      onClick={() => setPaymentMethod('ewallet')}
                    >
                      <input type="radio" name="payment_method" value="ewallet" checked={paymentMethod === 'ewallet'} readOnly />
                      <div className="radio-card-content">
                        <div className="radio-card-title-row">
                          <span className="radio-card-title">Ví điện tử MoMo / VNPAY</span>
                        </div>
                        <p className="radio-card-desc">
                          Thanh toán liên kết an toàn qua cổng thanh toán quốc gia VNPAY và MoMo.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Cột phải: Tóm tắt đơn hàng */}
              <div className="checkout-summary-col">
                <div className="order-summary-box">
                  <div className="order-summary-title">
                    <span>Đơn hàng của bạn</span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                      {totalQuantity} món
                    </span>
                  </div>

                  <div className="order-items-list">
                    {items.map((item) => (
                      <div key={item.id} className="order-item-row">
                        <img src={item.image} alt={item.name} className="order-item-thumb" />
                        <div className="order-item-info">
                          <div className="order-item-name">{item.name}</div>
                          <div className="order-item-qty">Số lượng: x{item.quantity}</div>
                        </div>
                        <div className="order-item-price">
                          {(item.price * item.quantity).toLocaleString('vi-VN')}₫
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-calc-row">
                    <span>Tạm tính</span>
                    <span>{subtotal.toLocaleString('vi-VN')}₫</span>
                  </div>

                  {discount > 0 && (
                    <div className="checkout-calc-row" style={{ color: '#16a34a' }}>
                      <span>Giảm giá</span>
                      <span>-{discount.toLocaleString('vi-VN')}₫</span>
                    </div>
                  )}

                  <div className="checkout-calc-row">
                    <span>Phí vận chuyển</span>
                    <span>{shippingFee === 0 ? 'Miễn phí' : `${shippingFee.toLocaleString('vi-VN')}₫`}</span>
                  </div>

                  <div className="checkout-calc-row total">
                    <span>Tổng thanh toán</span>
                    <span className="val">{total.toLocaleString('vi-VN')}₫</span>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-full"
                    disabled={isSubmitting}
                    style={{ marginTop: '20px', padding: '14px', fontSize: '1rem' }}
                  >
                    {isSubmitting ? 'Đang xử lý đơn hàng...' : 'Hoàn tất đặt hàng'}
                  </button>

                  <div className="security-badges-row">
                    <span>🔒 Bảo mật SSL 256-bit</span>
                    <span>🌿 Đóng gói không rác thải</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
