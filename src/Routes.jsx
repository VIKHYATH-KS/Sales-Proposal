import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UploadDocument from './pages/upload-document';
import Login from './pages/login';
import ProposalGeneration from './pages/proposal-generation';
import Dashboard from './pages/dashboard';
import Register from './pages/register';
import ProposalPreview from './pages/proposal-preview';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Login />} />
        <Route path="/upload-document" element={<UploadDocument />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proposal-generation" element={<ProposalGeneration />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/proposal-preview" element={<ProposalPreview />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
