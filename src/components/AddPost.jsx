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
    <div className="modern-card mb-6 bounce-in">
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 gradient-button rounded-full flex items-center justify-center neon-glow">
            <span className="text-white font-bold text-lg">
              {currentUser?.displayName?.charAt(0) || currentUser?.email?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-gray-800 text-lg">
              {currentUser?.displayName || currentUser?.email || 'مستخدم'}
            </h3>
            <p className="text-sm text-gray-500">شارك ما تفكر فيه</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <textarea
            className="modern-input w-full p-4 rounded-2xl resize-none"
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder="بماذا تفكر؟"
            rows="4"
            required
          />
          
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-6">
              <button type="button" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-green-50 transition-all duration-300 group floating-element">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 font-medium">صورة</span>
              </button>
              <button type="button" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-all duration-300 group floating-element">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 font-medium">فيديو</span>
              </button>
              <button type="button" className="flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-yellow-50 transition-all duration-300 group floating-element">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center group-hover:bg-yellow-200 transition-colors">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V1a1 1 0 011-1h2a1 1 0 011 1v18a1 1 0 01-1 1H4a1 1 0 01-1-1V1a1 1 0 011-1h2a1 1 0 011 1v3m0 0h8m-8 0v16a1 1 0 001 1h6a1 1 0 001-1V4H7z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600 font-medium">نشاط</span>
              </button>
            </div>
            
            <button 
              type="submit"
              className="gradient-button px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!postText.trim()}
            >
              نشر
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPost;