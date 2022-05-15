import React , {useState} from 'react'
import styled from 'styled-components'
import {FaSearch} from 'react-icons/fa'
import {useNavigate} from 'react-router-dom';

function Search() {

  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate("/searched/" + input)
  }

  return (
      <FormStyle onSubmit={submitHandler}>
      <div>
        <FaSearch></FaSearch>
        <input onChange={(e)=> setInput(e.target.value)} type="text" value={input}/>
      </div>
      </FormStyle>
  )
}

const FormStyle = styled.form`
  margin: 0 20rem;
  position: relative;
  @media only screen and (max-width: 600px) {
    margin: 1rem;
    font-size: 0.7rem
  }
 
  input{
    border:none;
    background: linear-gradient(35deg, #494949, #313131);
    font-size: 1.5rem;
    color: lightgray;
    padding: 1rem 3rem;
    border-radius: 1rem;
    outline: none;
    width:100%;
    @media only screen and (max-width: 600px) {
      width: 95%;
    }
    padding-left:4rem
  }

  svg{
    position: absolute;
    color: white;
    top:50%;
    left: 2rem;
    transform: translateY(-50%);
    font-size: 1.5rem
  }

`

export default Search;