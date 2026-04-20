// ===========================
// Email HTML Templates
// ===========================

export const generateOtpEmailHTML = (otp: number) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 30px; background: linear-gradient(135deg, #1a5276, #2e86c1); border-radius: 8px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1a5276; font-size: 28px; text-align: center; margin-bottom: 20px;">
                OTP Verification
            </h2>
            <p style="font-size: 16px; color: #333; line-height: 1.5; text-align: center;">
                Your OTP code is below.
            </p>
            <p style="font-size: 32px; font-weight: bold; color: #2e86c1; text-align: center; margin: 20px 0;">
                ${otp}
            </p>
            <div style="text-align: center; margin-bottom: 20px;">
                <p style="font-size: 14px; color: #555; margin-bottom: 10px;">
                    This OTP will expire in <strong>2 minutes</strong>. If you did not request this, please ignore this email.
                </p>
            </div>
            <div style="text-align: center; margin-top: 30px;">
                <p style="font-size: 12px; color: #999; text-align: center;">
                    Best Regards,<br/>
                    <span style="font-weight: bold; color: #1a5276;">Family JV International</span>
                </p>
            </div>
        </div>
      </div>`;
};

export const generatePasswordResetEmailHTML = (resetLink: string) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 30px; background: linear-gradient(135deg, #1a5276, #2e86c1); border-radius: 8px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1a5276; font-size: 24px; text-align: center; margin-bottom: 20px;">
                Password Reset Request
            </h2>
            <p style="font-size: 16px; color: #333; line-height: 1.5; text-align: center;">
                You requested a password reset. Click the button below to reset your password.
            </p>
            <div style="text-align: center; margin: 30px 0;">
                <a href="${resetLink}" 
                   style="background-color: #2e86c1; color: #fff; padding: 14px 30px; border-radius: 6px; text-decoration: none; font-size: 16px; font-weight: bold;">
                    Reset Password
                </a>
            </div>
            <p style="font-size: 14px; color: #555; text-align: center;">
                This link will expire in <strong>5 minutes</strong>. If you didn't request this, please ignore this email.
            </p>
            <div style="text-align: center; margin-top: 30px;">
                <p style="font-size: 12px; color: #999;">
                    Best Regards,<br/>
                    <span style="font-weight: bold; color: #1a5276;">Family JV International</span>
                </p>
            </div>
        </div>
      </div>`;
};

export const generateQuoteConfirmationEmailHTML = (name: string, quoteNumber: string) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 30px; background: linear-gradient(135deg, #1a5276, #2e86c1); border-radius: 8px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1a5276; font-size: 24px; text-align: center; margin-bottom: 20px;">
                Quote Request Received
            </h2>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">
                Dear <strong>${name}</strong>,
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">
                Thank you for your interest in our products. We have received your quote request and assigned it the following reference number:
            </p>
            <p style="font-size: 28px; font-weight: bold; color: #2e86c1; text-align: center; margin: 20px 0; padding: 15px; background-color: #eaf2f8; border-radius: 6px;">
                ${quoteNumber}
            </p>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">
                Our team will review your request and get back to you as soon as possible. Please keep this reference number for your records.
            </p>
            <div style="text-align: center; margin-top: 30px;">
                <p style="font-size: 12px; color: #999;">
                    Best Regards,<br/>
                    <span style="font-weight: bold; color: #1a5276;">Family JV International Business Ltd.</span><br/>
                    50, Purana Paltan Line (2nd Floor), Paltan, Dhaka-1000
                </p>
            </div>
        </div>
      </div>`;
};

export const generateQuoteResponseEmailHTML = (name: string, quoteNumber: string, response: string) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 30px; background: linear-gradient(135deg, #1a5276, #2e86c1); border-radius: 8px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
            <h2 style="color: #1a5276; font-size: 24px; text-align: center; margin-bottom: 20px;">
                Response to Your Quote Request
            </h2>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">
                Dear <strong>${name}</strong>,
            </p>
            <p style="font-size: 14px; color: #888; margin-bottom: 10px;">
                Quote Reference: <strong>${quoteNumber}</strong>
            </p>
            <div style="padding: 20px; background-color: #f8f9fa; border-left: 4px solid #2e86c1; border-radius: 4px; margin: 20px 0;">
                <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">
                    ${response}
                </p>
            </div>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">
                If you have any further questions, please don't hesitate to reach out to us.
            </p>
            <div style="text-align: center; margin-top: 30px;">
                <p style="font-size: 12px; color: #999;">
                    Best Regards,<br/>
                    <span style="font-weight: bold; color: #1a5276;">Family JV International Business Ltd.</span><br/>
                    50, Purana Paltan Line (2nd Floor), Paltan, Dhaka-1000
                </p>
            </div>
        </div>
      </div>`;
};

export const generateAdminQuoteNotificationEmailHTML = (quoteNumber: string, requesterName: string, productType: string) => {
    return `
      <div style="font-family: Arial, sans-serif; color: #333; padding: 30px; background: linear-gradient(135deg, #c0392b, #e74c3c); border-radius: 8px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 30px; border-radius: 8px;">
            <h2 style="color: #c0392b; font-size: 24px; text-align: center; margin-bottom: 20px;">
                🔔 New Quote Request
            </h2>
            <p style="font-size: 16px; color: #333; line-height: 1.5;">
                A new quote request has been submitted:
            </p>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 10px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Quote Number:</td>
                    <td style="padding: 10px; color: #333; border-bottom: 1px solid #eee;">${quoteNumber}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; color: #555; border-bottom: 1px solid #eee;">Requester:</td>
                    <td style="padding: 10px; color: #333; border-bottom: 1px solid #eee;">${requesterName}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; color: #555;">Type:</td>
                    <td style="padding: 10px; color: #333;">${productType}</td>
                </tr>
            </table>
            <p style="font-size: 14px; color: #555; text-align: center;">
                Please log in to the admin panel to view and respond to this request.
            </p>
        </div>
      </div>`;
};
