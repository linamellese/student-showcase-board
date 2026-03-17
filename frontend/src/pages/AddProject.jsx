import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaGithub, FaLink, FaImage, FaPlus, FaTimes } from "react-icons/fa";
import ImageWithFallback from "../components/ImageWithFallback/ImageWithFallback";
import { projectAPI } from "../services/api";
import styles from "./AddProject.module.css";

const AddProject = () => {
   const navigate = useNavigate();
   const { id } = useParams();
   const isEditMode = !!id;

   console.log('AddProject rendered - URL params:', { id, isEditMode }); // Add this log

   const [formData, setFormData] = useState({
      title: "",
      description: "",
      techStack: [],
      githubUrl: "",
      liveUrl: "",
      image: "",
   });
   const [techInput, setTechInput] = useState("");
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const [fetchLoading, setFetchLoading] = useState(isEditMode);
   const [apiError, setApiError] = useState("");

   useEffect(() => {
      if (isEditMode) {
         console.log('Edit mode detected, fetching project with ID:', id);
         fetchProject();
      } else {
         console.log('Add mode - no ID provided');
      }
   }, [id, isEditMode]);

   const fetchProject = async () => {
      try {
         console.log("Fetching project for edit. ID:", id);
         
         if (!id) {
            console.error('No ID provided for fetch');
            setApiError("No project ID provided");
            setFetchLoading(false);
            return;
         }

         const response = await projectAPI.getProjectById(id);
         console.log("Full API response:", response);
         console.log("Project data received:", response.data);
         
         const project = response.data;
         
         if (!project) {
            console.error('Project data is empty');
            setApiError("Project not found");
            setFetchLoading(false);
            return;
         }

         setFormData({
            title: project.title || "",
            description: project.description || "",
            techStack: Array.isArray(project.techStack) ? project.techStack : [],
            githubUrl: project.githubUrl || "",
            liveUrl: project.liveUrl || "",
            image: project.image || "",
         });
         
         console.log("Form data set successfully");
      } catch (err) {
         console.error("Error fetching project:", err);
         console.error("Error response:", err.response?.data);
         console.error("Error status:", err.response?.status);
         
         if (err.response?.status === 404) {
            setApiError("Project not found. It may have been deleted.");
         } else {
            setApiError(err.response?.data?.message || "Failed to load project for editing");
         }
      } finally {
         setFetchLoading(false);
      }
   };

   const handleChange = (e) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value,
      });
      if (errors[e.target.name]) {
         setErrors({
            ...errors,
            [e.target.name]: "",
         });
      }
   };

   const handleAddTech = () => {
      const trimmedTech = techInput.trim();
      if (trimmedTech) {
         const techExists = formData.techStack.some(
            (t) => t.toLowerCase() === trimmedTech.toLowerCase()
         );

         if (!techExists) {
            setFormData({
               ...formData,
               techStack: [...formData.techStack, trimmedTech],
            });
            setTechInput("");
            if (errors.techStack) {
               setErrors({
                  ...errors,
                  techStack: "",
               });
            }
         }
      }
   };

   const handleRemoveTech = (techToRemove) => {
      setFormData({
         ...formData,
         techStack: formData.techStack.filter((tech) => tech !== techToRemove),
      });
   };

   const handleKeyPress = (e) => {
      if (e.key === "Enter") {
         e.preventDefault();
         handleAddTech();
      }
   };

   const isValidUrl = (url) => {
      if (!url) return true;
      try {
         new URL(url);
         return true;
      } catch {
         return false;
      }
   };

   const validateForm = () => {
      const newErrors = {};

      if (!formData.title?.trim()) {
         newErrors.title = "Project title is required";
      } else if (formData.title.trim().length < 3) {
         newErrors.title = "Title must be at least 3 characters";
      }

      if (!formData.description?.trim()) {
         newErrors.description = "Description is required";
      } else if (formData.description.trim().length < 20) {
         newErrors.description = "Description must be at least 20 characters";
      }

      if (!formData.techStack || formData.techStack.length === 0) {
         newErrors.techStack = "At least one technology is required";
      }

      if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
         newErrors.githubUrl = "Please enter a valid URL";
      }

      if (formData.liveUrl && !isValidUrl(formData.liveUrl)) {
         newErrors.liveUrl = "Please enter a valid URL";
      }

      if (formData.image && !isValidUrl(formData.image)) {
         newErrors.image = "Please enter a valid URL";
      }

      return newErrors;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         window.scrollTo({ top: 0, behavior: "smooth" });
         return;
      }

      setLoading(true);
      setApiError("");

      try {
         const projectData = {
            title: formData.title.trim(),
            description: formData.description.trim(),
            techStack: formData.techStack,
            githubUrl: formData.githubUrl?.trim() || null,
            liveUrl: formData.liveUrl?.trim() || null,
            image: formData.image?.trim() || null,
         };

         console.log("Submitting project data:", projectData);

         if (isEditMode) {
            console.log("Updating project with ID:", id);
            const response = await projectAPI.updateProject(id, projectData);
            console.log("Update response:", response);
            console.log("Project updated successfully");
         } else {
            await projectAPI.createProject(projectData);
         }
         
         navigate("/dashboard");
      } catch (error) {
         console.error("Submission error:", error);
         console.error("Error response:", error.response?.data);
         console.error("Error status:", error.response?.status);
         
         let errorMessage = `Failed to ${isEditMode ? "update" : "create"} project. `;
         
         if (error.response?.data?.message) {
            errorMessage += error.response.data.message;
         } else if (error.response?.data?.error) {
            errorMessage += error.response.data.error;
         } else {
            errorMessage += "Please try again.";
         }
         
         setApiError(errorMessage);
      } finally {
         setLoading(false);
      }
   };

   if (fetchLoading) {
      return (
         <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading project data...</p>
         </div>
      );
   }

   return (
      <div className={styles.container}>
         <div className={styles.content}>
            <div className={styles.formCard}>
               <div className={styles.formHeader}>
                  <h1 className={styles.formTitle}>
                     {isEditMode ? "Edit Project" : "Add New Project"}
                  </h1>
                  <p className={styles.formSubtitle}>
                     {isEditMode
                        ? "Update your project information"
                        : "Share your amazing project with the community"}
                  </p>
               </div>

               <form className={styles.form} onSubmit={handleSubmit}>
                  {apiError && (
                     <div className={styles.errorAlert}>
                        <strong>Error:</strong> {apiError}
                     </div>
                  )}

                  <div className={styles.formGroup}>
                     <label htmlFor="title" className={styles.label}>
                        Project Title *
                     </label>
                     <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className={`${styles.input} ${errors.title ? styles.inputError : ""}`}
                        placeholder="e.g., E-commerce Platform with React"
                     />
                     {errors.title && (
                        <p className={styles.errorText}>{errors.title}</p>
                     )}
                  </div>

                  <div className={styles.formGroup}>
                     <label htmlFor="description" className={styles.label}>
                        Description *
                     </label>
                     <textarea
                        id="description"
                        name="description"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        className={`${styles.textarea} ${errors.description ? styles.inputError : ""}`}
                        placeholder="Describe your project, its features, and what makes it special..."
                     />
                     {errors.description && (
                        <p className={styles.errorText}>{errors.description}</p>
                     )}
                     <p className={styles.charCount}>
                        {formData.description.length}/5000 characters (minimum 20)
                     </p>
                  </div>

                  <div className={styles.formGroup}>
                     <label htmlFor="techStack" className={styles.label}>
                        Technologies Used *
                     </label>
                     <div className={styles.techInputGroup}>
                        <input
                           type="text"
                           id="techStack"
                           value={techInput}
                           onChange={(e) => setTechInput(e.target.value)}
                           onKeyPress={handleKeyPress}
                           className={styles.techInput}
                           placeholder="Type a technology and press Enter or click Add"
                        />
                        <button
                           type="button"
                           onClick={handleAddTech}
                           className={styles.addTechBtn}
                        >
                           <FaPlus />
                        </button>
                     </div>

                     {formData.techStack.length > 0 && (
                        <div className={styles.techTags}>
                           {formData.techStack.map((tech, index) => (
                              <span key={index} className={styles.techTag}>
                                 {tech}
                                 <button
                                    type="button"
                                    onClick={() => handleRemoveTech(tech)}
                                    className={styles.removeTechBtn}
                                 >
                                    <FaTimes size={12} />
                                 </button>
                              </span>
                           ))}
                        </div>
                     )}

                     {errors.techStack && (
                        <p className={styles.errorText}>{errors.techStack}</p>
                     )}
                  </div>

                  <div className={styles.formGroup}>
                     <label htmlFor="githubUrl" className={styles.label}>
                        GitHub Repository URL
                     </label>
                     <div className={styles.inputGroup}>
                        <FaGithub className={styles.inputIcon} />
                        <input
                           type="url"
                           id="githubUrl"
                           name="githubUrl"
                           value={formData.githubUrl}
                           onChange={handleChange}
                           className={`${styles.input} ${styles.inputWithIcon} ${errors.githubUrl ? styles.inputError : ""}`}
                           placeholder="https://github.com/username/project"
                        />
                     </div>
                     {errors.githubUrl && (
                        <p className={styles.errorText}>{errors.githubUrl}</p>
                     )}
                  </div>

                  <div className={styles.formGroup}>
                     <label htmlFor="liveUrl" className={styles.label}>
                        Live Demo URL
                     </label>
                     <div className={styles.inputGroup}>
                        <FaLink className={styles.inputIcon} />
                        <input
                           type="url"
                           id="liveUrl"
                           name="liveUrl"
                           value={formData.liveUrl}
                           onChange={handleChange}
                           className={`${styles.input} ${styles.inputWithIcon} ${errors.liveUrl ? styles.inputError : ""}`}
                           placeholder="https://myproject.com"
                        />
                     </div>
                     {errors.liveUrl && (
                        <p className={styles.errorText}>{errors.liveUrl}</p>
                     )}
                  </div>

                  <div className={styles.formGroup}>
                     <label htmlFor="image" className={styles.label}>
                        Screenshot URL
                     </label>
                     <div className={styles.inputGroup}>
                        <FaImage className={styles.inputIcon} />
                        <input
                           type="url"
                           id="image"
                           name="image"
                           value={formData.image}
                           onChange={handleChange}
                           className={`${styles.input} ${styles.inputWithIcon} ${errors.image ? styles.inputError : ""}`}
                           placeholder="https://example.com/screenshot.jpg"
                        />
                     </div>
                     {errors.image && (
                        <p className={styles.errorText}>{errors.image}</p>
                     )}

                     {formData.image && (
                        <div className={styles.imagePreview}>
                           <p className={styles.previewLabel}>Preview:</p>
                           <ImageWithFallback
                              src={formData.image}
                              alt="Preview"
                              className={styles.previewImage}
                           />
                        </div>
                     )}
                  </div>

                  <div className={styles.formActions}>
                     <button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        className={styles.cancelBtn}
                     >
                        Cancel
                     </button>
                     <button
                        type="submit"
                        disabled={loading}
                        className={`${styles.submitBtn} ${loading ? styles.submitBtnDisabled : ""}`}
                     >
                        {loading
                           ? isEditMode ? "Updating..." : "Creating..."
                           : isEditMode ? "Update Project" : "Create Project"}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddProject;