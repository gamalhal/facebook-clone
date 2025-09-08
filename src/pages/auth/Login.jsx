import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/config'; // <-- تأكد أن هذا المسار صحيح!
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // On successful login, navigate to the home page
      navigate('/');
    } catch (err) {
      setError('Failed to log in. Please check your email and password.');
      console.error("Failed to log in:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-20 h-20 gradient-button rounded-full flex items-center justify-center neon-glow floating-element">
              <span className="text-white font-bold text-3xl">f</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-4xl font-bold text-gradient">
            تسجيل الدخول إلى Facebook
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            أو{' '}
            <a href="/register" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
              إنشاء حساب جديد
            </a>
          </p>
        </div>
        
        <div className="modern-card p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="البريد الإلكتروني"
                  required
                  className="modern-input w-full px-4 py-4 text-lg"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="كلمة المرور"
                  required
                  className="modern-input w-full px-4 py-4 text-lg"
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div>
              <button
                type="submit"
                className="gradient-button w-full py-4 text-lg font-semibold"
              >
                تسجيل الدخول
              </button>
            </div>

            <div className="text-center">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500 text-sm transition-colors">
                نسيت كلمة المرور؟
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;