const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const UserModel = require("../models/User");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// --- OTP EMAIL FLOW ---
function generateSixDigitCode() {
  return ("" + Math.floor(100000 + Math.random() * 900000));
}

async function sendEmail({ to, subject, text, html }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "chinchalpetpavankumar@gmail.com",
      pass: "evktkciinayifuac"
    }
  });
  await transporter.sendMail({ 
    from: "Todo App <chinchalpetpavankumar@gmail.com>", 
    to, 
    subject, 
    text, 
    html 
  });
}

exports.requestOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });
  try {
    let user = await User.findOne({ email });
    if (!user) {
      // create minimal user if not exists
      user = await User.create({ name: email.split("@")[0], email, password: await bcrypt.hash(crypto.randomBytes(12).toString("hex"), 10) });
    }

    const code = generateSixDigitCode();
    const otpHash = await bcrypt.hash(code, 10);
    const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

    user.otpHash = otpHash;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    const subject = "Your Todo App OTP";
    const text = `Your OTP is ${code}. It expires in 5 minutes.`;
    const html = `
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
                                ${code}
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
    `;
    await sendEmail({ to: email, subject, text, html });

    res.json({ message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, code } = req.body;
  if (!email || !code) return res.status(400).json({ message: "Email and code are required" });
  try {
    const user = await User.findOne({ email });
    if (!user || !user.otpHash || !user.otpExpiresAt) return res.status(400).json({ message: "Invalid or expired code" });
    if (new Date() > user.otpExpiresAt) return res.status(400).json({ message: "Code expired" });

    const ok = await bcrypt.compare(code, user.otpHash);
    if (!ok) return res.status(400).json({ message: "Invalid code" });

    // clear otp
    user.otpHash = null;
    user.otpExpiresAt = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    // set http-only cookie session
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ message: "Logged in" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMe = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user).select("_id email name");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ id: user._id, email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "", { httpOnly: true, maxAge: 0, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  res.json({ message: "Logged out" });
};
