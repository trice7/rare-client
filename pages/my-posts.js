/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { getUsersPosts } from '../api/postData';
import PostCard from '../components/postcard';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const user = localStorage.auth_token;

  const getAllUsersPosts = () => {
    getUsersPosts(user).then(setPosts);
  };

  useEffect(() => {
    getAllUsersPosts();
  }, []);

  console.warn(posts);

  return (
    <div>
      {
        posts.length === 0 ? (
          <>
            <h2>No posts to display</h2>
          </>
        ) : (
          <div className="d-flex flex-wrap">
            {posts.map((post) => (
              <PostCard key={post.id} postObj={post} />
            ))}
          </div>
        )
      }
    </div>
  );
}
