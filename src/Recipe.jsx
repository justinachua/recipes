import React from 'react'; 
import './App.css';
import {AppProvider, Heading, MediaCard, List, Page, Layout, Stack, Badge, Caption, Subheading, TextStyle, TextContainer} from '@shopify/polaris';

// Create each recipe card 
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
      
      {ingredients.map(ingredient => (
        <TextStyle variation="subdued">{ingredient.text}&#10;</TextStyle>
        
      ))}
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