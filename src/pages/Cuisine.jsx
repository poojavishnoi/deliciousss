import React, {useState,useEffect} from "react";
import styled from 'styled-components';
import {motion} from 'framer-motion';
import {Link, useParams} from 'react-router-dom'

function Cuisine() {

  const [cuisine, setCuisine] = useState([])
  let params = useParams()

  const getCuisine = async (name) => {

      const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API}&cuisine=${name}`)
      const recipies = await data.json();
      setCuisine(recipies.results);
  }

  useEffect(()=>{
    getCuisine(params.type);
  },[params.type])
  

  return (
    <Grid>
    {cuisine.map((item) => {
      return(
        <Card key={item.id}>
          <Link to={"/recipe/" + item.id}>

          <img src={item.image}/>
          <h4>{item.title}</h4>
          </Link>
        </Card>
      )
    })}
    </Grid>
  );
}

const Grid = styled.div`
  display:grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem; 
`

const Card = styled.div`
  img{
    width: 100%;
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

export default Cuisine;
