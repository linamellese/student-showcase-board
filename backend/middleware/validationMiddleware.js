const { body, validationResult } = require('express-validator');

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      message: 'Validation failed', 
      errors: errors.array() 
    });
  }
  next();
};

const signupValidation = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long')
    .isLength({ max: 100 }).withMessage('Name cannot exceed 100 characters'),
  
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/).withMessage('Password must contain at least one letter and one number'),
  
  validateRequest
];

const loginValidation = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email')
    .normalizeEmail(),
  
  body('password')
    .notEmpty().withMessage('Password is required'),
  
  validateRequest
];

const projectValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ min: 3 }).withMessage('Title must be at least 3 characters long')
    .isLength({ max: 200 }).withMessage('Title cannot exceed 200 characters'),
  
  body('description')
    .trim()
    .notEmpty().withMessage('Description is required')
    .isLength({ min: 20 }).withMessage('Description must be at least 20 characters long')
    .isLength({ max: 5000 }).withMessage('Description cannot exceed 5000 characters'),
  
  body('techStack')
    .custom(value => {
      if (!Array.isArray(value)) {
        throw new Error('Tech stack must be an array');
      }
      if (value.length === 0) {
        throw new Error('At least one technology is required');
      }
      return true;
    }),
  
  body('githubUrl')
    .optional()
    .isURL().withMessage('Please provide a valid URL'),
  
  body('liveUrl')
    .optional()
    .isURL().withMessage('Please provide a valid URL'),
  
  body('image')
    .optional()
    .isURL().withMessage('Please provide a valid URL'),
  
  validateRequest
];

module.exports = {
  signupValidation,
  loginValidation,
  projectValidation
};