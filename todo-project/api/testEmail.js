require('dotenv').config();
const nodemailer = require("nodemailer");

async function sendMail() {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chinchalpetpavankumar@gmail.com", // your Gmail
      pass: "evktkciinayifuac", // App password
    },
  });

  // Example OTP
  const otp = Math.floor(100000 + Math.random() * 900000);

  let info = await transporter.sendMail({
    from: "Todo App <chinchalpetpavankumar@gmail.com>", // display name + sender
    to: "c.pavankumar01234@gmail.com", // Receiver
    subject: "Your Todo App OTP",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Todo App OTP</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4;">
          <tr>
            <td align="center" style="padding: 20px 0;">
              <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 600px;">
                <!-- Header -->
                <tr>
                  <td style="padding: 30px 40px; text-align: center; background-color: #2c3e50; border-radius: 8px 8px 0 0;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: bold;">Todo App Verification</h1>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <p style="font-size: 16px; color: #333333; margin: 0 0 20px 0; line-height: 1.5;">Hello,</p>
                    <p style="font-size: 16px; color: #333333; margin: 0 0 30px 0; line-height: 1.5;">Your verification code is:</p>
                    
                    <!-- OTP Box -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                      <tr>
                        <td align="center">
                          <table cellpadding="0" cellspacing="0" style="background-color: #2c3e50; border-radius: 8px; padding: 15px 30px;">
                            <tr>
                              <td style="font-size: 36px; font-weight: bold; color: #ffffff; letter-spacing: 5px; text-align: center; font-family: Arial, sans-serif;">
                                ${otp}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 14px; color: #666666; margin: 20px 0; line-height: 1.5;">This code will expire in <strong>5 minutes</strong>.</p>
                    <p style="font-size: 14px; color: #666666; margin: 20px 0; line-height: 1.5;">If you didn't request this code, please ignore this email.</p>
                    
                    <hr style="border: none; border-top: 1px solid #eeeeee; margin: 30px 0;">
                    
                    <p style="font-size: 14px; color: #2c3e50; margin: 0; line-height: 1.5;">
                      Best regards,<br>
                      <strong>Todo App Team</strong>
                    </p>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 40px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                    <p style="font-size: 12px; color: #999999; margin: 0;">This is an automated message, please do not reply.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  });

  console.log("✅ OTP Email sent: %s", info.messageId);
}

sendMail().catch(console.error);
