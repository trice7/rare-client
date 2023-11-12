import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { createPost, updatePost } from '../../api/postData';
import getCategories from '../../api/categoryData';
import { createPostTag, getAllTags } from '../../api/tags';

const initialState = {
  user_id: '',
  category_id: '',
  title: '',
  publication_date: '',
  image_url: '',
  content: '',
  tags: [],
};

function PostForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const router = useRouter();

  let checkedTags = [];

  const userId = localStorage.auth_token;

  // console.warn(tags);

  useEffect(() => {
    if (obj.id) setFormInput(obj);
  }, [obj]);

  useEffect(() => {
    getCategories().then((res) => setCategories(res));
    getAllTags().then((res) => setTags(res));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTagChange = (e) => {
    // console.warn(formInput);
    if (e.target.checked) {
      checkedTags.push(e.target.value);
      setFormInput((prevState) => ({
        ...prevState,
        tags: formInput.tags.concat(checkedTags),
      }));
    } else {
      checkedTags = formInput.tags;
      const index = checkedTags.indexOf(e.target.value);
      checkedTags.splice(index, 1);
      setFormInput((prevState) => ({
        ...prevState,
        tags: checkedTags,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput, user_id: userId };
    if (obj.id) {
      updatePost(payload).then(() => router.push(`/posts/${obj.id}`));
    } else {
      createPost(payload).then((data) => {
        formInput.tags?.forEach((tag) => {
          console.warn(data.id);
          const tagPayload = {
            post_id: data.id,
            tag_id: tag,
          };
          createPostTag(tagPayload).then();
        });
        router.push('/');
      });
    }
  };

  const handleTheClick = () => {
    console.warn(formInput);
    console.warn(formInput.tags);
    console.warn(checkedTags);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.id ? 'Update' : 'Create'} Post</h2>

      <Button onClick={handleTheClick}>Click me</Button>

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

      {/* category SELECT */}
      <FloatingLabel controlId="floatingSelect">
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

      <div>
        {tags.map((tag) => (
          <div key={tag.id}>
            <Form.Check // prettier-ignore
              type="checkbox"
              label={tag.label}
              name="tags"
              value={tag.id}
              onChange={handleTagChange}
            />
          </div>
        ))}
      </div>

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
      <Button variant="dark">{obj.id ? 'Update' : 'Create'} Post</Button>
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
