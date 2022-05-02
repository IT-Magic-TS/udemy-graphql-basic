// const { categories } = require('../db')

exports.Product = {
  category: (parent, args, { db }) => {
    const { categoryId } = parent
    const category = db.categories.find(c => c.id === categoryId)
    return category
  },
  reviews: ({ id }, args, {db}) => {
    return db.reviews.filter(r => r.productId === id)
  }
}