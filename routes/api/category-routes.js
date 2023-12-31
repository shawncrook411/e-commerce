const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  try {
    const categoryData = await Category.findAll({
      include: [{ model: Product }]
    })
    res.status(200).json(categoryData)
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    var categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })
    categoryData ? res.status(200).json(categoryData) : res.status(404).json("No category with given ID exists")
  }
  catch (err) { res.status(500).json(err )}
});

router.post('/', (req, res) => {
  // create a new category
  if (req.body.id && req.body.category_name) {
    Category.create({
      id: req.body.id,
      category_name: req.body.category_name
    })
      .then((newCategory) => {
      res.json(newCategory).status(200)
    })
  }
  else {
    res.status(500).json('ID and Category name required')
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value  
  try {
    Category.update(
      {
        id: req.body.id,
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )
    .then((updatedCategory) => {
      res.status(200).json(updatedCategory)      
    })
  } catch (err) {
    res.status(500).json('Incorrect format used')
  } 
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  try {
    Category.destroy({
      where: {
        id: req.params.id
      },
    })
    .then((deletedCategory) => {
    res.json(deletedCategory).status(200)
    })
  } catch (err) {
    res.status(500).json('Invalid usage')
}});

module.exports = router;
