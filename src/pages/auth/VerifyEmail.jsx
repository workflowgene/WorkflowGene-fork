import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const VerifyEmail = () => {
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      navigate('/signup', { replace: true });
    }
  }, [email, navigate]);

  useEffect(() => {
    let interval;
    if (resendCooldown > 0) {
      interval = setInterval(() => {
        setResendCooldown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendCooldown]);

  const handleResendEmail = async () => {
    if (!email || resendCooldown > 0) return;
    
    setIsResending(true);
    
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });

      if (error) throw error;

      toast.success('Verification email sent!');
      setResendCooldown(60); // 60 second cooldown
    } catch (error) {
      console.error('Resend error:', error);
      toast.error('Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Verify Your Email - WorkflowGene Cloud</title>
        <meta name="description" content="Verify your email address to complete your WorkflowGene Cloud account setup." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/homepage" className="inline-block mb-6">
              <img src="/assets/logos/WorkflowGene Logo.png" alt="WorkflowGene Cloud" className="h-12 mx-auto" />
            </Link>
          </div>

          {/* Verification Card */}
          <div className="bg-card rounded-genetic-xl shadow-organic-lg p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Mail" size={32} className="text-primary" />
            </div>
            
            <h1 className="text-2xl font-bold text-text-primary mb-4">
              Verify Your Email
            </h1>
            
            <p className="text-text-secondary mb-6">
              We've sent a verification link to{' '}
              <span className="font-medium text-text-primary">{email}</span>
            </p>

            <div className="bg-muted/50 rounded-genetic-md p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm text-text-primary font-medium mb-1">
                    Check your spam folder
                  </p>
                  <p className="text-xs text-text-secondary">
                    Sometimes verification emails end up in spam or promotions folders
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="default"
                fullWidth
                iconName="ExternalLink"
                iconPosition="left"
                onClick={() => window.open('mailto:', '_blank')}
              >
                Open Email App
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                loading={isResending}
                disabled={resendCooldown > 0}
                onClick={handleResendEmail}
                iconName="RefreshCw"
                iconPosition="left"
              >
                {resendCooldown > 0 
                  ? `Resend in ${resendCooldown}s` 
                  : isResending 
                    ? 'Sending...' 
                    : 'Resend Email'
                }
              </Button>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-sm text-text-secondary mb-4">
                Wrong email address?
              </p>
              <Link 
                to="/signup" 
                className="text-primary hover:underline text-sm font-medium"
              >
                Use different email
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary text-sm mb-2">
              Having trouble?
            </p>
            <Link 
              to="/support" 
              className="text-primary hover:underline text-sm font-medium"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;