import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// product-info
import Category from './Product-Info/Category.jsx';
import ProductDescription from './Product-Info/ProductDescription.jsx';
import ProductName from './Product-Info/ProductName.jsx';
import ProductSlogan from './Product-Info/ProductSlogan.jsx';
import Price from './Product-Info/Price.jsx';
import StarRating from './Product-Info/StarRating.jsx';

//images
import CurrentImage from './Image-Gallery/CurrentImage.jsx';
import Sidebar from './Image-Gallery/Sidebar.jsx';

//styles
import Styles from './Styles/Styles.jsx';
import SelectedStyle from './Styles/SelectedStyle.jsx';

const axios = require('axios');

// https://app-hrsei-api.herokuapp.com/api/fec2/hr-sfo/products/63609
// const queryString = window.location.search;

const ThemeContext = React.createContext('light');

function Overview() {
  const [product, setProduct] = useState('empty');
  const [productId, setProductId] = useState(63609);
  const [currentStyleIndex, setCurrentStyleIndex] = useState(0);
  const [mainImage, setMainImage] = useState(0);

  useEffect(() => {
    axios
      .get('/products/allinfo/', { params: { product_id: productId } })
      .then((response) => {
        setProduct(response.data);
        // console.log(response.data);
      })
      .catch((err) => {
        throw err;
      });
  }, []);

  return (
    <div className='overview'>
      <WrapperStyled>
        <ImageWrapperStyled>
          <CurrentImage
            productStyles={product.styles}
            currentStyleIndex={currentStyleIndex}
            mainImage={mainImage}
          />
          <Sidebar
            images={product.styles}
            currentStyleIndex={currentStyleIndex}
            setMainImage={setMainImage}
          />
        </ImageWrapperStyled>
        <ProductStylesWrapper>
          <Styles
            productStyles={product.styles}
            setCurrentStyleIndex={setCurrentStyleIndex}
          />
        </ProductStylesWrapper>
        <SelectedStyleWrapper>
          <SelectedStyle
            productStyles={product.styles}
            currentStyleIndex={currentStyleIndex}
          />
        </SelectedStyleWrapper>
        <Category category={product.category} />
        <ProductName name={product.name} />
        <PriceStyledWrapper>
          <Price
            productStyles={product.styles}
            currentStyleIndex={currentStyleIndex}
          />
        </PriceStyledWrapper>
        {/* <StarRating /> */}
      </WrapperStyled>
    </div>
  );
}

export default Overview;

const ImageWrapperStyled = styled.section`
  grid-template-columns: 3fr 7fr;
  grid-column-start: 1;
  grid-row: 1 / span 8;
  display: grid;
  height: 750px;
  width: 750px;
`;

const ProductDescriptionStyled = styled.div`
  display: grid;
  grid-template-columns: 4fr 6.2fr 0.75fr;
  grid-column-start: 1;
  grid-row-start: 7;
`;

const WrapperStyled = styled.section`
  padding: 2em 10em 5em 10em;
  display: grid;
  grid-template-columns: 7fr 3fr;
  grid-column-gap: 10px;
  grid-template-rows: 0.05fr 0.1fr 0.05fr 0.1fr 0.15fr 0.05fr 1fr 1fr 1fr;
  font-family: Helvetica;
`;

const PriceStyledWrapper = styled.section`
  display: grid;
  grid-row-start: 5;
`;

const ProductStylesWrapper = styled.section`
  display: grid;
  grid-row-start: 6;
`;

const SelectedStyleWrapper = styled.section`
  grid-row-start: 4;
`;

// {
//   /* <Category category={product.category} />
//         <ProductName name={product.name} />
//         <Price productStyles={product.styles} />
//         <StarRating />
//         <ProductDescriptionStyled>
//           <ProductDescription
//             description={product.description}
//             slogan={product.slogan}
//           />
//   </ProductDescriptionStyled>*/
// }
