import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Editor from './pages/Editor';
import { useEffect } from 'react';
import useUIStore from './store/uiStore';

function App() {
  const { theme } = useUIStore();

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-dark-base text-gray-900 dark:text-gray-100 flex flex-col transition-colors duration-200">
        {/* Navigation Wrapper / Header goes here */}
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          {/* Editor won't use MainLayout for more space */}
          <Route path="/editor/:id?" element={<Editor />} />
          <Route path="/resume/:slug" element={<div>Public Resume View</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
