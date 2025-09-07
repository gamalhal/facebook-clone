// src/components/CommentSection.jsx
import { useState, useEffect, useContext } from 'react';
import { db } from '../firebase/config'; // تأكد أن المسار صحيح
import { collection, query, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext'; // تأكد أن المسار صحيح

function CommentSection({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const { currentUser } = useContext(AuthContext);

  // جلب التعليقات في الوقت الفعلي
  useEffect(() => {
    if (!postId) return;
    const commentsQuery = query(
      collection(db, 'posts', postId, 'comments'), // المسار إلى المجموعة الفرعية
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(commentsQuery, (snapshot) => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return unsubscribe;
  }, [postId]);

  // إضافة تعليق جديد
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    try {
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        text: newComment,
        authorId: currentUser.uid,
        authorEmail: currentUser.email,
        createdAt: serverTimestamp(),
      });
      setNewComment('');
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      {/* عرض قائمة التعليقات */}
      <div style={{ maxHeight: '150px', overflowY: 'auto', marginBottom: '10px' }}>
        {comments.map(comment => (
          <div key={comment.id} style={{ fontSize: '0.9rem', padding: '5px', borderBottom: '1px solid #eee' }}>
            <strong>{comment.authorEmail}:</strong> {comment.text}
          </div>
        ))}
      </div>
      
      {/* نموذج إضافة تعليق */}
      <form onSubmit={handleAddComment}>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="اكتب تعليقًا..."
          style={{ width: '70%', marginRight: '10px' }}
        />
        <button type="submit">نشر</button>
      </form>
    </div>
  );
}

export default CommentSection;