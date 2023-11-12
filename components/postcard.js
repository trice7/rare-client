/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/card';
import Link from 'next/link';
import { getSinglePostReaction, createPostReaction } from '../api/postReactionsData';

export default function PostCard({ postObj }) {
  const [happyCount, setHappyCount] = useState(0);
  const [sadCount, setSadCount] = useState(0);
  const [reactions, setReactions] = useState([]);
  const user = localStorage.auth_token;
  // console.warn(postObj);
  console.warn(reactions);
  console.warn(user);

  const getReactions = (post) => {
    console.warn(post?.reactions);
    setReactions(post?.reactions);
  };

  const handleReaction = (reaction, post) => {
    console.warn(post);
    getReactions(post);
    reactions.some((reac) => {
      console.warn(reac);
      if (reac.user_id == user) {
        console.warn(user, reac.user_id);
        console.warn('User has reacted to this post');
        return true;
      }
      let happy = 0;
      let sad = 0;
      if (reaction === 'happy') {
        happy += 1;
        const payload = { user_id: user, post_id: postObj.id, reaction_id: 1 };
        createPostReaction(payload);
        console.warn(payload);
      } else if (reaction === 'sad') {
        sad += 1;
        const payload = { user_id: user, post_id: postObj.id, reaction_id: 2 };
        console.warn(payload);
        createPostReaction(payload);
      }
      setSadCount(sadCount + sad);
      setHappyCount(happyCount + happy);
    });
    // let happy = 0;
    // let sad = 0;
    // if (reaction === 'happy') {
    //   happy += 1;
    // } else if (reaction === 'sad') {
    //   sad += 1;
    // }
    // setSadCount(sadCount + sad);
    // setHappyCount(happyCount + happy);
  };

  const reactionCount = () => {
    let happy = 0;
    let sad = 0;
    postObj.reactions.forEach((res) => {
      if (res.label === 'happy') {
        happy += 1;
      } else if (res.label === 'sad') {
        sad += 1;
      }
    });
    setHappyCount(happy);
    setSadCount(sad);
  };

  useEffect(() => {
    reactionCount();
    getReactions();
  }, []);

  // console.warn(happyCount, sadCount);

  return (
    <Card style={{ width: '17rem', marginRight: '20px', height: '20rem' }} className="postCard">
      <Card.Title>{postObj.title}</Card.Title>
      <Card.Img variant="top" alt={postObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <p>{postObj.content}</p>
        <p>Category: {postObj.category?.label}</p>
        <p>Tags: {postObj.tags.map((tag) => `${tag.label} `)}</p>
        <Link href={`/posts/${postObj.id}`} passHref>
          <Button variant="primary" className="viewBtn">View</Button>
        </Link>
        <p>Reactions:
          <Button onClick={() => { handleReaction('happy', postObj); }}>{happyCount} happy</Button>
          <Button onClick={() => { handleReaction('sad', postObj); }}>{sadCount} sad</Button>

        </p>
      </Card.Body>
    </Card>
  );
}

// {postObj.reactions.map((reac) => (<Button onClick={handleReaction}>{ reac.label }</Button>))}

/* <div className="d-flex flex-wrap">
            {posts.map((post) => (
              <PostCard key={post.id} postObj={post} />
            ))}
          </div> */

PostCard.propTypes = {
  postObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.string,
    reactions: PropTypes.string,
  }).isRequired,
};
