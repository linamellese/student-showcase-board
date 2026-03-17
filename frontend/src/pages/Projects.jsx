import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProjectGrid from '../components/ProjectGrid/ProjectGrid';
import FilterBar from '../components/FilterBar/FilterBar';
import { projectAPI } from '../services/api';
import styles from './Projects.module.css';

const Projects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    technologies: searchParams.get('tech') ? searchParams.get('tech').split(',') : []
  });

  useEffect(() => {
    fetchProjects();
  }, [currentPage, filters]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      
      // Build query params
      const params = {
        page: currentPage,
        limit: 9
      };
      
      if (filters.search) {
        params.search = filters.search;
      }
      
      if (filters.technologies && filters.technologies.length > 0) {
        params.technologies = filters.technologies.join(',');
      }
      
      // Update URL params
      const newSearchParams = {};
      if (filters.search) newSearchParams.search = filters.search;
      if (filters.technologies.length > 0) newSearchParams.tech = filters.technologies.join(',');
      setSearchParams(newSearchParams);
      
      const response = await projectAPI.getAllProjects(params);
      setProjects(response.data.projects || response.data);
      setTotalPages(response.data.totalPages || 1);
      
    } catch (err) {
      setError('Failed to load projects');
      console.error('Error fetching projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Explore Projects</h1>
        <p className={styles.subtitle}>
          Discover amazing projects built by students like you
        </p>
      </div>

      <div className={styles.content}>
        <FilterBar onFilterChange={handleFilterChange} initialFilters={filters} />

        <ProjectGrid projects={projects} loading={loading} error={error} />

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={styles.pageBtn}
            >
              Previous
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => handlePageChange(i + 1)}
                className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.activePage : ''}`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={styles.pageBtn}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;