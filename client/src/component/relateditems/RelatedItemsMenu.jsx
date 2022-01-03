import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import styled from 'styled-components';

import ProductContext from '../ProductContext';
import RelatedItem from './RelatedItem';

const RelatedItemWrapperStyle = styled.section`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-column: 1 / 5;
  grid-row: 1;
  padding: 2em 10em 5em 10em;
  font-family: Helvetica;
  display: grid;
  height: 325px;
`;

const RelatedTitleStyle = styled.section`
padding: 2em 10em 0em 10em;
`;

const RelatedItemsMenu = () => {
  const [relatedList, changeRelated] = useState([]);
  const {productId} = useContext(ProductContext);
  useEffect(() => {
    console.log(productId);
    axios.get('/related', {
      params: {
        product_id: productId,
      },
    }).then((related) => changeRelated(related.data));
  }, [productId]);
  return (

      <div className="relatedmenu">
        <RelatedTitleStyle>
          <h3>Related Items</h3>
        </RelatedTitleStyle>
        <RelatedItemWrapperStyle>
        {relatedList.map((item) => <RelatedItem item={item} key={item.name}/>)}
        </RelatedItemWrapperStyle>
      </div>
  );
};

export default RelatedItemsMenu;
