import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
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
        <Route path="/" element={<About />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/about" element={<About />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
