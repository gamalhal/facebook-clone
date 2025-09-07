import { useState, useContext } from 'react'; // 1. استيراد useState
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import CommentSection from './CommentSection';

function Post({ post }) {
  const { currentUser } = useContext(AuthContext);
  
  // 2. إضافة متغيرات حالة جديدة لوضع التعديل
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);

  const isLiked = post.likes?.includes(currentUser?.uid);

  const handleLike = async () => { /* ... (لا تغيير هنا) ... */ };
  const handleDelete = async () => { /* ... (لا تغيير هنا) ... */ };

  // 3. إضافة دالة لحفظ التعديلات
  const handleSaveEdit = async () => {
    if (!editedText.trim()) return; // لا تسمح بحفظ نص فارغ

    const postRef = doc(db, 'posts', post.id);
    try {
      await updateDoc(postRef, {
        text: editedText
      });
      setIsEditing(false); // الخروج من وضع التعديل بعد الحفظ
    } catch (error) {
      console.error("خطأ في تحديث المنشور:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-5">
      {/* Post Header */}
      <div className="flex justify-between items-start">
        <div>
          <Link to={`/profile/${post.authorId}`} className="font-bold text-gray-800 hover:underline">
            {post.authorEmail}
          </Link>
          <p className="text-xs text-gray-500">{new Date(post.createdAt?.toDate()).toLocaleString()}</p>
        </div>
        
        {/* 4. عرض أزرار التعديل والحذف لصاحب المنشور فقط */}
        {currentUser && currentUser.uid === post.authorId && (
          <div className="flex items-center space-x-2">
            <button onClick={() => setIsEditing(true)} className="text-sm text-blue-500 hover:text-blue-700">تعديل</button>
            <button onClick={handleDelete} className="text-red-500 hover:text-red-700 font-bold">&times;</button>
          </div>
        )}
      </div>

      {/* 5. عرض شرطي: إما نص المنشور أو نموذج التعديل */}
      <div className="my-3">
        {isEditing ? (
          <div>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows="4"
            />
            <div className="flex justify-end space-x-2 mt-2">
              <button onClick={() => setIsEditing(false)} className="text-sm text-gray-600">إلغاء</button>
              <button onClick={handleSaveEdit} className="text-sm bg-blue-500 text-white font-semibold py-1 px-3 rounded-lg hover:bg-blue-600">حفظ</button>
            </div>
          </div>
        ) : (
          <p className="text-gray-700">{post.text}</p>
        )}
      </div>
      
      {/* Likes and Comments Section */}
      <p className="text-sm text-gray-500 pb-2 border-b">{post.likes?.length || 0} إعجاب</p>
      <div className="flex justify-around py-1 border-b">
        {/* ... (أزرار الإعجاب والتعليق تبقى كما هي) ... */}
      </div>
      <CommentSection postId={post.id} />
    </div>
  );
}

export default Post;

