import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ImageUpload from './ImageUpload';
import RecipeTitle from './RecipeTitle';
import IconContainer from './IconContainer';
import Icon from './Icon';
import RecipeMainCategory from './RecipeMainCategory';
import RecipeCategory from './RecipeCategory';
import Labels from './LabelsComp';
import Ingredients from './IngredientsComp';
import Method from './MethodComp';
import Button from './Button';

function DetailedRecipe({ editMode }) {
  const [fileUpload, setFileUpload] = useState();
  const [imgUrl, setImgUrl] = useState();
  const [recipeTitle, setRecipeTitle] = useState('');
  const [selectedMainCategory, setSelectedMainCategory] = useState('Meals');
  const [category, setCategory] = useState();
  // const [labels, setLabels] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [description, setDescription] = useState();
  const [selectedOptions, setSelectedOptions] = useState([]);

  const [minutes, setMinutes] = useState();
  const [difficulty, setDifficulty] = useState();
  const [serves, setServes] = useState();

  useEffect(() => {
    // API call here
    // Dummy data
    const data = {
      minutes: '60',
      difficulty: 'easy',
      serves: '4',
      recipeTitle: 'Mákos bejgli',
    };

    setMinutes(data.minutes);
    setDifficulty(data.difficulty);
    setServes(data.serves);
  }, []);

  return (
    <div>
      <form onSubmit="API CALL" className="flex flex-col flex-nowrap items-center">
        <div className="flex flex-col lg:flex-row">
          <div className="flex-1 flex flex-col lg:flex-row items-center justify-between lg:w-2/3 p-2">
            <div className="flex-1">
              <ImageUpload
                editMode={editMode}
                fileUpload={fileUpload}
                setFileUpload={setFileUpload}
                imgUrl={imgUrl}
                setImgUrl={setImgUrl}
              />
            </div>
            <div className="flex-grow flex flex-wrap flex-col">
              <RecipeTitle
                editMode={editMode}
                recipeTitle={recipeTitle}
                setRecipeTitle={setRecipeTitle}
              />
              <Method
                editMode={editMode}
                description={description}
                setDescription={setDescription}
              />
              <Ingredients
                editMode={editMode}
                ingredients={ingredients}
                setIngredients={setIngredients}
                newIngredient={newIngredient}
                setNewIngredient={setNewIngredient}
              />
            </div>
          </div>
          <div className="w-full lg:w-1/3 p-2 mt-4 lg:mt-0">
            <RecipeMainCategory
              editMode={editMode}
              selectedMainCategory={selectedMainCategory}
              setSelectedMainCategory={setSelectedMainCategory}
            />
            <RecipeCategory editMode={editMode} category={category} setCategory={setCategory} />
            <IconContainer addClassName="flex-wrap flex-row items-center">
              {minutes ? (
                <Icon
                  imgUrl="/images/time-icon.svg"
                  text={`${minutes} mins`}
                  editMode={editMode}
                  addClassName="text-right w-20"
                />
              ) : null}
              {difficulty ? (
                <Icon
                  imgUrl="/images/difficulty-icon.svg"
                  text={difficulty}
                  editMode={editMode}
                  addClassName="text-right w-20"
                />
              ) : null}
              {serves ? (
                <Icon
                  imgUrl="/images/serves-icon.svg"
                  text={serves.toString()}
                  editMode={editMode}
                  addClassName="text-right w-20"
                />
              ) : null}{' '}
            </IconContainer>
            <Labels
              editMode={editMode}
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
          </div>
        </div>
        {editMode ? (
          <Button
            type="submit"
            text="Save"
            className="flex mx-auto bg-amber-300 border-0 py-2 px-8 focus:outline-none hover:bg-orange-600 rounded text-lg font-medium"
          />
        ) : null}
      </form>
    </div>
  );
}

DetailedRecipe.propTypes = {
  editMode: PropTypes.bool.isRequired,
};

export default DetailedRecipe;
