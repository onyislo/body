import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Trainers from './components/Trainers';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin-login' | 'admin-dashboard'>('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsAuthenticated(!!session);
      if (session) {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('home');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);

    if (window.location.pathname === '/admin' || window.location.pathname === '/admin-login') {
      if (session) {
        setCurrentPage('admin-dashboard');
      } else {
        setCurrentPage('admin-login');
      }
    } else {
      setCurrentPage('home');
    }

    setLoading(false);
  };

  const handleAdminLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('admin-dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
  };

  useEffect(() => {
    const handlePopState = () => {
      if (window.location.pathname === '/admin' || window.location.pathname === '/admin-login') {
        if (isAuthenticated) {
          setCurrentPage('admin-dashboard');
        } else {
          setCurrentPage('admin-login');
        }
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isAuthenticated]);

  useEffect(() => {
    if (currentPage === 'admin-login') {
      window.history.pushState({}, '', '/admin-login');
    } else if (currentPage === 'admin-dashboard') {
      window.history.pushState({}, '', '/admin');
    } else {
      window.history.pushState({}, '', '/');
    }
  }, [currentPage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (currentPage === 'admin-login') {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  if (currentPage === 'admin-dashboard' && isAuthenticated) {
    return <AdminDashboard onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Trainers />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
