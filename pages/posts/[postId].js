/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../api/postData';

export default function PostDetails() {
  const [postDetails, setPostDetails] = useState({});
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    getSinglePost(postId).then(setPostDetails);
  }, []);

  return (
    <div>{postDetails.title}</div>
  );
}
