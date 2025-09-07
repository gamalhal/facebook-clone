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

function App() {
  // الوصول إلى بيانات المستخدم الحالية من المخزن العالمي (Context)
  const { currentUser } = useContext(AuthContext);

  // دالة لمعالجة عملية تسجيل الخروج
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // سيقوم AuthContext بتحديث الواجهة تلقائيًا
    } catch (error) {
      console.error("خطأ في تسجيل الخروج:", error);
    }
  };

  return (
    <BrowserRouter>
      {/* شريط التنقل العلوي */}
      <nav style={{ padding: '10px', marginBottom: '20px', background: '#f0f2f5', borderBottom: '1px solid #ddd' }}>
        <Link to="/" style={{ marginRight: '15px', textDecoration: 'none', color: '#1877f2', fontWeight: 'bold' }}>
          الرئيسية
        </Link>
        
        {/* العرض الشرطي: يعرض واجهة مختلفة بناءً على حالة تسجيل الدخول */}
        {currentUser ? (
          // واجهة المستخدم للمستخدم المسجل دخوله
          <>
            <span style={{ marginRight: '15px' }}>| مرحباً، {currentUser.email}</span>
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>
              تسجيل الخروج
            </button>
          </>
        ) : (
          // واجهة المستخدم للزائر
          <>
            <Link to="/login" style={{ marginRight: '15px', textDecoration: 'none', color: 'black' }}>
              تسجيل الدخول
            </Link>
            <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>
              تسجيل
            </Link>
          </>
        )}
      </nav>

      {/* المحتوى الرئيسي حيث يتم عرض الصفحات */}
      <main style={{ padding: '0 20px' }}>
        <Routes>
          {/* الصفحة الرئيسية محمية، لا يمكن الوصول إليها إلا بعد تسجيل الدخول */}
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          {/* صفحات المصادقة متاحة للجميع */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
