// src/components/AddPost.jsx
import { useState, useContext } from 'react';
import { db } from '../firebase/config'; // تأكد أن المسار صحيح
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext'; // تأكد أن المسار صحيح

function AddPost() {
  const [postText, setPostText] = useState('');
  const { currentUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!postText.trim() || !currentUser) return; // لا تسمح بمنشور فارغ

    try {
      // 'posts' هو اسم المجموعة في Firestore
      await addDoc(collection(db, 'posts'), {
        text: postText,
        authorId: currentUser.uid,
        authorEmail: currentUser.email,
        createdAt: serverTimestamp(), // استخدم وقت الخادم لضمان الدقة
      });
      setPostText(''); // أفرغ حقل الإدخال بعد الإرسال
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={postText}
        onChange={(e) => setPostText(e.target.value)}
        placeholder="بماذا تفكر؟"
        rows="3"
        required
      ></textarea>
      <button type="submit">نشر</button>
    </form>
  );
}

export default AddPost;