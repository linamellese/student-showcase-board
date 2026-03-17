import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from './FilterBar.module.css';

const technologies = [
  'React', 'Node.js', 'Python', 'JavaScript', 'Java', 
  'Flutter', 'Vue.js', 'Angular', 'Django', 'MongoDB',
  'Express', 'TypeScript', 'Next.js', 'GraphQL'
];

const FilterBar = ({ onFilterChange, initialFilters = { search: '', technologies: [] } }) => {
  const [searchTerm, setSearchTerm] = useState(initialFilters.search || '');
  const [selectedTech, setSelectedTech] = useState(initialFilters.technologies || []);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    // Notify parent of initial filters
    onFilterChange({ search: searchTerm, technologies: selectedTech });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onFilterChange({ search: value, technologies: selectedTech });
  };

  const handleTechToggle = (tech) => {
    let updatedTech;
    if (selectedTech.includes(tech)) {
      updatedTech = selectedTech.filter(t => t !== tech);
    } else {
      updatedTech = [...selectedTech, tech];
    }
    setSelectedTech(updatedTech);
    onFilterChange({ search: searchTerm, technologies: updatedTech });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedTech([]);
    onFilterChange({ search: '', technologies: [] });
  };

  return (
    <div className={styles.filterBar}>
      <div className={styles.searchContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search projects by title or description..."
          value={searchTerm}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className={styles.mobileToggle}
      >
        {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
      </button>

      <div className={`${styles.filterSection} ${isFilterOpen ? styles.filterOpen : ''}`}>
        <div className={styles.filterHeader}>
          <h3 className={styles.filterTitle}>Filter by Technology</h3>
          {(searchTerm || selectedTech.length > 0) && (
            <button onClick={clearFilters} className={styles.clearBtn}>
              Clear All
            </button>
          )}
        </div>
        
        <div className={styles.techFilters}>
          {technologies.map((tech) => (
            <button
              key={tech}
              onClick={() => handleTechToggle(tech)}
              className={`${styles.techBtn} ${
                selectedTech.includes(tech) ? styles.techBtnSelected : styles.techBtnUnselected
              }`}
            >
              {tech}
            </button>
          ))}
        </div>

        {(searchTerm || selectedTech.length > 0) && (
          <div className={styles.activeFilters}>
            <p className={styles.activeFiltersText}>
              Active Filters: 
              {searchTerm && <span className={styles.filterTag}>"{searchTerm}"</span>}
              {selectedTech.length > 0 && (
                <span className={styles.filterTag}>
                  {selectedTech.join(', ')}
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;