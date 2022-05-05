const express = require("express");
const path = require("path");
const pool = require("../config");
const { isAuth, isStaff } = require("./auth/jwtAuth");

router = express.Router();

//get all reservations
router.get("/reservations", isAuth, isStaff, async function (req, res, next) {
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
router.get("/reservations/:account_id",isAuth, async function (req, res, next) {
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
router.post("/reservations/date",isAuth, async function (req, res, next) {
    try {
      const [reservations, columns] = await pool.query(
        "SELECT * FROM reservations WHERE reserve_date = ? AND room_id = ?",
        [req.body.reserve_date, req.body.room_id]
      );
      return res.json(reservations);
    } catch (err) {
      return next(err);
    }
  });

//add new reservation
router.post("/reservations",isAuth, async function (req, res, next) {
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
router.put("/reservations",isAuth, isStaff, async function (req, res, next) {
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

exports.router = router;
