import { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

import AddPost from '../../components/AddPost';
import Post from '../../components/Post';
import Spinner from '../../components/Spinner'; // 1. Import the Spinner

function Home() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // 2. Add loading state

  useEffect(() => {
    const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const postsData = [];
      querySnapshot.forEach((doc) => {
        postsData.push({ ...doc.data(), id: doc.id });
      });
      setPosts(postsData);
      setIsLoading(false); // 3. Turn off loading once data arrives
    });
    return () => unsubscribe();
  }, []);

  // 4. Show the spinner while loading
  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="flex gap-8">
      {/* Left Sidebar */}
      <div className="hidden lg:block w-72 space-y-6">
        <div className="modern-card bounce-in">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 gradient-button rounded-full flex items-center justify-center neon-glow">
              <span className="text-white font-bold text-lg">U</span>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 text-lg">اسم المستخدم</h3>
              <p className="text-sm text-gray-500">عضو نشط</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-blue-50 cursor-pointer transition-all duration-300 group floating-element">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
                </svg>
              </div>
              <span className="text-gray-700 font-medium">الصفحة الرئيسية</span>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-green-50 cursor-pointer transition-all duration-300 group floating-element">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-200 transition-colors">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">الأصدقاء</span>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-purple-50 cursor-pointer transition-all duration-300 group floating-element">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">المجموعات</span>
            </div>
            <div className="flex items-center space-x-4 p-3 rounded-xl hover:bg-red-50 cursor-pointer transition-all duration-300 group floating-element">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center group-hover:bg-red-200 transition-colors">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-gray-700 font-medium">الفيديو</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">الاختصارات</h3>
          <div className="space-y-2">
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold text-sm">ت</span>
              </div>
              <span className="text-gray-700">تطوير الويب</span>
            </div>
            <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">ب</span>
              </div>
              <span className="text-gray-700">برمجة</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-2xl">
        {/* Enhanced Search Bar for Main Content */}
        <div className="mb-8 slide-up">
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="البحث عن المنشورات والأصدقاء..."
              aria-label="البحث عن المنشورات والأصدقاء"
              role="searchbox"
              className="modern-input w-full rounded-2xl px-4 py-4 pl-12 pr-4 text-sm"
              autoComplete="off"
              spellCheck="false"
            />
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-1">
                <kbd className="inline-flex items-center px-2 py-1 border border-white/30 rounded-lg text-xs font-mono text-gray-600 bg-white/50 backdrop-blur-sm">
                  ⌘
                </kbd>
                <kbd className="inline-flex items-center px-2 py-1 border border-white/30 rounded-lg text-xs font-mono text-gray-600 bg-white/50 backdrop-blur-sm">
                  F
                </kbd>
              </div>
            </div>
          </div>
        </div>

        <AddPost />
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>

      {/* Right Sidebar */}
      <div className="hidden lg:block w-80 space-y-6">
        {/* Enhanced Search in Sidebar */}
        <div className="modern-card fade-in">
          <h3 className="font-bold text-gray-800 mb-4 text-lg">البحث السريع</h3>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-4 h-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="البحث عن الأصدقاء..."
              aria-label="البحث عن الأصدقاء"
              role="searchbox"
              className="modern-input w-full rounded-xl px-3 py-3 pl-10 pr-3 text-sm"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
        </div>

        <div className="modern-card fade-in">
          <h3 className="font-semibold text-gray-800 mb-3">جهات الاتصال</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">أ</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-gray-700">أحمد محمد</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">س</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-gray-700">سارة أحمد</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">م</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-yellow-500 border-2 border-white rounded-full"></div>
              </div>
              <span className="text-gray-700">محمد علي</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm p-4">
          <h3 className="font-semibold text-gray-800 mb-3">المحادثات الجماعية</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">ع</span>
              </div>
              <span className="text-gray-700">عائلة</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-sm">أ</span>
              </div>
              <span className="text-gray-700">أصدقاء العمل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;