import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend('re_XU6vdrQi_13M6Lx83eCdzv2rp5iJdfnH6');

export async function sendVerificationEmail(email: string, verificationCode: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: 'Verify Your Account - July 24 Events Documentation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333;">Welcome to July 24 Events Documentation</h2>
          <p>Thank you for registering. Please use the following verification code to verify your account:</p>
          <div style="background-color: #f5f5f5; padding: 20px; text-align: center; margin: 20px 0;">
            <h1 style="color: #2196F3; margin: 0; letter-spacing: 5px;">${verificationCode}</h1>
          </div>
          <p>This code will expire in 10 minutes.</p>
          <p>If you did not request this verification, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">This is an automated message, please do not reply.</p>
        </div>
      `,
    });

    if (error) {
      console.error('Error sending verification email:', error);
      throw error;
    }

    console.log('Verification email sent successfully to:', email);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new Error('Failed to send verification email');
  }
} 