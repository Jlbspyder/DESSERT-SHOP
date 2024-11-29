import asynchandler from '../middleware/asyncHandler.js';
import Address from '../models/addressModel.js';

//Fetch Address
//GET /api/menu
//Public access
const getAddress = asynchandler(async (req, res) => {
  const pageSize = process.env.PAGINATION_LIMIT;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  const count = await Address.countDocuments({ ...keyword });

  const address = await Address.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ address, page, pages: Math.ceil(count / pageSize) });
});

//Fetch Single address
//GET /api/address/:id
//Public access
const getAddressById = asynchandler(async (req, res) => {
  const address = await Address.findById(req.params.id);

  if (address) {
    return res.json(address);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

export { getAddress, getAddressById };
