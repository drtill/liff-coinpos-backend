const express = require('express');
const router = express.Router();
const {
  loginUser,
  coinposLoginUser,
  registerUser,
  registerCoinPOSUser,
  checkCoinposUserExpired,
  signUpWithProvider,
  verifyEmailAddress,
  forgetPassword,
  forgetCoinPOSCustomerPassword,
  changePassword,
  resetPassword,
  resetCoinPOSCustomerPassword,
  getAllUsers,
  getAllUsers1,
  getLiffURLTemplate,
  getUserById,
  updateUser,
  deleteUser,
  allUser,
  verifyCoinPOSEmailAddress
} = require('../controller/userController');
const {
  passwordVerificationLimit,
  emailVerificationLimit,
} = require('../config/others');

//verify email
router.post('/verify-email', emailVerificationLimit, verifyEmailAddress);
//verify email
router.post('/verify-coinpos-email', emailVerificationLimit, verifyCoinPOSEmailAddress);

//register a user
router.post('/register/:token', registerUser);
router.post('/coinpos-register/:token', registerCoinPOSUser);

router.post('/coinpos-check-expired', checkCoinposUserExpired);
//router.get('/email-verification/:token', registerUser);

//login a user
router.post('/login', loginUser);
router.post('/coinPOS-login', coinposLoginUser);

//register or login with google and fb
router.post('/signup', signUpWithProvider);

//forget-password
router.put('/forget-password', passwordVerificationLimit, forgetPassword);
router.put('/coinpos-customer-forget-password', passwordVerificationLimit, forgetCoinPOSCustomerPassword);

//reset-password
router.put('/reset-password', resetPassword);
router.put('/coinpos-customer-reset-password', resetCoinPOSCustomerPassword);

//change password
router.post('/change-password', changePassword);

//get all user
router.get('/allUser1',getLiffURLTemplate)

router.get('/allUser', getAllUsers);

//get all user
router.get('/', getAllUsers);


//get liff url template


//get a user
router.get('/:id', getUserById);

//update a user
router.put('/:id', updateUser);

//delete a user
router.delete('/:id', deleteUser);

module.exports = router;
