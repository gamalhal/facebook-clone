import { useState, useContext } from 'react'; // 1. استيراد useState
import { Link } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';
import CommentSection from './CommentSection';

function Post({ post }) {
  const { currentUser } = useContext(AuthContext);
  
  // 2. إضافة متغيرات حالة جديدة لوضع التعديل
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(post.text);

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
    <div className="modern-card mb-6 floating-element">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <Link to={`/profile/${post.authorId}`} className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-button rounded-full flex items-center justify-center neon-glow">
                <span className="text-white font-bold text-lg">
                  {post.authorEmail?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-800 hover:underline text-lg">
                  {post.authorEmail || 'مستخدم'}
                </h3>
                <p className="text-sm text-gray-500">
                  {post.createdAt?.toDate ? new Date(post.createdAt.toDate()).toLocaleString('ar-SA') : 'الآن'}
                </p>
              </div>
            </Link>
          </div>
          
          {/* Options Menu */}
          {currentUser && currentUser.uid === post.authorId && (
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsEditing(true)} 
                className="p-2 rounded-full hover:bg-gray-100"
                title="تعديل"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </button>
              <button 
                onClick={handleDelete} 
                className="p-2 rounded-full hover:bg-gray-100"
                title="حذف"
              >
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        {isEditing ? (
          <div>
            <textarea
              className="modern-input w-full p-4 rounded-xl resize-none"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              rows="4"
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button 
                onClick={() => setIsEditing(false)} 
                className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-xl transition-all duration-300"
              >
                إلغاء
              </button>
              <button 
                onClick={handleSaveEdit} 
                className="gradient-button px-6 py-2"
              >
                حفظ
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 leading-relaxed text-lg">{post.text}</p>
        )}
      </div>
      
      {/* Post Stats */}
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-6">
            <span className="font-medium">{post.likes?.length || 0} إعجاب</span>
            <span className="font-medium">0 تعليق</span>
            <span className="font-medium">0 مشاركة</span>
          </div>
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="px-6 py-3 border-t border-gray-100">
        <div className="flex justify-around">
          <button className="flex items-center space-x-3 px-6 py-3 rounded-xl hover:bg-blue-50 flex-1 justify-center transition-all duration-300 group">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-gray-600 font-medium group-hover:text-blue-600 transition-colors">إعجاب</span>
          </button>
          <button className="flex items-center space-x-3 px-6 py-3 rounded-xl hover:bg-green-50 flex-1 justify-center transition-all duration-300 group">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <span className="text-gray-600 font-medium group-hover:text-green-600 transition-colors">تعليق</span>
          </button>
          <button className="flex items-center space-x-3 px-6 py-3 rounded-xl hover:bg-purple-50 flex-1 justify-center transition-all duration-300 group">
            <svg className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="text-gray-600 font-medium group-hover:text-purple-600 transition-colors">مشاركة</span>
          </button>
        </div>
      </div>
      
      {/* Comments Section */}
      <CommentSection postId={post.id} />
    </div>
  );
}

export default Post;

