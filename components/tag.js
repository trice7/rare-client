import { Card, ListGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { PencilSquare, XCircle } from 'react-bootstrap-icons';

const Tag = ({ obj }) => {
  console.warn('tag display on tag.js');

  return (
    <div>
      <Card style={{ width: '9rem' }}>
        <ListGroup variant="flush">
          <ListGroup.Item>{obj.label} <PencilSquare type="button" /><XCircle /></ListGroup.Item>
        </ListGroup>
      </Card>
    </div>
  );
};

Tag.propTypes = {
  obj: {
    label: PropTypes.string,
  }.isRequired,
};

export default Tag;
