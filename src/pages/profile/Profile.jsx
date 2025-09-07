import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { collection, query, where, orderBy, onSnapshot, doc, getDoc } from 'firebase/firestore';
import Post from '../../components/Post';
import Spinner from '../../components/Spinner';

function Profile() {
  const [userPosts, setUserPosts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      setIsLoading(true);
      // جلب معلومات المستخدم
      const userDocRef = doc(db, 'users', userId);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        setUserInfo(userDocSnap.data());
      }

      // جلب منشورات المستخدم
      const q = query(
        collection(db, 'posts'),
        where('authorId', '==', userId),
        orderBy('createdAt', 'desc')
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const postsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setUserPosts(postsData);
        setIsLoading(false);
      });

      // إلغاء الاشتراك عند مغادرة الصفحة
      return () => unsubscribe();
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5 border-b pb-2">
        صفحة {userInfo?.displayName || 'المستخدم'}
      </h1>

      {userPosts.length > 0 ? (
        // هذا هو السطر الذي تم تصحيحه
        // يجب أن نعيد مكون <Post> لكل عنصر في المصفوفة
        userPosts.map(post => <Post key={post.id} post={post} />)
      ) : (
        <p>لم يقم هذا المستخدم بنشر أي شيء بعد.</p>
      )}
    </div>
  );
}

export default Profile;


