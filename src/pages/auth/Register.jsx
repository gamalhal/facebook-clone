import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/config'; // 1. استيراد db
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // 2. استيراد setDoc

function Register() {
  const [displayName, setDisplayName] = useState(''); // 3. حالة جديدة لاسم العرض
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // الخطوة أ: إنشاء المستخدم في خدمة المصادقة
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // الخطوة ب: تحديث ملف المستخدم في خدمة المصادقة لإضافة اسم العرض
      await updateProfile(user, {
        displayName: displayName
      });

      // الخطوة ج: إنشاء مستند جديد للمستخدم في مجموعة 'users' في Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        displayName: displayName,
        email: user.email,
      });

      // توجيه المستخدم إلى الصفحة الرئيسية بعد نجاح كل العمليات
      navigate('/');

    } catch (err) {
      setError(err.message);
      console.error("فشل في إنشاء المستخدم:", err);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">إنشاء حساب جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 4. إضافة حقل إدخال لاسم العرض */}
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          placeholder="اسم العرض"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="البريد الإلكتروني"
          required
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="كلمة المرور"
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600">
          تسجيل
        </button>
      </form>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </div>
  );
}

export default Register;
```

---
### ## 16. عرض أسماء المستخدمين في التطبيق

الآن بعد أن قمنا بتخزين الأسماء، نحتاج إلى استخدامها بدلاً من البريد الإلكتروني.

#### **الخطوة 2: تحديث `AddPost.jsx` لحفظ اسم العرض**

عندما يقوم مستخدم بإنشاء منشور، يجب أن نحفظ اسمه مباشرة في مستند المنشور. هذا يسمى "denormalization" وهو فعال جدًا لعمليات القراءة السريعة.

افتح **`src/components/AddPost.jsx`** وقم بتعديل الدالة `handleSubmit`:

```jsx
// ... (imports and component function start)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, 'posts'), {
        text: postText,
        authorId: currentUser.uid,
        // تغيير هنا: استخدم displayName بدلاً من email
        authorDisplayName: currentUser.displayName, 
        createdAt: serverTimestamp(),
        likes: [], // إضافة حقل الإعجابات كمصفوفة فارغة
      });
      setPostText('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
// ... (rest of the component)
```

#### **الخطوة 3: تحديث `Post.jsx` لعرض اسم العرض**

الآن، لنقم بعرض الاسم الجديد في كل منشور.

افتح **`src/components/Post.jsx`** وقم بتغيير السطر الذي يعرض البريد الإلكتروني:

```jsx
// ... (component start)
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-5">
      <div className="flex justify-between items-start">
        <div>
          {/* تغيير هنا: استخدم authorDisplayName بدلاً من authorEmail */}
          <Link to={`/profile/${post.authorId}`} className="font-bold text-gray-800 hover:underline">
            {post.authorDisplayName || post.authorEmail} {/* fallback to email if name doesn't exist */}
          </Link>
          {/* ... */}
        </div>
        {/* ... */}
      </div>
      {/* ... */}
    </div>
  );
// ... (rest of the component)
