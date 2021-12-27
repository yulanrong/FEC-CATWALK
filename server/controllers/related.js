const axios = require('axios');
const auth = require('../config.js');
const productsModel = require('../models/products.js');
const reviewsModel = require('../models/reviews.js')

module.exports = {
  get: async (req, res) => {
    try{
      const relatedItems = await productsModel.related(req.query);
      const relatedItemInfo = await Promise.all (relatedItems.map( async (item)=> {
        let query = {product_id: item}
        const getReq = [productsModel.styles, productsModel.info, reviewsModel.meta];
        const getRes = await Promise.all (getReq.map(async (get)=> {return get(query);}))
        let styleInfo, itemInfo, reviewMeta;
        [styleInfo, itemInfo, reviewMeta] = [...getRes];
        styleInfo.forEach((style) => {

        })

        if (Object.keys(reviewMeta.ratings).length > 0) {
          //Calculate average rating by reducing ratings and then dividing,
          //then rounding to nearest int
          let rating = Math.round(
          Object.values(reviewMeta.ratings).reduce(
          (total, rating) => {return parseInt(total) + parseInt(rating)})
          / Object.values(reviewMeta.ratings).length
          );
          return {...itemInfo, photo: photo, rating: rating};
        } else {
          return {...itemInfo, photo: photo, rating: 0};
        }
      }));
      res.send(relatedItemInfo);
    } catch (e) {
      res.status(500);
      res.send(e);
      console.error(e);
    }
  }
}