import { useEffect, useState } from 'react';
import { getAllTags } from '../api/tags';
import Tag from '../components/tag';

const Tagslist = () => {
  const [tags, setTags] = useState([]);

  const getTags = () => {
    getAllTags().then(setTags);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <div>
      {tags.map((obj) => (
        <Tag obj={obj} />
      ))}
    </div>
  );
};

export default Tagslist;
