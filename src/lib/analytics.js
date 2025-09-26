import ReactGA from 'react-ga4';

const TRACKING_ID = import.meta.env.VITE_GA_TRACKING_ID;

export const initGA = () => {
  if (TRACKING_ID) {
    ReactGA.initialize(TRACKING_ID);
  }
};

export const trackPageView = (path) => {
  if (TRACKING_ID) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (TRACKING_ID) {
    ReactGA.event({
      action,
      category,
      label,
      value
    });
  }
};