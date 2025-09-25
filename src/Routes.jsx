import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
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

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/about" element={<About />} />
        <Route path="/homepage" element={<Homepage />} />
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
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
