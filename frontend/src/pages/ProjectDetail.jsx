import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaGithub, FaExternalLinkAlt, FaUser, FaCalendar, FaArrowLeft } from 'react-icons/fa';
import { projectAPI } from '../services/api';
import styles from './ProjectDetail.module.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  console.log('ProjectDetail rendered with ID from URL:', id); // Debug log

  useEffect(() => {
    if (id) {
      console.log('Fetching project with ID:', id);
      fetchProject();
    } else {
      console.log('No ID provided in URL');
      setError('No project ID provided');
      setLoading(false);
    }
  }, [id]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      console.log('Making API call to fetch project:', id);
      
      const response = await projectAPI.getProjectById(id);
      console.log('API Response:', response);
      console.log('Project data:', response.data);
      
      setProject(response.data);
    } catch (err) {
      console.error('Error fetching project:', err);
      console.error('Error response:', err.response);
      console.error('Error status:', err.response?.status);
      console.error('Error data:', err.response?.data);
      
      if (err.response?.status === 404) {
        setError('Project not found. It may have been deleted.');
      } else {
        setError('Failed to load project details');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleViewOnGitHub = () => {
    if (project?.githubUrl) {
      window.open(project.githubUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading project...</p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error || 'Project not found'}</p>
        <p className={styles.errorDetail}>ID: {id}</p>
        <Link to="/" className={styles.homeBtn}>
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link to="/" className={styles.backLink}>
          <FaArrowLeft className={styles.backIcon} />
          Back to Projects
        </Link>

        <div className={styles.projectCard}>
          <div className={styles.imageContainer}>
            <img
              src={project.image || 'https://picsum.photos/1200/600?random=1'}
              alt={project.title}
              className={styles.projectImage}
            />
          </div>

          <div className={styles.projectInfo}>
            <h1 className={styles.projectTitle}>{project.title}</h1>

            <div className={styles.metaInfo}>
              <div className={styles.metaItem}>
                <FaUser className={styles.metaIcon} />
                <span>{project.author?.name || 'Anonymous'}</span>
              </div>
              <div className={styles.metaItem}>
                <FaCalendar className={styles.metaIcon} />
                <span>
                  {new Date(project.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </div>

            <div className={styles.techSection}>
              <h2 className={styles.sectionTitle}>Technologies Used</h2>
              <div className={styles.techStack}>
                {project.techStack?.map((tech, index) => (
                  <span key={index} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.descriptionSection}>
              <h2 className={styles.sectionTitle}>About the Project</h2>
              <p className={styles.description}>
                {project.description}
              </p>
            </div>

            <div className={styles.linksSection}>
              {project.githubUrl && (
                <button
                  onClick={handleViewOnGitHub}
                  className={styles.githubLink}
                >
                  <FaGithub className={styles.linkIcon} />
                  View on GitHub
                </button>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.liveLink}
                >
                  <FaExternalLinkAlt className={styles.linkIcon} />
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;