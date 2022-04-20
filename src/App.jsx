import React, {useEffect, useState, useCallback} from 'react';
import {Button, AppProvider, Page, Form, FormLayout, TextField} from '@shopify/polaris';
import {useDebouncedCallback} from 'use-debounce';
import Recipe from './Recipe'; 
import './App.css';

// Default recipes are chicken-related 
// Shown when you first open the site, or when you search and fully remove your query from the form
const DEFAULT_QUERY_VALUE = 'chicken';

function App() {
  // From edamame (recipe API provider)
	const APP_ID = 'ac7e110a';
	const APP_KEY = '01f5603851e349b5506a7b724b9748ae';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(''); 

  useEffect(() => {
    getRecipes();
  }, []);

  // Gets recipes based on query 
  const getRecipes = async (query) => {
    // If the query is empty, we set the default value to chicken 
    const queryValue = query ? query : DEFAULT_QUERY_VALUE;
    const response = await fetch(
      `https://api.edamam.com/search?q=${queryValue}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
    // Fetches the data from the API 
    const data = await response.json(); 
    response.mode = "no-cors"; 
    setRecipes(data.hits); 
    console.log(data.hits); 
  }; 

  // Delays getRecipe by 500ms in order to not call the API too frequently 
  const debouncedGetRecipes = useDebouncedCallback(getRecipes, 500);

  // Search for recipes using the input entered by user 
  const getSearch = e => {
    e.preventDefault();
    getRecipes(search); 
  }

  // Enables incremental search (searching while typing)
  const handleSearchChange = (value) => {
    setSearch(value);
    debouncedGetRecipes(value);
  };

	return (
    <AppProvider colorScheme="light">
      <Page 
        title="Justina's React Recipe App"
        subtitle="Find your next recipe here!"
      >
        <Form onSubmit={getSearch}>
          <FormLayout>
            <TextField
              value={search}
              onChange={handleSearchChange}
              label="Search for recipes"
              type="text"
            />
            <Button submit>Submit</Button>
          </FormLayout>
        </Form>
        <br />

        {recipes.map(recipe =>(
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            url={recipe.recipe.url}
            cuisine={recipe.recipe.cuisineType}
            diet={recipe.recipe.dietLabels}
          />
        ))}
      </Page>
    </AppProvider>
	);
}; 

export default App; 