import asynchandler from '../middleware/asyncHandler.js';
import AddressBook from '../models/addressBookModel.js';
import Order from '../models/orderModel.js';
import User from '../models/userModel.js';



//Fetch AddressBook
//GET /api/addressbook
//Private access
const getAddressBook = asynchandler(async (req, res) => {
  // const addresses = await AddressBook.find({ user: req.user._id});
  // res.status(200).json(addresses); 
    const pageSize = process.env.PAGINATION_LIMIT;
    const page = Number(req.query.pageNumber) || 1;
  
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword, $options: 'i' } }
      : {};
  
    const count = await AddressBook.countDocuments({ ...keyword });
  
    const address = await AddressBook.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ address, page, pages: Math.ceil(count / pageSize) });
  });
  

//Create Address
//POST /api/addressbook
//Private access
const createAddressBook = asynchandler(async (req, res) => {
 
  const { name, address, city, postalCode, state, country } = req.body;


    const addy = await AddressBook.create({
        name,
        address,
        city,
        postalCode,
        state,
        country
    })
    if (addy) {
        res.status(201).json({
        _id: addy._id,
        name: addy.name,
        address: addy.address,
        city: addy.city,
        postalCode: addy.postalCode,
        state: addy.state,
        country: addy.country
        })
    } else {
        res.status(400);
        throw new Error('Enter an address')
    } 
  });

//Get address by ID
//GET /api/addressbook/:id
//Private access
const getAddressById = asynchandler(async (req, res) => {
  const addresses = await AddressBook.findById(req.params.id);

  if (addresses) {
    res.status(200).json(addresses)
  } else {
    res.status(404);
    throw new Error('Address not found')
  }
})

  export { getAddressBook, createAddressBook, getAddressById };