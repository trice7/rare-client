import { useEffect, useState } from 'react';
import getCategories from '../api/categoryData';
import CategoryCard from '../components/utils/categoriesCard';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);

  const getAllCategories = () => {
    getCategories().then(setCategories);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <div className="d-flex flex-wrap">
      {categories.map((category) => (
        <CategoryCard key={category.id} categoryObj={category} />
      ))}
    </div>
  );
}
