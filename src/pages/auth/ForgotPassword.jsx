import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';
import { resetPassword } from '../../lib/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await resetPassword(email);
      if (result.success) {
        setIsSubmitted(true);
        toast.success('Password reset email sent!');
      } else {
        throw new Error(result.error || 'Failed to send reset email');
      }
    } catch (error) {
      console.error('Password reset error:', error);
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <>
        <Helmet>
          <title>Check Your Email - WorkflowGene Cloud</title>
        </Helmet>
        
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <Link to="/homepage" className="inline-block mb-6">
                <img src="/assets/logos/WorkflowGene Logo.png" alt="WorkflowGene Cloud" className="h-12 mx-auto" />
              </Link>
            </div>

            <div className="bg-card rounded-genetic-xl shadow-organic-lg p-8 text-center">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Mail" size={32} className="text-success" />
              </div>
              
              <h1 className="text-2xl font-bold text-text-primary mb-4">Check Your Email</h1>
              <p className="text-text-secondary mb-6">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
              
              <div className="space-y-4">
                <Button
                  variant="default"
                  fullWidth
                  iconName="Mail"
                  iconPosition="left"
                  onClick={() => window.open('mailto:', '_blank')}
                >
                  Open Email App
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setIsSubmitted(false)}
                >
                  Try Different Email
                </Button>
              </div>

              <div className="mt-6 text-center">
                <Link to="/login" className="text-primary hover:underline text-sm">
                  Back to Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Reset Password - WorkflowGene Cloud</title>
        <meta name="description" content="Reset your WorkflowGene Cloud account password." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <Link to="/homepage" className="inline-block mb-6">
              <img src="/assets/logos/WorkflowGene Logo.png" alt="WorkflowGene Cloud" className="h-12 mx-auto" />
            </Link>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Reset Password</h1>
            <p className="text-text-secondary">Enter your email to receive a reset link</p>
          </div>

          {/* Reset Form */}
          <div className="bg-card rounded-genetic-xl shadow-organic-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                autoComplete="email"
              />

              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconName="Send"
                iconPosition="right"
                className="btn-organic"
              >
                {isSubmitting ? 'Sending Reset Link...' : 'Send Reset Link'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/login" className="text-primary hover:underline text-sm">
                Back to Sign In
              </Link>
            </div>
          </div>

          {/* Help */}
          <div className="mt-8 text-center">
            <p className="text-text-secondary text-sm mb-4">
              Need help? Contact our support team
            </p>
            <Link 
              to="/support" 
              className="text-primary hover:underline text-sm font-medium"
            >
              Get Support
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;