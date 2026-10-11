import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { EBook, Course, CartItem, Order } from '../types';
import { INITIAL_EBOOKS, INITIAL_COURSES } from '../data/mockData';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
  enrolledCourseIds: string[];
  purchasedEBookIds: string[];
}

interface AppContextType {
  // Navigation & Route state
  currentPath: string;
  navigateTo: (path: string) => void;

  // Student Auth state
  user: User | null;
  login: (email: string, customName?: string) => void;
  logout: () => void;

  // Dedicated Private Admin Auth (Phase 2)
  adminToken: string | null;
  isAdminAuthenticated: boolean;
  adminLogin: (email: string, password: string, mfaCode?: string) => Promise<{ success: boolean; error?: string }>;
  adminLogout: () => Promise<void>;

  // Cart & Commerce
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  appliedCoupon: { code: string; discountPercentage: number } | null;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;

  // Orders & Entitlements (Phase 1 Fail-Closed Security)
  orders: Order[];
  createPaymentOrder: (paymentMethod?: string) => Promise<{ success: boolean; orderId?: string; error?: string; order?: any }>;
  verifyRazorpayPayment: (orderId: string, paymentResponse: any) => Promise<{ success: boolean; error?: string }>;
  refreshEntitlements: () => Promise<void>;
  hasAccessToEBook: (ebookId: string) => boolean;
  hasAccessToCourse: (courseId: string) => boolean;

  // Catalogs
  ebooks: EBook[];
  courses: Course[];
  updateEBook: (updated: EBook) => void;
  addEBook: (newBook: EBook) => void;
  deleteEBook: (id: string) => void;
  updateCourse: (updated: Course) => void;
  addCourse: (newCourse: Course) => void;
  deleteCourse: (id: string) => void;

  // Global Toast
  toastMessage: string | null;
  toast: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_USER = 'gxa_user_v2';
const STORAGE_KEY_CART = 'gxa_cart_v2';
const STORAGE_KEY_EBOOKS = 'gxa_ebooks_v2';
const STORAGE_KEY_COURSES = 'gxa_courses_v2';
const SESSION_KEY_ADMIN_TOKEN = 'gxa_admin_jwt_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Routing helper
  const [currentPath, setCurrentPath] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const navigateTo = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  // -------------------------------------------------------------------------
  // Student User State (Fail-Closed: zero unverified client entitlements)
  // -------------------------------------------------------------------------
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_USER);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          // Security hardening (Fail Closed): Never load entitlements from client localStorage.
          // Entitlements are strictly populated via server-side verification from /api/entitlements/my.
          return {
            ...parsed,
            role: 'student', // Strict role isolation
            enrolledCourseIds: [],
            purchasedEBookIds: [],
          };
        }
      } catch (e) { /* ignore */ }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_USER);
    }
  }, [user]);

  // -------------------------------------------------------------------------
  // Private Admin Token State (SessionStorage Only, Server-Verified)
  // -------------------------------------------------------------------------
  const [adminToken, setAdminToken] = useState<string | null>(() => {
    try {
      return sessionStorage.getItem(SESSION_KEY_ADMIN_TOKEN);
    } catch {
      return null;
    }
  });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return !!sessionStorage.getItem(SESSION_KEY_ADMIN_TOKEN);
  });

  // Verify Admin Session on mount
  useEffect(() => {
    if (adminToken) {
      fetch('/api/admin/me', {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
        .then((res) => {
          if (res.ok) {
            setIsAdminAuthenticated(true);
          } else {
            sessionStorage.removeItem(SESSION_KEY_ADMIN_TOKEN);
            setAdminToken(null);
            setIsAdminAuthenticated(false);
          }
        })
        .catch(() => {
          setIsAdminAuthenticated(false);
        });
    }
  }, [adminToken]);

  const adminLogin = async (email: string, password: string, mfaCode?: string) => {
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, mfaCode }),
      });

      const data = await res.json();
      if (!res.ok || !data.token) {
        return { success: false, error: data.error || 'Authentication failed' };
      }

      sessionStorage.setItem(SESSION_KEY_ADMIN_TOKEN, data.token);
      setAdminToken(data.token);
      setIsAdminAuthenticated(true);
      showToast('Admin Console: Authenticated successfully.');
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Network error connecting to security server' };
    }
  };

  const adminLogout = async () => {
    if (adminToken) {
      try {
        await fetch('/api/admin/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${adminToken}` },
        });
      } catch { /* ignore */ }
    }
    sessionStorage.removeItem(SESSION_KEY_ADMIN_TOKEN);
    setAdminToken(null);
    setIsAdminAuthenticated(false);
    showToast('Admin session terminated');
    navigateTo('/admin');
  };

  // -------------------------------------------------------------------------
  // Refresh Entitlements from Trusted Server
  // -------------------------------------------------------------------------
  const refreshEntitlements = useCallback(async () => {
    if (!user?.id) return;
    try {
      const res = await fetch(`/api/entitlements/my?studentId=${encodeURIComponent(user.id)}`);
      if (res.ok) {
        const data = await res.json();
        setUser((prev) => {
          if (!prev) return null;
          return {
            ...prev,
            enrolledCourseIds: data.courses || [],
            purchasedEBookIds: data.ebooks || [],
          };
        });
      }
    } catch (err) {
      console.warn('Could not sync entitlements with server:', err);
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      refreshEntitlements();
    }
  }, [user?.id, refreshEntitlements]);

  // Student Login (Zero mock entitlement inflation)
  const login = (email: string, customName?: string) => {
    const cleanEmail = email.trim() || 'student@gxacareeracademy.com';
    const computedName =
      customName?.trim() ||
      cleanEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

    const newUser: User = {
      id: `usr-${cleanEmail.replace(/[^a-zA-Z0-9]/g, '_')}`,
      name: computedName,
      email: cleanEmail,
      role: 'student', // Strict role isolation
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(computedName)}&backgroundColor=101f45,2455e8,5848e5`,
      enrolledCourseIds: [],
      purchasedEBookIds: [],
    };
    setUser(newUser);
    showToast(`Signed in as ${computedName}`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out of GXA Career Academy');
    navigateTo('/');
  };

  // -------------------------------------------------------------------------
  // Cart & Commerce State
  // -------------------------------------------------------------------------
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_CART);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item: CartItem) => {
    if (!cart.some((c) => c.id === item.id)) {
      setCart([...cart, item]);
      showToast(`Added "${item.title}" to cart!`);
    } else {
      showToast(`"${item.title}" is already in your cart`);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((c) => c.id !== id));
    showToast('Item removed from cart');
  };

  const clearCart = () => setCart([]);

  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercentage: number } | null>(null);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'LEARN20') {
      setAppliedCoupon({ code: 'LEARN20', discountPercentage: 20 });
      showToast('20% Student Coupon Applied! 🎉');
    } else if (clean === 'GXA10') {
      setAppliedCoupon({ code: 'GXA10', discountPercentage: 10 });
      showToast('10% Welcome Coupon Applied! 🎉');
    } else {
      showToast('Invalid coupon code. Try LEARN20.');
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed');
  };

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const cartDiscount = appliedCoupon ? Math.round(cartSubtotal * (appliedCoupon.discountPercentage / 100)) : 0;
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const gstAmount = Math.round(taxableAmount * 0.18 * 100) / 100;
  const cartTotal = Math.round(taxableAmount + gstAmount);
  const cartCount = cart.length;

  // -------------------------------------------------------------------------
  // Server-Verified Payment Integration (Phase 1: Fail-Closed Security)
  // -------------------------------------------------------------------------
  const [orders, setOrders] = useState<Order[]>([]);

  // Create Server-Side Payment Order (Trusted Price Calculation)
  const createPaymentOrder = async (paymentMethod = 'UPI') => {
    try {
      const payload = {
        items: cart.map((i) => ({ id: i.id, type: i.type, title: i.title })),
        studentId: user?.id || `usr-guest-${Date.now()}`,
        studentEmail: user?.email || 'learner@gxacareeracademy.com',
        studentName: user?.name || 'Learner',
        couponCode: appliedCoupon?.code,
        paymentMethod,
      };

      const res = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        return { success: false, error: data.error || 'Failed to initialize payment order' };
      }

      return {
        success: true,
        orderId: data.order.orderId,
        order: data.order,
      };
    } catch (err: any) {
      console.error('Payment order creation network failure:', err);
      return { success: false, error: 'Could not connect to payment gateway' };
    }
  };

  // Verify Official Gateway Cryptographic Signature on Backend
  const verifyRazorpayPayment = async (orderId: string, paymentResponse: any) => {
    try {
      const res = await fetch('/api/payments/verify-razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.verified) {
        return { success: false, error: data.error || 'Payment signature verification failed' };
      }

      // Success: Refresh server-verified entitlements & clear cart
      clearCart();
      await refreshEntitlements();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: 'Server payment verification error' };
    }
  };

  // -------------------------------------------------------------------------
  // Access Control Checks (Fail Closed: Authenticated Verified Entitlement Only)
  // -------------------------------------------------------------------------
  const hasAccessToCourse = (courseId: string): boolean => {
    if (!user) return false;
    return !!user.enrolledCourseIds?.includes(courseId);
  };

  const hasAccessToEBook = (ebookId: string): boolean => {
    if (!user) return false;
    return !!user.purchasedEBookIds?.includes(ebookId);
  };

  // -------------------------------------------------------------------------
  // Catalogs Management
  // -------------------------------------------------------------------------
  const [ebooks, setEbooks] = useState<EBook[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_EBOOKS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_EBOOKS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_COURSES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_COURSES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_EBOOKS, JSON.stringify(ebooks));
  }, [ebooks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_COURSES, JSON.stringify(courses));
  }, [courses]);

  const updateEBook = (updated: EBook) => {
    setEbooks(ebooks.map((b) => (b.id === updated.id ? updated : b)));
    showToast(`Updated "${updated.title}" successfully`);
  };

  const addEBook = (newBook: EBook) => {
    setEbooks([newBook, ...ebooks]);
    showToast(`Added eBook "${newBook.title}"`);
  };

  const deleteEBook = (id: string) => {
    setEbooks(ebooks.filter((b) => b.id !== id));
    showToast('eBook removed');
  };

  const updateCourse = (updated: Course) => {
    setCourses(courses.map((c) => (c.id === updated.id ? updated : c)));
    showToast(`Updated "${updated.title}" successfully`);
  };

  const addCourse = (newCourse: Course) => {
    setCourses([newCourse, ...courses]);
    showToast(`Added Course "${newCourse.title}"`);
  };

  const deleteCourse = (id: string) => {
    setCourses(courses.filter((c) => c.id !== id));
    showToast('Course removed');
  };

  return (
    <AppContext.Provider
      value={{
        currentPath,
        navigateTo,
        user,
        login,
        logout,
        adminToken,
        isAdminAuthenticated,
        adminLogin,
        adminLogout,
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount,
        cartSubtotal,
        cartDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        orders,
        createPaymentOrder,
        verifyRazorpayPayment,
        refreshEntitlements,
        hasAccessToEBook,
        hasAccessToCourse,
        ebooks,
        courses,
        updateEBook,
        addEBook,
        deleteEBook,
        updateCourse,
        addCourse,
        deleteCourse,
        toastMessage,
        toast: toastMessage,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
