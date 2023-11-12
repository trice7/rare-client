/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Comment from '../../components/Comment';
import { deletePost, getSinglePost } from '../../api/postData';

export default function PostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    getSinglePost(postId).then(setPostDetails);
  }, []);

  const deleteThisPost = () => {
    if (window.confirm('Delete Post?')) {
      deletePost(postId).then(() => router.push('/posts'));
    }
  };

  // const count = () => {
  //   setCounter(counter + 1);
  // };

  return (
    <div>
      <div className="mt-5 d-flex flex-wrap">
        <div className="d-flex flex-column">
          <img src={postDetails.image} alt={postDetails.title} style={{ width: '300px' }} />
        </div>
        <div className="text-black ms-5 details">
          <h5>
            {postDetails.title}
          </h5>
          <p>{postDetails.content || ''}</p>
          <p>Category: {postDetails.category?.label} </p>
          <hr />
          <p>Tags: {postDetails.tags?.map((tag) => `${tag.label} `)}</p>
          <hr />
          <Link href={`/posts/edit/${postId}`} passHref>
            <Button variant="info">Edit Post</Button>
          </Link>
          <Button variant="danger" onClick={deleteThisPost} className="m-2">
            Delete Post
          </Button>
        </div>
      </div>
      <div>
        {postDetails.comments?.map((comment) => (
          <Comment key={comment.id} obj={comment} />
        ))}
      </div>
    </div>
  );
}
