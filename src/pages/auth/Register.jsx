import { useState } from 'react';
import { auth } from '../../firebase/config';// استيراد خدمة المصادقة من Firebase
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة
    setError(''); // مسح أي أخطاء سابقة

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('تم إنشاء المستخدم بنجاح!', userCredential.user);
      // هنا يمكنك توجيه المستخدم إلى الصفحة الرئيسية
    } catch (err) {
      setError(err.message); // عرض رسالة الخطأ للمستخدم
      console.error("فشل في إنشاء المستخدم:", err.code, err.message);
    }
  };

  return (
    <div>
      <h2>إنشاء حساب جديد</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          required
        />
        <br />
        <button type="submit">تسجيل</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default Register;