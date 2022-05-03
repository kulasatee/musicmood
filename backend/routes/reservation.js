const express = require("express");
const path = require("path");
const pool = require("../config");

router = express.Router();

//get all reservations
router.get("/reservations", async function (req, res, next) {
  try {
    const [reservations, columns] = await pool.query(
      "SELECT * FROM reservations INNER JOIN customers ON reservations.account_id = customers.account_id INNER JOIN rooms ON rooms.room_id = reservations.room_id"
    );
    return res.json(reservations);
  } catch (err) {
    return next(err);
  }
});

//get a reservation
router.get("/reservations/:account_id", async function (req, res, next) {
  try {
    const [reservations, columns] = await pool.query(
      "SELECT * FROM reservations INNER JOIN customers ON reservations.account_id = customers.account_id INNER JOIN rooms ON rooms.room_id = reservations.room_id WHERE reservations.account_id = ?",
      [req.params.account_id]
    );
    return res.json(reservations);
  } catch (err) {
    return next(err);
  }
});

//get a reservation by date
router.get("/reservations/date/:reserve_date/:room_id", async function (req, res, next) {
    try {
      const [reservations, columns] = await pool.query(
        "SELECT room_id, reserve_hours FROM reservations WHERE reserve_date = ? AND room_id = ? AND reserve_status = 'Approved'",
        [req.params.reserve_date, req.params.room_id]
      );
      return res.json(reservations);
    } catch (err) {
      return next(err);
    }
  });

//add new reservation
router.post("/reservations", async function (req, res, next) {
  try {
    const [reservations, columns] = await pool.query(
      "INSERT INTO reservations(account_id, room_id, reserve_date, reserve_hours, reserve_status, total_price) VALUES(?, ?, ?, ?, ?, ?)",
      [
        req.body.account_id,
        req.body.room_id,
        req.body.reserve_date,
        req.body.reserve_hours,
        "pending",
        req.body.total_price,
      ]
    );
    return res.json(reservations);
  } catch (err) {
    return next(err);
  }
});

//edit reservation status
router.put("/reservations", async function (req, res, next) {
    try {
      const [reservations, columns] = await pool.query(
        "UPDATE reservations SET reserve_status = ?, reserve_remark = ? WHERE reserve_id = ?",
        [
          req.body.reserve_status,
          req.body.reserve_remark,
          req.body.reserve_id
        ]
      );
      return res.json(reservations);
    } catch (err) {
      return next(err);
    }
  });

//edit room
// router.put("/rooms/:room_id", async function (req, res, next) {

//     const conn = await pool.getConnection()
//     // Begin transaction
//     await conn.beginTransaction();

//     try{
//         const [rooms, columns] = await pool.query("UPDATE rooms SET room_name = ?, room_type = ?, room_status = ?, room_price = ?, room_description = ? WHERE room_id = ?",
//         [req.body.room_name, req.body.room_type, req.body.room_status, req.body.room_price, req.body.room_description, req.params.room_id]);

//         //delete all instrument in this room
//         const [deleteInstruments, columns2] = await pool.query("DELETE FROM instruments WHERE room_id = ?", [req.params.room_id]);

//         //add instrument
//         for (let index = 0; index < req.body.room_instrument.length; index++) {
//             const [instruments, columns2] = await pool.query(
//                 'INSERT INTO instruments(room_id, quantity, instrument_name) VALUES(?, ?, ?)',
//                 [req.params.room_id, req.body.room_instrument[index].quantity, req.body.room_instrument[index].instrument_name]);
//         }

//         return res.send('Room ID ' + req.params.room_id + ' is updated.');
//     } catch (err) {
//         await conn.rollback();
//         return next(err);
//     } finally {
//         console.log('finally')
//         conn.release();
//     }
// });

//delete room
// router.delete("/rooms/:room_id", async function (req, res, next) {

//     const conn = await pool.getConnection()
//     // Begin transaction
//     await conn.beginTransaction();

//     try{
//         const [rooms, columns] = await pool.query("DELETE FROM rooms WHERE room_id = ?", [req.params.room_id]);

//         //delete all instrument in this room
//         const [deleteInstruments, columns2] = await pool.query("DELETE FROM instruments WHERE room_id = ?", [req.params.room_id]);

//         return res.send('Room ID ' + req.params.room_id + ' is deleted.');
//     } catch (err) {
//         await conn.rollback();
//         return next(err);
//     } finally {
//         console.log('finally')
//         conn.release();
//     }
// });

exports.router = router;
