import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchForm from '../components/SearchForm';
import RecipeCard from '../components/RecipeCard';
import RecipeGrid from '../components/RecipeGrid';
import ModalRecipe from '../components/ModalRecipe';
import DetailedRecipe from '../components/DetailedRecipe';

function SearchRecipes() {
  const [recipesData, setRecipesData] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  // states for one recipe
  const [recipeTitle, setRecipeTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imgUrl, setImgUrl] = useState();
  const [minutes, setMinutes] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [serves, setServes] = useState('');
  const [category, setCategory] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const stateObject = {
    title: {
      value: recipeTitle,
      setter: setRecipeTitle,
    },
    description: {
      value: description,
      setter: setDescription,
    },
    image: {
      value: imgUrl,
      setter: setImgUrl,
    },
    time: {
      value: minutes,
      setter: setMinutes,
    },
    difficulty: {
      value: difficulty,
      setter: setDifficulty,
    },
    serves: {
      value: serves,
      setter: setServes,
    },
    category: {
      value: category,
      setter: setCategory,
    },
    mainCategory: {
      value: selectedMainCategory,
      setter: setSelectedMainCategory,
    },
    labels: {
      value: selectedOptions,
      setter: setSelectedOptions,
    },
    ingredients: {
      value: ingredients,
      setter: setIngredients,
    },
  };

  const openModal = async (id) => {
    setSelectedRecipe(id);
    setModalOpen(true);

    try {
      const response = await fetch(`http://localhost:3000/api/recipes/${id}`);
      const recipe = await response.json();

      setRecipeTitle(recipe.recipe_name);
      setDescription(recipe.description);
      setImgUrl(recipe.img);
      setMinutes(recipe.time_minutes);
      setDifficulty(recipe.difficulty_level);
      setServes(recipe.serve_count);
      setCategory(recipe.category_name);
      setSelectedMainCategory(recipe.main_category_name);
      setSelectedOptions(recipe.label_name);
    } catch (error) {
      console.error('Error fetching recipe data:', error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    axios
      .get('http://localhost:3000/api/recipes')
      .then((response) => {
        setRecipesData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching recipes data:', error);
      });
  }, []);

  return (
    <section className="container mx-auto my-2">
      <SearchForm />
      <RecipeGrid>
        {recipesData.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            id={recipe.id}
            imgUrl={`http://localhost:3000/${recipe.img}`}
            minutes={recipe.time_minutes}
            difficulty={recipe.difficulty_level}
            serves={recipe.serve_count}
            name={recipe.name}
            openModal={openModal}
          />
        ))}
      </RecipeGrid>
      {isModalOpen && (
        <ModalRecipe title="Detailed Recipe" close={closeModal}>
          <DetailedRecipe editMode recipeID={selectedRecipe} stateObject={stateObject} />
        </ModalRecipe>
      )}
    </section>
  );
}
export default SearchRecipes;
