import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <h3 className={styles.logo}>ProjectShowcase</h3>
            <p className={styles.description}>
              A platform for students to showcase their amazing projects, connect with <br />peers,
              and build their portfolio.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className={styles.socialLink}>
                <FaGithub size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className={styles.socialLink}>
                <FaTwitter size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className={styles.socialLink}>
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className={styles.sectionTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><Link to="/" className={styles.footerLink}>Home</Link></li>
              <li><Link to="/projects" className={styles.footerLink}>Projects</Link></li>
              <li><Link to="/about" className={styles.footerLink}>About Us</Link></li>
              <li><Link to="/contact" className={styles.footerLink}>Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.sectionTitle}>Resources</h4>
            <ul className={styles.linkList}>
              <li><Link to="/resources" className={styles.footerLink}>Learning Resources</Link></li>
              <li><Link to="/blog" className={styles.footerLink}>Blog</Link></li>
              <li><Link to="/faq" className={styles.footerLink}>FAQ</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className={styles.sectionTitle}>For Students</h4>
            <ul className={styles.linkList}>
              <li><Link to="/signup" className={styles.footerLink}>Join Now</Link></li>
              <li><Link to="/add-project" className={styles.footerLink}>Add Project</Link></li>
              <li><Link to="/dashboard" className={styles.footerLink}>Dashboard</Link></li>
              <li><Link to="/profile" className={styles.footerLink}>Profile</Link></li>
            </ul>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p className={styles.madeWith}>
            Made with <FaHeart className={styles.heartIcon} /> by Students for Students
          </p>
          <p className={styles.copyrightText}>&copy; 2024 ProjectShowcase. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;