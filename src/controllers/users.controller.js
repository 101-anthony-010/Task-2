const User = require('../models/user.model');
const catchAsync = require('./../utils/catchAsync');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(16);
  const encryptedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password: encryptedPassword,
  });

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    message: 'The user has been created',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({
      where: {
        email: email.toLowerCase(),
        status: 'available',
      },
    });
  
    if (!user) {
      return next(new AppError(`User with email: ${email} not found`, 404));
    }
  
    if (!(await bcrypt.compare(password, user.password))) {
      return next(new AppError(`Incorrect email or password`, 401));
    }
  
    const token = await generateJWT(user.id);
  
    res.status(200).json({
      status: 'success',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        description: user.description,
        profileImgUrl: user.profileImgUrl,
        role: user.role,
      },
    });
  });