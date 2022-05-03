const express = require("express");
const path = require("path")
const pool = require("../config");

router = express.Router();

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
        return res.json(rooms);
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

//add new room
router.post("/rooms", async function (req, res, next) {
    
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
        const [rooms, columns] = await pool.query(
            'INSERT INTO rooms(room_name, room_type, room_status, room_price, room_description) VALUES(?, ?, ?, ?, ?)', 
            [req.body.room_name, req.body.room_type, req.body.room_status, req.body.room_price, req.body.room_description]);

        for (let index = 0; index < req.body.room_instrument.length; index++) {
            const [instruments, columns2] = await pool.query(
                'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES(?, ?, ?)', 
                [rooms.insertId, req.body.room_instrument[index].quantity, req.body.room_instrument[index].instrument_name]);
        }
        
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

//edit room
router.put("/rooms/:room_id", async function (req, res, next) {

    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();

    try{
        const [rooms, columns] = await pool.query("UPDATE rooms SET room_name = ?, room_type = ?, room_status = ?, room_price = ?, room_description = ? WHERE room_id = ?", 
        [req.body.room_name, req.body.room_type, req.body.room_status, req.body.room_price, req.body.room_description, req.params.room_id]);

        //delete all instrument in this room
        const [deleteInstruments, columns2] = await pool.query("DELETE FROM instruments WHERE room_id = ?", [req.params.room_id]);

        //add instrument
        for (let index = 0; index < req.body.room_instrument.length; index++) {
            const [instruments, columns2] = await pool.query(
                'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES(?, ?, ?)', 
                [req.params.room_id, req.body.room_instrument[index].quantity, req.body.room_instrument[index].instrument_name]);
        }
        
        return res.send('Room ID ' + req.params.room_id + ' is updated.');
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