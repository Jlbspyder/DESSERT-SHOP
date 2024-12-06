import asynchandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from '../utilities/generateToken.js';

//Login user
//POST /api/users/login
//Public access
const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id)

    res.status(200).json({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        // dob: user.dob,
        isAdmin: user.isAdmin
    })
  } else {
    res.status(401);
    throw new Error('Invalid email or password')
  }
});

//Register user
//POST /api/users
//Public access
const regUser = asynchandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  } 
  const user = await User.create({
    firstname,
    lastname,
    email,
    // dob,
    password,
  })
  if (user) {
    generateToken(res, user._id)
    res.status(201).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      // dob: user.dob,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data')
  }
});

//Logout user
//POST /api/user/login
//Private access
const LogoutUser = asynchandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out'})
});

//Get users profile
//GET /api/users/profile
//Private access
const getUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      // dob: user.dob,
      isAdmin: user.isAdmin
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

//Update users profile
//PUT /api/users/profile
//Private access
const updateUserProfile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname
    user.lastname = req.body.lastname || user.lastname
    user.email = req.body.email || user.email
    // user.dob = req.body.dob || user.dob

    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      // dob: updatedUser.dob,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404);
    throw new Error('User not found')
  }
});

//Get users
//GET /api/users
//Private/Admin access
const getUsers = asynchandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users)
});

//Get users by ID
//GET /api/users/:id
//Private/Admin access
const getUserByID = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Delete user
//DELETE /api/users/:id
//Private/Admin access
const deleteUser = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error('Cannot delete admin user')
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User deleted'});
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//Update user
//PUT /api/users/:id
//Private/Admin access
const updateUser = asynchandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstname = req.body.firstname || user.firstname;
    user.lastname = req.body.lastname || user.lastname;
    user.email = req.body.email || user.email;
    // user.dob = req.body.dob || user.dob
    user.isAdmin = Boolean(req.body.isAdmin || user.isAdmin);

    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      firstname: updatedUser.firstname,
      lastname: updatedUser.lastname,
      email: updatedUser.email,
      // dob: updatedUser.dob,
      isAdmin: updatedUser.isAdmin
    })
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  loginUser,
  regUser,
  LogoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
