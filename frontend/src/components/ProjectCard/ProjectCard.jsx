import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaEye, FaTimes } from 'react-icons/fa';
import { FiEye } from 'react-icons/fi';
import styles from './ProjectCard.module.css';

const ProjectCard = ({ project }) => {
  const [showPopup, setShowPopup] = useState(false);

  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  const handleViewClick = (e) => {
    e.preventDefault();
    if (project.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    } else {
      setShowPopup(true);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          <img 
            src={project.image || 'https://picsum.photos/400/200?random=1'} 
            alt={project.title}
            className={styles.image}
          />
          <div className={styles.overlay} />
          
          <div className={styles.quickView}>
            <button onClick={handleViewClick} className={styles.quickViewLink}>
              <FiEye />
              <span>View Project</span>
            </button>
          </div>
        </div>
        
        <div className={styles.content}>
          <h3 className={styles.title}>{project.title}</h3>
          
          <p className={styles.description}>
            {truncateDescription(project.description)}
          </p>
          
          <div className={styles.techStack}>
            {project.techStack?.slice(0, 3).map((tech, index) => (
              <span key={index} className={styles.techBadge}>
                {tech}
              </span>
            ))}
            {project.techStack?.length > 3 && (
              <span className={styles.techBadge}>
                +{project.techStack.length - 3}
              </span>
            )}
          </div>
          
          <div className={styles.footer}>
            <div className={styles.authorInfo}>
              <div className={styles.authorAvatar}>
                <span className={styles.authorInitial}>
                  {project.author?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <span className={styles.authorName}>
                {project.author?.name || 'Anonymous'}
              </span>
            </div>
            
            <div className={styles.links}>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                   className={styles.linkIcon} title="GitHub Repository"
                   onClick={(e) => e.stopPropagation()}>
                  <FaGithub size={18} />
                </a>
              )}
              {project.liveUrl && (
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                   className={styles.linkIcon} title="Live Demo"
                   onClick={(e) => e.stopPropagation()}>
                  <FaExternalLinkAlt size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Simple View Details Button */}
          <button onClick={() => setShowPopup(true)} className={styles.detailButton}>
            <FaEye /> View Details
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className={styles.popupOverlay} onClick={() => setShowPopup(false)}>
          <div className={styles.popupContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setShowPopup(false)}>
              <FaTimes />
            </button>
            
            <div className={styles.popupImage}>
              <img 
                src={project.image || 'https://picsum.photos/600/400?random=1'} 
                alt={project.title}
              />
            </div>
            
            <div className={styles.popupBody}>
              <h2 className={styles.popupTitle}>{project.title}</h2>
              
              <div className={styles.popupMeta}>
                <span>By {project.author?.name || 'Anonymous'}</span>
                <span>•</span>
                <span>{new Date(project.createdAt).toLocaleDateString()}</span>
              </div>
              
              <div className={styles.popupTech}>
                {project.techStack?.map((tech, index) => (
                  <span key={index} className={styles.popupTechBadge}>{tech}</span>
                ))}
              </div>
              
              <p className={styles.popupDescription}>
                {project.description}
              </p>

              <div className={styles.popupLinks}>
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.popupGithub}>
                    <FaGithub /> View on GitHub
                  </a>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.popupLive}>
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;