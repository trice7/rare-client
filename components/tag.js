import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Tag = ({ obj }) => {
  console.warn('tag display on tag.js');

  return (
    <div>
      <Card.Body>{obj.label}</Card.Body>
    </div>
  );
};

Tag.propTypes = {
  obj: {
    label: PropTypes.string,
  }.isRequired,
};

export default Tag;
