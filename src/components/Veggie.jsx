import { useEffect, useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide';
import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
import {Link} from 'react-router-dom'


function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {

    const check = localStorage.getItem('veggie')
    
    if (check) {
      setVeggie(JSON.parse(check))
    }else{
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API}&number=12&tags=vegetarian`
      );
      const result = await api.json();
      localStorage.setItem("veggie", JSON.stringify(result.recipes))
      setVeggie(result.recipes);
    }

    console.log(veggie);
  };


  return (
    <div><Wrapper>
    <h3>Vegetarian Picks</h3>
    <Splide options={{perPage:3, autoplay:true, rewind: true, arrows:true, pagination: false, drag:'free'}}>
    {veggie.map((recipe) => {
      return (
        <SplideSlide>
        <Card>
        <Link to={"/recipe/" + recipe.id}>

          <p>{recipe.title}</p>
          <img src={recipe.image} />
          <Gradient/>
          </Link>
        </Card>
        </SplideSlide>
      );
    })}
    </Splide>
  </Wrapper></div>
  )
}



const Wrapper = styled.div`
  margin: 4rem 0;
`;

const Card = styled.div`
  min-height: 15rem;
  margin: 3rem;
  position: relative;
  overflow: hidden;
  border-radius: 2rem;


  img {
    width: 100%;
    position: absolute;
    left: 0;
    height: 100%;
    object-fit: cover;
  }

  p{
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translateX(-50%);
    width: 100%;
    color: white;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 20%;
    display:flex;
    justify-content: center;
    align-items: center;
  }
`;

const Gradient = styled.div`
  z-index: 3;
  position:absolute;
  width:100%;
  height:100%;
  background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.7))
`


export default Veggie