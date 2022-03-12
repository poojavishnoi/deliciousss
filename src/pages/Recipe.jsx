import {useState, useEffect} from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'

import React from 'react'

function Recipe() {
  const [details, setDetails] = useState([])
  const params = useParams();
  const [activeTab, setActiveTab] = useState("instructions")

  const fetchDetails = async (name) => {
    const data =  await fetch (`https://api.spoonacular.com/recipes/${name}/information?apiKey=${process.env.REACT_APP_API}`)
    const detailData = await data.json();
    setDetails(detailData)
  }

  useEffect(()=>{
    fetchDetails(params.name)
  }, [params.name])

  return (
    <DetailWrapper>
      <div>
      <h2>{details.title}</h2>
        <img src={details.image} alt=''/>
      </div>
      <Info>
        <Button className={activeTab === 'instructions' ? 'active' : ""} onClick={()=>setActiveTab("instructions")}>
          Instructions
        </Button>

        <Button className={activeTab === 'ingredients' ? 'active' : ""}  onClick={()=>setActiveTab("ingredients")}>
          Ingredients
        </Button>

        { activeTab === "instructions" &&
        <div>
          <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3><br/>
          <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
        </div>
        }

        
        {activeTab === "ingredients" && 
        <ul>
          {
            details.extendedIngredients.map((item) => {
              return(
                <li key={item.id}>
                  {
                    item.original
                  }
                </li>
              )
            })
          }
        </ul>
        }
      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin: 10rem 0 5rem 0;
  display:flex;

  img{
    border-radius: 2rem;
  }

  h2{
    margin-bottom: 2rem;
  }

  li{
    font-size: 1.2rem;
    line-height: 2.5rem;
  }

  ul{
    margin-top: 2rem;
  }

  .active{
    background: linear-gradient(to right, #f27121, #e94057);
    color:white;
  }
`

const Button = styled.button`
  padding: 1rem 2rem;
  color: grey;
  background: white;
  border: 1px solid  lightgray;
  margin-right: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 2rem;
  font-weight: 600;

`

const Info = styled.div`
  margin-left:10rem;
  line-height: 2rem;
`

export default Recipe