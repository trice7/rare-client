import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup, Card, Button } from 'react-bootstrap';

export default function CategoryCard({ categoryObj }) {
  return (
    <Card
      style={{
        width: '12rem', marginRight: '15px', marginLeft: '15px', marginTop: '15px',
      }}
      className="catCard"
    >
      <ListGroup varient="flush">
        <ListGroup.Item>{categoryObj.label}</ListGroup.Item>
      </ListGroup>
      <Button variant="waiting"> Edit </Button>
      <Button variant="waiting"> Delete </Button>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    label: PropTypes.string,
  }).isRequired,
};
