import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt, FaUser, FaCalendar, FaEye } from 'react-icons/fa';
import { projectAPI } from '../services/api';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, projectId: null, projectTitle: '' });

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchUserProjects();
  }, []);

  const fetchUserProjects = async () => {
    try {
      setLoading(true);
      console.log('Fetching user projects...');
      const response = await projectAPI.getUserProjects();
      console.log('User projects response:', response.data);
      setProjects(response.data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load your projects');
    } finally {
      setLoading(false);
    }
  };

  const handleEditProject = (projectId) => {
    console.log('Editing project with ID:', projectId);
    navigate(`/edit-project/${projectId}`);
  };

  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleDeleteClick = (projectId, projectTitle) => {
    console.log('Delete clicked for project:', projectId, projectTitle);
    setDeleteModal({ 
      isOpen: true, 
      projectId: projectId,
      projectTitle: projectTitle 
    });
  };

  const handleDeleteProject = async () => {
    try {
      console.log('Deleting project with ID:', deleteModal.projectId);
      
      const response = await projectAPI.deleteProject(deleteModal.projectId);
      console.log('Delete response:', response);
      
      // Remove project from state
      setProjects(projects.filter(p => p.id !== deleteModal.projectId));
      
      // Close modal
      setDeleteModal({ isOpen: false, projectId: null, projectTitle: '' });
      
      console.log('Project deleted successfully');
    } catch (err) {
      console.error('Error deleting project:', err);
      console.error('Error response:', err.response?.data);
      
      let errorMessage = 'Failed to delete project. ';
      if (err.response?.status === 401) {
        errorMessage = 'Please login again';
      } else if (err.response?.status === 403) {
        errorMessage = 'You are not authorized to delete this project';
      } else if (err.response?.status === 404) {
        errorMessage = 'Project not found';
      } else {
        errorMessage += err.response?.data?.message || 'Please try again.';
      }
      
      setError(errorMessage);
      setDeleteModal({ isOpen: false, projectId: null, projectTitle: '' });
    }
  };

  const getStats = () => {
    const totalProjects = projects.length;
    const totalTechs = new Set(projects.flatMap(p => p.techStack || [])).size;
    const totalGithub = projects.filter(p => p.githubUrl).length;
    const totalLive = projects.filter(p => p.liveUrl).length;
    
    return { totalProjects, totalTechs, totalGithub, totalLive };
  };

  const stats = getStats();

  // Function to handle image error
  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://picsum.photos/200/150?random=' + Math.random();
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.welcomeSection}>
            <h1 className={styles.welcomeTitle}>
              Welcome back, {user?.name}! 👋
            </h1>
            <p className={styles.welcomeText}>
              Manage your projects and track their performance
            </p>
          </div>
          <Link to="/add-project" className={styles.addBtn}>
            <FaPlus className={styles.addIcon} />
            Add New Project
          </Link>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3 className={styles.statLabel}>Total Projects</h3>
            <p className={styles.statValue}>{stats.totalProjects}</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statLabel}>Technologies Used</h3>
            <p className={styles.statValue}>{stats.totalTechs}</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statLabel}>GitHub Repos</h3>
            <p className={styles.statValue}>{stats.totalGithub}</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statLabel}>Live Demos</h3>
            <p className={styles.statValue}>{stats.totalLive}</p>
          </div>
        </div>

        <div className={styles.projectsSection}>
          <div className={styles.projectsHeader}>
            <h2 className={styles.projectsTitle}>Your Projects</h2>
          </div>

          {error && (
            <div className={styles.errorAlert}>
              {error}
            </div>
          )}

          {projects.length === 0 ? (
            <div className={styles.emptyState}>
              <h3 className={styles.emptyTitle}>No projects yet</h3>
              <p className={styles.emptyText}>Start by adding your first project!</p>
              <Link to="/add-project" className={styles.emptyBtn}>
                <FaPlus className={styles.emptyIcon} />
                Add Your First Project
              </Link>
            </div>
          ) : (
            <div className={styles.projectsList}>
              {projects.map((project) => (
                <div key={project.id} className={styles.projectItem}>
                  {/* Project Image */}
                  <div className={styles.projectImageContainer}>
                    <img 
                      src={project.image || 'https://picsum.photos/200/150?random=1'} 
                      alt={project.title}
                      className={styles.projectImage}
                      onError={handleImageError}
                    />
                  </div>

                  {/* Project Info */}
                  <div className={styles.projectInfo}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <p className={styles.projectDescription}>{project.description}</p>
                    
                    <div className={styles.projectTechs}>
                      {project.techStack?.map((tech, index) => (
                        <span key={index} className={styles.techBadge}>
                          {tech}
                        </span>
                      ))}
                    </div>
                    
                    <div className={styles.projectMeta}>
                      <span className={styles.projectDate}>
                        <FaCalendar className={styles.metaIcon} /> 
                        {new Date(project.createdAt).toLocaleDateString()}
                      </span>
                      <span className={styles.projectAuthor}>
                        <FaUser className={styles.metaIcon} /> 
                        {project.author?.name || 'Anonymous'}
                      </span>
                    </div>

                    <div className={styles.projectLinks}>
                      {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                           className={styles.projectLink}>
                          <FaGithub className={styles.linkIcon} />
                          GitHub
                        </a>
                      )}
                      {project.liveUrl && (
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                           className={styles.projectLink}>
                          <FaExternalLinkAlt className={styles.linkIcon} />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className={styles.projectActions}>
                    <button
                      onClick={() => handleViewProject(project.id)}
                      className={`${styles.actionBtn} ${styles.viewBtn}`}
                      title="View Project"
                    >
                      <FaEye size={18} />
                    </button>
                    <button
                      onClick={() => handleEditProject(project.id)}
                      className={`${styles.actionBtn} ${styles.editBtn}`}
                      title="Edit Project"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(project.id, project.title)}
                      className={`${styles.actionBtn} ${styles.deleteBtn}`}
                      title="Delete Project"
                    >
                      <FaTrash size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3 className={styles.modalTitle}>Delete Project</h3>
            <p className={styles.modalText}>
              Are you sure you want to delete "{deleteModal.projectTitle}"? 
              This action cannot be undone.
            </p>
            <div className={styles.modalActions}>
              <button
                onClick={() => setDeleteModal({ isOpen: false, projectId: null, projectTitle: '' })}
                className={styles.modalCancel}
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteProject}
                className={styles.modalConfirm}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;