import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { AuthProvider } from "components/auth/AuthProvider";
import ProtectedRoute from "components/auth/ProtectedRoute";
import NotFound from "pages/NotFound";

// Auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import VerifyEmail from './pages/auth/VerifyEmail';

// Dashboard pages
import Dashboard from './pages/dashboard/Dashboard';
import Workflows from './pages/dashboard/Workflows';
import Analytics from './pages/dashboard/Analytics';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';
import CMS from './pages/dashboard/CMS';

// Existing pages
import Careers from './pages/careers';
import Help from './pages/help';
import Security from './pages/security';
import Privacy from './pages/privacy';
import Terms from './pages/terms';
import APIDocumentation from './pages/api';
import Status from './pages/status';
import Integrations from './pages/integrations';
import Templates from './pages/templates';
import Documentation from './pages/documentation';
import Support from './pages/support';
import Community from './pages/community';
import Press from './pages/press';
import Investors from './pages/investors';
import Cookies from './pages/cookies';
import Compliance from './pages/compliance';
import Pricing from './pages/pricing';
import ResourcesPage from './pages/resources';
import FeaturesPage from './pages/features';
import Industries from './pages/industries';
import About from './pages/about';
import Homepage from './pages/homepage';
import Contact from './pages/contact';

// New pages
import Blog from './pages/blog';
import CaseStudies from './pages/case-studies';
import FAQ from './pages/faq';
import HelpCenter from './pages/help-center';

const Routes = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            {/* Public routes */}
            <Route path="/" element={<Homepage />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/help" element={<Help />} />
            <Route path="/security" element={<Security />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/api" element={<APIDocumentation />} />
            <Route path="/status" element={<Status />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/support" element={<Support />} />
            <Route path="/community" element={<Community />} />
            <Route path="/press" element={<Press />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/cookies" element={<Cookies />} />
            <Route path="/compliance" element={<Compliance />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/help-center" element={<HelpCenter />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* Protected dashboard routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/workflows" element={
              <ProtectedRoute>
                <Workflows />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/analytics" element={
              <ProtectedRoute requiredRoles={['super_admin', 'org_admin', 'manager']}>
                <Analytics />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/cms" element={
              <ProtectedRoute requiredRoles={['super_admin']}>
                <CMS />
              </ProtectedRoute>
            } />

            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default Routes;