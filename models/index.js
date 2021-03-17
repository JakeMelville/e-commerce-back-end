// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');
const { belongsToMany } = require('./Product');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
});
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey: 'tag_id',
  through: {
    model: ProductTag,
    unique: false
  },
  // as: 'product_tags'
})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'product_id',
  through: {
    model: ProductTag,
    unique: false
  }
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
