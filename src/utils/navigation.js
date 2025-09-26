// Navigation utilities for handling external links and tracking

export const openCalendlyDemo = () => {
  window.open('https://calendly.com/workflowgene/30min', '_blank', 'noopener,noreferrer');
};

export const startFreeTrial = () => {
  // For now, redirect to contact page - can be updated when auth is implemented
  window.location.href = '/contact';
};

export const openExternalLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};