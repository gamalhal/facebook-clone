import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';

// --- استيراد المكونات والملفات المحلية ---
// تأكد من أن هذه المسارات تتطابق مع هيكل مشروعك
import { AuthContext } from './context/AuthContext';
import { auth } from './firebase/config';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';

// ... (other imports)
import Profile from './pages/profile/Profile'; // 1. Import the new Profile page

function App() {
  // ... (logic remains the same)
  return (
    <BrowserRouter>
      {/* ... (nav and main tags remain the same) ... */}
        <Routes>
          <Route 
            path="/" 
            element={<ProtectedRoute><Home /></ProtectedRoute>} 
          />
          {/* 2. Add the new dynamic route */}
          <Route 
            path="/profile/:userId" 
            element={<ProtectedRoute><Profile /></ProtectedRoute>} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      {/* ... (closing tags) ... */}
    </BrowserRouter>
  );
}

export default App;
