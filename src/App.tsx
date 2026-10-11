/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AdminNavbar } from './components/AdminNavbar';

// Pages
import { HomePage } from './pages/HomePage';
import { EBooksPage } from './pages/EBooksPage';
import { EBookDetailPage } from './pages/EBookDetailPage';
import { EBookPreviewPage } from './pages/EBookPreviewPage';
import { CoursesPage } from './pages/CoursesPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CoursePlayerPage } from './pages/CoursePlayerPage';
import { AILearningPage } from './pages/AILearningPage';
import { AIPromptsPage } from './pages/AIPromptsPage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { CareerGuidancePage } from './pages/CareerGuidancePage';
import { CareerDetailPage } from './pages/CareerDetailPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { LearningPathsPage } from './pages/LearningPathsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { AuthorsPage } from './pages/AuthorsPage';
import { ContactPage } from './pages/ContactPage';
import { FAQPage } from './pages/FAQPage';
import { TermsPage } from './pages/TermsPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { ShippingPolicyPage } from './pages/ShippingPolicyPage';
import { VerifyCertificatePage } from './pages/VerifyCertificatePage';
import { BrandGuidelinesPage } from './pages/BrandGuidelinesPage';
import { AuthPage } from './pages/AuthPage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { DashboardLibraryPage } from './pages/DashboardLibraryPage';
import { DashboardCoursesPage } from './pages/DashboardCoursesPage';
import { DashboardOrdersPage } from './pages/DashboardOrdersPage';
import { DashboardSettingsPage } from './pages/DashboardSettingsPage';
import { AdminOverviewPage } from './pages/AdminOverviewPage';
import { AdminEBooksPage } from './pages/AdminEBooksPage';
import { AdminEBookFormPage } from './pages/AdminEBookFormPage';
import { AdminCoursesPage } from './pages/AdminCoursesPage';
import { AdminCourseFormPage } from './pages/AdminCourseFormPage';
import { AdminStudentsPage } from './pages/AdminStudentsPage';
import { AdminOrdersPage } from './pages/AdminOrdersPage';
import { AdminContentPage } from './pages/AdminContentPage';
import { AdminAnalyticsPage } from './pages/AdminAnalyticsPage';
import { AdminSettingsPage } from './pages/AdminSettingsPage';

const AppContent: React.FC = () => {
  const { currentPath, toast, user, navigateTo, login, isAdminAuthenticated } = useApp();

  // Route Dispatcher
  const renderRoute = () => {
    const path = currentPath;

    // 1. / — Homepage
    if (path === '/' || path === '') return <HomePage />;

    // 2. /ebooks — Explore All eBooks
    if (path === '/ebooks') return <EBooksPage />;

    // 3. /ebooks/category/:slug — eBook Category
    if (path.startsWith('/ebooks/category/')) {
      const categorySlug = path.replace('/ebooks/category/', '');
      return <EBooksPage categoryFilter={categorySlug} />;
    }

    // 5. /ebooks/:slug/preview — PDF Preview
    if (path.startsWith('/ebooks/') && path.endsWith('/preview')) {
      const slug = path.replace('/ebooks/', '').replace('/preview', '');
      return <EBookPreviewPage slug={slug} />;
    }

    // 4. /ebooks/:slug — eBook Details
    if (path.startsWith('/ebooks/')) {
      const slug = path.replace('/ebooks/', '');
      return <EBookDetailPage slug={slug} />;
    }

    // 6. /courses — Explore All Courses
    if (path === '/courses') return <CoursesPage />;

    // 7. /courses/category/:slug — Course Category
    if (path.startsWith('/courses/category/')) {
      const categorySlug = path.replace('/courses/category/', '');
      return <CoursesPage categoryFilter={categorySlug} />;
    }

    // 9. /learn/:courseId/:lessonId — Course Lesson Player
    if (path.startsWith('/learn/')) {
      const parts = path.replace('/learn/', '').split('/');
      const courseId = parts[0] || 'c-prompt-masterclass';
      const lessonId = parts[1] || 'l1';
      return <CoursePlayerPage courseId={courseId} lessonId={lessonId} />;
    }

    // 8. /courses/:slug — Course Details
    if (path.startsWith('/courses/')) {
      const slug = path.replace('/courses/', '');
      return <CourseDetailPage slug={slug} />;
    }

    // 10. /ai-learning — AI Learning Hub
    if (path === '/ai-learning') return <AILearningPage />;

    // 11. /ai-learning/prompts — Prompt Library
    if (path === '/ai-learning/prompts') return <AIPromptsPage />;

    // 12. /ai-learning/assistant — AI Study Assistant
    if (path === '/ai-learning/assistant') return <AIAssistantPage />;

    // 13. /career-guidance — Career Guidance
    if (path === '/career-guidance') return <CareerGuidancePage />;

    // 14. /careers/:slug — Career Roadmap
    if (path.startsWith('/careers/')) {
      const slug = path.replace('/careers/', '');
      return <CareerDetailPage slug={slug} />;
    }

    // 15. /resources — Free Resources
    if (path === '/resources') return <ResourcesPage />;

    // 16. /learning-paths — Learning Paths
    if (path === '/learning-paths') return <LearningPathsPage />;

    // 17. /blog — Blog Listing
    if (path === '/blog') return <BlogPage />;

    // 18. /blog/:slug — Blog Article
    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return <BlogPostPage slug={slug} />;
    }

    // 19. /about — About Us
    if (path === '/about') return <AboutPage />;

    // 20. /authors — Founders & Authors
    if (path === '/authors') return <AuthorsPage />;

    // 21. /contact — Contact
    if (path === '/contact') return <ContactPage />;

    // 22. /faq — Help and FAQ
    if (path === '/faq') return <FAQPage />;

    // 23. /terms — Terms of Service
    if (path === '/terms') return <TermsPage />;

    // 24. /privacy — Privacy Policy
    if (path === '/privacy') return <PrivacyPage />;

    // 25. /refund-policy — Cancellation & Refund Policy
    if (path === '/refund-policy') return <RefundPolicyPage />;

    // 26. /shipping-policy — Digital Delivery & Shipping Policy
    if (path === '/shipping-policy') return <ShippingPolicyPage />;

    // 27. /verify — Official Certificate Registry & Verification
    if (path.startsWith('/verify')) return <VerifyCertificatePage />;

    // Brand Identity & Official Logo Guidelines
    if (path === '/brand' || path === '/logo' || path === '/logo-guidelines') return <BrandGuidelinesPage />;

    // 28. /auth — Login and Registration
    if (path === '/auth') return <AuthPage />;

    // 28. /cart — Shopping Cart
    if (path === '/cart') return <CartPage />;

    // 29. /checkout — Secure Checkout
    if (path === '/checkout') return <CheckoutPage />;

    // 30. /order-confirmation/:orderId — Payment Confirmation
    if (path.startsWith('/order-confirmation/')) {
      const orderId = path.replace('/order-confirmation/', '');
      return <OrderConfirmationPage orderId={orderId} />;
    }

    // Role-Based Guard: Student Dashboard requires active authentication
    if (path.startsWith('/dashboard')) {
      if (!user) {
        return (
          <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#000825]">
            <div className="max-w-md w-full bg-[#101F45] border border-cyan-500/30 rounded-3xl p-8 text-center space-y-5 shadow-2xl">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">lock</span>
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Student Account Required</h2>
                <p className="text-xs text-white/70 mt-1 leading-relaxed">
                  Sign in to access your digital bookshelf, stream enrolled course lessons, and view tax invoices.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => navigateTo('/auth')}
                  className="w-full py-3 bg-[#2455E8] hover:bg-[#1B44BF] text-white font-bold text-xs rounded-xl transition-all shadow-md"
                >
                  Sign In to GXA Career Academy
                </button>
                <button
                  onClick={() => {
                    login('student@gxacareeracademy.com', 'student');
                  }}
                  className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-white/80 font-medium text-xs rounded-xl border border-white/10 transition-colors"
                >
                  Quick Sign-In (Demo Student)
                </button>
              </div>
            </div>
          </div>
        );
      }
    }

    // 31. /dashboard — Student Dashboard
    if (path === '/dashboard') return <DashboardOverviewPage />;

    // 32. /dashboard/library — My Digital Library
    if (path === '/dashboard/library') return <DashboardLibraryPage />;

    // 33. /dashboard/courses — My Courses
    if (path === '/dashboard/courses') return <DashboardCoursesPage />;

    // 34. /dashboard/orders — Orders & Invoices
    if (path === '/dashboard/orders') return <DashboardOrdersPage />;

    // 35. /dashboard/settings — Profile & Settings
    if (path === '/dashboard/settings') return <DashboardSettingsPage />;

    // Dedicated Private Admin Console Guard (Phase 2.1 & 2.3)
    if (path.startsWith('/admin')) {
      if (!isAdminAuthenticated) {
        return <AdminLoginPage />;
      }
    }

    // 36. /admin — Admin Overview
    if (path === '/admin') return <AdminOverviewPage />;

    // 37. /admin/ebooks — eBook Management
    if (path === '/admin/ebooks') return <AdminEBooksPage />;

    // 38. /admin/ebooks/new and /admin/ebooks/:id/edit — Add/Edit eBook
    if (path === '/admin/ebooks/new') return <AdminEBookFormPage />;
    if (path.startsWith('/admin/ebooks/') && path.endsWith('/edit')) {
      const id = path.replace('/admin/ebooks/', '').replace('/edit', '');
      return <AdminEBookFormPage bookId={id} />;
    }

    // 39. /admin/courses — Course Management
    if (path === '/admin/courses') return <AdminCoursesPage />;

    // 40. /admin/courses/new and /admin/courses/:id/edit — Add/Edit Course
    if (path === '/admin/courses/new') return <AdminCourseFormPage />;
    if (path.startsWith('/admin/courses/') && path.endsWith('/edit')) {
      const id = path.replace('/admin/courses/', '').replace('/edit', '');
      return <AdminCourseFormPage courseId={id} />;
    }

    // 41. /admin/students — Student Management
    if (path === '/admin/students') return <AdminStudentsPage />;

    // 42. /admin/orders — Orders & Payments
    if (path === '/admin/orders') return <AdminOrdersPage />;

    // 43. /admin/content — Content & Categories
    if (path === '/admin/content') return <AdminContentPage />;

    // 44. /admin/analytics — Reports & Analytics
    if (path === '/admin/analytics') return <AdminAnalyticsPage />;

    // 45. /admin/settings — Website Settings
    if (path === '/admin/settings') return <AdminSettingsPage />;

    // Fallback default to HomePage
    return <HomePage />;
  };

  // Determine if full-screen immersion or admin isolation is needed
  const isAdminRoute = currentPath.startsWith('/admin');
  const isImmersivePlayer =
    currentPath.startsWith('/learn/') ||
    (currentPath.startsWith('/ebooks/') && currentPath.endsWith('/preview'));

  return (
    <div className="min-h-screen bg-[#F9FAF7] text-[#121E17] flex flex-col font-sans selection:bg-[#EA580C] selection:text-white w-full max-w-full overflow-x-clip">
      {/* Public Header only shown for public storefront routes */}
      {!isImmersivePlayer && !isAdminRoute && <Header />}

      {/* Private Admin Navbar only shown for authenticated admin console sessions */}
      {isAdminRoute && isAdminAuthenticated && <AdminNavbar />}

      <main className="flex-1 w-full max-w-full min-w-0">
        {renderRoute()}
      </main>

      {/* Public Footer only shown for public storefront routes */}
      {!isImmersivePlayer && !isAdminRoute && <Footer />}

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#072118] border border-[#10B981]/50 text-white px-5 py-3 rounded-2xl shadow-2xl text-xs font-semibold flex items-center gap-2 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#10B981]" />
          {toast}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
