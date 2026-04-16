import React from "react";
import { Link } from "react-router-dom";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Laptify - Newsletter Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Laptify</h3>
            <p className="text-sm text-muted-foreground">Đăng Ký</p>
            <p className="text-sm text-muted-foreground">
              Giảm giá 10% cho đơn hàng đầu tiên
            </p>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="h-10 flex-1 rounded-md border border-muted-foreground/30 bg-transparent px-3 text-sm text-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-muted-foreground"
              />
              <Button
                size="icon"
                variant="ghost"
                className="size-10 text-background hover:bg-muted-foreground/20"
                aria-label="Gửi email"
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>

          {/* Support Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Hỗ trợ</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>14 Phan Tôn, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh</p>
              <p>laptify@gmail.com</p>
              <p>+84 111 222 333</p>
            </div>
          </div>

          {/* Account Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Tài khoản</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/profile"
                  className="text-muted-foreground transition-colors hover:text-background"
                >
                  Tài khoản của tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="text-muted-foreground transition-colors hover:text-background"
                >
                  Đăng nhập/Đăng ký
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="text-muted-foreground transition-colors hover:text-background"
                >
                  Giỏ hàng
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="text-muted-foreground transition-colors hover:text-background"
                >
                  Yêu thích
                </Link>
              </li>
              <li>
                <span className="cursor-default text-muted-foreground">
                  Cửa hàng
                </span>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Thông tin</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="cursor-default text-muted-foreground">
                  Chính sách bảo mật
                </span>
              </li>
              <li>
                <span className="cursor-default text-muted-foreground">
                  Điều khoản sử dụng
                </span>
              </li>
              <li>
                <span className="cursor-default text-muted-foreground">
                  FAQ
                </span>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-muted-foreground transition-colors hover:text-background"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Download Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Tải xuống</h3>
            <p className="text-sm text-muted-foreground">
              Tiết kiệm đến 3$ với ứng dụng chỉ dành cho người dùng mới
            </p>

            <div className="flex gap-3">
              {/* QR Code */}
              <div className="flex size-20 items-center justify-center rounded-md bg-background p-1">
                <svg viewBox="0 0 100 100" className="size-full">
                  {/* Simplified QR Code representation */}
                  <rect width="100" height="100" fill="white" />
                  <rect x="10" y="10" width="25" height="25" fill="black" />
                  <rect x="65" y="10" width="25" height="25" fill="black" />
                  <rect x="10" y="65" width="25" height="25" fill="black" />
                  <rect x="15" y="15" width="15" height="15" fill="white" />
                  <rect x="70" y="15" width="15" height="15" fill="white" />
                  <rect x="15" y="70" width="15" height="15" fill="white" />
                  <rect x="18" y="18" width="9" height="9" fill="black" />
                  <rect x="73" y="18" width="9" height="9" fill="black" />
                  <rect x="18" y="73" width="9" height="9" fill="black" />
                  <rect x="40" y="10" width="5" height="5" fill="black" />
                  <rect x="50" y="10" width="5" height="5" fill="black" />
                  <rect x="40" y="20" width="5" height="5" fill="black" />
                  <rect x="45" y="40" width="10" height="10" fill="black" />
                  <rect x="65" y="45" width="5" height="5" fill="black" />
                  <rect x="80" y="45" width="5" height="5" fill="black" />
                  <rect x="45" y="65" width="5" height="5" fill="black" />
                  <rect x="55" y="70" width="5" height="5" fill="black" />
                  <rect x="65" y="65" width="10" height="10" fill="black" />
                  <rect x="80" y="75" width="5" height="5" fill="black" />
                </svg>
              </div>

              {/* App Store Buttons */}
              <div className="flex flex-col gap-2">
                <a
                  href="https://play.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 items-center gap-2 rounded-md border border-muted-foreground/30 px-3 transition-colors hover:bg-muted-foreground/20"
                >
                  <svg viewBox="0 0 24 24" className="size-5 fill-current">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] leading-tight text-muted-foreground">
                      GET IT ON
                    </span>
                    <span className="text-xs font-semibold leading-tight">
                      Google Play
                    </span>
                  </div>
                </a>
                <a
                  href="https://www.apple.com/app-store"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 items-center gap-2 rounded-md border border-muted-foreground/30 px-3 transition-colors hover:bg-muted-foreground/20"
                >
                  <svg viewBox="0 0 24 24" className="size-5 fill-current">
                    <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                  </svg>
                  <div className="flex flex-col text-left">
                    <span className="text-[8px] leading-tight text-muted-foreground">
                      Download on the
                    </span>
                    <span className="text-xs font-semibold leading-tight">
                      App Store
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-background"
                aria-label="Facebook"
              >
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-background"
                aria-label="Twitter"
              >
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-background"
                aria-label="Instagram"
              >
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-background"
                aria-label="LinkedIn"
              >
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-muted-foreground/20 py-4 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; Copyright Rimel 2022. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
