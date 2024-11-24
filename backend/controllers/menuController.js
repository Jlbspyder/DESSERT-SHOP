import asynchandler from '../middleware/asyncHandler.js';
import Menu from '../models/menuModel.js';

//Fetch Menu
//GET /api/menu
//Public access
const getMenu = asynchandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' }} : {};

  const count = await Menu.countDocuments({...keyword});

  const menu = await Menu.find({...keyword})
    .limit(pageSize)
    .skip(pageSize * (page - 1));
    res.json({ menu, page, pages: Math.ceil(count / pageSize) });
});

//Fetch Single item on menu
//GET /api/menu/:id
//Public access
const getMenuById = asynchandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (menu) {
    return res.json(menu);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

//Create Menu
//GET /api/menu
//Private/Admin access
const createMenu = asynchandler(async (req, res) => {
  const menu = new Menu({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    img: '/images/waffles.jpg',
    desktopImg: '/images/image-waffle-desktop.jpg',
    category: 'Sample category',
    description: 'Sample description',
    numInStock: 0,
    numReviews: 0,
    mobileImg: '/images/image-waffle-mobile.jpg',
    tabletImg: '/images/image-waffle-tablet.jpg',
    thumbnail: '/images/image-waffle-thumbnail.jpg',
  });
  const createdMenu = await menu.save();
  res.status(201).json(createdMenu);
});

//Update Menu
//PUT /api/menu/:id
//Private/Admin access
const updateMenu = asynchandler(async (req, res) => {
  const {
    name,
    price,
    thumbnail,
    description,
    desktopImg,
    img,
    mobileImg,
    tabletImg,
    category,
    numInStock,
    numReviews,
  } = req.body;

  const menu = await Menu.findById(req.params.id);

  if (menu) {
    menu.name = name;
    menu.price = price;
    menu.description = description;
    menu.img = img;
    menu.thumbnail = thumbnail;
    menu.category = category;
    menu.mobileImg = mobileImg;
    menu.desktopImg = desktopImg;
    menu.tabletImg = tabletImg;
    menu.numInStock = numInStock;
    menu.numReviews = numReviews;

    const updatedMenu = await menu.save();
    res.status(updatedMenu);
  } else {
    res.status(404);
    throw new Error('Resources not found');
  }
});

//Delete Menu
//DELETE /api/menu/:id
//Private/Admin access
const deleteMenu = asynchandler(async (req, res) => {
  const menu = await Menu.findById(req.params.id);

  if (menu) {
    await Menu.deleteOne({ _id: menu._id });
    res.status(200).json({ message: 'Menu deleted' });
  } else {
    res.status(404);
    throw new Error('Resources not found');
  }
});

//Create review
//POST /api/menu/:id/reviews
//Private access
const createMenuReview = asynchandler(async (req, res) => {
  const { rating, comment } = req.body;
  const menu = await Menu.findById(req.params.id);

  if (menu) {
    const alreadyReviewed = menu.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Dessert already reviewed');
    }
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    menu.reviews.push(review);

    menu.numReviews = menu.reviews.length;

    menu.rating =
      menu.reviews.reduce((acc, review) => acc + review.rating, 0) /
      menu.reviews.length;

    await menu.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});


//Get top rated menu
//GET /api/menu/:id
//Public access
const getTopMenu = asynchandler(async (req, res) => {
  const menu = await Menu.find({}).sort({ rating: -1 }).limit(4);
  res.status(200).json(menu)
});

export {
  getMenu,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu,
  createMenuReview,
  getTopMenu
};
