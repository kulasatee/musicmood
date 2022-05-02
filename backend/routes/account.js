const express = require("express");
const path = require("path")
const pool = require("../config");
const bcrypt = require("bcrypt")
const Joi = require('joi')

router = express.Router();


const passwordValidator = (value, helpers) => {
  if(value.length < 8){
    throw new Joi.ValidationError("Password must be at least 8 characters")
  }
  
  if(!(value.match(/[a-z]/)  && value.match(/[A-Z]/) && value.match(/[0-9]/))){
    throw new Joi.ValidationError('Password must contain 1 uppercase, lowercase and number')
  }
} 

const usernameValidator = (value, helpers) => {
  if(value.length < 8){
    throw new Joi.ValidationError("Username must be at least 8 characters")
  }
  
  if(!((value.match(/[a-z]/) || value.match(/[A-Z]/)) && value.match(/[0-9]/))){
    throw new Joi.ValidationError('Username must contain 1 uppercase, lowercase and number')
  }
} 

const signupSchema = Joi.object({
  first_name: Joi.string().max(30).required().label("First name Incorrect! First name must contain only 30 character"),
  last_name: Joi.string().max(30).required().label("Last name Incorrect!  Last name must contain only 30 character"),
  phone_number: Joi.string().required().pattern(/0[0-9]{9}/).label("Phone number Incorrect!"),
  username: Joi.string().required().custom(usernameValidator).label("Username must be at least 8 characters and must contain 1 uppercase or lowercase and number"),
  password: Joi.string().required().max(15).custom(passwordValidator).label("Password must be at least 8 characters and must contain 1 uppercase, lowercase and number"),
  confirm_password: Joi.string().valid(Joi.ref('password')).label("Confirm password mismatch password!")
})

router.post("/signup", async function (req, res, next) {
    // Your code here
    console.log(req.body)

    try{
      await signupSchema.validateAsync(req.body, {abortEarly: false})
    }catch (err){
      console.log(err.details[0])
      return res.status(400).json(err.details[0].message.split('" ')[0].substr(1))
    }

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
      const [account_row, account_filed] = await pool.query("INSERT INTO accounts(username, password, role)", [req.body.username, bcrypt.hash(req.password, 10), "customer"]);
      const [customer_row, customer_field] = await pool.query("INSERT INTO customers(account_id, firstname, lastname, phone)", [account_row.insertId, req.body.first_name, req.body.last_name, req.body.phone_number]);

      console.log(account_row)
      console.log(customer_row)
      return res.json(account_row);
    } catch (err) {
      console.log(err)
      return next(err);
    }

  });
  

exports.router = router;