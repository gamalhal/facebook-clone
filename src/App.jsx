import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react';
import { signOut } from 'firebase/auth';

// --- استيراد المكونات والملفات المحلية ---
import { AuthContext } from './context/AuthContext';
import { auth } from './firebase/config';
import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/profile/Profile';

function App() {
  const { currentUser } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation Bar */}
        <nav className="glass-card sticky top-0 z-50 mx-4 mt-4">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <Link to="/" className="flex items-center space-x-3 floating-element">
                <div className="w-10 h-10 gradient-button rounded-full flex items-center justify-center neon-glow">
                  <span className="text-white font-bold text-xl">f</span>
                </div>
                <span className="text-2xl font-bold text-gradient hidden sm:block">Facebook</span>
              </Link>
              
              {/* Search Bar - Enhanced UX Design */}
              <div className="flex-1 max-w-lg mx-6 hidden md:block">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="البحث في Facebook"
                    aria-label="البحث في Facebook"
                    role="searchbox"
                    className="modern-input w-full rounded-full px-4 py-3 pl-12 pr-4 text-sm"
                    autoComplete="off"
                    spellCheck="false"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <kbd className="hidden sm:inline-flex items-center px-2 py-1 border border-gray-200 rounded text-xs font-mono text-gray-500 bg-white">
                      ⌘K
                    </kbd>
                  </div>
                </div>
              </div>
              
              {/* Mobile Search Button */}
              <div className="md:hidden">
                <button 
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
                  aria-label="فتح البحث"
                  title="البحث"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>

              {/* Navigation Icons */}
              <div className="flex items-center space-x-1">
                {currentUser ? (
                  <>
                    <Link to="/" className="p-3 rounded-xl hover:bg-white/20 transition-all duration-300 floating-element">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                      </svg>
                    </Link>
                    <Link to="/" className="p-3 rounded-xl hover:bg-white/20 transition-all duration-300 floating-element">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </Link>
                    <Link to="/" className="p-3 rounded-xl hover:bg-white/20 transition-all duration-300 floating-element">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </Link>
                    <Link to="/" className="p-3 rounded-xl hover:bg-white/20 transition-all duration-300 floating-element">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828z" />
                      </svg>
                    </Link>
                    
                    {/* Profile Menu */}
                    <div className="relative">
                      <Link 
                        to={`/profile/${currentUser.uid}`}
                        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
                      >
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-sm font-semibold text-gray-600">
                            {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0)}
                          </span>
                        </div>
                      </Link>
                    </div>
                    
                    <button 
                      onClick={handleSignOut}
                      className="p-2 rounded-lg hover:bg-gray-100"
                      title="تسجيل الخروج"
                    >
                      <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="text-gray-700 hover:text-blue-600 px-3 py-1 rounded-lg hover:bg-gray-100"
                    >
                      تسجيل الدخول
                    </Link>
                    <Link 
                      to="/register" 
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-semibold"
                    >
                      إنشاء حساب
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-6 py-8">
        <Routes>
          <Route 
            path="/" 
            element={<ProtectedRoute><Home /></ProtectedRoute>} 
          />
          <Route 
            path="/profile/:userId" 
            element={<ProtectedRoute><Profile /></ProtectedRoute>} 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;