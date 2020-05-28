const express = require("express");
const router = express.Router();
const multer = require('multer');
const db = require("../database");
const fs = require('fs-extra');
const axios = require('axios')

let uId;



var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, '../../face/imagenes/'+uId)
},
filename: function (req, file, cb) {
  cb(null, file.originalname )
}
})
var upload = multer({ storage: storage }).array('file')

router.get("/", async (req, res) => {
  const resp = await db.query("SELECT * FROM employee");
  console.log(resp);
  res.send(resp);
});

router.post("/new", async (req, res) => {
  const resp = await db.query("INSERT INTO employee SET ?", [req.body]);
  console.log(resp);
  res.send(resp);
});

router.post("/new/pics", async (req, res) => {
  upload(req, res, function (err) {
    if (err){console.error(err)}
  })
  const resp = await axios({
    method: 'post',
    url : "http://192.168.1.4:7000/train",
    data:{}
  })
  console.log(resp);
  res.send('received')
});

router.post("/new/folder", async (req, res) => {
  const {userId} = req.body;
  uId = userId;
  console.log('userId '+userId);
  await fs.mkdir('../../face/imagenes/'+uId, { recursive: true }, (err) =>{console.error(err)})
  res.send('received')
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { firstName, lastName, idType, idNumber, id } = req.body;
  const resp = await db.query(
    "UPDATE employee SET FirstName = ?, LastName = ?, idType = ?, idNumber = ? WHERE id = ?",
    [firstName, lastName, idType, idNumber, id]
  );
  console.log(resp);
  res.send("received");
});

router.delete("/", async (req, res) => {
  console.log(req);
  const {id} = req.body;
  const resp = await db.query('DELETE FROM employee WHERE id = ?',[id]);
  fs.remove('../../face/imagenes/'+id, (err)=>{console.error(err)});
  const response = await axios({
    method: 'post',
    url : "http://192.168.1.4:7000/train",
    data:{}
  })
  console.log(response);
  res.send(resp);
});
module.exports = router;
