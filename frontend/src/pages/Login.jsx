import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { authAPI } from "../services/api";
import styles from "./Login.module.css";

const Login = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState({});
   const [loading, setLoading] = useState(false);
   const [apiError, setApiError] = useState("");

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

   const validateForm = () => {
      const newErrors = {};

      if (!formData.email) {
         newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Email is invalid";
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
      }

      return newErrors;
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = validateForm();
      if (Object.keys(newErrors).length > 0) {
         setErrors(newErrors);
         return;
      }

      setLoading(true);
      setApiError("");

      try {
         const response = await authAPI.login(formData);
         const { token, user } = response.data;

         localStorage.setItem("token", token);
         localStorage.setItem("user", JSON.stringify(user));
         window.dispatchEvent(new Event("userUpdate")); // Add this line
         navigate("/dashboard");
      } catch (error) {
         setApiError(
            error.response?.data?.message || "Login failed. Please try again.",
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.card}>
            <div className={styles.brand}>
               <h2 className={styles.title}>Welcome Back</h2>
               <p className={styles.subtitle}>
                  Sign in to continue to ProjectShowcase
               </p>
            </div>

            <div className={styles.loginCard}>
               <form className={styles.form} onSubmit={handleSubmit}>
                  {apiError && (
                     <div className={styles.errorAlert}>{apiError}</div>
                  )}

                  <div>
                     <label htmlFor="email" className={styles.label}>
                        Email Address
                     </label>
                     <div className={styles.inputGroup}>
                        <FaEnvelope className={styles.inputIcon} />
                        <input
                           id="email"
                           name="email"
                           type="email"
                           value={formData.email}
                           onChange={handleChange}
                           className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                           placeholder="you@example.com"
                        />
                     </div>
                     {errors.email && (
                        <p className={styles.errorText}>{errors.email}</p>
                     )}
                  </div>

                  <div>
                     <label htmlFor="password" className={styles.label}>
                        Password
                     </label>
                     <div className={styles.inputGroup}>
                        <FaLock className={styles.inputIcon} />
                        <input
                           id="password"
                           name="password"
                           type="password"
                           value={formData.password}
                           onChange={handleChange}
                           className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                           placeholder="••••••••"
                        />
                     </div>
                     {errors.password && (
                        <p className={styles.errorText}>{errors.password}</p>
                     )}
                  </div>

                  <div className={styles.options}>
                     <div className={styles.rememberMe}>
                        <input
                           id="remember-me"
                           name="remember-me"
                           type="checkbox"
                           className={styles.checkbox}
                        />
                        <label
                           htmlFor="remember-me"
                           className={styles.checkboxLabel}
                        >
                           Remember me
                        </label>
                     </div>

                     <div>
                        <a href="#" className={styles.forgotLink}>
                           Forgot your password?
                        </a>
                     </div>
                  </div>

                  <button
                     type="submit"
                     disabled={loading}
                     className={`${styles.submitBtn} ${loading ? styles.submitBtnDisabled : ""}`}
                  >
                     {loading ? "Signing in..." : "Sign In"}
                  </button>
               </form>

               <div className={styles.divider}>
                  <div className={styles.dividerLine}>
                     <div className={styles.dividerBorder}></div>
                  </div>
                  <div className={styles.dividerText}>
                     <span>New to ProjectShowcase?</span>
                  </div>
               </div>

               <div className={styles.signupLink}>
                  <Link to="/signup" className={styles.signupBtn}>
                     Create an account
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Login;
