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
    return ;
  }

  return (
    <>
      Home
      
      
        {posts.map((post) => (
          
        ))}
      
    
  );
}

export default Home;