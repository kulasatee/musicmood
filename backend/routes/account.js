const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
    // Your code here
    try{
      const [rows, fields] = await pool.query("SELECT * FROM accounts");
  
      return res.json(rows);
  
    } catch (err) {
      console.log(err)
      return next(err);
    }
  });
  

exports.router = router;