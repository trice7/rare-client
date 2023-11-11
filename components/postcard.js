import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/card';
import Link from 'next/link';

export default function PostCard({ postObj }) {
  console.warn(postObj);
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
      </Card.Body>
    </Card>
  );
}

PostCard.propTypes = {
  postObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    category: PropTypes.string,
    tags: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};
