import { useState } from "react";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import styles from "./Contact.module.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ FIXED SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(data.message || "Failed to send message");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Make sure backend is running.");
    }

    setLoading(false);

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      content: "linamariya1619@gmail.com",
      link: "mailto:linamariya1619@gmail.com",
    },
    { icon: <FaMapMarkerAlt />, title: "Location", content: "Addis Ababa, Ethiopia" },
    {
      icon: <FaPhone />,
      title: "Phone",
      content: "+251 970-420-761",
      link: "tel:+251970420761",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Get in Touch</h1>
        <p className={styles.headerSubtitle}>
          Have questions? I'd love to hear from you
        </p>
      </div>

      <div className={styles.content}>
        {/* Contact Info */}
        <div className={styles.infoSection}>
          <h2 className={styles.sectionTitle}>Contact Information</h2>

          <div className={styles.emailHighlight}>
            <FaEnvelope className={styles.emailIcon} />
            <div>
              <h3>Email Me Directly</h3>
              <a
                href="mailto:linamariya1619@gmail.com"
                className={styles.emailLink}
              >
                linamariya1619@gmail.com
              </a>
            </div>
          </div>

          <div className={styles.infoCards}>
            {contactInfo.map((info, index) => (
              <div key={index} className={styles.infoCard}>
                <div className={styles.infoIcon}>{info.icon}</div>
                <div>
                  <h3>{info.title}</h3>
                  {info.link ? (
                    <a href={info.link} className={styles.infoLink}>
                      {info.content}
                    </a>
                  ) : (
                    <p>{info.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className={styles.socialLinks}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaGithub />
            </a>

            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaTwitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
            >
              <FaLinkedin />
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className={styles.formSection}>
          <h2 className={styles.sectionTitle}>Send a Message</h2>

          {submitted ? (
            <div className={styles.successMessage}>
              <div className={styles.successIcon}>✓</div>
              <h3>Message Sent!</h3>
              <p>Thank you for contacting me. I will reply soon.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label>Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className={styles.submitBtn} disabled={loading}>
                <FaPaperPlane /> {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;