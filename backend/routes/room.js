const express = require("express");
const path = require("path")
const pool = require("../config");
const multer = require('multer')
const { isAuth, isStaff } = require("./auth/jwtAuth")
const Joi = require('joi');

router = express.Router();

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './static/uploads')
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + file.originalname)
    }
});


const upload = multer({ storage: storage });

//get all rooms
router.get("/rooms", async function (req, res, next) {
    try{
        const [rooms, columns] = await pool.query("SELECT * FROM rooms");
        return res.json(rooms);
    } catch (err) {
        return next(err);
    }
});

//get all rooms with banner
router.get("/rooms/banner", async function (req, res, next) {
    try{
        const [rooms, columns] = await pool.query("SELECT *  FROM rooms INNER JOIN images  ON (rooms.room_id = images.room_id)  WHERE images.banner = 1");
        return res.json({rooms: rooms, user: req.user});
    } catch (err) {
        return next(err);
    }
});
//get images from a room
router.get("/rooms/:room_id/images", async function (req, res, next) {
    try{
        const [rooms, columns] = await pool.query("SELECT images.file_path, images.banner FROM rooms INNER JOIN images ON (rooms.room_id = images.room_id)  WHERE rooms.room_id = ?", [req.params.room_id]);
        return res.json(rooms);
    } catch (err) {
        return next(err);
    }
});

//get instruments from a room
router.get("/rooms/:room_id/instruments", async function (req, res, next) {
    try{
        const [rooms, columns] = await pool.query("SELECT instruments.instrument_name, instruments.quantity FROM rooms INNER JOIN instruments ON (rooms.room_id = instruments.room_id)  WHERE rooms.room_id = ?", [req.params.room_id]);
        return res.json(rooms);
    } catch (err) {
        return next(err);
    }
});

//get room
router.get("/rooms/:room_id", async function (req, res, next) {
    try{
        const [rooms, columns] = await pool.query("SELECT * FROM rooms WHERE room_id = ?", [req.params.room_id]);
        return res.json(rooms);
    } catch (err) {
        return next(err);
    }
});

//get instruments from a room
router.get("/rooms/:room_id/instruments", async function (req, res, next) {
    try{
        const [rooms, columns] = await pool.query("SELECT instruments.instrument_name, instruments.quantity FROM rooms INNER JOIN instruments ON (rooms.room_id = instruments.room_id)  WHERE rooms.room_id = ?", [req.params.room_id]);
        return res.json(rooms);
    } catch (err) {
        return next(err);
    }
});

const manageRoomSchema = Joi.object({
    room_name: Joi.string().max(30).required().label("Room Name must be contain only 30 characters"),
    type_name: Joi.string().required().label("Please select Room type"),
    room_status: Joi.string().required().label("Please select Room Status"),
    room_price: Joi.number().integer().required().label("Please fill in Room Price"),
    room_description: Joi.string().max(420).required().label("Room Description must be contain only 420 characters"),
})

//add new room
router.post("/rooms",isAuth, isStaff, async function (req, res, next) {

    const validateField= {
        room_name: req.body.room_name, 
        type_name: req.body.type_name, 
        room_status: req.body.room_status, 
        room_price: req.body.room_price, 
        room_description: req.body.room_description
    }

    try{
        await manageRoomSchema.validateAsync(validateField, {abortEarly: false})
    }catch (err){
        console.log(err.details)
        if(err.details != undefined){
          return res.status(400).json(err.details[0].message.split('" ')[0].substr(1))
        }
    }

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
        const [rooms, columns] = await pool.query(
            'INSERT INTO rooms(room_name, room_type, room_status, room_price, room_description) VALUES(?, ?, ?, ?, ?)', 
            [req.body.room_name, req.body.type_name, req.body.room_status, req.body.room_price, req.body.room_description]);

        for (let index = 0; index < req.body.room_instrument.length; index++) {
            const [instruments, columns2] = await pool.query(
                'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES(?, ?, ?)', 
                [rooms.insertId, req.body.room_instrument[index].quantity, req.body.room_instrument[index].instrument_name]);
        }

        //for banner
        var banner_image_path = 'bannerImage-' + req.body.banner_image
        const [images, columns3] = await pool.query(
            'INSERT INTO images(room_id, file_path, banner) VALUES(?, ?, ?)', 
            [rooms.insertId, '/uploads/'+banner_image_path, 1]);
        
        await conn.commit()
        return res.json({id: rooms.insertId})
    } catch (err) {
        await conn.rollback();
        return next(err);
    } finally {
        conn.release();
    }
});

//add image multer
router.post("/images", upload.any(), function (req, res, next) {
});

//edit room
router.put("/rooms/:room_id",isAuth, isStaff, async function (req, res, next) {

    const validateField= {
        room_name: req.body.room_name, 
        type_name: req.body.type_name, 
        room_status: req.body.room_status, 
        room_price: req.body.room_price, 
        room_description: req.body.room_description
    }

    try{
        await manageRoomSchema.validateAsync(validateField, {abortEarly: false})
    }catch (err){
        console.log(err.details)
        if(err.details != undefined){
          return res.status(400).json(err.details[0].message.split('" ')[0].substr(1))
        }
    }

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
        //delete all instrument in this room
        const [deleteInstruments, columns2] = await conn.query("DELETE FROM instruments WHERE room_id = ?", [req.params.room_id]);

        if(req.body.banner_image != null){
            //delete images in this room
            const deleteimages = await pool.query("DELETE FROM images WHERE room_id = ?", [req.params.room_id]);
        }

        // //add room
        const [rooms, columns] = await conn.query("UPDATE rooms SET room_name = ?, room_type = ?, room_status = ?, room_price = ?, room_description = ? WHERE room_id = ?", 
        [req.body.room_name, req.body.type_name, req.body.room_status, req.body.room_price, req.body.room_description, req.params.room_id]);

        //add instrument
        for (let index = 0; index < req.body.room_instrument.length; index++) {
            const instruments = await conn.query(
                'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES(?, ?, ?)', 
                [parseInt(req.params.room_id), req.body.room_instrument[index].quantity, req.body.room_instrument[index].instrument_name]);
            }

        
        if(req.body.banner_image != null){
            //for add banner
            var banner_photo_path = 'bannerImage-' + req.body.banner_image
            const images = await conn.query(
                'INSERT INTO images(room_id, file_path, banner) VALUES(?, ?, ?)', 
                [req.params.room_id, '/uploads/'+banner_photo_path, 1]);
        }
        

        await conn.commit()
        return res.send('Room ID ' + req.params.room_id + ' is updated.');
    } catch (err) {
        await conn.rollback();
        return next(err);
    } finally {
        conn.release();
    }
});

//delete room
router.delete("/rooms/:room_id",isAuth, isStaff, async function (req, res, next) {

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
        const [rooms, columns] = await conn.query("DELETE FROM rooms WHERE room_id = ?", [req.params.room_id]);

        //delete all instrument in this room
        const [deleteInstruments, columns2] = await conn.query("DELETE FROM instruments WHERE room_id = ?", [req.params.room_id]);

        //delete images in this room
        const [images, columns3] = await conn.query("DELETE FROM images WHERE room_id = ?", [req.params.room_id]);

        await conn.commit()
        return res.send('Room ID ' + req.params.room_id + ' is deleted.');
    } catch (err) {
        await conn.rollback();
        return next(err);
    } finally {
        conn.release();
    }
});

exports.router = router;