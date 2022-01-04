import React, { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import styled, { keyframes } from 'styled-components';
import ProductContext from '../ProductContext';
import CompareModal from './CompareModal';
import CompareTable from './CompareTable';

const fadeIn = keyframes`
  0% {opacity: 0;}
  100% {opacity: 1;}
`;

const ItemStyle = styled.div`
  height: 100%;
  min-width: 250px;
  width: 15%;
  object-fit: cover;
  flex: 0 0 auto;
  padding: 5%;
  background: #EEEEEE;
  text-align: center;
  box-sizing: border-box;
  box-shadow: 2px 2px 3px #D3D3D3;
  margin-right: 1em;
  margin-left: 1em;
  justify-content: row;
  animation-name: ${fadeIn};
  animation-duration: .5s;
  transition-timing-function: ease-in;
  animation-fill-mode: both;
  transition: all 0.2s;
  &:hover ${ItemStyle} {
    box-shadow: 4px 4px 5px #D3D3D3;
    background: #E8E8E8;
  }
`;
const TextBoxStyle = styled.div`
  margin-top: 15px;
  background: white;
  height: 25%;
  box-sizing: border-box;
  padding-top: 1%;
  text-align: left;
`;

const NameTitleStyle = styled.p`
  margin-left: 5%;
  margin-top: 3%;
  font-size: 16px;
  font-weight: bold;
  color: black;
`;

const TextStyle = styled.section`
  margin-left: 5%;
  font-size: 14px;
  color: black;
`;

const ImageStyle = styled.img`
  height: 70%;
  width: 100%;
  max-width: 100%;
  object-fit: cover;
  box-shadow: 2px 2px 3px #D3D3D3;
  background: #D3D3D3;
`;

const CompareButtonDivStyle = styled.div`
  text-align: center;
`;

const CompareButtonStyle = styled.button`
margin-top: 1em;
background: light-grey;
color: grey;
border: 0px;
padding: 5px;
animation-name: ${fadeIn};
animation-duration: .5s;
transition-timing-function: ease-in;
animation-fill-mode: both;
transition: all 0.1s;
&:hover ${CompareButtonStyle} {
  box-shadow: 4px 4px 5px #D3D3D3;
  background: #E8E8E8;
}
`;

const RelatedItem = (props) => {
  const { setProductId } = useContext(ProductContext);
  const [popup, setPopup] = useState(false);

  return (
    <div>
      <Link to={`/store/${props.item.id}`}>
        <ItemStyle onClick={()=>setProductId(props.item.id)}>
          <ImageStyle src={props.item.photo} />
          <TextBoxStyle>
            <NameTitleStyle>
              {props.item.name}
            </NameTitleStyle>
            <TextStyle>
              ${props.item.default_price}
              {props.item.rating > 0
              && (
              <div>
                Rating:
                {props.item.rating}
              </div>
              )}
            </TextStyle>
          </TextBoxStyle>
        </ItemStyle>
      </Link>
      <CompareButtonDivStyle>
        {popup && <CompareModal content={<CompareTable currentProduct={props.item} compareProduct={props.item}/>} toggle={setPopup} />}
        <CompareButtonStyle onClick={() => { setPopup(!popup); }}>Compare</CompareButtonStyle>
      </CompareButtonDivStyle>
    </div>
  );
};

export default RelatedItem;
