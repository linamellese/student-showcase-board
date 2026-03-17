import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRocket, FaCode, FaUsers, FaGithub } from "react-icons/fa";
import { MdDesignServices, MdStorage } from "react-icons/md";
import ProjectGrid from "../components/ProjectGrid/ProjectGrid";
import FilterBar from "../components/FilterBar/FilterBar";
import { projectAPI } from "../services/api";
import styles from "./Home.module.css";

const Home = () => {
   const [projects, setProjects] = useState([]);
   const [filteredProjects, setFilteredProjects] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      fetchProjects();
   }, []);

   const fetchProjects = async () => {
      try {
         setLoading(true);
         const response = await projectAPI.getAllProjects();
         const projectsData = response.data.projects || response.data;
         setProjects(projectsData);
         setFilteredProjects(projectsData);
      } catch (err) {
         setError("Failed to load projects");
         console.error("Error fetching projects:", err);
      } finally {
         setLoading(false);
      }
   };

   const handleFilterChange = (filters) => {
      let filtered = [...projects];

      if (filters.search) {
         const searchLower = filters.search.toLowerCase();
         filtered = filtered.filter(
            (project) =>
               project.title.toLowerCase().includes(searchLower) ||
               project.description.toLowerCase().includes(searchLower),
         );
      }

      if (filters.technologies && filters.technologies.length > 0) {
         filtered = filtered.filter((project) =>
            filters.technologies.some((tech) =>
               project.techStack.includes(tech),
            ),
         );
      }

      setFilteredProjects(filtered);
   };

   const features = [
      {
         icon: <FaRocket className={styles.featureIconSvg} />,
         title: "Publish Projects",
         description:
            "Share your academic and personal projects with the community",
      },
      {
         icon: <FaCode className={styles.featureIconSvg} />,
         title: "Discover Technologies",
         description:
            "Explore projects using different tech stacks and learn from peers",
      },
      {
         icon: <MdDesignServices className={styles.featureIconSvg} />,
         title: "Build Portfolio",
         description:
            "Create an impressive portfolio to showcase to potential employers",
      },
      {
         icon: <FaUsers className={styles.featureIconSvg} />,
         title: "Connect with Peers",
         description:
            "Network with fellow students and collaborate on projects",
      },
      {
         icon: <FaGithub className={styles.featureIconSvg} />,
         title: "Open Source",
         description:
            "Contribute to open source and learn from real-world code",
      },
      {
         icon: <MdStorage className={styles.featureIconSvg} />,
         title: "Resource Sharing",
         description: "Share and discover learning resources and project ideas",
      },
   ];

   const techFilters = ["React", "Node.js", "Python", "Java", "Flutter"];

   return (
      <div className={styles.container}>
         <section className={styles.hero}>
            <div className={styles.heroContainer}>
               <div className={styles.heroContent}>
                  <h1 className={styles.heroTitle}>
                     Discover Amazing <br />
                     <span className={styles.heroHighlight}>
                        Student Projects
                     </span>
                  </h1>
                  <p className={styles.heroSubtitle}>
                     Explore innovative projects built by students worldwide.
                     Share your work, get feedback, and build your portfolio.
                  </p>
                  <div className={styles.heroButtons}>
                     <Link to="/projects" className={styles.heroBtnPrimary}>
                        Explore Projects
                     </Link>
                     <Link
                        to="/add-project"
                        className={styles.heroBtnSecondary}
                     >
                        Add Your Project
                     </Link>
                  </div>
               </div>
            </div>
         </section>

         <section className={styles.features}>
            <div className={styles.featuresContainer}>
               <h2 className={styles.sectionTitle}>
                  Why Choose{" "}
                  <span className={styles.sectionTitleGradient}>
                     ProjectShowcase
                  </span>
               </h2>
               <div className={styles.featuresGrid}>
                  {features.map((feature, index) => (
                     <div key={index} className={styles.featureCard}>
                        <div className={styles.featureIcon}>{feature.icon}</div>
                        <h3 className={styles.featureTitle}>{feature.title}</h3>
                        <p className={styles.featureDescription}>
                           {feature.description}
                        </p>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         <section className={styles.latestProjects}>
            <div className={styles.latestProjectsContainer}>
               <h2 className={styles.sectionTitle}>Latest Projects</h2>
               <p className={styles.sectionSubtitle}>
                  Discover what students are building right now
               </p>

               <div className={styles.techFilters}>
                  {techFilters.map((tech) => (
                     <button key={tech} className={styles.techFilterBtn}>
                        {tech}
                     </button>
                  ))}
               </div>

               <FilterBar onFilterChange={handleFilterChange} />

               <ProjectGrid
                  projects={filteredProjects}
                  loading={loading}
                  error={error}
               />
            </div>
         </section>
      </div>
   );
};

export default Home;
