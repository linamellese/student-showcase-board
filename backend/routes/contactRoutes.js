const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
   try {
      const { name, email, message } = req.body;

      console.log("📧 Contact form submission received:");
      console.log("- Name:", name);
      console.log("- Email:", email);
      console.log("- Message:", message);

      // Validation
      if (!name || !email || !message) {
         return res.status(400).json({
            message: "All fields are required",
         });
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return res.status(400).json({
            message: "Invalid email format",
         });
      }

      // Check if email credentials exist
      if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
         console.error("❌ Email credentials not found in .env file");
         return res.status(500).json({
            message: "Server configuration error",
         });
      }

      console.log("📧 Email credentials found:");
      console.log("- EMAIL_USER:", process.env.EMAIL_USER);
      console.log("- EMAIL_PASS exists:", !!process.env.EMAIL_PASS);

      // Configure nodemailer with Gmail
      const transporter = nodemailer.createTransport({
         service: "gmail",
         auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
         },
         debug: true, // Enable debug logs
         logger: true, // Log to console
      });

      // Verify transporter configuration
      try {
         await transporter.verify();
         console.log("✅ Transporter verified successfully");
      } catch (verifyError) {
         console.error("❌ Transporter verification failed:", verifyError);
         return res.status(500).json({
            message: "Email configuration error: " + verifyError.message,
         });
      }

      // Email content
      const mailOptions = {
         from: `"ProjectShowcase Contact" <${process.env.EMAIL_USER}>`,
         to: "linamariya1619@gmail.com",
         replyTo: email,
         subject: `New message from ${name} - ProjectShowcase`,
         text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
         html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h2 style="color: #667eea; margin-bottom: 20px;">New Contact Message</h2>
          
          <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
            <strong style="color: #333;">Name:</strong> 
            <span style="color: #666; margin-left: 10px;">${name}</span>
          </div>
          
          <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
            <strong style="color: #333;">Email:</strong> 
            <span style="color: #666; margin-left: 10px;">${email}</span>
          </div>
          
          <div style="margin-bottom: 15px; padding: 10px; background: #f8f9fa; border-radius: 5px;">
            <strong style="color: #333;">Message:</strong>
            <p style="color: #666; margin-top: 10px; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          
          <p style="color: #999; font-size: 12px; text-align: center; margin-top: 20px;">
            Sent from ProjectShowcase Contact Form
          </p>
        </div>
      `,
      };

      // Send email
      console.log("📤 Attempting to send email...");
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent successfully!");
      console.log("📬 Message ID:", info.messageId);
      console.log("📬 Response:", info.response);

      res.status(200).json({
         message: "Message sent successfully!",
      });
   } catch (error) {
      console.error("❌ Contact form error details:");
      console.error("- Error name:", error.name);
      console.error("- Error message:", error.message);
      console.error("- Error code:", error.code);
      console.error("- Error command:", error.command);
      console.error("- Full error:", error);

      // Send appropriate error message
      if (error.code === "EAUTH") {
         res.status(500).json({
            message:
               "Email authentication failed. Please check your Gmail credentials.",
         });
      } else if (error.code === "ESOCKET") {
         res.status(500).json({
            message: "Network error. Could not connect to email server.",
         });
      } else {
         res.status(500).json({
            message: "Failed to send message: " + error.message,
         });
      }
   }
});

module.exports = router;
