// Navigation utilities for handling external links and tracking

export const openCalendlyDemo = () => {
  window.open('https://calendly.com/workflowgene/30min', '_blank', 'noopener,noreferrer');
};

export const startFreeTrial = () => {
  // Redirect to signup page for free trial
  window.location.href = '/pricing';
};

export const openExternalLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer');
};