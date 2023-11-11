/* eslint-disable camelcase */
/* eslint-disable @next/next/no-img-element */
// UserProfile.js
import React from 'react';
import PropTypes from 'prop-types';

const UserProfile = ({
  first_name, last_name, email, bio, username, profile_image_url, created_on, active,
}) => (
  <div className="user-profile">
    <img className="profile-image" src={profile_image_url} alt="Profile" />
    <div className="user-details">
      <h2>{username}</h2>
      <p>
        <strong>Name:</strong> {first_name} {last_name}
      </p>
      <p> <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Bio:</strong> {bio || 'No bio available'}
      </p>
      <p>
        <strong>Joined on:</strong> {new Date(created_on).toLocaleDateString()}
      </p>
      <p>
        <strong>Status:</strong> {active ? 'Active' : 'Inactive'}
      </p>
    </div>
  </div>
);

UserProfile.propTypes = {
  first_name: PropTypes.string.isRequired,
  last_name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profile_image_url: PropTypes.string.isRequired,
  created_on: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
};

export default UserProfile;
