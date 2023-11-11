import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Card, Button } from 'react-bootstrap';

export default function CategoryCard({ categoryObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <ListGroup varient="flush">
        <ListGroup.Item>{categoryObj.label}</ListGroup.Item>
      </ListGroup>
      <Button varient="warning"> Edit </Button>
      <Button varient="danger"> Delete </Button>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};
