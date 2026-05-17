import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/feature/auth/authSlice.js";
import { authService } from "@/services/auth/authService.js";
import { User, LogOut } from "lucide-react";

const UserMenuDropdown = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      // 1. Gọi API để Backend xóa session/token (nếu có logic ở BE)
      await authService.logout();
    } catch (error) {
      console.error("Logout API call failed:", error);
    } finally {
      // 2. Clear state trong Redux và LocalStorage (Action này đã có logic xóa localStorage)
      dispatch(logout());
      setIsOpen(false);

      // 3. Đưa người dùng về trang chủ hoặc Login
      navigate("/login");
    }
  };

  const userName = user?.name || user?.email || "User";

  return (
    <div className="relative z-50" ref={menuRef}>
      {/* Profile Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex size-10 items-center justify-center rounded-full text-foreground transition-all duration-200 hover:bg-accent hover:scale-110"
        aria-label="User menu"
        aria-expanded={isOpen}
      >
        <User className="size-5 transition-transform duration-200" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-md border border-input bg-background shadow-2xl z-50 animate-fade-in-scale">
          {/* User Info */}
          <div className="border-b border-input px-4 py-3 animate-fade-in">
            <p className="text-sm font-medium text-foreground">{userName}</p>
            {user?.email && (
              <p className="text-xs text-muted-foreground">{user.email}</p>
            )}
          </div>

          {/* Menu Items */}
          <nav className="py-2">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-all duration-200 hover:bg-accent hover:translate-x-1"
              onClick={() => setIsOpen(false)}
            >
              <User className="size-4 transition-transform duration-200 group-hover:scale-110" />
              Hồ sơ
            </Link>
            <Link
              to="/order-history"
              className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-all duration-200 hover:bg-accent hover:translate-x-1"
              onClick={() => setIsOpen(false)}
            >
              <User className="size-4 transition-transform duration-200 group-hover:scale-110" />
              Lịch sử mua hàng
            </Link>
          </nav>

          {/* Logout Button */}
          <div className="border-t border-input py-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground transition-all duration-200 hover:bg-accent hover:translate-x-1"
            >
              <LogOut className="size-4 transition-transform duration-200" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenuDropdown;
