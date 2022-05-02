// const { categories, products } = require('../db')

exports.Query = {
  hello: () => {
    return ['Hello', ' Lazy', 'MM']
  },
  products: (parent, { filter }, { db } ) => {
    let filteredProducts = db.products
    if (filter) {
      const { onSale, avgRating } = filter
      if (onSale === true) {
        filteredProducts = filteredProducts.filter(product => {
          return product.onSale
        })
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter(product => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach(review => {
            if (review.productId === product.id) {
              sumRating += review.rating
              numberOfReviews++
            }
          })
          const avgProductRating = sumRating / numberOfReviews
          // console.log(avgProductRating)
          return avgProductRating >= avgRating
        })
      }
    }

    return filteredProducts
  },
  product: (parent, args, { db }) => {
    const productId = args.id
    const product = db.products.find(p => p.id === productId)
    if (!productId) return null
    return product
  },
  categories: (parent, args, { db }) => db.categories,
  category: (parent, args, { db }) => {
    const { id } = args
    return db.categories.find(c => c.id === id)
  }
}