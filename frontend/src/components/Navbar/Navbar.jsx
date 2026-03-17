import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaPlus, FaInfoCircle, FaEnvelope, FaBook } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = () => {
      const userData = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (userData && token) {
        setUser(JSON.parse(userData));
      } else {
        setUser(null);
      }
    };

    checkUser();
    window.addEventListener('storage', checkUser);
    window.addEventListener('userUpdate', checkUser);

    return () => {
      window.removeEventListener('storage', checkUser);
      window.removeEventListener('userUpdate', checkUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.dispatchEvent(new Event('userUpdate'));
    navigate('/');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navContent}>
          <div className={styles.logoContainer}>
            <Link to="/" className={styles.logo}>
              ProjectShowcase
            </Link>
          </div>

          <div className={styles.desktopMenu}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/projects" className={styles.navLink}>Projects</Link>
            <Link to="/about" className={styles.navLink}>About</Link>
            <Link to="/contact" className={styles.navLink}>Contact</Link>
            <Link to="/resources" className={styles.navLink}>Resources</Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className={`${styles.navLink} ${styles.iconLink}`}>
                  <MdDashboard /> Dashboard
                </Link>
                <Link to="/add-project" className={`${styles.navLink} ${styles.iconLink}`}>
                  <FaPlus /> Add Project
                </Link>
                <Link to="/profile" className={styles.userInfo}>
                  <div className={styles.userAvatar}>
                    <FaUser className={styles.userIcon} />
                  </div>
                  <span className={styles.userName}>{user.name}</span>
                </Link>
                <button onClick={handleLogout} className={styles.logoutBtn}>
                  <FaSignOutAlt /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.loginBtn}>Login</Link>
                <Link to="/signup" className={styles.signupBtn}>Sign Up</Link>
              </>
            )}
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className={styles.mobileMenuBtn}>
            <svg className={styles.menuIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuContent}>
            <Link to="/" className={styles.mobileNavLink}>Home</Link>
            <Link to="/projects" className={styles.mobileNavLink}>Projects</Link>
            <Link to="/about" className={styles.mobileNavLink}>About</Link>
            <Link to="/contact" className={styles.mobileNavLink}>Contact</Link>
            <Link to="/resources" className={styles.mobileNavLink}>Resources</Link>
            {user ? (
              <>
                <Link to="/dashboard" className={styles.mobileNavLink}>Dashboard</Link>
                <Link to="/add-project" className={styles.mobileNavLink}>Add Project</Link>
                <Link to="/profile" className={styles.mobileNavLink}>Profile</Link>
                <button onClick={handleLogout} className={styles.mobileLogoutBtn}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login" className={styles.mobileNavLink}>Login</Link>
                <Link to="/signup" className={styles.mobileNavLink}>Sign Up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;