import { Link } from 'react-router-dom';
import { FaRocket, FaUsers, FaHeart, FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import styles from './About.module.css';

const About = () => {
  const stats = [
    { icon: <FaUsers />, value: '500+', label: 'Active Students' },
    { icon: <FaRocket />, value: '300+', label: 'Projects Shared' },
    { icon: <MdSchool />, value: '50+', label: 'Universities' },
    { icon: <FaHeart />, value: '1000+', label: 'Community Likes' }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>About Us</h1>
        <p className={styles.heroSubtitle}>
          We're on a mission to help students showcase their work and connect with the developer community
        </p>
      </div>

      {/* Stats Section */}
      <div className={styles.statsSection}>
        <div className={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} className={styles.statCard}>
              <div className={styles.statIcon}>{stat.icon}</div>
              <div className={styles.statInfo}>
                <span className={styles.statValue}>{stat.value}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Story Section */}
      <div className={styles.storySection}>
        <div className={styles.storyContent}>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <p className={styles.storyText}>
            ProjectShowcase started as a simple idea: give students a platform to share their projects 
            and learn from each other. What began as a university project has grown into a community 
            of hundreds of students sharing their work, getting feedback, and building their portfolios.
          </p>
          <p className={styles.storyText}>
            Today, we're proud to host projects from students across 50+ universities, covering everything 
            from simple websites to complex AI applications. Our community continues to grow, and we're 
            excited to see what you'll build next.
          </p>
        </div>
        <div className={styles.storyImage}>
          <div className={styles.imagePlaceholder}>
            <span>🚀</span>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className={styles.valuesSection}>
        <h2 className={styles.sectionTitle}>Our Values</h2>
        <div className={styles.valuesGrid}>
          <div className={styles.valueCard}>
            <h3>Community First</h3>
            <p>We believe in the power of community. Learning together makes us all better developers.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Open to All</h3>
            <p>Whether you're just starting or have years of experience, you're welcome here.</p>
          </div>
          <div className={styles.valueCard}>
            <h3>Quality Matters</h3>
            <p>We encourage best practices and help each other write better code.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <h2>Ready to share your project?</h2>
        <p>Join our community and showcase your work</p>
        <Link to="/signup" className={styles.ctaButton}>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default About;