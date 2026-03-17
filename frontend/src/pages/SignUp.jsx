import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { authAPI } from "../services/api";
import styles from "./Signup.module.css";

const Signup = () => {
   const navigate = useNavigate();
   const [formData, setFormData] = useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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

      if (!formData.name) {
         newErrors.name = "Name is required";
      } else if (formData.name.length < 2) {
         newErrors.name = "Name must be at least 2 characters";
      }

      if (!formData.email) {
         newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Email is invalid";
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
      } else if (formData.password.length < 6) {
         newErrors.password = "Password must be at least 6 characters";
      }

      if (formData.password !== formData.confirmPassword) {
         newErrors.confirmPassword = "Passwords do not match";
      }

      return newErrors;
   };

   const passwordStrength = () => {
      const password = formData.password;
      let strength = 0;

      if (password.length >= 8) strength++;
      if (/[A-Z]/.test(password)) strength++;
      if (/[0-9]/.test(password)) strength++;
      if (/[^A-Za-z0-9]/.test(password)) strength++;

      return strength;
   };

   const getStrengthText = () => {
      const strength = passwordStrength();
      if (strength === 0) return "";
      if (strength <= 1) return "Weak";
      if (strength <= 2) return "Fair";
      if (strength <= 3) return "Good";
      return "Strong";
   };

   const getStrengthColor = () => {
      const strength = passwordStrength();
      if (strength === 0) return styles.strengthNone;
      if (strength <= 1) return styles.strengthWeak;
      if (strength <= 2) return styles.strengthFair;
      if (strength <= 3) return styles.strengthGood;
      return styles.strengthStrong;
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
         const response = await authAPI.signup({
            name: formData.name,
            email: formData.email,
            password: formData.password,
         });

         const { token, user } = response.data;
         localStorage.setItem("token", token);
         localStorage.setItem("user", JSON.stringify(user));
         window.dispatchEvent(new Event("userUpdate")); // Add this line
         navigate("/dashboard");
      } catch (error) {
         setApiError(
            error.response?.data?.message || "Signup failed. Please try again.",
         );
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className={styles.container}>
         <div className={styles.card}>
            <div className={styles.brand}>
               <h2 className={styles.title}>Join ProjectShowcase</h2>
               <p className={styles.subtitle}>
                  Create an account and start showcasing your projects
               </p>
            </div>

            <div className={styles.signupCard}>
               <form className={styles.form} onSubmit={handleSubmit}>
                  {apiError && (
                     <div className={styles.errorAlert}>{apiError}</div>
                  )}

                  <div>
                     <label htmlFor="name" className={styles.label}>
                        Full Name
                     </label>
                     <div className={styles.inputGroup}>
                        <FaUser className={styles.inputIcon} />
                        <input
                           id="name"
                           name="name"
                           type="text"
                           value={formData.name}
                           onChange={handleChange}
                           className={`${styles.input} ${errors.name ? styles.inputError : ""}`}
                           placeholder="John Doe"
                        />
                     </div>
                     {errors.name && (
                        <p className={styles.errorText}>{errors.name}</p>
                     )}
                  </div>

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

                     {formData.password && (
                        <div className={styles.strengthIndicator}>
                           <div className={styles.strengthBar}>
                              <div
                                 className={`${styles.strengthFill} ${getStrengthColor()}`}
                                 style={{
                                    width: `${(passwordStrength() / 4) * 100}%`,
                                 }}
                              ></div>
                           </div>
                           <span className={styles.strengthText}>
                              {getStrengthText()}
                           </span>
                        </div>
                     )}
                  </div>

                  <div>
                     <label htmlFor="confirmPassword" className={styles.label}>
                        Confirm Password
                     </label>
                     <div className={styles.inputGroup}>
                        <FaLock className={styles.inputIcon} />
                        <input
                           id="confirmPassword"
                           name="confirmPassword"
                           type="password"
                           value={formData.confirmPassword}
                           onChange={handleChange}
                           className={`${styles.input} ${errors.confirmPassword ? styles.inputError : ""}`}
                           placeholder="••••••••"
                        />
                     </div>
                     {errors.confirmPassword && (
                        <p className={styles.errorText}>
                           {errors.confirmPassword}
                        </p>
                     )}
                  </div>

                  <div className={styles.terms}>
                     <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        required
                        className={styles.checkbox}
                     />
                     <label htmlFor="terms" className={styles.termsLabel}>
                        I agree to the{" "}
                        <a href="#" className={styles.termsLink}>
                           Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className={styles.termsLink}>
                           Privacy Policy
                        </a>
                     </label>
                  </div>

                  <button
                     type="submit"
                     disabled={loading}
                     className={`${styles.submitBtn} ${loading ? styles.submitBtnDisabled : ""}`}
                  >
                     {loading ? "Creating Account..." : "Create Account"}
                  </button>
               </form>

               <div className={styles.loginLink}>
                  <p className={styles.loginText}>
                     Already have an account?{" "}
                     <Link to="/login" className={styles.loginBtn}>
                        Sign in
                     </Link>
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Signup;
