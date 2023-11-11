import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSinglePost } from '../../../api/postData';
import PostForm from '../../../components/forms/PostForm';

export default function EditAuthor() {
  const [editItem, setEditItem] = useState({});
  const router = useRouter();
  // TODO: grab the firebasekey
  const { postId } = router.query;

  // TODO: make a call to the API to get the book data
  useEffect(() => {
    getSinglePost(postId).then(setEditItem);
  }, [postId]);

  // TODO: pass object to form
  return (<PostForm obj={editItem} />);
}