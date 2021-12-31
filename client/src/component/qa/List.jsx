import React, {useState, useEffect} from 'react';
import Search from './Search.jsx';
import Question from './Question.jsx';
const axios = require('axios');
import styled from 'styled-components';

const ListStyle = styled.section`
padding: 2em 10em 5em 10em;
justify-items: right;
font-family: Helvetica;
`;

const List = () => {
  const [questions, setQuestion] = useState([]);
  const [productId, setProductId] = useState(63609);

  let params = {
    product_id: productId,
    count: 500,
    page: 1
  };

  let getData = () => {
    axios.get('/qa/questions', {params: params}).then(
      (res) => {
        setQuestion(res.data.results.sort((a, b) => (b.helpfulness - a.helpfulness)));
      }).catch((err) => { throw err; });
  };

  useEffect(() => {
    getData();
  }, [productId]);

  return (
    <div id="qa">
      <ListStyle>
        <h3>QUESTIONS & ANSWERS</h3>
        <Search />
        <div>
          {questions.map(q => {
            return (
              <Question productId={productId} question={q} key={q.question_id}/>
            );
          })}
        </div>
      </ListStyle>
    </div>
  );

};

export default List;
