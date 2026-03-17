import ProjectCard from "../ProjectCard/ProjectCard";
import styles from "./ProjectGrid.module.css";

const ProjectGrid = ({ projects, loading, error }) => {
   if (loading) {
      return (
         <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
         </div>
      );
   }

   if (error) {
      return (
         <div className={styles.errorContainer}>
            <p className={styles.errorMessage}>{error}</p>
         </div>
      );
   }

   if (!projects || projects.length === 0) {
      return (
         <div className={styles.emptyContainer}>
            <h3 className={styles.emptyTitle}>No Projects Found</h3>
            <p className={styles.emptyText}>
               Be the first to share your project!
            </p>
         </div>
      );
   }

   return (
      <div className={styles.grid}>
         {projects.map((project) => (
            <ProjectCard
               key={project.id || project._id || project.uuid}
               project={project}
            />
         ))}
      </div>
   );
};

export default ProjectGrid;
