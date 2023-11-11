import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPost, updatePost } from '../../api/postData';
import getCategories from '../../api/categoryData';

const initialState = {
  user_id: '',
  category_id: '',
  title: '',
  publication_date: '',
  image_url: '',
  content: '',
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  const userId = localStorage.auth_token;

  console.warn(obj.id);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, user_id: userId };
    if (obj.id) {
      updatePost(payload).then(() => router.push(`/posts/${obj.id}`));
    } else {
      createPost(payload).then(() => {
        router.push('/');
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Post Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Post Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image_url"
          value={formInput.image_url}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Post Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Date"
          name="publication_date"
          value={formInput.publication_date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      category SELECT
      <FloatingLabel controlId="floatingSelect" label="category">
        <Form.Select
          aria-label="category"
          name="category_id"
          onChange={handleChange}
          className="mb-3"
          value={formInput.category_id} // FIXME: modify code to remove error
          required
        >
          <option value="">Select an category</option>
          {
            categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Content" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Content"
          style={{ height: '100px' }}
          name="content"
          value={formInput.content}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Post</Button>
    </Form>
  );
}

PostForm.propTypes = {
  obj: PropTypes.shape({
    content: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    category_id: PropTypes.string,
    id: PropTypes.string,
  }),
};

PostForm.defaultProps = {
  obj: initialState,
};

export default PostForm;
