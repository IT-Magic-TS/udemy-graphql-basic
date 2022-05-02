// const { products } = require('../db')

exports.Category = {
  products: (parent, { filter }, { db }) => {
    const categoryId = parent.id
    const { onSale, avgRating } = filter
    let filteredProducts = db.products.filter(p => p.categoryId === categoryId)

    if (filter) {
      if (onSale) {
        filteredProducts = filteredProducts.filter(p => {
          return p.onSale
        })
      }

      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter(product => {
          let sumRating = 0
          let numberOfReviews = 0
          db.reviews.forEach(review => {
            if (review.productId === product.id) {
              sumRating += review.rating
              numberOfReviews++
            }
          })
          const avgProductRating = sumRating / numberOfReviews
          return avgProductRating >= avgRating
        })
      }

    }

    return filteredProducts
  }
}