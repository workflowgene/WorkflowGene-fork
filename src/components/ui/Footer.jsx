import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '/features' },
        { name: 'Pricing', href: '/pricing' },
        { name: 'Integrations', href: '/integrations' },
        { name: 'Templates', href: '/templates' }
      ]
    },
    {
      title: 'Solutions',
      links: [
        { name: 'Education', href: '/industries' },
        { name: 'Healthcare', href: '/industries' },
        { name: 'E-Commerce', href: '/industries' },
        { name: 'Enterprise', href: '/pricing' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Documentation', href: '/documentation' },
        { name: 'Help Center', href: '/help-center' },
        { name: 'API Docs', href: '/api' },
        { name: 'Community', href: '/community' },
        { name: 'Blog', href: '/blog' },
        { name: 'Case Studies', href: '/case-studies' },
        { name: 'FAQ', href: '/faq' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Contact', href: '/contact' },
        { name: 'Press', href: '/press' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: 'Linkedin', href: 'https://linkedin.com/company/workflowgene' },
    { name: 'Twitter', icon: 'Twitter', href: 'https://twitter.com/workflowgene' },
    { name: 'GitHub', icon: 'Github', href: 'https://github.com/workflowgene' },
    { name: 'YouTube', icon: 'Youtube', href: 'https://youtube.com/workflowgene' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Security', href: '/security' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2 space-y-4">
              <Link to="/homepage" className="flex items-center space-x-3">
                <div className="w-50 h-10 rounded-genetic-md flex items-center justify-center">
                  <img src="/assets/logos/WorkflowGene Logo.png" alt="WorkflowGene Cloud" />
                </div>
              </Link>
              <p className="text-gray-300 max-w-md leading-relaxed">
                The DNA of smart business automation. Transform your operations with intelligent workflows that evolve with your business.
              </p>
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-genetic-md flex items-center justify-center text-gray-300 hover:bg-primary hover:text-white transition-all duration-genetic-normal"
                    aria-label={`Follow us on ${social?.name}`}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Sections */}
            {footerSections?.map((section) => (
              <div key={section?.title}>
                <h4 className="font-semibold text-white mb-4">
                  {section?.title}
                </h4>
                <ul className="space-y-2">
                  {section?.links?.map((link) => (
                    <li key={link?.name}>
                      <Link
                        to={link?.href}
                        className="text-gray-300 hover:text-white transition-colors duration-genetic-normal text-sm"
                      >
                        {link?.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} WorkflowGene Cloud. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center gap-6">
              {legalLinks?.map((link) => (
                <Link
                  key={link?.name}
                  to={link?.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-genetic-normal"
                >
                  {link?.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;