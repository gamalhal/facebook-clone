import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useContext } from 'react'; // 1. استيراد useContext
import { AuthContext } from './context/AuthContext'; // 2. استيراد Context الخاص بنا
import { signOut } from 'firebase/auth'; // 3. استيراد دالة تسجيل الخروج
import { auth } from './firebase/config'; // 4. استيراد خدمة المصادقة

import Home from './pages/home/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

function App() {
  const { currentUser } = useContext(AuthContext); // 5. الوصول لبيانات المستخدم

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // User is signed out.
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <BrowserRouter>
      <nav>
        <Link to="/">الرئيسية</Link>
        {currentUser ? (
          <>
            <span> | أهلاً، {currentUser.email}</span>
            <button onClick={handleLogout} style={{marginLeft: '10px'}}>تسجيل الخروج</button>
          </>
        ) : (
          <>
            | <Link to="/login">تسجيل الدخول</Link>
            | <Link to="/register">تسجيل</Link>
          </>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;