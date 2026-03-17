import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import AddProject from './pages/AddProject';
import ProjectDetail from './pages/ProjectDetail';

import Profile from './pages/Profile';
import Projects from './pages/Projects';
import About from './pages/About'; // Add this
import Contact from './pages/Contact'; // Add this
import Resources from './pages/Resources'; // Add this
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/resources" element={<Resources />} />
          
          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          
          <Route path="/add-project" element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          } />
          
          <Route path="/edit-project/:id" element={
            <ProtectedRoute>
              <AddProject />
            </ProtectedRoute>
          } />
          
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          
          {/* 404 Route */}
          <Route path="*" element={
            <div style={{ 
              textAlign: 'center', 
              padding: '4rem', 
              minHeight: '60vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>404</h1>
              <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
                Page not found
              </p>
              <a href="/" style={{
                padding: '0.75rem 2rem',
                backgroundColor: '#2563eb',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500'
              }}>
                Go Home
              </a>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;