import React from 'react';
import './App.css';
import {Heading, MediaCard, Stack, Badge, Subheading, TextStyle, TextContainer} from '@shopify/polaris';

// Creates each recipe card
const Recipe = ({title: titleString, calories, image, ingredients, url, cuisine, diet}) => {

  // Title = name of recipe and relevant badges
  const title = (
   <Stack>
     <Heading>{titleString}</Heading>
     {cuisine.length && <Badge>{cuisine}</Badge>}
     {diet.length && <Badge>{diet}</Badge>}
   </Stack>
  )

  // Description = calories and list of ingredients
  const description = (
    <TextContainer>
      <Subheading>{Math.round(calories)} calories</Subheading>
      <pre></pre>
      <Stack vertical spacing="extraTight">
        {ingredients.map(ingredient => (
          <p><TextStyle variation="subdued">{ingredient.text}&#10;</TextStyle></p>
        ))}
      </Stack>
    </TextContainer>
  )

  return(
    <div className='new-line'>
      <MediaCard
        title={title}
        // URL leads to external recipe
        primaryAction={{
          content: `${titleString} Recipe`,
          external: true,
          url,
        }}
        description={description}
        size="small"
      >


        <img
          alt=""
          width="100%"
          height="100%"
          style={{ objectFit: 'cover', objectPosition: 'center',}}

          src={image}
        />
      </MediaCard>
      <br />
    </div>
  );
}

export default Recipe;