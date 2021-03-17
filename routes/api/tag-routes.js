const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  console.log("api/tags hit")
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll();
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  console.log("/api/tag/1 hits")
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const productData = await Product.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag }]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

  router.post('/', async (req, res) => {
    console.log('/api/tag posted')
     // create a new tag
    try {
      const tagData = await Tag.create(req.body);
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const updatedTag = await Tag.update(
    {
      // All the fields you can update and the data attached to the request body.
      tag_name: req.body.tag_name,
    },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        id: req.params.id
      }
    }
  )
    res.json(updatedTag);
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with this id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
