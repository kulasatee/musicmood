const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

//get all reviews
router.get("/reviews", async function (req, res, next) {
    try{
        const [reviews, columns] = await pool.query("SELECT * FROM reviews INNER JOIN customers ON reviews.account_id = customers.account_id");
        return res.json(reviews);
    } catch (err) {
        return next(err);
    }
});

//get all reviews by room id
router.get("/reviews/:room_id", async function (req, res, next) {
    try{
        const [reviews, columns] = await pool.query("SELECT * FROM reviews INNER JOIN customers ON (reviews.account_id = customers.account_id) WHERE reviews.room_id = ?", [req.params.room_id]);
        return res.json(reviews);
    } catch (err) {
        return next(err);
    }
});


//add new review
router.post("/reviews", async function (req, res, next) {
    try{
        const [reviews, columns] = await pool.query(
            'INSERT INTO reviews(account_id, room_id, review) VALUES(?, ?, ?)', 
            [req.body.account_id, req.body.room_id, req.body.review]);
        
        return res.json(reviews.insertId);
    } catch (err) {
        return next(err);
    }
});

//edit review
router.put("/reviews/:review_id", async function (req, res, next) {
    try{
        const [reviews, columns] = await pool.query(
            'UPDATE reviews SET review = ? WHERE review_id = ?', 
            [req.body.review, req.params.review_id]);
        
        return res.send('Review (Review ID: ' + req.params.review_id + ') has been edited');
    } catch (err) {
        return next(err);
    }
});

//delete review
router.delete("/reviews/:review_id", async function (req, res, next) {
    try{
        const [reviews, columns] = await pool.query(
            'DELETE FROM reviews WHERE review_id = ?', 
            [req.params.review_id]);
        
        return res.send('Review (Review ID: ' + req.params.review_id + ') has been deleted');
    } catch (err) {
        return next(err);
    }
});

exports.router = router;