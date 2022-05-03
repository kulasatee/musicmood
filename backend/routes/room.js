const express = require("express");
const path = require("path")
const pool = require("../config");
const multer = require('multer')

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

//add new room
router.post("/rooms", async function (req, res, next) {
    console.log(req.body)

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
        return res.send('A new room is added (ID: '+ rooms.insertId +')');
    } catch (err) {
        await conn.rollback();
        return next(err);
    } finally {
        console.log('finally')
        conn.release();
    }
});

//add image multer
router.post("/images", upload.any(), async function (req, res, next) {
    const file = req.file;
    
    // if (!file) {
    //     const error = new Error("Please upload a file");
    //     error.httpStatusCode = 400;
    //     return next(error);
    // }

});

//edit room
router.put("/rooms/:room_id", async function (req, res, next) {

    console.log(req.body)
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
        //add room
        const [rooms, columns] = await pool.query("UPDATE rooms SET room_name = ?, room_type = ?, room_status = ?, room_price = ?, room_description = ? WHERE room_id = ?", 
        [req.body.room_name, req.body.type_name, req.body.room_status, req.body.room_price, req.body.room_description, req.params.room_id]);

        //add instrument
        for (let index = 0; index < req.body.room_instrument.length; index++) {
            const instruments = await pool.query(
                'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES(?, ?, ?)', 
                [req.params.room_id, req.body.room_instrument[index].quantity, req.body.room_instrument[index].instrument_name]);
            }

        //for add banner
        var banner_photo_path = 'bannerImage-' + req.body.banner_image
        const images = await pool.query(
            'INSERT INTO images(room_id, file_path, banner) VALUES(?, ?, ?)', 
            [req.params.room_id, '/uploads/'+banner_photo_path, 1]);


        // //delete all instrument in this room
        // const deleteInstruments = await pool.query("DELETE FROM instruments WHERE room_id = ?", [req.params.room_id]);

        //delete images in this room
        // const deleteimages = await pool.query("DELETE FROM images WHERE room_id = ?", [req.params.room_id]);

        // Promise.all([deleteInstruments, deleteimages])
        // .then(async(results) => {
        //     // add instrument
        //     for (let index = 0; index < req.body.room_instrument.length; index++) {
        //     const instruments = await pool.query(
        //         'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES(?, ?, ?)', 
        //         [req.params.room_id, req.body.room_instrument[index].quantity, req.body.room_instrument[index].instrument_name]);
        //     }

        //     // const instruments = await pool.query(
        //     //     'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES("7", "1", "เบส"), ("7", "2", "แอม"), ("7", "3", "กีต้า"), ("7", "4", "แอมม")');

            
        //     // var values = [[7, 5, 'amp'],[7, 6, 'amp'],[7, 7, 'amp'],[7, 8, 'amp']];
        //     // const instruments = await pool.query(
        //     //     'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES ?', 
        //     //     [req.body.room_instrument.map(item => [req.params.room_id, item.quantity, item.instrument_name])]);
    
        //     //for banner
        //     var banner_photo_path = 'bannerImage-' + req.body.banner_image
        //     const images = await pool.query(
        //         'INSERT INTO images(room_id, file_path, banner) VALUES(?, ?, ?)', 
        //         [req.params.room_id, '/uploads/'+banner_photo_path, 1]);
        // })
        // .catch((err) => {
        // return next(err);
        // });
        
        return res.send('Room ID ' + req.params.room_id + ' is updated.');
    } catch (err) {
        await conn.rollback();
        return next(err);
    } finally {
        console.log('finally')
        conn.release();
    }
});

//delete instrument and image
router.delete("/rooms/:room_id/instruments", async function (req, res, next) {

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
        //delete all instrument in this room
        const [deleteInstruments, columns2] = await pool.query("DELETE FROM instruments WHERE room_id = ?", [req.params.room_id]);

        //delete images in this room
        // const deleteimages = await pool.query("DELETE FROM images WHERE room_id = ?", [req.params.room_id]);

        return res.send('delete instrument success');
    } catch (err) {
        await conn.rollback();
        return next(err);
    } finally {
        console.log('finally')
        conn.release();
    }
});

//delete room
router.delete("/rooms/:room_id", async function (req, res, next) {

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
        const [rooms, columns] = await pool.query("DELETE FROM rooms WHERE room_id = ?", [req.params.room_id]);

        //delete all instrument in this room
        const [deleteInstruments, columns2] = await pool.query("DELETE FROM instruments WHERE room_id = ?", [req.params.room_id]);

        //delete images in this room
        const [images, columns3] = await pool.query("DELETE FROM images WHERE room_id = ?", [req.params.room_id]);

        return res.send('Room ID ' + req.params.room_id + ' is deleted.');
    } catch (err) {
        await conn.rollback();
        return next(err);
    } finally {
        console.log('finally')
        conn.release();
    }
});

exports.router = router;