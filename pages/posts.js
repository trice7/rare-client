import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { getPosts } from '../api/postData';
import PostCard from '../components/postcard';

export default function Posts() {
  const [posts, setPosts] = useState([]);

  const getAllPosts = () => {
    getPosts().then(setPosts);
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  console.warn(posts);

  return (
    <div id="posts">
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
      <Link href="/posts/new" passHref>
        <Button variant="dark">Add A Post</Button>
      </Link>
    </div>
  );
}
