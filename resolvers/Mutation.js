const { v4: uuid } = require('uuid');
const { db } = require('../db');

exports.Mutation = {
  addCategory: (parents, { input }, { db }) => {
    const { name } = input
    const newCategory = {
      id: uuid(),
      name
    }

    db.categories.push(newCategory)

    return newCategory
  },
  addProduct: (parent, { input }, { products }) => {
    const { name, description, quantity, price, image, onSale, categoryId } = input
    // categoryId = parent.id
    const newProduct = {
      id: uuid(), name, description, quantity, price, image, onSale, categoryId
    }

    db.products.push(newProduct)

    return newProduct

  },
  addReview: (parent, { input }, { db }) => {
    const { title, rating, comment, date, productId } = input
    const newReview = {
      id: uuid(), title, rating, comment, date, productId
    }

    db.reviews.push(newReview)

    return newReview

  },
  deleteCategory: (parent, { id }, { db }) => {
    db.categories = db.categories.filter(c => c.id !== id)
    db.products = db.products.map(product => {
      if (product.categoryId === id ) return {
        ...product,
        categoryId: null
      }
      else return product
    })
    return true
  },
  deleteProduct: (parent, { id }, { db }) => {
    db.products = db.products.filter(p => p.id !== id)
    db.reviews = db.reviews.filter(r => r.productId !== id)

    return true
  },
  deleteReview: (parent, { id }, { db }) => {
    db.reviews = db.reviews.filter(r => r.id !== id)

    return true
  },
  updateCategory: (parent, { id, input }, { db }) => {
    const index = db.categories.findIndex(c => c.id === id)
    if (index === -1) return null // id not match
    db.categories[index] = {
      ...db.categories[index],
      ...input
    }

    return db.categories[index]
  },
  updateProduct: (parent, { id, input }, { db }) => {
    const index = db.products.findIndex(p => p.id === id)
    if (index === -1) return null // id not match
    db.products[index] = {
      ...db.products[index],
      ...input
    }

    return db.products[index]
  },
  updateReview: (parent, { id, input }, { db }) => {
    const index = db.reviews.findIndex(r => r.id === id)
    if (index === -1) return null // id not match
    db.reviews[index] = {
      ...db.reviews[index],
      ...input
    }

    return db.reviews[index]
  }

}