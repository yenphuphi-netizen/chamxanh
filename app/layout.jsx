import './globals.css';
import { Providers } from '@/context/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/layout/CartDrawer';

export const metadata = {
  title: 'Chạm Xanh - Mỹ Phẩm Thuần Chay Thiên Nhiên Lành Tính',
  description:
    'Chạm Xanh - Thương hiệu mỹ phẩm thuần chay tiên phong từ nông sản Việt. Chiết xuất bưởi, trà xanh, bã cà phê lành tính cho làn da, bền vững cùng hành tinh.',
  icons: {
    icon: '/assets/logo.jpg'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Be+Vietnam+Pro:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Header />
          <CartDrawer />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
