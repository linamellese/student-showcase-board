import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
   FaUsers,
   FaProjectDiagram,
   FaTrash,
   FaEdit,
   FaEye,
   FaBan,
   FaCheck,
   FaChartBar,
   FaCog,
   FaExclamationTriangle,
   FaUserShield,
   FaUserGraduate,
} from "react-icons/fa";
import { MdDashboard, MdSecurity } from "react-icons/md";
import { projectAPI } from "../services/api";
import styles from "./AdminDashboard.module.css";

const AdminDashboard = () => {
   const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const [stats, setStats] = useState({
      totalUsers: 0,
      totalProjects: 0,
      totalTechs: 0,
      totalLikes: 0,
      activeUsers: 0,
      pendingProjects: 0,
   });
   const [recentProjects, setRecentProjects] = useState([]);
   const [recentUsers, setRecentUsers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [activeTab, setActiveTab] = useState("overview");
   const [selectedUser, setSelectedUser] = useState(null);
   const [showUserModal, setShowUserModal] = useState(false);

   useEffect(() => {
      // Check if user is admin
      const userData = localStorage.getItem("user");
      if (userData) {
         const parsedUser = JSON.parse(userData);
         if (parsedUser.role !== "admin") {
            navigate("/dashboard"); // Redirect regular users
         }
         setUser(parsedUser);
      }
      fetchAdminData();
   }, []);

   const fetchAdminData = async () => {
      try {
         setLoading(true);
         // Fetch all projects
         const projectsRes = await projectAPI.getAllProjects();
         const projects = projectsRes.data.projects || projectsRes.data;

         // Calculate stats
         const totalProjects = projects.length;
         const totalLikes = projects.reduce(
            (acc, p) => acc + (p.likes || 0),
            0,
         );
         const uniqueTechs = new Set(projects.flatMap((p) => p.techStack || []))
            .size;

         setStats({
            totalUsers: 25, // This should come from a users API
            totalProjects,
            totalTechs: uniqueTechs,
            totalLikes,
            activeUsers: 20,
            pendingProjects: 3,
         });

         setRecentProjects(projects.slice(0, 5));

         // Mock users data - replace with real API call
         setRecentUsers([
            {
               id: 1,
               name: "John Doe",
               email: "john@example.com",
               role: "user",
               projects: 3,
               joined: "2024-01-15",
            },
            {
               id: 2,
               name: "Jane Smith",
               email: "jane@example.com",
               role: "user",
               projects: 5,
               joined: "2024-02-20",
            },
            {
               id: 3,
               name: "Mike Johnson",
               email: "mike@example.com",
               role: "admin",
               projects: 2,
               joined: "2024-01-10",
            },
            {
               id: 4,
               name: "Sarah Wilson",
               email: "sarah@example.com",
               role: "user",
               projects: 1,
               joined: "2024-03-01",
            },
            {
               id: 5,
               name: "Alex Brown",
               email: "alex@example.com",
               role: "user",
               projects: 4,
               joined: "2024-02-05",
            },
         ]);
      } catch (error) {
         console.error("Error fetching admin data:", error);
      } finally {
         setLoading(false);
      }
   };

   const handleDeleteProject = (projectId) => {
      if (window.confirm("Are you sure you want to delete this project?")) {
         // Call API to delete project
         console.log("Deleting project:", projectId);
      }
   };

   const handleToggleUserStatus = (userId) => {
      console.log("Toggling user status:", userId);
   };

   const handleChangeUserRole = (userId, newRole) => {
      console.log("Changing user role:", userId, "to", newRole);
   };

   const StatCard = ({ icon, title, value, color }) => (
      <div className={styles.statCard} style={{ borderLeftColor: color }}>
         <div className={styles.statIcon} style={{ color }}>
            {icon}
         </div>
         <div className={styles.statContent}>
            <h3>{title}</h3>
            <p className={styles.statValue}>{value}</p>
         </div>
      </div>
   );

   if (loading) {
      return (
         <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
            <p>Loading admin dashboard...</p>
         </div>
      );
   }

   return (
      <div className={styles.container}>
         {/* Header */}
         <div className={styles.header}>
            <div>
               <h1 className={styles.headerTitle}>
                  <FaUserShield className={styles.headerIcon} />
                  Admin Dashboard
               </h1>
               <p className={styles.headerSubtitle}>
                  Welcome back, {user?.name}! Manage all projects and users from
                  here.
               </p>
            </div>
            <div className={styles.headerBadge}>
               <MdSecurity /> Super Admin
            </div>
         </div>

         {/* Stats Grid */}
         <div className={styles.statsGrid}>
            <StatCard
               icon={<FaUsers />}
               title="Total Users"
               value={stats.totalUsers}
               color="#4299e1"
            />
            <StatCard
               icon={<FaProjectDiagram />}
               title="Total Projects"
               value={stats.totalProjects}
               color="#48bb78"
            />
            <StatCard
               icon={<FaChartBar />}
               title="Technologies"
               value={stats.totalTechs}
               color="#ed8936"
            />
            <StatCard
               icon={<FaEye />}
               title="Total Likes"
               value={stats.totalLikes}
               color="#9f7aea"
            />
            <StatCard
               icon={<FaUserGraduate />}
               title="Active Users"
               value={stats.activeUsers}
               color="#f56565"
            />
            <StatCard
               icon={<FaExclamationTriangle />}
               title="Pending"
               value={stats.pendingProjects}
               color="#ecc94b"
            />
         </div>

         {/* Tabs */}
         <div className={styles.tabs}>
            <button
               className={`${styles.tab} ${activeTab === "overview" ? styles.activeTab : ""}`}
               onClick={() => setActiveTab("overview")}
            >
               <FaChartBar /> Overview
            </button>
            <button
               className={`${styles.tab} ${activeTab === "projects" ? styles.activeTab : ""}`}
               onClick={() => setActiveTab("projects")}
            >
               <FaProjectDiagram /> All Projects
            </button>
            <button
               className={`${styles.tab} ${activeTab === "users" ? styles.activeTab : ""}`}
               onClick={() => setActiveTab("users")}
            >
               <FaUsers /> Users
            </button>
            <button
               className={`${styles.tab} ${activeTab === "settings" ? styles.activeTab : ""}`}
               onClick={() => setActiveTab("settings")}
            >
               <FaCog /> Settings
            </button>
         </div>

         {/* Tab Content */}
         <div className={styles.tabContent}>
            {activeTab === "overview" && (
               <div className={styles.overview}>
                  {/* Recent Projects */}
                  <div className={styles.section}>
                     <h2 className={styles.sectionTitle}>
                        <FaProjectDiagram /> Recent Projects
                     </h2>
                     <div className={styles.tableContainer}>
                        <table className={styles.table}>
                           <thead>
                              <tr>
                                 <th>Project</th>
                                 <th>Author</th>
                                 <th>Tech Stack</th>
                                 <th>Likes</th>
                                 <th>Status</th>
                                 <th>Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {recentProjects.map((project) => (
                                 <tr key={project.id}>
                                    <td>
                                       <div className={styles.projectInfo}>
                                          <img
                                             src={
                                                project.image ||
                                                "https://picsum.photos/40/40"
                                             }
                                             alt=""
                                          />
                                          <span>{project.title}</span>
                                       </div>
                                    </td>
                                    <td>
                                       {project.author?.name || "Anonymous"}
                                    </td>
                                    <td>
                                       <div className={styles.techStack}>
                                          {project.techStack
                                             ?.slice(0, 2)
                                             .map((tech, i) => (
                                                <span
                                                   key={i}
                                                   className={styles.miniBadge}
                                                >
                                                   {tech}
                                                </span>
                                             ))}
                                       </div>
                                    </td>
                                    <td>{project.likes || 0}</td>
                                    <td>
                                       <span
                                          className={`${styles.status} ${styles.active}`}
                                       >
                                          Active
                                       </span>
                                    </td>
                                    <td>
                                       <div className={styles.actionButtons}>
                                          <button
                                             className={styles.viewBtn}
                                             title="View"
                                          >
                                             <FaEye />
                                          </button>
                                          <button
                                             className={styles.editBtn}
                                             title="Edit"
                                          >
                                             <FaEdit />
                                          </button>
                                          <button
                                             className={styles.deleteBtn}
                                             title="Delete"
                                             onClick={() =>
                                                handleDeleteProject(project.id)
                                             }
                                          >
                                             <FaTrash />
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>

                  {/* Recent Users */}
                  <div className={styles.section}>
                     <h2 className={styles.sectionTitle}>
                        <FaUsers /> Recent Users
                     </h2>
                     <div className={styles.tableContainer}>
                        <table className={styles.table}>
                           <thead>
                              <tr>
                                 <th>User</th>
                                 <th>Email</th>
                                 <th>Role</th>
                                 <th>Projects</th>
                                 <th>Joined</th>
                                 <th>Actions</th>
                              </tr>
                           </thead>
                           <tbody>
                              {recentUsers.map((user) => (
                                 <tr key={user.id}>
                                    <td>
                                       <div className={styles.userInfo}>
                                          <div className={styles.userAvatar}>
                                             {user.name.charAt(0)}
                                          </div>
                                          {user.name}
                                       </div>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>
                                       <span
                                          className={`${styles.role} ${styles[user.role]}`}
                                       >
                                          {user.role}
                                       </span>
                                    </td>
                                    <td>{user.projects}</td>
                                    <td>{user.joined}</td>
                                    <td>
                                       <div className={styles.actionButtons}>
                                          <button
                                             className={styles.editBtn}
                                             onClick={() => {
                                                setSelectedUser(user);
                                                setShowUserModal(true);
                                             }}
                                          >
                                             <FaCog />
                                          </button>
                                          <button
                                             className={
                                                user.role === "admin"
                                                   ? styles.warningBtn
                                                   : styles.successBtn
                                             }
                                             onClick={() =>
                                                handleToggleUserStatus(user.id)
                                             }
                                          >
                                             {user.role === "admin" ? (
                                                <FaBan />
                                             ) : (
                                                <FaCheck />
                                             )}
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            )}

            {activeTab === "projects" && (
               <div className={styles.fullSection}>
                  <h2 className={styles.sectionTitle}>All Projects</h2>
                  {/* Full projects table with filters */}
               </div>
            )}

            {activeTab === "users" && (
               <div className={styles.fullSection}>
                  <h2 className={styles.sectionTitle}>All Users</h2>
                  {/* Full users table with management options */}
               </div>
            )}

            {activeTab === "settings" && (
               <div className={styles.settings}>
                  <h2 className={styles.sectionTitle}>Admin Settings</h2>
                  {/* Admin settings panel */}
               </div>
            )}
         </div>

         {/* User Management Modal */}
         {showUserModal && selectedUser && (
            <div
               className={styles.modalOverlay}
               onClick={() => setShowUserModal(false)}
            >
               <div
                  className={styles.modal}
                  onClick={(e) => e.stopPropagation()}
               >
                  <h3 className={styles.modalTitle}>Manage User</h3>
                  <div className={styles.modalContent}>
                     <p>
                        <strong>Name:</strong> {selectedUser.name}
                     </p>
                     <p>
                        <strong>Email:</strong> {selectedUser.email}
                     </p>
                     <p>
                        <strong>Current Role:</strong> {selectedUser.role}
                     </p>

                     <div className={styles.modalActions}>
                        <button
                           className={styles.successBtn}
                           onClick={() =>
                              handleChangeUserRole(selectedUser.id, "admin")
                           }
                        >
                           Make Admin
                        </button>
                        <button
                           className={styles.warningBtn}
                           onClick={() =>
                              handleChangeUserRole(selectedUser.id, "user")
                           }
                        >
                           Remove Admin
                        </button>
                        <button
                           className={styles.deleteBtn}
                           onClick={() =>
                              handleToggleUserStatus(selectedUser.id)
                           }
                        >
                           Suspend User
                        </button>
                     </div>
                  </div>
                  <button
                     className={styles.closeBtn}
                     onClick={() => setShowUserModal(false)}
                  >
                     Close
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default AdminDashboard;
