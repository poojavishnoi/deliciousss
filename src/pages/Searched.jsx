import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

function Searched() {

  const [searcedRecipes, setSearchedRecipes] = useState([]);
  const params = useParams();

  const getSearched = async (name) => {
    
      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API}&query=${name}`)
      const recipies = await data.json();
      setSearchedRecipes(recipies.results)
    }
  

  useEffect(()=>{
    getSearched(params.search)
  }, [params.search])

  return (
    <Grid className='grid'>
      {searcedRecipes.map((item)=>{
        return(
          <Card key={item.id}>
            <Link to={"/recipe/" + item.id}>
            <img src={item.image} alt=""/>
            <h4>{item.title}</h4>
            </Link>
          </Card>
        )
      })}
    </Grid>
    )
}


const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem; 

  @media only screen and (max-width: 600px) {
    display: block;
  }
`

const Card = styled.div`
  img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 2rem
  }

  a{
    text-decoration: none;
  }

  h4{
    text-align: center;
    padding: 1rem
  }


`

export default Searched