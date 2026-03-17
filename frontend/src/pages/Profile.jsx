import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaTwitter, FaEdit, FaSave, FaTimes, FaGlobe } from 'react-icons/fa';
import { MdEmail, MdSchool, MdLocationOn } from 'react-icons/md';
import ProjectGrid from '../components/ProjectGrid/ProjectGrid';
import { projectAPI } from '../services/api';
import styles from './Profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    bio: '',
    location: '',
    education: '',
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
  });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      setProfileData({
        bio: parsedUser.bio || 'Passionate developer creating amazing projects',
        location: parsedUser.location || 'San Francisco, CA',
        education: parsedUser.education || 'CS Student',
        github: parsedUser.github || '',
        linkedin: parsedUser.linkedin || '',
        twitter: parsedUser.twitter || '',
        website: parsedUser.website || ''
      });
    }
    fetchUserProjects();
  }, []);

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      const response = await projectAPI.getUserProjects();
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...profileData };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);
  };

  const getInitials = (name) => {
    return name?.charAt(0).toUpperCase() || 'U';
  };

  const getStats = () => {
    const totalProjects = projects.length;
    const totalLikes = projects.reduce((acc, project) => acc + (project.likes || 0), 0);
    return { totalProjects, totalLikes };
  };

  if (!user) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          {/* Cover Photo */}
          <div className={styles.coverPhoto}></div>
          
          {/* Profile Info */}
          <div className={styles.profileInfo}>
            <div className={styles.profileHeader}>
              <div className={styles.avatarWrapper}>
                <div className={styles.avatar}>
                  <span className={styles.avatarText}>{getInitials(user.name)}</span>
                </div>
                <div className={styles.nameSection}>
                  <h1 className={styles.userName}>{user.name}</h1>
                  <p className={styles.userEmail}><MdEmail /> {user.email}</p>
                </div>
              </div>
              
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`${styles.editButton} ${isEditing ? styles.cancelButton : ''}`}
              >
                {isEditing ? <><FaTimes /> Cancel</> : <><FaEdit /> Edit Profile</>}
              </button>
            </div>

            {/* Stats */}
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{stats.totalProjects}</span>
                <span className={styles.statLabel}>Projects</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{stats.totalLikes}</span>
                <span className={styles.statLabel}>Likes</span>
              </div>
            </div>

            {/* Edit Mode */}
            {isEditing ? (
              <div className={styles.editForm}>
                <div className={styles.formGroup}>
                  <label>Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows="3"
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label><MdLocationOn /> Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      placeholder="City, Country"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label><MdSchool /> Education</label>
                    <input
                      type="text"
                      value={profileData.education}
                      onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                      placeholder="University / School"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label><FaGithub /> GitHub</label>
                    <input
                      type="url"
                      value={profileData.github}
                      onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                      placeholder="https://github.com/username"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label><FaLinkedin /> LinkedIn</label>
                    <input
                      type="url"
                      value={profileData.linkedin}
                      onChange={(e) => setProfileData({ ...profileData, linkedin: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label><FaTwitter /> Twitter</label>
                    <input
                      type="url"
                      value={profileData.twitter}
                      onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label><FaGlobe /> Website</label>
                    <input
                      type="url"
                      value={profileData.website}
                      onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>
                </div>

                <button onClick={handleSaveProfile} className={styles.saveButton}>
                  <FaSave /> Save Changes
                </button>
              </div>
            ) : (
              <>
                {/* Bio */}
                <p className={styles.bio}>{profileData.bio}</p>

                {/* Location & Education */}
                <div className={styles.infoRow}>
                  {profileData.location && (
                    <span className={styles.infoTag}>
                      <MdLocationOn /> {profileData.location}
                    </span>
                  )}
                  {profileData.education && (
                    <span className={styles.infoTag}>
                      <MdSchool /> {profileData.education}
                    </span>
                  )}
                </div>

                {/* Social Links */}
                <div className={styles.socialLinks}>
                  {profileData.github && (
                    <a href={profileData.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <FaGithub />
                    </a>
                  )}
                  {profileData.linkedin && (
                    <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <FaLinkedin />
                    </a>
                  )}
                  {profileData.twitter && (
                    <a href={profileData.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <FaTwitter />
                    </a>
                  )}
                  {profileData.website && (
                    <a href={profileData.website} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                      <FaGlobe />
                    </a>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Projects Section */}
        <div className={styles.projectsSection}>
          <h2 className={styles.sectionTitle}>My Projects</h2>
          {projects.length === 0 ? (
            <div className={styles.emptyProjects}>
              <p>No projects yet</p>
              <Link to="/add-project" className={styles.createButton}>
                Create Your First Project
              </Link>
            </div>
          ) : (
            <ProjectGrid projects={projects} loading={loading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;