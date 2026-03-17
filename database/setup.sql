-- Create database
CREATE DATABASE IF NOT EXISTS project_showcase CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE project_showcase;

-- Users table will be created by Sequelize
-- But here's the structure for reference:
/*
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    bio TEXT,
    github VARCHAR(255),
    linkedin VARCHAR(255),
    twitter VARCHAR(255),
    website VARCHAR(255),
    role ENUM('user', 'admin') DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email)
);

-- Projects table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT NOT NULL,
    tech_stack JSON NOT NULL,
    github_url VARCHAR(255),
    live_url VARCHAR(255),
    image VARCHAR(500),
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    status ENUM('draft', 'published') DEFAULT 'published',
    author_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_title (title),
    INDEX idx_author (author_id),
    INDEX idx_created (created_at),
    FULLTEXT INDEX idx_search (title, description)
);

-- Likes table (for future like feature)
CREATE TABLE likes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    project_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    UNIQUE KEY unique_like (user_id, project_id),
    INDEX idx_user (user_id),
    INDEX idx_project (project_id)
);
*/