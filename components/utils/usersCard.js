import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function UserCard({ userObj }) {
  return (
    <Card
      style={{
        width: '14rem', marginRight: '15px', marginLeft: '15', marginTop: '15px', height: '15rem',
      }}
      className="userCard"
    >
      <Card.Title>{userObj.username}</Card.Title>
      <Card.Body>
        <p>{userObj.first_name}</p>
        <p>{userObj.last_name}</p>
        <p>{userObj.bio}</p>
        <p>{userObj.email}</p>
      </Card.Body>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    profile_image_url: PropTypes.string,
    username: PropTypes.string,
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    bio: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
