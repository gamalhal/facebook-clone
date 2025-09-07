// src/pages/home/Home.jsx
import { useState, useEffect } from 'react';
import AddPost from '../../components/AddPost'; // تأكد أن المسار صحيح
import { db } from '../../firebase/config'; // تأكد أن المسار صحيح
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // أنشئ استعلامًا لجلب المنشورات وترتيبها حسب تاريخ الإنشاء (الأحدث أولاً)
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));

    // onSnapshot يستمع لأي تغييرات في الوقت الفعلي
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsData);
    });

    // إلغاء الاستماع عند مغادرة الصفحة لمنع تسرب الذاكرة
    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>الصفحة الرئيسية</h1>
      <AddPost />
      <hr />
      <div>
        {posts.map((post) => (
          <div key={post.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <p><strong>{post.authorEmail}</strong></p>
            <p>{post.text}</p>
            <small>{new Date(post.createdAt?.toDate()).toLocaleString()}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;