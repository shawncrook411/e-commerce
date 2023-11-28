const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    })
    res.status(200).json(tagData)
      
  } catch (err) {
    res.status(500).json(err)
  }
})


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    var tagData = await Tag.findByPk(req.params.id,
      { include: [{ model: Product }], })
    if (tagData) res.status(200).json(tagData)
    else res.status(404).json('No tag with given ID exists')
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', (req, res) => {
  // create a new tag
  try {
    if (req.body.id && req.body.tag_name)
    {
      Tag.create({
        id: req.body.id,
        tag_name: req.body.tag_name,
      })
        .then((newTag) => {
        res.status(200).json(newTag)
      })
      }
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  try {
    Tag.update(
      {
        id: req.body.id,
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then((updatedTag) => {
      res.json(updatedTag).status(200)
    })
  } catch (err) {
    res.status(500).json(err)
  }

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  try {
    Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedTag) => {
      res.json(deletedTag).status(200)
    })
  } catch (err) {
    res.json(err).status(500)
  }
});

module.exports = router;
