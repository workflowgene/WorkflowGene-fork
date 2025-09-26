import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Icon from '../AppIcon';
import { useAuth } from './AuthProvider';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

const TwoFactorAuth = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [showSetup, setShowSetup] = useState(false);
  const [qrCode, setQrCode] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [backupCodes, setBackupCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { profile } = useAuth();

  const enable2FA = async () => {
    setLoading(true);
    try {
      // Generate TOTP secret
      const secret = generateTOTPSecret();
      const qrCodeUrl = generateQRCode(secret, profile?.email);
      
      setQrCode(qrCodeUrl);
      setShowSetup(true);
    } catch (error) {
      console.error('Error enabling 2FA:', error);
      toast.error('Failed to enable 2FA');
    } finally {
      setLoading(false);
    }
  };

  const verify2FA = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error('Please enter a valid 6-digit code');
      return;
    }

    setLoading(true);
    try {
      // Verify TOTP code
      const isValid = await verifyTOTPCode(verificationCode);
      
      if (isValid) {
        // Generate backup codes
        const codes = generateBackupCodes();
        
        // Save 2FA settings to database
        const { error } = await supabase
          .from('user_security')
          .upsert({
            user_id: profile.id,
            two_factor_enabled: true,
            backup_codes: codes,
            updated_at: new Date().toISOString()
          });

        if (error) throw error;

        setBackupCodes(codes);
        setIsEnabled(true);
        setShowSetup(false);
        toast.success('Two-factor authentication enabled successfully!');
      } else {
        toast.error('Invalid verification code');
      }
    } catch (error) {
      console.error('Error verifying 2FA:', error);
      toast.error('Failed to verify 2FA code');
    } finally {
      setLoading(false);
    }
  };

  const disable2FA = async () => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('user_security')
        .update({
          two_factor_enabled: false,
          backup_codes: null,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', profile.id);

      if (error) throw error;

      setIsEnabled(false);
      setBackupCodes([]);
      toast.success('Two-factor authentication disabled');
    } catch (error) {
      console.error('Error disabling 2FA:', error);
      toast.error('Failed to disable 2FA');
    } finally {
      setLoading(false);
    }
  };

  const generateTOTPSecret = () => {
    // Generate a random 32-character base32 secret
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    let secret = '';
    for (let i = 0; i < 32; i++) {
      secret += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return secret;
  };

  const generateQRCode = (secret, email) => {
    const issuer = 'WorkflowGene Cloud';
    const label = `${issuer}:${email}`;
    const otpauth = `otpauth://totp/${encodeURIComponent(label)}?secret=${secret}&issuer=${encodeURIComponent(issuer)}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauth)}`;
  };

  const verifyTOTPCode = async (code) => {
    // In a real implementation, this would verify against the TOTP secret
    // For demo purposes, we'll accept any 6-digit code
    return code.length === 6 && /^\d+$/.test(code);
  };

  const generateBackupCodes = () => {
    const codes = [];
    for (let i = 0; i < 10; i++) {
      const code = Math.random().toString(36).substring(2, 10).toUpperCase();
      codes.push(code);
    }
    return codes;
  };

  return (
    <div className="space-y-6">
      {/* 2FA Status */}
      <div className="bg-card rounded-genetic-lg p-6 shadow-organic-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Two-Factor Authentication
            </h3>
            <p className="text-text-secondary">
              Add an extra layer of security to your account
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
              isEnabled ? 'bg-success/10 text-success' : 'bg-muted text-text-secondary'
            }`}>
              <Icon name={isEnabled ? 'Shield' : 'ShieldOff'} size={16} />
              <span>{isEnabled ? 'Enabled' : 'Disabled'}</span>
            </div>
            
            {isEnabled ? (
              <Button
                variant="outline"
                size="sm"
                onClick={disable2FA}
                loading={loading}
                iconName="ShieldOff"
                iconPosition="left"
              >
                Disable
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={enable2FA}
                loading={loading}
                iconName="Shield"
                iconPosition="left"
              >
                Enable 2FA
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Setup Modal */}
      {showSetup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-genetic-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Set Up Two-Factor Authentication
              </h3>
              <p className="text-text-secondary">
                Scan the QR code with your authenticator app
              </p>
            </div>

            <div className="text-center mb-6">
              <img src={qrCode} alt="2FA QR Code" className="mx-auto mb-4" />
              <p className="text-sm text-text-secondary">
                Use Google Authenticator, Authy, or any TOTP app
              </p>
            </div>

            <div className="space-y-4">
              <Input
                label="Verification Code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit code"
                maxLength={6}
              />
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setShowSetup(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  fullWidth
                  onClick={verify2FA}
                  loading={loading}
                  disabled={verificationCode.length !== 6}
                  iconName="Check"
                  iconPosition="left"
                >
                  Verify & Enable
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Codes */}
      {backupCodes.length > 0 && (
        <div className="bg-warning/5 border border-warning/20 rounded-genetic-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="AlertTriangle" size={20} className="text-warning" />
            <h4 className="font-semibold text-warning">Backup Codes</h4>
          </div>
          
          <p className="text-text-secondary mb-4">
            Save these backup codes in a secure location. You can use them to access your account if you lose your authenticator device.
          </p>
          
          <div className="grid grid-cols-2 gap-2 mb-4 font-mono text-sm">
            {backupCodes.map((code, index) => (
              <div key={index} className="bg-surface p-2 rounded border">
                {code}
              </div>
            ))}
          </div>
          
          <Button variant="outline" size="sm" iconName="Download" iconPosition="left">
            Download Codes
          </Button>
        </div>
      )}
    </div>
  );
};

export default TwoFactorAuth;