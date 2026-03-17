import { useState } from 'react';
import { FaBook, FaVideo, FaCode, FaYoutube, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { MdSchool } from 'react-icons/md';
import styles from './Resources.module.css';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Resources' },
    { id: 'tutorials', name: 'Tutorials' },
    { id: 'courses', name: 'Free Courses' },
    { id: 'videos', name: 'Videos' },
    { id: 'tools', name: 'Tools' }
  ];

  const resources = [
    {
      id: 1,
      title: 'React - The Complete Guide',
      description: 'Learn React from scratch with hooks, context, and projects',
      category: 'courses',
      url: 'https://youtube.com',
      icon: <MdSchool />,
      type: 'Course'
    },
    {
      id: 2,
      title: 'JavaScript Understanding the Weird Parts',
      description: 'Deep dive into JavaScript fundamentals and advanced concepts',
      category: 'videos',
      url: 'https://youtube.com',
      icon: <FaYoutube />,
      type: 'Video'
    },
    {
      id: 3,
      title: 'Node.js Best Practices',
      description: 'Comprehensive guide to Node.js development',
      category: 'tutorials',
      url: 'https://github.com',
      icon: <FaGithub />,
      type: 'Tutorial'
    },
    {
      id: 4,
      title: 'VS Code Setup for Web Dev',
      description: 'Essential extensions and settings for web development',
      category: 'tools',
      url: 'https://code.visualstudio.com',
      icon: <FaCode />,
      type: 'Tool'
    },
    {
      id: 5,
      title: 'Python for Beginners',
      description: 'Complete Python course for absolute beginners',
      category: 'courses',
      url: 'https://python.org',
      icon: <MdSchool />,
      type: 'Course'
    },
    {
      id: 6,
      title: 'Docker Crash Course',
      description: 'Learn Docker containers in 1 hour',
      category: 'videos',
      url: 'https://youtube.com',
      icon: <FaYoutube />,
      type: 'Video'
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Learning Resources</h1>
        <p className={styles.headerSubtitle}>
          Free resources to help you level up your skills
        </p>
      </div>

      {/* Categories */}
      <div className={styles.categories}>
        {categories.map(category => (
          <button
            key={category.id}
            className={`${styles.categoryBtn} ${selectedCategory === category.id ? styles.activeCategory : ''}`}
            onClick={() => setSelectedCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className={styles.resourcesGrid}>
        {filteredResources.map(resource => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resourceCard}
          >
            <div className={styles.resourceIcon}>
              {resource.icon}
            </div>
            <div className={styles.resourceContent}>
              <span className={styles.resourceType}>{resource.type}</span>
              <h3 className={styles.resourceTitle}>{resource.title}</h3>
              <p className={styles.resourceDescription}>{resource.description}</p>
              <span className={styles.resourceLink}>
                Learn More <FaExternalLinkAlt />
              </span>
            </div>
          </a>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className={styles.emptyState}>
          <p>No resources found in this category</p>
        </div>
      )}
    </div>
  );
};

export default Resources;