const express = require("express");
const path = require("path");
const pool = require("../config");
const bcrypt = require("bcrypt");
const Joi = require('joi');
const { generateToken, isAuth } = require("./auth/jwtAuth");
const { router } = require("./room");
const { func } = require("joi");

router = express.Router();


const passwordValidator = (value, helpers) => {
  if(value.length < 8){
    throw new Joi.ValidationError("Password must be at least 8 characters")
  }
  
  if(!(value.match(/[a-z]/)  && value.match(/[A-Z]/) && value.match(/[0-9]/))){
    throw new Joi.ValidationError('Password must contain 1 uppercase, lowercase and number')
  }
  return value
} 

const usernameDuplicateValidator = async (value, helpers) => {
  const [account_rows, account_field] = await pool.query('SELECT username FROM accounts WHERE username=?',[value])

  if(account_rows.length > 0){
    console.log(account_rows.length)
    throw new Joi.ValidationError('This username is already taken')
  }
} 


const signupSchema = Joi.object({
  first_name: Joi.string().max(30).required().label("First name Incorrect! First name must contain only 30 character"),
  last_name: Joi.string().max(30).required().label("Last name Incorrect!  Last name must contain only 30 character"),
  phone_number: Joi.string().required().pattern(/0[0-9]{9}/).label("Phone number Incorrect!"),
  username: Joi.string().required().external(usernameDuplicateValidator).min(8).label("Username must be at least 8 characters!"),
  password: Joi.string().required().max(15).custom(passwordValidator).label("Password must be at least 8 characters and must contain 1 uppercase, lowercase and number"),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().label("Confirm password mismatch password!")
})

router.post("/signup", async function (req, res, next) {
    // Your code here
    console.log(req.body)

    try{
      await signupSchema.validateAsync(req.body, {abortEarly: false})
    }catch (err){
      console.log(err.details)
      if(err.details != undefined){
        return res.status(400).json(err.details[0].message.split('" ')[0].substr(1))
      }else{
        return res.status(400).json("This username already exists")
      }
      
      // return res.status(400).json('not pass')
    }

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
      const [account_row, account_filed] = await pool.query("INSERT INTO accounts(username, password, role) VALUES(?,?,?)", [req.body.username, await bcrypt.hash(req.body.password, 10), "customer"]);
      const [customer_row, customer_field] = await pool.query("INSERT INTO customers(account_id, firstname, lastname, phone) VALUES(?,?,?,?)", [account_row.insertId, req.body.first_name, req.body.last_name, req.body.phone_number]);

      console.log(account_row)
      console.log(customer_row)
      return res.json(account_row);
    } catch (err) {
      console.log(err)
      return next(err);
    }

  });


const usernameCheckValidator = async (value, helpers) => {
  const [account_rows, account_field] = await pool.query('SELECT username FROM accounts WHERE username=?',[value])

  if(account_rows.length == 0){
    console.log(account_rows.length)
    throw new Joi.ValidationError("Your username doesn't exists")
  }
  console.log(account_rows.length)
} 


const loginSchema = Joi.object({
    username: Joi.string().required().min(8).external(usernameCheckValidator).label("Username must be at least 8 characters!"),
    password: Joi.string().required().min(8).label("Password Incorrect!")
    
})
router.post("/login", async function (req, res, next){
    console.log(req.body)
    try{
      await loginSchema.validateAsync(req.body, {abortEarly: false})

      const [account_row, account_filed] = await pool.query("SELECT * FROM accounts WHERE username=?", [req.body.username]);


      console.log(await bcrypt.compare(req.body.password,account_row[0].password))
      if(!(await bcrypt.compare(req.body.password,account_row[0].password))){
        return res.status(401).json("Password Incorrect")
      }

      try{
        console.log(account_row[0])
        console.log(account_row[0].username)
        const accessToken = generateToken({
        account_id: account_row[0].account_id,
        username: account_row[0].username,
        role: account_row[0].role
        })

        console.log(accessToken)
        return res.json({
              token: accessToken
              })
      }catch(err){
        return res.status(400).json("token boom")
      }
      
    }catch(err){
      console.log(err.details)
      if(err.details != undefined){
        return res.status(400).json(err.details[0].message.split('" ')[0].substr(1))
      }else{
        return res.status(400).json("Your username doesn't exists")
      }
    }

})

router.post("/account", isAuth, async function(req, res, next){

  const [account_row, account_filed] = await pool.query("SELECT * FROM accounts INNER JOIN customers ON accounts.account_id = customers.account_id WHERE accounts.account_id=?", [req.body.account_id]);

  return res.json(account_row[0])
})


const editSchema = Joi.object({
  firstname: Joi.string().max(30).required().label("First name Incorrect! First name must contain only 30 character"),
  lastname: Joi.string().max(30).required().label("Last name Incorrect!  Last name must contain only 30 character"),
  phone: Joi.string().required().pattern(/0[0-9]{9}/).label("Phone number Incorrect!"),
})
router.post("/edit-account", isAuth, async function(req, res, next){
  try{
    await editSchema.validateAsync({firstname: req.body.firstname, lastname: req.body.lastname, phone: req.body.phone}, {abortEarly: false})
  }catch (err){
    console.log(err.details)
    if(err.details != undefined){
      return res.status(400).json(err.details[0].message.split('" ')[0].substr(1))
    }else{
      return res.status(400).json("This username already exists")
    }
  }
  const [account_row, account_filed] = await pool.query("UPDATE customers SET firstname=?, lastname=?, phone=? WHERE account_id=?", [req.body.firstname, req.body.lastname, req.body.phone, req.body.account_id]);
  console.log(account_row)

  return res.json(account_row[0])
})

const changepasswordSchema = Joi.object({
  firstname: Joi.string().max(30).required().label("First name Incorrect! First name must contain only 30 character"),
  lastname: Joi.string().max(30).required().label("Last name Incorrect!  Last name must contain only 30 character"),
  phone: Joi.string().required().pattern(/0[0-9]{9}/).label("Phone number Incorrect!"),
})

router.post("/chenge-password", isAuth, function (req, res, next){
  try{
    await changepsswordSchema.validateAsync({firstname: req.body.firstname, lastname: req.body.lastname, phone: req.body.phone}, {abortEarly: false})
  }catch (err){
    console.log(err.details)
    if(err.details != undefined){
      return res.status(400).json(err.details[0].message.split('" ')[0].substr(1))
    }else{
      return res.status(400).json("This username already exists")
    }
  }
  const [account_row, account_filed] = await pool.query("UPDATE customers SET firstname=?, lastname=?, phone=? WHERE account_id=?", [req.body.firstname, req.body.lastname, req.body.phone, req.body.account_id]);
  console.log(account_row)

  return res.json(account_row[0])
})

router.post("/auth/me", isAuth, function(req, res, next){
  return res.json(req.user)
})



exports.router = router;