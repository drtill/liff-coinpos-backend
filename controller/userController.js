require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { signInToken, tokenForVerify, sendEmail } = require('../config/auth');
//const Constant = require('../utils/constants');

const serviceUrl = process.env.COINPOS_URL;

const verifyEmailAddress = async (req, res) => {

  var msgReturn = JSON.stringify(req.body);
  res.send({
    message:msgReturn
  });
  return;

  const isAdded = await User.findOne({ email: req.body.email });
  if (isAdded) {
    return res.status(403).send({
      message: 'This Email already Added!',
    });
  } else {
    const token = tokenForVerify(req.body);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.email}`,
      subject: 'Email Activation',
      subject: 'Verify Your Email',
      html: `<h2>Hello ${req.body.email}</h2>
      <p>Verify your email address to complete the signup and login into your <strong>KachaBazar</strong> account.</p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for active your account</p>

        <a href=${process.env.STORE_URL}/user/email-verification/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at support@kachabazar.com</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>Kachabazar Team</strong>
             `,
    };

    const message = 'Please check your email to verify!';
    sendEmail(body, res, message);
  }
};
const verifyCoinPOSEmailAddress = async (req, res) => {

  //var msgReturn = "CoinPOS " + JSON.stringify(req.body);
  //res.send({
  //  message:msgReturn
  //});
  //return;

  const isAdded = await findCoinPOSEmail(req.body.companyId,req.body.email);
  
  if (isAdded) {
    return res.status(403).send({
      message: 'This Email already Added!',
    });
  } else {
    
    const token = tokenForVerify(req.body);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.email}`,
      subject: 'Email Activation',
      subject: 'Verify Your Email',
      html: `<h2>Hello ${req.body.email}</h2>
      <p>Verify your email address to complete the signup and login into your <strong>${req.body.companyName}</strong> account.</p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for active your account</p>

        <a href=${process.env.STORE_URL}/user/email-verification/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Verify Account</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at ${req.body.locationEmail}</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>${req.body.companyName} Team</strong>
             `,
    };

    const message = 'Please check your email to verify!';
    sendEmail(body, res, message);
  }
};

const findCoinPOSEmail = async(companyId, email) => 
{
  try
  {
    await fetch(serviceUrl + 'GetEmailInCompany',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"Email":"${email}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      console.log(data); // this will be a string
      productList = data;
    });
    
    return productList;
      //res.send(productList);
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const findCoinPOSCustomerAccount = async(companyId, email, password) => 
{
  try
  {
    await fetch(serviceUrl + 'CoinPOSCustomerAccountLogin',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"Email":"${email}", "Password":"${password}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      console.log(data); // this will be a string
      productList = data;
    });
    
    return productList;
      //res.send(productList);
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const resetCustomerAccountPassword = async(companyId, email, password) => 
{
  try
  {
    await fetch(serviceUrl + 'ResetCustomerAccountPassword',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"Email":"${email}", "Password":"${password}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      console.log(data); // this will be a string
      productList = data;
    });
    
    return productList;
      //res.send(productList);
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const RegisterCoinPOSCustomerAccount = async(companyId, email, password, name) =>
{
  try
  {
    await fetch(serviceUrl + 'RegisterCustomerAccount',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${companyId},"Email":"${email}", "DisplayName":"${name}", "Password":"${password}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      console.log("Regis Data = " + data); // this will be a string
      productList = data;
    });
    
    return productList;
      //res.send(productList);
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
const registerUser = async (req, res) => {

  
  const token = req.params.token;
  const { name, email, password, companyId } = jwt.decode(token);
  /*var msgReturn = JSON.stringify(req.body);
  console.log("name = " + name + " email = " + email + " password = " + password); 
  res.send({
    message:msgReturn
  });
  return;*/

  //const isAdded = await User.findOne({ email: email });

  const isAdded = await findCoinPOSEmail(companyId,email);

  if (isAdded) {
    const token = signInToken(isAdded);
    return res.send({
      token,
      name: isAdded.name,
      email: isAdded.email,
      message: 'Email Already Verified!',
    });
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Token Expired, Please try again!',
        });
      } else {
        const newUser = RegisterCoinPOSCustomerAccount(companyId, email, password, name)
        /*const newUser = new User({
          name,
          email,
          password: bcrypt.hashSync(password),
        });
        newUser.save();*/
        const token = signInToken(newUser);
        res.send({
          token,
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          message: 'Email Verified, Please Login Now!',
        });
      }
    });
  }
};
const checkCoinposUserExpired = async(req,res) =>
{
  try
  {
    await fetch(serviceUrl + 'CheckCoinposUserExpired',//fetch('http://localhost:5002/simple-cors3', 
    { 
      method:'POST',
      //credentials:"include",
      headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
      body:`{"CompanyId":${req.body.companyId},"Email":"${req.body.email}"}`
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

      //var obj = JSON.parse(data);
      //console.log("Obj = " + obj);
      console.log("expired = " + data); // this will be a string
      productList = data;
    });
    
    //return productList;
    res.send(productList);
  }
  catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
}
const registerCoinPOSUser = async (req, res) => {

  
  const token = req.params.token;
  const { name, email, password, companyId } = jwt.decode(token);
  //var msgReturn = //JSON.stringify(req.body);
  //console.log("name = " + name + " email = " + email + " password = " + password + " companyId = " + companyId); 
  //res.send({
  //  message:msgReturn
  //});
  //return;

  //const isAdded = await User.findOne({ email: email });

  const isAdded = await findCoinPOSEmail(companyId,email);
  
  if (isAdded) {
    const token = signInToken(isAdded);
    return res.send({
      token,
      name: isAdded.name,
      email: isAdded.email,
      message: 'Email Already Verified!',
    });
  }

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: 'Token Expired, Please try again!',
        });
      } else {
        /*const newUser = new User({
          name,
          email,
          password: bcrypt.hashSync(password),
        });
        newUser.save();*/
        const newUser = RegisterCoinPOSCustomerAccount(companyId,email,password,name);
        const token = signInToken(newUser);
        res.send({
          token,
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          message: 'Email Verified, Please Login Now!',
        });
      }
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.registerEmail });

    if (
      user &&
      user.password &&
      bcrypt.compareSync(req.body.password, user.password)
    ) {
      const token = signInToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
      });
    } else {
      res.status(401).send({
        message: 'Invalid user or password!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};
const coinposLoginUser = async (req, res) => {
  try {
    console.log("coinposLoginUser = " + JSON.stringify(userJson)); 
    return res.status(404).send({
      message: 'User Not found with this email!',
    });
    //const user = await User.findOne({ email: req.body.registerEmail });
    const userJson = await findCoinPOSCustomerAccount(req.body.companyId,req.body.registerEmail,req.body.password);//findCoinPOSEmail(req.body.companyId,req.body.email);

    console.log("user = " + JSON.stringify(userJson)); 
    /* if (
      user &&
      user.password &&
      bcrypt.compareSync(req.body.password, user.password)
     )*/ 

    if(userJson)
    {
      const user = JSON.parse(userJson);
      const token = signInToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        image: user.image,
        paramPath: req.body.paramPath,
        customerId: user.customerId,
        customerName: user.customerName,
        customerTypeId: user.customerTypeId,
        customerType: user.customerType,
        imageUrl: user.imageUrl,
        firstName: user.firstName,
        middleName: user.middleName,
        lastName: user.lastName,
        customerAddressId: user.customerAddressId,
        countrys: user.countrys,
        provinces: user.provinces,
        cities: user.cities,
        districts: user.districts,
        address1: user.address1,
        postalcode: user.postalcode,
        districtId: user.districtId,
        cityId: user.cityId,
        provinceId: user.provinceId,
        countryId: user.countryId,
        country: user.country,
        province: user.province,
        city: user.city,
        district: user.district,
        




      });
    } else {
      res.status(401).send({
        message: 'Invalid user or password!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const forgetPassword = async (req, res) => {
  const isAdded = await User.findOne({ email: req.body.verifyEmail });
  if (!isAdded) {
    return res.status(404).send({
      message: 'User Not found with this email!',
    });
  } else {
    const token = tokenForVerify(isAdded);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.verifyEmail}`,
      subject: 'Password Reset',
      html: `<h2>Hello ${req.body.verifyEmail}</h2>
      <p>A request has been received to change the password for your <strong>${req.body.companyName}</strong> account </p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href=${process.env.STORE_URL}/user/forget-password/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at ${req.body.locationEmail}</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>${req.body.companyName} Team</strong>
             `,
    };

    const message = 'Please check your email to reset password!';
    sendEmail(body, res, message);
  }
};
const forgetCoinPOSCustomerPassword = async (req, res) => {
  
  const isAdded = await findCoinPOSEmail(req.body.companyId,req.body.email);
  //const isAdded = await User.findOne({ email: req.body.verifyEmail });
  if (!isAdded) {
    return res.status(404).send({
      message: 'User Not found with this email!',
    });
  } else {
    const token = tokenForVerify(req.body);
    const body = {
      from: process.env.EMAIL_USER,
      to: `${req.body.email}`,
      subject: 'Password Reset',
      html: `<h2>Hello ${req.body.email}</h2>
      <p>A request has been received to change the password for your <strong>${req.body.companyName}</strong> account </p>

        <p>This link will expire in <strong> 15 minute</strong>.</p>

        <p style="margin-bottom:20px;">Click this link for reset your password</p>

        <a href=${process.env.STORE_URL}/user/forget-password/${token} style="background:#22c55e;color:white;border:1px solid #22c55e; padding: 10px 15px; border-radius: 4px; text-decoration:none;">Reset Password</a>

        <p style="margin-top: 35px;">If you did not initiate this request, please contact us immediately at ${req.body.locationEmail}</p>

        <p style="margin-bottom:0px;">Thank you</p>
        <strong>${req.body.companyName} Team</strong>
             `,
    };

    const message = 'Please check your email to reset password!';
    sendEmail(body, res, message);
  }
};

const resetPassword = async (req, res) => {
  const token = req.body.token;
  const { email } = jwt.decode(token);
  const user = await User.findOne({ email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: 'Token expired, please try again!',
        });
      } else {
        user.password = bcrypt.hashSync(req.body.newPassword);
        user.save();
        res.send({
          message: 'Your password change successful, you can login now!',
        });
      }
    });
  }
};
const resetCoinPOSCustomerPassword = async (req, res) => {
  const token = req.body.token;
  const { email, companyId} = jwt.decode(token);
  
  console.log("email = " + email + " companyId = " + companyId);

  const user = await findCoinPOSEmail(companyId,email);
  //const user = await User.findOne({ email: email });

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET_FOR_VERIFY, (err, decoded) => {
      if (err) {
        return res.status(500).send({
          message: 'Token expired, please try again!',
        });
      } else {
       resetCustomerAccountPassword(companyId,email,req.body.newPassword);
        //user.password = bcrypt.hashSync(req.body.newPassword);
        //user.save();
        res.send({
          message: 'Your password change successful, you can login now!',
        });
      }
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user.password) {
      return res.send({
        message:
          'For change password,You need to sign in with email & password!',
      });
    } else if (
      user &&
      bcrypt.compareSync(req.body.currentPassword, user.password)
    ) {
      user.password = bcrypt.hashSync(req.body.newPassword);
      await user.save();
      res.send({
        message: 'Your password change successfully!',
      });
    } else {
      res.status(401).send({
        message: 'Invalid email or current password!',
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const signUpWithProvider = async (req, res) => {
  try {
    const isAdded = await User.findOne({ email: req.body.email });
    if (isAdded) {
      const token = signInToken(isAdded);
      res.send({
        token,
        _id: isAdded._id,
        name: isAdded.name,
        email: isAdded.email,
        address: isAdded.address,
        phone: isAdded.phone,
        image: isAdded.image,
      });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
      });

      const user = await newUser.save();
      const token = signInToken(user);
      res.send({
        token,
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      });
    }
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const getAllUsers1 = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
const allUser = async (req, res) => {
  try {
    const users = await User.find({}).sort({ _id: -1 });
    res.send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(500).send({
      message: err.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name;
      user.email = req.body.email;
      user.address = req.body.address;
      user.phone = req.body.phone;
      user.image = req.body.image;
      const updatedUser = await user.save();
      const token = signInToken(updatedUser);
      res.send({
        token,
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        address: updatedUser.address,
        phone: updatedUser.phone,
        image: updatedUser.image,
      });
    }
  } catch (err) {
    res.status(404).send({
      message: 'Your email is not valid!',
    });
  }
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message,
      });
    } else {
      res.status(200).send({
        message: 'User Deleted Successfully!',
      });
    }
  });
};

const getLiffURLTemplate = async(req,res) => 
{
  try
  {
    //res.send("getLiff URL");
    //return;
    //var template = "";
    var url = serviceUrl + 'GetLiffURLTemplate'
    //res.send("getLiff URL = " + url);
    //return;
    console.log("getLiff URL")
    await fetch(url,
      { 
        method:'GET',
        //credentials:"include",
        headers: {'Content-Type': 'application/json','x-security-lock':'0241CCFF2D40AF7AF8A4FC02272C47A30D15DBDFB36E3266D1296212574F328E'},
        
      }).then(function(response) {
        return response.text();
      }).then(function(data) {

        console.log(data);
        var obj = data;
        template = obj;
      });
    
    

      res.send(template);
  }
  catch(err) {
    res.status(500).send({
      message: err.message,
    });
  }
}

module.exports = {
  loginUser,
  coinposLoginUser,
  registerUser,
  registerCoinPOSUser,
  checkCoinposUserExpired,
  signUpWithProvider,
  verifyEmailAddress,
  verifyCoinPOSEmailAddress,
  forgetPassword,
  forgetCoinPOSCustomerPassword,
  changePassword,
  resetPassword,
  resetCoinPOSCustomerPassword,
  getAllUsers,
  getAllUsers1,
  getUserById,
  updateUser,
  deleteUser,
  getLiffURLTemplate,
  allUser,
};
