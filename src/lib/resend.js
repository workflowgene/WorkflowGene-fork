import { Resend } from 'resend';

const resendApiKey = import.meta.env.VITE_RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

export const sendEmail = async ({ to, subject, html, from = 'noreply@workflowgene.cloud' }) => {
  if (!resend) {
    console.warn('Resend API key not configured');
    return { success: false, error: 'Email service not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from,
      to,
      subject,
      html
    });

    if (error) {
      console.error('Email send error:', error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error: error.message };
  }
};